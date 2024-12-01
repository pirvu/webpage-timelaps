# Screenshot App

This application takes a screenshot of a specified web page every minute using Node.js and Playwright. The screenshots are saved in a directory structure based on the URL.

## Prerequisites

- Node.js installed on your system
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

## Notes

- Ensure that the URL is accessible and correct.
- The application will continue to take screenshots every minute until stopped.
