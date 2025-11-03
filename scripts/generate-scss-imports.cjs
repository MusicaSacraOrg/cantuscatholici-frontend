const glob = require('glob');
const fs = require('fs');
const path = require('path');

const scssFiles = glob.sync('node_modules/@musica-sacra/**/dist/**/*.scss');

// normalize Windows paths → forward slashes
const imports = scssFiles
    .map((file) => {
        const normalizedPath = file.replace(/\\/g, '/');
        return `@use "${normalizedPath.replace('node_modules/', '')}" as *;`;
    })
    .join('\n');

fs.writeFileSync('src/styles/generated-imports.scss', imports);
