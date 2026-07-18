const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');
const outputFile = path.join(publicDir, 'env.js');
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://18.234.170.77:3000/analyze_marksheet';

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const content = `window._env_ = {
  REACT_APP_API_ENDPOINT: "${apiEndpoint}"
};\n`;

fs.writeFileSync(outputFile, content, 'utf8');
console.log(`Generated ${outputFile}`);
