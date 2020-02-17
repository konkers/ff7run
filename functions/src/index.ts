import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import {
  RunConfig,
  RunData,
  RunState,
  RunType,
  UnlockJobCommand,
  character_list,
  new_job_run,
} from '../../projects/shared/src/public-api';

admin.initializeApp(functions.config().firebase);
const charMap = character_list().reduce((map, name) => {
  map[name] = true;
  return map;
}, {});

function states(db, context) {
  return db.collection(`runs/state/${context.auth.uid}`);
}

function plans(db, context) {
  return db.collection(`runs/plan/${context.auth.uid}`);
}

export const newRun = functions.https.onCall(
  async (config: RunConfig, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Must be logged in to create a run.'
      );
    }

    if (config.ty != RunType.Job) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        `Invalid run type ${config.ty}`
      );
    }

    const [plan, state] = new_job_run(config);

    // Hack to work around Timestamp class mismatch between frontend and backend.
    // We should refactor new_job_run() and friends to take a timestamp.
    state.log[0].when = admin.firestore.Timestamp.now();

    const db = admin.firestore();
    const ref = await states(db, context).add(state);
    await plans(db, context)
      .doc(ref.id)
      .set(plan);

    return ref.id;
  }
);

export const unlockJob = functions.https.onCall(
  async (cmd: UnlockJobCommand, context) => {
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
    let state = (
      await states(db, context)
        .doc(cmd.run_id)
        .get()
    ).data() as RunState;

    if (cmd.name in state.data.job_data.jobs) {
      return;
    }

    let plan = (
      await plans(db, context)
        .doc(cmd.run_id)
        .get()
    ).data() as RunData;

    state.data.job_data.jobs[cmd.name] = plan.job_data.jobs[cmd.name];

    await states(db, context)
      .doc(cmd.run_id)
      .set(state);

    return;
  }
);
