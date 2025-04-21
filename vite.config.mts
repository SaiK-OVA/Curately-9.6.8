import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// import { randomUUID } from 'crypto';
// import { analyzer } from 'vite-bundle-analyzer'
// import compression from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig (({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const appVersion = env.VITE_APP_VERSION;
    // const rui = randomUUID();
    return {
        plugins: [
            react(),
            // manifestSRI({ algorithms: ['sha384', 'sha512', "sha256"] }),
            // {
            //     name: 'configure-response-headers',
            //     configureServer: (server) => {
            //         server.middlewares.use((_req, res, next) => {
            //             res.setHeader('Access-Control-Allow-Origin', '*');
            //             res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
            //             res.setHeader('X-Content-Type-Options', 'nosniff');
            //             res.setHeader('Permissions-Policy', 'camera=(), microphone=()');
            //             res.setHeader('Cache-Control', 'public, max-age=31536000');
            //             // res.setHeader('Content-Security-Policy', "'*'");
            //             res.setHeader('X-Frame-Options', 'DENY');
            //             next();
            //         });
            //     },
            // }
            //    hsts()

            // analyzer({
            //     analyzerMode: 'static'
            // }),
            // compression({
            //     algorithm: 'gzip', exclude: [/\.(br)$ /, /\.(gz)$/]
            // }),
            // compression({
            //     algorithm: 'brotliCompress', exclude: [/\.(br)$ /, /\.(gz)$/],
            // }),
        ],
        base: "./",
        // root:"../curatelyadmin",
        build: {
            emptyOutDir: true,
            outDir: './curately',
            rollupOptions: {
                // input: path.resolve(__dirname, 'src/index.html'),
                output: {
                    assetFileNames: (assetInfo: { name: any }) => {
                        let extType = assetInfo.name!.split('.').at(1)
                        if (/png|jpe?g|webp/i.test(extType)) {
                            extType = 'img'
                        }
                        if (extType === "css") {
                            return `${appVersion}/${extType}/[hash][extname]`
                        }
                        return `${appVersion}/assets/${extType}/[hash][extname]`
                    },
                    chunkFileNames: `${appVersion}/js/[hash].js`,
                    entryFileNames: `${appVersion}/js/[hash].js`,
                    // entryFileNames: `${appVersion}/js/[name]-[hash].js`,
                },
            },
            minify: 'esbuild',
        },
        esbuild: {
            drop: ['debugger']
        },
        server: {
            // this ensures that the browser opens upon server start
            open: true,
            // this sets a default port to 3000  
            port: 3002,
            hmr: true,
            // headers: {
            //     "access-control-allow-origin": "*",
            //     "Strict-Transport-Security": "max-age=86400; includeSubDomains",
            //     "content-security-policy": ""
            // }         
        },
        test: {
           
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/test/setup.ts',
            coverage: {
                reporter: ['text', 'html'],
              },
            
          },
    }})




