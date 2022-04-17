# Computahorra - Ecommerce en React  

Computahorra es una tienda digital de productos de informática. Es un sitio web responsivo -mobile first- que pretende ofrecer características típicas de un e-commerce.

![Logo de Computahorra](https://raw.githubusercontent.com/selienyorbandi/computahorra/main/src/assets/img/brandLogo.png)

## Acceso - Deploy  

[Ingresa al sitio aquí](https://computahorra.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c9b66c7e-af3e-4903-83f6-eaeedc784846/deploy-status)](https://computahorra.netlify.app/)

## Dependencias
En detalle en [package.json](https://github.com/selienyorbandi/computahorra/blob/main/package.json)
### De producción

- React Router v6.2.2, para realizar la navegación de SPA
- React FontAwesome v0.1.17, por la facilidad para insertar íconos y modificar su apariencia al comportarse como una tipografía.
- Firebase v9.6.10, como solución sencilla a la necesidad de una base de datos

### De desarrollo

- Eslint v8.10.0, para uniformidad en el código.

## Generalidades

Como el proyecto está preconfigurado con webpack, utilizo css modules para importar el css, ya que evita problemas de scope global futuros.
