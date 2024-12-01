const fs = require('fs');
const { exec } = require('child_process');

function sanitizeUrl(url) {
    return url.replace(/https?:\/\//, '').replace(/[\/:]/g, '_');
}

function createTimelapse(url) {
    const sanitizedUrl = sanitizeUrl(url);
    const inputDir = `out/${sanitizedUrl}`;
    const outputFile = `out/${sanitizedUrl}/timelapse.mp4`;

    if (!fs.existsSync(inputDir)) {
        console.error(`Directory ${inputDir} does not exist.`);
        process.exit(1);
    }

    const command = `ffmpeg -framerate 1 -pattern_type glob -i '${inputDir}/screenshot_*.png' -c:v libx264 -r 30 -pix_fmt yuv420p ${outputFile}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error creating timelapse: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`FFmpeg stderr: ${stderr}`);
            return;
        }
        console.log(`Timelapse created at ${outputFile}`);
    });
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Please provide a URL as an argument.');
    process.exit(1);
}

const url = args[0];
createTimelapse(url);
