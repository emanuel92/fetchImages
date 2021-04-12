import fs from 'fs';
import fetch from 'node-fetch';

let destination = 'images/';

const imageUrls = JSON.parse(fs.readFileSync('urls.json', 'utf8'));

async function main(destination, imageUrls) {

  // mapping through arrays to get single products
  for (let i = 0; i < imageUrls.length; i++) {
    let url = imageUrls[i];
    let productName = url.name;
    let files = url.values;

    // create directory for each product
    let fileDest = destination + productName;

    await createDirectory(fileDest);

    // mapping files of each product
    for (let j = 0; j < files.length; j++) {
      let file = files[j];
      let fileName = file.substring(53);

      // download files
      try {
        await download(fileDest, file, fileName)
      } catch (e) {
        console.log("An error occured", e);
      }
    };
  };
};

// async function for downloading and writing files
async function download(fileDest, file, fileName) {
  const response = await fetch(file);
  const buffer = await response.buffer();
  fs.writeFile(fileDest + "/" + fileName, buffer, () => 
    console.log('downloaded ' + fileName));
}

// async function for creating directory
async function createDirectory(fileDest) {
  fs.mkdir(fileDest, () => console.log("create direction  " + fileDest));
}

// call main function
main(destination, imageUrls);