import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
const { version } = require("./package.json")

const projectRoot = __dirname

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),

      mkcert(),
      
      VitePWA({
        registerType: "autoUpdate",
        manifest: false,
        devOptions: {
          enabled: true,
          type: 'module'
        },
        includeAssets: [
          "apple-touch-icon.png", 
          "favicon-32x32.png", 
          "favicon-16x16.png", 
          "safari-pinned-tab.svg"
        ]
      })
    ],
    server: {
      //host: "0.0.0.0"
      port: 3000,
      host: true,
      https: true,
      hmr: {
        overlay: true,    // 错误遮罩
        timeout: 5000,    // 重新连接超时时间
      },
      watch: {
        usePolling: true  // 在某些系统中需要这个来提高文件变化检测的可靠性
      }
    },
    resolve: {
      alias: {
        "@": resolve(projectRoot, "src"),
      }
    },
    define: {
      "PT_ENV": {
        "version": version,
        "client": "web"
      }
    }
  }
})
