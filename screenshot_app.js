const { chromium } = require('playwright');
const fs = require('fs');

async function takeScreenshot(url, outputFile) {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: outputFile });
    await browser.close();
}

async function main() {
    const url = 'https://prezenta.roaep.ro/parlamentare01122024/pv/romania/results';
    while (true) {
        const timestamp = Date.now();
        const outputFile = `screenshot_${timestamp}.png`;
        await takeScreenshot(url, outputFile);
        console.log(`Screenshot saved to ${outputFile}`);
        await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 1 minute
    }
}

main();
