const fs = require('fs');

const contenidoLog = fs.readFileSync('registro.log', 'utf-8');
const lineas = contenidoLog.split('\n');
console.log(lineas)
/* Buscamos la última línea que no sea de Zone.Identifier o que sea una línea vacía*/
let ultimaLinea;
let nombreImagen;
for (let i = lineas.length - 1; i >= 0; i--) {
  const linea = lineas[i].trim();
  if (linea == '') {
    continue;
  }
  if (!linea.endsWith('Zone.Identifier')) {
    ultimaLinea = linea;
    const palabras = linea.split(' ');
    nombreImagen = palabras[palabras.length - 1];
    break;
  }
}
/* Expresión regular para tomar la fecha y hora de la última modificación */
const regex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
const match = ultimaLinea.match(regex);
const fechaHoraModificacion = match ? match[1] : null;
/* Expresión regular para tomar el nombre de la imágen, puede contener guiones bajos, guiones, formatos gif, png, jpg y jpeg */

// const regexImg = /\/([a-zA-Z0-9-_]+.(gif|png|jpg|jpeg))/;
const regexImg = /([A-Za-z0-9-_]+\.(?:jpg|png|gif))/;
const matchImg = ultimaLinea.match(regexImg);
// const nombreImagen = matchImg ? matchImg[1] : null;
const archivoHTML = fs.readFileSync('index.html', 'utf-8');

/* Modificamos el HTML */
const cheerio = require('cheerio');
const $ = cheerio.load(archivoHTML);
const imagen = $('img');
const h1 = $('h1');

imagen.attr('src', "/images/" + nombreImagen);
h1.text(`Última modificación: ${fechaHoraModificacion} (UTC)`);

fs.writeFileSync('index.html', $.html());

