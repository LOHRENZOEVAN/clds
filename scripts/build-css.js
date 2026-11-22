const fs = require('fs');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');

const inputCss = `@import "tailwindcss";\n@source "..";\n`;
postcss([tailwind()])
  .process(inputCss, { from: 'src/app/globals.css' })
  .then(res => {
    fs.writeFileSync('src/app/compiled-tailwind.css', res.css);
    console.log('[build-css] Generated src/app/compiled-tailwind.css successfully (' + Math.round(res.css.length / 1024) + ' KB)');
  })
  .catch(err => {
    console.error('[build-css] Error:', err);
    process.exit(1);
  });

