# Wave Function Collapse Map Generator

This project is a React application that demonstrates a simple map generator based on the Wave Function Collapse (WFC) algorithm. It allows you to upload custom tiles, define how tiles connect to each other and generate a random map that can be saved as an image or JSON file.

## Features

- Upload your own tiles to create custom map pieces.
- Set adjacency rules for tiles (up, down, left, right).
- Generate a map step‑by‑step or run a quick generation.
- Save the resulting map as a PNG image or export the data to JSON.

## Getting Started

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:5173` by default.

3. To create a production build, run:

   ```bash
   npm run build
   ```

4. To run the linter:

   ```bash
   npm run lint
   ```

## Project Structure

- `src/components` – reusable React components and UI elements.
- `src/pages` – application pages (`Home`, `Tiles`, `Generate`).
- `src/utils` – helper utilities including the WFC implementation (`waveCollapse.js`).
- `src/redux` – Redux slices and store configuration.

## License

This project is provided for educational purposes and does not include a specific license.
