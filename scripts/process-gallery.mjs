import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../public/noi that nhua');
const outputDir = path.resolve(__dirname, '../public/gallery');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to generate SVG watermark
const getWatermarkSvg = (width, height) => {
  // We make the SVG size match the image
  // Text should be roughly proportional, e.g., 5% of height or minimal 30px
  const fontSize = Math.max(30, Math.floor(Math.min(width, height) * 0.05));
  
  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <style>
        .watermark {
          fill: rgba(255, 255, 255, 0.5);
          font-size: ${fontSize}px;
          font-weight: bold;
          font-family: Arial, sans-serif;
        }
      </style>
      <!-- Draw text multiple times with slight offset to create a very basic text-shadow if sharp doesn't render CSS shadow well -->
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="watermark" fill="rgba(0,0,0,0.5)" dx="2" dy="2">Nội Thất Huy Hoàng</text>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="watermark">Nội Thất Huy Hoàng</text>
    </svg>
  `);
};

async function processImages() {
  try {
    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    console.log(`Found ${imageFiles.length} images to process.`);

    let processedCount = 0;

    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const inputPath = path.join(inputDir, file);
        const outputFilename = `gallery-${i + 1}.webp`;
        const outputPath = path.join(outputDir, outputFilename);

        // First pass: Resize to max width 1600px but keep original if it's smaller.
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        let targetWidth = metadata.width;
        let targetHeight = metadata.height;

        if (targetWidth > 1600) {
            targetHeight = Math.round(targetHeight * (1600 / targetWidth));
            targetWidth = 1600;
        }

        const watermark = getWatermarkSvg(targetWidth, targetHeight);

        await image
            .resize({ width: 1600, withoutEnlargement: true })
            .composite([{ input: watermark, gravity: 'center' }])
            .webp({ quality: 80, effort: 6 })
            .toFile(outputPath);

        processedCount++;
        console.log(`Processed ${processedCount}/${imageFiles.length}: ${file} -> ${outputFilename}`);
    }

    console.log('All images processed successfully!');

  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
