# Screenshot App

This application takes a screenshot of a specified web page every minute using Node.js and Playwright. The screenshots are saved in a directory structure based on the URL.

## Prerequisites

- Node.js installed on your system
- FFmpeg installed and available in your system's PATH
- Playwright installed as a dependency

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.

## Usage

To start the application, run the following command:

```bash
npm start -- <URL>
```

Replace `<URL>` with the desired web page URL you want to capture. For example:

```bash
npm start -- https://example.com
```

The screenshots will be saved in the `out/` directory, organized by the sanitized URL.

## Timelapse Creation

This application also includes a script to create a timelapse video from the screenshots taken by the Screenshot App.

### Usage

To create a timelapse video, run the following command:

```bash
node timelapse_creator.js <directory>
```

Replace `<directory>` with the path to the directory containing the screenshots. For example:

```bash
node timelapse_creator.js out/example_com
```

The timelapse video will be saved in the same directory as `timelapse.mp4`.

### Notes

- Ensure that the directory contains screenshots in the format `screenshot_<timestamp>.png`.
- The script uses `ffmpeg` to create the video, so make sure `ffmpeg` is installed and available in your system's PATH.

- Ensure that the URL is accessible and correct.
- The application will continue to take screenshots every minute until stopped.
