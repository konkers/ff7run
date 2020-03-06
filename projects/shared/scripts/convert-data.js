const fs = require('fs');
const json5 = require('json5');

const PATH = "./src/lib";

fs.readdir(PATH, function (err, items) {
    for (let f of items) {
        if (f.match(/.*\.json5$/)) {
            fileName = `${PATH}/${f}`;

            console.log(`Converting ${fileName}.`);
            js5 = fs.readFileSync(fileName);
            object = json5.parse(js5);

            outFileName = fileName.replace(/\.json5$/, ".json");
            fs.writeFileSync(outFileName, JSON.stringify(object, null, 4));
        }
    }
});