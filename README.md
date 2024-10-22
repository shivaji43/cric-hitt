# React Project

This is a React project using JavaScript and Supabase.

## Prerequisites

- Node.js (version 12 or higher)
- npm (comes with Node.js)

## Environment Setup

Change the`.env.example` file to `.env` and update your supabase keys:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Note: These environment variables are already set up in the project. You do not need to add or modify them unless instructed otherwise.

## Installation

1. Navigate to the project directory:
   ```
   cd [project-name]
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the App

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and visit `http://localhost:5173` (or the port specified in the console output).

3. **Important Note**: This project contains many videos. Initial rendering may take some time depending on your system's performance and internet speed. Please be patient while the content loads.

## Additional Information

- This project uses Vite as the build tool.
- Supabase is used as the backend service. The Supabase URL and anonymous key are already provided in the `.env` file.
- The application includes numerous video elements, which may impact initial load times and performance.

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly.
2. Verify that the `.env` file exists and contains the correct Supabase credentials (these should be pre-provided).
3. Check the console for any error messages.
4. If videos are not loading or playing correctly, check your internet connection and ensure your browser is up to date.

For more help, please refer to the [Vite documentation](https://vitejs.dev/guide/) [Supabase documentation](https://supabase.io/docs)
