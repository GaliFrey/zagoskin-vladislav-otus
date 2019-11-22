const fs = require('fs');
const path = require('path');

const obj = {
  files: [],
  folders: []
};

let dirpath;
dirpath = process.argv[2] ? path.resolve(__dirname, process.argv[2]) : __dirname

async function tree(dirpath) {

  let data = await new Promise((resolve, reject) => {
    fs.readdir(dirpath, { withFileTypes: true }, (err, data) => {
      resolve(data)
    })
  })

  for (elem of data) {
    elemName = elem.name;
    elemPath = path.resolve(dirpath, elem.name);
    elemType = elem[Object.getOwnPropertySymbols(elem)[0]];

    if (elemType === 1) {
      obj.files.push(elemPath)
    }

    if (elemType === 2) {
      obj.folders.push(elemPath)
      await tree(elemPath);
    }
  }

  return obj;
}

tree(dirpath).then(console.log);
