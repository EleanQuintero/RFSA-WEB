import { defineConfig } from 'astro/config';
import clerk from "@clerk/astro";
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
            "process.env.CLERK_PUBLISHABLE_KEY": JSON.stringify(process.env.PUBLIC_CLERK_PUBLISHABLE_KEY),
            "process.env.CLERK_SECRET_KEY": JSON.stringify(process.env.CLERK_SECRET_KEY),
        },
        server: {
            allowedHosts: "pm9wci-ip-188-26-212-89.tunnelmole.net"
        }
    },
    srcDir: './src',
    outDir: './dist',
    base: '/',
    integrations: [react(), clerk()],
    session: {
        driver: 'redis',
        options: {
            url: process.env.REDIS_URL,
        },
    },
});