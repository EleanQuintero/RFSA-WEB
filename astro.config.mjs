import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel({
        outputDirectory: 'dist'
    }),
    vite: {
        plugins: [tailwindcss()],
        define: {
            // Esto es necesario para que las variables de entorno estén disponibles en Vercel
            "process.env.UPSTASH_REDIS_REST_URL": JSON.stringify(process.env.UPSTASH_REDIS_REST_URL),
            "process.env.UPSTASH_REDIS_REST_TOKEN": JSON.stringify(process.env.UPSTASH_REDIS_REST_TOKEN),
        },
    },
    srcDir: './src',
    outDir: './dist',
    base: '/',
    integrations: [react()],
    session: {
        // Configuración para usar Redis como almacenamiento de sesiones
        driver: 'redis',
        options: {
            // Estas variables se configurarán automáticamente si usas la integración de Upstash con Vercel
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        },
    },
});