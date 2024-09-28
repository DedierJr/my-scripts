#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy';

async function copyContent(targetPath) {
  const stats = await fs.promises.lstat(targetPath);

  if (stats.isFile()) {
    if (path.extname(targetPath) === '.json') {
      return; // Ignora arquivos .json
    }
    const content = await fs.promises.readFile(targetPath, 'utf-8');
    clipboardy.writeSync(content);
    console.log(`Conteúdo do arquivo ${targetPath} copiado para a área de transferência.`);
  } else if (stats.isDirectory()) {
    const files = await fs.promises.readdir(targetPath);
    let concatenatedContent = '';

    for (const file of files) {
      const filePath = path.join(targetPath, file);
      const fileStats = await fs.promises.lstat(filePath);

      // Ignora a pasta node_modules e arquivos .json
      if (file === 'node_modules' || path.extname(filePath) === '.json') {
        continue;
      }

      if (fileStats.isFile()) {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        concatenatedContent += `\n# Caminho do arquivo: ${filePath}\n${content}\n`;
      } else if (fileStats.isDirectory()) {
        const nestedContent = await copyContent(filePath);
        concatenatedContent += nestedContent;
      }
    }

    clipboardy.writeSync(concatenatedContent);
    console.log(`Conteúdo do diretório ${targetPath} copiado para a área de transferência.`);
  } else {
    console.log(`Erro: ${targetPath} não é um arquivo nem um diretório.`);
  }
}

// Função para tratar os argumentos de entrada
async function run() {
  const args = process.argv.slice(2);
  let targetPath = process.cwd();

  if (args[0]) {
    targetPath = path.join(targetPath, args[0]);
  }

  try {
    await copyContent(targetPath);
  } catch (err) {
    console.error(`Erro ao copiar: ${err.message}`);
  }
}

run();
