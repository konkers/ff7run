import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { RunConfig, RunType, new_job_run } from '@shared';

admin.initializeApp(functions.config().firebase);

export const newRun = functions.https.onCall((config: RunConfig, context) => {
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

  return new_job_run(config);
});
