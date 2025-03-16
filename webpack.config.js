const path = require('path');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './main.js', // Asegúrate de que este archivo exista o cambia la ruta según corresponda
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'imagenes', to: 'imagenes' }, // Copia las imágenes originales
                { from: 'imagenes.json', to: 'imagenes.json' }, // Copia el archivo JSON
            ],
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ["mozjpeg", { quality: 75 }],
                        ["pngquant", { quality: [0.7, 0.9] }]
                    ],
                },
            },
        }),
    ],
};