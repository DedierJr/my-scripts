#!/usr/bin/env node
const html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="assets/styles/style.css">
	<title>Document</title>
</head>
<body>
	<script src="src/script.js"></script>
</body>
</html>`

const postcss = `module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
`

const scripts = `{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "setup.js",
  "bin": {
    "meucomando": "./setup.js"
  },
  "scripts": {
    "start": "node setup.js",
    "dev": "npm run build-css && npm run watch-css",
    "build-css": "npx sass ./assets/styles/style.sass ./assets/styles/style.css --no-source-map",
    "watch-css": "npx sass --watch ./assets/styles/style.sass:./assets/styles/style.css --no-source-map & npx postcss ./assets/styles/style.css --use autoprefixer -d ./assets/styles/"
  },
  "dependencies": {},
  "devDependencies": {
    "sass": "^1.32.0",
    "postcss-cli": "^8.3.1",
    "autoprefixer": "^10.2.4"
  }
}

`

const sass = `@import "../../assets/styles/sass/_typography.sass"
@import "../../assets/styles/sass/_base.sass"
`

const baseSass = `$font-primary: 'Muli', sans-serif

@mixin maxmedia($px)
  $em: calc($px / 16) * 1em

  @media only screen and (max-width: $em)
    @content

@mixin minmedia($px)
  $em: calc($px / 16) * 1em

  @media only screen and (min-width: $em)
    @content

*, *::before, *::after
  margin: 0
  padding: 0
  box-sizing: inherit

html
  box-sizing: border-box
  font-size: 62.5% // 10px/16px = 62.5% -> 1rem = 10px
  @include maxmedia(1200)
    font-size: 50%

body
  font-family: $font-primary
  height: 100vh
  overflow: hidden
`

const typographySass = `@import url('https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap')

h1
	font-size: 5.73rem
	font-weight: 600

h2
	font-size: 3.98rem
	font-weight: 600

h3
	font-size: 3.98rem
	font-weight: 600

h4
	font-size: 1.94rem
	font-weight: 600

h5
	font-size: 1.6rem
	font-weight: 600

p
	font-size: 1.6rem

`

const fs = require('fs');
const path = require('path');

// Diretório de trabalho atual
const currentDir = process.cwd();

// Função para criar pastas
function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Pasta criada: ${folderPath}`);
  } else {
    console.log(`Pasta já existe: ${folderPath}`);
  }
}

// Função para criar arquivos
function createFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Arquivo criado: ${filePath}`);
  } else {
    console.log(`Arquivo já existe: ${filePath}`);
  }
}

// Criando pastas no diretório atual
createFolder(path.join(currentDir, 'assets'));
createFolder(path.join(currentDir, 'images'));
createFolder(path.join(currentDir, 'src'));
createFolder(path.join(currentDir, './assets/styles'));
createFolder(path.join(currentDir, './assets/styles/sass'));

// Criando arquivos no diretório atual
createFile(path.join(currentDir, 'index.html'), html);
createFile(path.join(currentDir, './assets/styles/style.css'));
createFile(path.join(currentDir, './assets/styles/style.sass'), sass);
createFile(path.join(currentDir, './assets/styles/sass/_base.sass'), baseSass);
createFile(path.join(currentDir, './assets/styles/sass/_typography.sass'), typographySass);
createFile(path.join(currentDir, 'package.json'), scripts);
createFile(path.join(currentDir, 'postcss.config.js'), postcss);
createFile(path.join(currentDir, './src/app.js'));

console.log('Configuração inicial concluída!');


