import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import {
  DefaultDriver,
  JobRunGenerator,
  RunConfig,
  RunData,
  RunState,
  RunStatus,
  RunType,
  UnlockJobCommand,
  ApiCommand,
  character_list,
  UpdateRunStateCommand,
} from '../../projects/shared/src/public-api';

export class BackendDriver extends DefaultDriver {
  public getTimestamp(): admin.firestore.Timestamp {
    return admin.firestore.Timestamp.now();
  }
}

const jobRunGen = new JobRunGenerator(new BackendDriver());

admin.initializeApp(functions.config().firebase);
const charMap = character_list().reduce((map, obj) => {
  map[obj.name] = obj;
  return map;
}, {});

function states(db, context) {
  return db.collection(`runs/state/${context.auth.uid}`);
}

function plans(db, context) {
  return db.collection(`runs/plan/${context.auth.uid}`);
}

async function handleNewRun(config: RunConfig, context: any): Promise<string> {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Must be logged in to create a run.'
    );
  }

  if (config.ty !== RunType.Job) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      `Invalid run type ${config.ty}`
    );
  }

  const [plan, state] = jobRunGen.newRun(config);

  // Hack to work around Timestamp class mismatch between frontend and backend.
  // We should refactor new_job_run() and friends to take a timestamp.
  const now = admin.firestore.Timestamp.now();
  state.timestamp = now;
  state.log[0].when = now;

  const db = admin.firestore();
  const ref = await states(db, context).add(state);

  // Write back state with its id;
  state.id = ref.id;
  await states(db, context)
    .doc(ref.id)
    .set(state);

  await plans(db, context)
    .doc(ref.id)
    .set(plan);

  return ref.id;
}

async function handleUnlockJob(cmd: UnlockJobCommand, context: any) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Must be logged in to create a run.'
    );
  }

  if (!(cmd.name in charMap)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      `Invalid character name ${cmd.name}`
    );
  }

  const db = admin.firestore();
  const state = (
    await states(db, context)
      .doc(cmd.run_id)
      .get()
  ).data() as RunState;

  if (state.status !== RunStatus.Active) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Can not unlock job run run is not active.'
    );
  }

  if (cmd.name in state.data.job_data.jobs) {
    return;
  }

  const plan = (
    await plans(db, context)
      .doc(cmd.run_id)
      .get()
  ).data() as RunData;

  state.data.job_data.jobs[cmd.name] = plan.job_data.jobs[cmd.name];
  const now = admin.firestore.Timestamp.now();
  state.timestamp = now;
  state.log.push({
    when: now,
    message: `Unlocked ${cmd.name}.`,
  });

  await states(db, context)
    .doc(cmd.run_id)
    .set(state);

  return;
}

async function handleUpdateJobState(cmd: UpdateRunStateCommand, context: any) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Must be logged in to create a run.'
    );
  }

  const db = admin.firestore();
  const state = (
    await states(db, context)
      .doc(cmd.run_id)
      .get()
  ).data() as RunState;

  if (state.status !== RunStatus.Active) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Can not update run because it is not active.'
    );
  }

  state.status = cmd.new_status;
  const now = admin.firestore.Timestamp.now();
  state.timestamp = now;
  state.log.push({
    when: now,
    message: `Status set to ${cmd.new_status}.`,
  });

  await states(db, context)
    .doc(cmd.run_id)
    .set(state);

  return;
}

export const command = functions.https.onCall(
  async (cmd: ApiCommand, context): Promise<any> => {
    if (cmd.newRun) {
      return await handleNewRun(cmd.newRun, context);
    } else if (cmd.unlockJob) {
      await handleUnlockJob(cmd.unlockJob, context);
    } else if (cmd.updateRunState) {
      await handleUpdateJobState(cmd.updateRunState, context);
    }
  }
);

// Deprecated endpoint for legacy clients.
export const newRun = functions.https.onCall(
  async (config: RunConfig, context) => {
    return await handleNewRun(config, context);
  }
);

// Deprecated endpoint for legacy clients.
export const unlockJob = functions.https.onCall(
  async (cmd: UnlockJobCommand, context) => {
    await handleUnlockJob(cmd, context);
  }
);
