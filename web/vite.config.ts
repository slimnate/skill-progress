import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    root: path.resolve(__dirname),
    publicDir: path.resolve(__dirname, '../img'),
    plugins: [react()],
    server: {
        proxy: {
            '/progress': 'http://localhost:3000',
        },
    },
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
    },
});
