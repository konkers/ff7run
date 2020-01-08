import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const cors = require('cors');

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
enum MateriaType {
    Command = 1,
    Independent,
    Magic,
    Summon,
    Support,
}

interface Materia {
    name: string,
    ty: MateriaType,
}

const MATERIA_LIST: Materia[] = [
    {
        name: 'Steal',
        ty: MateriaType.Command,
    },
    {
        name: 'Sense',
        ty: MateriaType.Command,
    },
    {
        name: 'Enemy Skill',
        ty: MateriaType.Command,
    },
    {
        name: 'Throw',
        ty: MateriaType.Command,
    },
    {
        name: 'Manipulate',
        ty: MateriaType.Command,
    },
    {
        name: 'Deathblow',
        ty: MateriaType.Command,
    },
    {
        name: 'Morph',
        ty: MateriaType.Command,
    },
    {
        name: 'Double Cut',
        ty: MateriaType.Command,
    },
    {
        name: 'X-Summon',
        ty: MateriaType.Command,
    },
    {
        name: 'Slash-All',
        ty: MateriaType.Command,
    },
    {
        name: 'Mime',
        ty: MateriaType.Command,
    },
    {
        name: 'X-Magic',
        ty: MateriaType.Command,
    },
    {
        name: 'X-Item',
        ty: MateriaType.Command,
    },
    {
        name: 'Master Command',
        ty: MateriaType.Command,
    },
    {
        name: 'Cover',
        ty: MateriaType.Independent,
    },
    {
        name: 'Chocobo Lure',
        ty: MateriaType.Independent,
    },
    {
        name: 'Long Range',
        ty: MateriaType.Independent,
    },
    {
        name: 'Counter',
        ty: MateriaType.Independent,
    },
    {
        name: 'Enemy Lure',
        ty: MateriaType.Independent,
    },
    {
        name: 'Speed Plus',
        ty: MateriaType.Independent,
    },
    {
        name: 'MP Plus',
        ty: MateriaType.Independent,
    },
    {
        name: 'HP Plus',
        ty: MateriaType.Independent,
    },
    {
        name: 'Luck Plus',
        ty: MateriaType.Independent,
    },
    {
        name: 'Magic Plus',
        ty: MateriaType.Independent,
    },
    {
        name: 'Gil Plus',
        ty: MateriaType.Independent,
    },
    {
        name: 'Pre-Emptive',
        ty: MateriaType.Independent,
    },
    {
        name: 'Exp. Plus',
        ty: MateriaType.Independent,
    },
    {
        name: 'Enemy Away',
        ty: MateriaType.Independent,
    },
    {
        name: 'HP <--> MP',
        ty: MateriaType.Independent,
    },
    {
        name: 'Mega All',
        ty: MateriaType.Independent,
    },
    {
        name: 'Underwater',
        ty: MateriaType.Independent,
    },
    {
        name: 'Ice',
        ty: MateriaType.Magic,
    },
    {
        name: 'Lightning',
        ty: MateriaType.Magic,
    },
    {
        name: 'Restore',
        ty: MateriaType.Magic,
    },
    {
        name: 'Fire',
        ty: MateriaType.Magic,
    },
    {
        name: 'Poison',
        ty: MateriaType.Magic,
    },
    {
        name: 'Earth',
        ty: MateriaType.Magic,
    },
    {
        name: 'Heal',
        ty: MateriaType.Magic,
    },
    {
        name: 'Revive',
        ty: MateriaType.Magic,
    },
    {
        name: 'Seal',
        ty: MateriaType.Magic,
    },
    {
        name: 'Transform',
        ty: MateriaType.Magic,
    },
    {
        name: 'Mystify',
        ty: MateriaType.Magic,
    },
    {
        name: 'Time',
        ty: MateriaType.Magic,
    },
    {
        name: 'Gravity',
        ty: MateriaType.Magic,
    },
    {
        name: 'Destruct',
        ty: MateriaType.Magic,
    },
    {
        name: 'Barrier',
        ty: MateriaType.Magic,
    },
    {
        name: 'Exit',
        ty: MateriaType.Magic,
    },
    {
        name: 'Comet',
        ty: MateriaType.Magic,
    },
    {
        name: 'Fullcure',
        ty: MateriaType.Magic,
    },
    {
        name: 'Contain',
        ty: MateriaType.Magic,
    },
    {
        name: 'Ultima',
        ty: MateriaType.Magic,
    },
    {
        name: 'Shield',
        ty: MateriaType.Magic,
    },
    {
        name: 'Master Magic',
        ty: MateriaType.Magic,
    },
    {
        name: 'Choco/Mog',
        ty: MateriaType.Summon,
    },
    {
        name: 'Shiva',
        ty: MateriaType.Summon,
    },
    {
        name: 'Ifrit',
        ty: MateriaType.Summon,
    },
    {
        name: 'Ramuh',
        ty: MateriaType.Summon,
    },
    {
        name: 'Titan',
        ty: MateriaType.Summon,
    },
    {
        name: 'Odin',
        ty: MateriaType.Summon,
    },
    {
        name: 'Kajata',
        ty: MateriaType.Summon,
    },
    {
        name: 'Titan',
        ty: MateriaType.Summon,
    },
    {
        name: 'Odin',
        ty: MateriaType.Summon,
    },
    {
        name: 'Kjata',
        ty: MateriaType.Summon,
    },
    {
        name: 'Bahamut',
        ty: MateriaType.Summon,
    },
    {
        name: 'Alexander',
        ty: MateriaType.Summon,
    },
    {
        name: 'Neo Bahamut',
        ty: MateriaType.Summon,
    },
    {
        name: 'Leviathan',
        ty: MateriaType.Summon,
    },
    {
        name: 'Phoenix',
        ty: MateriaType.Summon,
    },
    {
        name: 'Hades',
        ty: MateriaType.Summon,
    },
    {
        name: 'Bahamut ZERO',
        ty: MateriaType.Summon,
    },
    {
        name: 'Typoon',
        ty: MateriaType.Summon,
    },
    {
        name: 'Knights of the Round',
        ty: MateriaType.Summon,
    },
    {
        name: 'All',
        ty: MateriaType.Support,
    },
    {
        name: 'Elemental',
        ty: MateriaType.Support,
    },
    {
        name: 'Added Effect',
        ty: MateriaType.Support,
    },
    {
        name: 'MP Absorb',
        ty: MateriaType.Support,
    },
    {
        name: 'HP Absorb',
        ty: MateriaType.Support,
    },
    {
        name: 'Added Cut',
        ty: MateriaType.Support,
    },
    {
        name: 'MP Turbo',
        ty: MateriaType.Support,
    },
    {
        name: 'Steal As Well',
        ty: MateriaType.Support,
    },
    {
        name: 'Magic Counter',
        ty: MateriaType.Support,
    },
    {
        name: 'Final Attack',
        ty: MateriaType.Support,
    },
    {
        name: 'Quadra Magic',
        ty: MateriaType.Support,
    },
    {
        name: 'Sneak Attack',
        ty: MateriaType.Support,
    },
]

function shuffleMateria(materia: Materia[]) {
    for (let i = materia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [materia[i], materia[j]] = [materia[j], materia[i]];
    }
}

export const newRun = functions.https.onRequest((request, response) => {
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