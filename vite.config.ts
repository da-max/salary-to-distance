import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/salary-to-distance/',
    plugins: [react()],
    test: {
        coverage: {
            reporter: ['text-summary', 'cobertura'],
        },
        mockReset: true,
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        // you might want to disable it, if you don't have tests that rely on CSS
        // since parsing CSS is slow
        css: true,
    },
})
