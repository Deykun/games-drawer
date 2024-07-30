import fs from 'fs';

const PATHS_TO_ADD_TO_SSR = [
  { path: 'rover', title: 'Rover' },
  { path: 'blocks', title: 'Blocks' },
  { path: 'gecko', title: 'Gecko' },
];

PATHS_TO_ADD_TO_SSR.forEach(({ path, title }) => {
  let html = fs.readFileSync('./dist/index.html', 'utf-8');

  html = html.replace('<title>', `<title>${title} - `);

  fs.writeFileSync(`./dist/${path}.html`, html);
});
