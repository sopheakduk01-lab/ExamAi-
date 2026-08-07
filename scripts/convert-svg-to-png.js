import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function convert() {
  try {
    const appIconSvg = fs.readFileSync(path.join(process.cwd(), 'public/app-icon.svg'));
    const teacherSvg = fs.readFileSync(path.join(process.cwd(), 'public/teacher.svg'));

    // Generate 512x512 app-icon.png
    await sharp(appIconSvg)
      .resize(512, 512)
      .png()
      .toFile(path.join(process.cwd(), 'public/app-icon.png'));
    console.log('Generated public/app-icon.png (512x512)');

    // Generate 180x180 apple-touch-icon.png for iOS
    await sharp(appIconSvg)
      .resize(180, 180)
      .png()
      .toFile(path.join(process.cwd(), 'public/apple-touch-icon.png'));
    console.log('Generated public/apple-touch-icon.png (180x180)');

    // Generate 192x192 icon for manifest
    await sharp(appIconSvg)
      .resize(192, 192)
      .png()
      .toFile(path.join(process.cwd(), 'public/favicon-192.png'));
    console.log('Generated public/favicon-192.png (192x192)');

    // Generate teacher.png
    await sharp(teacherSvg)
      .resize(400, 500)
      .png()
      .toFile(path.join(process.cwd(), 'public/teacher.png'));
    console.log('Generated public/teacher.png (400x500)');

  } catch (err) {
    console.error('Error converting SVG to PNG:', err);
    process.exit(1);
  }
}

convert();
