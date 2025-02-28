import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({

    vite: {
        plugins: [tailwindcss()],
    },
    srcDir: './src',
    outDir: './dist',
    base: '/',
    integrations: [
        // tus integraciones aquí
    ],
});
