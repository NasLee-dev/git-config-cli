import { resolve } from 'path'
import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: "GitConfigManager",
      fileName: (format) => `git-config-manager.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['simple-git'],
      output: {
        globals: {
          'simple-git': 'simpleGit'
        }
      }
    }
  },
  plugins: [typescript()]
});

