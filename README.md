# Sales Aggregator

A full-stack sales CSV processing application.

This project provides a React frontend and an Express/TypeScript backend that lets users upload a CSV file containing sales data, aggregates total sales by department, and returns a downloadable CSV with the aggregated results.

## Project Structure

- `backend/` - Express API server using TypeScript.
  - `src/app.ts` - Express app configuration.
  - `src/server.ts` - Server entry point.
  - `src/routes/uploadRoutes.ts` - CSV upload route.
  - `src/routes/downloadRoutes.ts` - Download route for generated files.
  - `src/controllers/uploadController.ts` - Handles upload processing.
  - `src/services/csvProcessor.ts` - Aggregates CSV sales by department.
  - `src/utils/multer.ts` - File upload handling and CSV validation.
  - `uploads/` - Temporary uploaded CSV files.
  - `outputs/` - Generated aggregated CSV files.

- `frontend/` - React + Vite application.
  - `src/App.tsx` - Main app wrapper.
  - `src/components/CSVUploader.tsx` - CSV upload UI and download link.
  - `src/index.css` - Base styles.

## Features

- Upload `.csv` sales files from the browser.
- Aggregate sales totals for each department.
- Generate a new CSV file containing department totals.
- Provide a download link to retrieve the processed CSV.
- Includes a simple health check endpoint for the backend.

## Prerequisites

- Node.js installed (recommended v18 or later)
- npm available in your terminal

## Setup

Install dependencies for both backend and frontend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running Locally

Start the backend server:

```bash
cd backend
npm run dev
```

Start the frontend app in a separate terminal:

```bash
cd frontend
npm run dev
```

By default, the frontend runs with Vite and the backend listens on `http://localhost:4000`.

## Usage

1. Open the frontend URL shown by Vite in your browser.
2. Select a CSV file using the upload form.
3. Click `Upload CSV`.
4. Once processing completes, click the download button to retrieve the aggregated CSV file.

## Backend API

- `POST /upload`
  - Expects a multipart form upload field named `file`.
  - Accepts only `.csv` files.
  - Returns a JSON response with a downloadable file path and processing metrics.

- `GET /download/:fileName`
  - Downloads the aggregated CSV file from the server `outputs/` folder.

- `GET /health`
  - Returns `{ status: "OK" }`.

## Notes

- Uploaded files are stored in `backend/uploads/`.
- Processed output files are stored in `backend/outputs/`.
- The frontend currently points to `http://localhost:4000/upload` for uploads.

## Git

Add this file to your repository and commit it before pushing.

```bash
git add README.md
git commit -m "Add repository README"
git push
```
