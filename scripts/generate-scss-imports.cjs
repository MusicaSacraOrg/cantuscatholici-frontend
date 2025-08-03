const glob = require('glob');
const fs = require('fs');

const scssFiles = glob.sync('node_modules/@musica-sacra/**/dist/**/*.scss');
const imports = scssFiles
    .map((file) => `@use "${file.replace('node_modules/', '')}" as *;`)
    .join('\n');

fs.writeFileSync('src/styles/generated-imports.scss', imports);
