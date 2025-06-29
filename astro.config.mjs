import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'
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
        server: {
            allowedHosts:"p0jjic-ip-79-116-216-9.tunnelmole.net"
        }
    },
    srcDir: './src',
    outDir: './dist',
    base: '/',
    integrations: [react()],
    session: {
        driver: 'redis',
        options: {
          url: process.env.REDIS_URL,
        },
      },
});