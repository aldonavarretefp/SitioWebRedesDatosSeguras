// const fs = require('fs')
// let fInput = "You are reading the content from Tutorials Point"
// fs.writeFile('tp.txt', fInput, (err) => {
//    if (err) throw err;
//    else{
//       console.log("The file is updated with the given data")
//    }
// })

const image = document.querySelector('img');

const h1 = document.querySelector('.titulo-img');

h1.innerHTML = "Nombre de la imagen: " + image.src.split('/').pop();
