const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const MAX_SIZE_KB = 50;
const WIDTH = 120;
const HEIGHT = 160;
const INPUT_DIRS = ["imagenes/animales", "imagenes/emojis", "imagenes/tecnologias"];
const OUTPUT_DIR = "imagenes_comprimidas";

// Crea la carpeta de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

// Función para obtener el tamaño del archivo en KB
function getFileSizeKB(filePath) {
    return fs.existsSync(filePath) ? fs.statSync(filePath).size / 1024 : Infinity;
}

// Función para comprimir una imagen
async function compressImage(inputPath, outputPath) {
    let quality = 90;
    let fileSize = Infinity;

    while (quality > 10) {
        await sharp(inputPath)
            .resize(WIDTH, HEIGHT)
            .webp({ quality })
            .toFile(outputPath);

        fileSize = getFileSizeKB(outputPath);
        console.log(`Intento con calidad ${quality}: ${fileSize.toFixed(2)} KB - ${outputPath}`);

        if (fileSize <= MAX_SIZE_KB) break;
        quality -= 5;
    }

    console.log(
        fileSize <= MAX_SIZE_KB
            ? `✅ Imagen comprimida: ${outputPath} (${fileSize.toFixed(2)} KB)`
            : `⚠️ No se pudo reducir la imagen por debajo de ${MAX_SIZE_KB} KB`
    );
}

// Función para procesar todas las imágenes en un directorio
async function processImagesFromFolder(folderPath) {
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".jpg"));

    for (const file of files) {
        const inputPath = path.join(folderPath, file);
        const outputFileName = `${path.parse(file).name}.webp`;
        const outputPath = path.join(OUTPUT_DIR, outputFileName);

        await compressImage(inputPath, outputPath);
    }
}

// Procesar todas las carpetas
(async () => {
    for (const folder of INPUT_DIRS) {
        if (fs.existsSync(folder)) {
            console.log(`📂 Procesando imágenes en: ${folder}`);
            await processImagesFromFolder(folder);
        } else {
            console.warn(`⚠️ Carpeta no encontrada: ${folder}`);
        }
    }
})();
