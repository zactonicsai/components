import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    // Plugin Configuration
    plugins: [
      react({
        // Enable React Fast Refresh
        fastRefresh: true,
        // Include .tsx files
        include: "**/*.tsx",
        // Babel configuration for better JSX transform
        babel: {
          plugins: [
            // Add any babel plugins you need for development
            ...(mode === 'development' ? [] : []),
          ],
        },
      }),
      
      // Bundle analyzer for production builds (run with npm run build:analyze)
      ...(mode === 'analyze' 
        ? [visualizer({ 
            filename: 'dist/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
            template: 'treemap' // or 'sunburst', 'network'
          })] 
        : []),
    ],

    // Development Server Configuration
    server: {
      port: 3000,
      host: true, // Listen on all addresses (0.0.0.0)
      open: true, // Auto-open browser
      cors: true,
      strictPort: false, // Try next available port if 3000 is taken
      
      // Proxy configuration for API calls
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      
      // HMR configuration
      hmr: {
        overlay: true, // Show error overlay in browser
      },
      
      // Watch options for better performance
      watch: {
        usePolling: true, // Enable if running in Docker/WSL
        ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
      },
    },

    // Preview Server Configuration (for production builds)
    preview: {
      port: 4173,
      host: true,
      cors: true,
      strictPort: false,
    },

    // Path Resolution & Aliases
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@pages': resolve(__dirname, './src/pages'),
        '@utils': resolve(__dirname, './src/utils'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@services': resolve(__dirname, './src/services'),
        '@store': resolve(__dirname, './src/store'),
        '@types': resolve(__dirname, './src/types'),
        '@assets': resolve(__dirname, './src/assets'),
        '@styles': resolve(__dirname, './src/styles'),
        '@config': resolve(__dirname, './src/config'),
        '@constants': resolve(__dirname, './src/constants'),
        '@lib': resolve(__dirname, './src/lib'),
        '@context': resolve(__dirname, './src/context'),
        '@api': resolve(__dirname, './src/api'),
      },
    },

    // CSS Configuration
    css: {
      devSourcemap: true, // Enable CSS source maps in development
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@styles/variables.scss";`,
        },
      },
      modules: {
        // CSS Modules configuration
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
        generateScopedName: mode === 'development' 
          ? '[name]__[local]--[hash:base64:5]'
          : '[hash:base64:8]',
      },
    },

    // Build Configuration
    build: {
      // Output directory
      outDir: 'dist',
      // Generate source maps for production (optional)
      sourcemap: mode === 'development' ? true : false,
      // Minification
      minify: 'terser',
      // Target browsers
      target: 'esnext',
      // Asset handling
      assetsDir: 'assets',
      assetsInlineLimit: 4096, // 4kb
      
      // Rollup options
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          // Manual chunks for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@mui/material', 'antd'], // Replace with your UI library
          },
          // Asset file names
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const extType = info[info.length - 1]
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
              return `assets/images/[name].[hash][extname]`
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `assets/fonts/[name].[hash][extname]`
            }
            if (extType === 'css') {
              return `assets/css/[name].[hash][extname]`
            }
            return `assets/[ext]/[name].[hash][extname]`
          },
          // Chunk file names
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
        },
      },
      
      // Terser options for minification
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // Remove console.log in production
          drop_debugger: true,
        },
        mangle: true,
      },
      
      // Report compressed file sizes
      reportCompressedSize: true,
      
      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },

    // Environment Variables
    define: {
      // Make env variables available to the app
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    // Dependency Optimization
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        '@emotion/react',
        '@emotion/styled',
      ],
      exclude: [
        // Exclude packages that should not be pre-bundled
      ],
      // Force optimization of specific dependencies
      force: mode === 'development',
    },

    // Performance and Caching
    esbuild: {
      // Drop console and debugger in production
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      // JSX configuration
      jsxDev: mode === 'development',
    },

    // Test Configuration (Vitest)
    test: {
      globals: true,
      environment: 'jsdom',
     // setupFiles: ['./src/test/setup.ts'],
      css: true,
      reporters: ['verbose'],
       exclude: [
      // Default excludes
      'node_modules',
      'dist',
      '.git',
      '.cache',
      
      // Exclude Playwright test directories
      'ui-tx/**'
       ],
      coverage: {
        reporter: ['text', 'json', 'html'],
        exclude: [
          'ui-tests/',
          'node_modules/',
          'src/test/',
          '**/*.d.ts',
          '**/*.config.*',
          'dist/',
          'coverage/',
        ],
      },
      // Playwright integration
      testTimeout: 10000,
      hookTimeout: 10000,
    },

    // Worker Configuration
    worker: {
      format: 'es',
    },

    // Experimental features
    experimental: {
      // Enable if using React 18 features
      renderBuiltUrl(filename) {
        return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
      },
    },
  }
})