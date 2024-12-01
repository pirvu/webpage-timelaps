const { chromium } = require('playwright');
const fs = require('fs');
const sharp = require('sharp');

async function takeScreenshot(url, outputFile) {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    const buffer = await page.screenshot();
    const timestamp = new Date().toLocaleString();
    await sharp(buffer)
        .composite([{
            input: Buffer.from(
                `<svg>
                    <text x="50%" y="30" font-size="24" fill="black" stroke="black" stroke-width="1" text-anchor="middle">${timestamp}</text>
                </svg>`
            ),
            height: 100,
            gravity: 'north'
        }])
        .toFile(outputFile);
    await browser.close();
}

function sanitizeUrl(url) {
    return url.replace(/https?:\/\//, '').replace(/[\/:]/g, '_');
}

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error('Please provide a URL as an argument.');
        process.exit(1);
    }
    const url = args[0];
    const sanitizedUrl = sanitizeUrl(url);
    const outputDir = `out/${sanitizedUrl}`;
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    while (true) {
        const timestamp = Date.now();
        const outputFile = `${outputDir}/screenshot_${timestamp}.png`;
        await takeScreenshot(url, outputFile);
        console.log(`Screenshot saved to ${outputFile}`);
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute
    }
}

main();
