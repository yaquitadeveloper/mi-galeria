# Repositorio de Imágenes por Categoría

Este repositorio contiene una colección de imágenes organizadas por categorías. Las imágenes están disponibles para ser utilizadas en otros proyectos.

## Estructura

- **Carpeta `imagenes/`:** Contiene subcarpetas para cada categoría.
- **Archivo `imagenes.json`:** Contiene las URLs de las imágenes organizadas por categorías.

## Acceso a las Imágenes

Puedes acceder a las imágenes directamente utilizando las URLs proporcionadas en el archivo `imagenes.json`. Por ejemplo:

- Categoría 1:
  -https://github.com/yaquitadeveloper/mi-galeria/imagenes/categoria1/imagen1.jpg  
  -https://github.com/yaquitadeveloper/mi-galeria/imagenes/categoria1/imagen2.jpg

- Categoría 2:
  - https://github.com/yaquitadeveloper/mi-galeria/imagenes/categoria2/imagen4.jpg
  - https://github.com/yaquitadeveloper/mi-galeria/imagenes/categoria2/imagen5.jpg

## Uso en Otros Proyectos

Para utilizar las imágenes en otro proyecto, simplemente haz una solicitud HTTP al archivo `imagenes.json` y extrae las URLs según la categoría deseada.

```javascript
fetch('https://TU_USUARIO.github.io/mi-galeria/imagenes.json')
  .then(response => response.json())
  .then(data => {
    console.log(data.categoria1); // URLs de la categoría 1
  });
