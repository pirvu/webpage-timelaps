const fs = require('fs');
const { spawn } = require('child_process');

function createTimelapse(inputDir) {
    const outputFile = `${inputDir}/timelapse.mp4`;

    if (!fs.existsSync(inputDir)) {
        console.error(`Directory ${inputDir} does not exist.`);
        process.exit(1);
    }

    const command = `ffmpeg -y -framerate 1 -pattern_type glob -i '${inputDir}/screenshot_*.png' -c:v libx264 -r 30 -pix_fmt yuv420p ${outputFile}`;

    console.log("Running", command);

    const ffmpegProcess = spawn('ffmpeg', ['-y', '-framerate', '1', '-pattern_type', 'glob', '-i', `${inputDir}/screenshot_*.png`, '-c:v', 'libx264', '-r', '30', '-pix_fmt', 'yuv420p', outputFile]);

    ffmpegProcess.stdout.on('data', (data) => {
        console.log(`FFmpeg stdout: ${data}`);
    });

    ffmpegProcess.stderr.on('data', (data) => {
        console.error(`FFmpeg stderr: ${data}`);
    });

    ffmpegProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`FFmpeg process exited with code ${code}`);
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
