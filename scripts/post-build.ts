import fs from 'fs';

const PATHS_TO_ADD_TO_SSR = [
  {
    path: 'rover',
    title: '🌕 Rover',
    social: `<meta property="og:title" content="🌕 Rover" ><meta property="og:image" content="https://deykun.github.io/games-drawer/social/rover.png" >`
  },
  {
    path: 'blocks',
    title: '🟩 Blocks',
    social: `<meta property="og:title" content="🟩 Blocks" ><meta property="og:image" content="https://deykun.github.io/games-drawer/social/blocks.png" >`
  },
  {
    path: 'gecko',
    title: '🦎 Gecko',
    social: `<meta property="og:title" content="🦎 Gecko" ><meta property="og:image" content="https://deykun.github.io/games-drawer/social/blocks.png" >`
  },
];

PATHS_TO_ADD_TO_SSR.forEach(({ path, title, social }) => {
  let html = fs.readFileSync('./dist/index.html', 'utf-8');

  html = html.replace('<title>', `<title>${title} - `);
  html = html.replace('<!-- SOCIAL -->', social);

  

  fs.writeFileSync(`./dist/${path}.html`, html);
});
