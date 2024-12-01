const fs = require('fs');
const { exec } = require('child_process');

function createTimelapse(inputDir) {
    const outputFile = `${inputDir}/timelapse.mp4`;

    if (!fs.existsSync(inputDir)) {
        console.error(`Directory ${inputDir} does not exist.`);
        process.exit(1);
    }

    const command = `ffmpeg -y -framerate 1 -pattern_type glob -i '${inputDir}/screenshot_*.png' -c:v libx264 -r 30 -pix_fmt yuv420p ${outputFile}`;

    console.log("Running", command);

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

const inputDir = args[0];
createTimelapse(inputDir);
