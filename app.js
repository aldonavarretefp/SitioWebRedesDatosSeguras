const fs = require('fs');

const contenidoLog = fs.readFileSync('registro.log', 'utf-8');
const lineas = contenidoLog.split('\n');

/* Buscamos la última línea que no sea de Zone.Identifier */
let ultimaLinea;
for (let i = lineas.length - 1; i >= 0; i--) {
  const linea = lineas[i].trim();
  if (!linea.endsWith('Zone.Identifier')) {
    ultimaLinea = linea;
    break;
  }
}
/* Expresión regular para tomar la fecha y hora de la última modificación */
const regex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
const match = ultimaLinea.match(regex);
const fechaHoraModificacion = match ? match[1] : null;

/* Expresión regular para tomar el nombre de la imágen */
const regexImg = /(\w+\.(?:jpg|png|jpeg|gif))/;
const matchImg = ultimaLinea.match(regexImg);
const nombreImagen = matchImg ? matchImg[1] : null;
const archivoHTML = fs.readFileSync('index.html', 'utf-8');

/* Modificamos el HTML */
const cheerio = require('cheerio');
const $ = cheerio.load(archivoHTML);
const imagen = $('img');
const h1 = $('h1');

imagen.attr('src', "/images/" + nombreImagen);
h1.text(`Última modificación: ${fechaHoraModificacion}`);

fs.writeFileSync('index.html', $.html());

