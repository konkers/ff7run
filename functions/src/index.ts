import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Materia, RunConfig } from '../../shared/model';
import { MATERIA_LIST } from '../../shared/data';

const cors = require('cors');

admin.initializeApp(functions.config().firebase);

function shuffleMateria(materia: Materia[]) {
    for (let i = materia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [materia[i], materia[j]] = [materia[j], materia[i]];
    }
}

export const newRunOld = functions.https.onRequest((request, response) => {
    return cors()(request, response, () => {

        let materia = [...MATERIA_LIST];
        shuffleMateria(materia);
        materia = materia.slice(0, 7);

        const db = admin.firestore();
        db.collection("runs").add({
            date: admin.firestore.FieldValue.serverTimestamp(),
            materia: materia
        }).then(function (ref) {
            response.json({ data: { id: ref.id } });
        }
        ).catch(function (error) {
            console.log("Error adding new run: ", error);
        });
    });
});

export const newRun = functions.https.onCall((config: RunConfig, context) => {
    console.log(context);
    return {
        ty: config.ty,
        id: context.auth.uid

    };
});