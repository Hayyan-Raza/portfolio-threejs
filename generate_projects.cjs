const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'public', 'screenshots');
const dataFilePath = path.join(__dirname, 'src', 'data.ts');

const files = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

let newArray = '\nexport const SCREENSHOT_GALLERY = [\n';

files.forEach((file, index) => {
  const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
  newArray += `  {
    id: "gallery-${index + 1}",
    title: ${JSON.stringify(nameWithoutExt)},
    image: "/screenshots/${file}"
  },\n`;
});

newArray += '];\n';

let dataTsContent = fs.readFileSync(dataFilePath, 'utf-8');
const galleryIndex = dataTsContent.indexOf('export const SCREENSHOT_GALLERY');

if (galleryIndex !== -1) {
  dataTsContent = dataTsContent.substring(0, galleryIndex);
}

fs.writeFileSync(dataFilePath, dataTsContent + newArray);
console.log('Updated SCREENSHOT_GALLERY in data.ts with ' + files.length + ' images.');
