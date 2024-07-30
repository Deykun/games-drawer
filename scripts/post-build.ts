import fs from 'fs';

const PATHS_TO_ADD_TO_SSR = ['rover'];

PATHS_TO_ADD_TO_SSR.forEach((path) => {
  const html = fs.readFileSync('./dist/index.html', 'utf-8');

  fs.writeFileSync(`./dist/${path}.html`, html);
});
