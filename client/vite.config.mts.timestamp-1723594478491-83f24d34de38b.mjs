// vite.config.mts
import AutoImport from "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/node_modules/.pnpm/unplugin-auto-import@0.17.8_@vueuse+core@10.11.1_vue@3.4.37_typescript@5.5.4___rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/node_modules/.pnpm/unplugin-vue-components@0.27.3_@babel+parser@7.25.3_rollup@2.79.1_vue@3.4.37_typescript@5.5.4_/node_modules/unplugin-vue-components/dist/vite.js";
import Fonts from "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/node_modules/.pnpm/unplugin-fonts@1.1.1_vite@5.4.0_@types+node@20.14.15_sass@1.77.6_terser@5.31.6_/node_modules/unplugin-fonts/dist/vite.mjs";
import Layouts from "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/node_modules/.pnpm/vite-plugin-vue-layouts@0.11.0_vite@5.4.0_@types+node@20.14.15_sass@1.77.6_terser@5.31.6__vue_w4g53ad4ks3qugx7ssjfjw4yqa/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Vue from "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/node_modules/.pnpm/@vitejs+plugin-vue@5.1.2_vite@5.4.0_@types+node@20.14.15_sass@1.77.6_terser@5.31.6__vue@3.4.37_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueRouter from "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/node_modules/.pnpm/unplugin-vue-router@0.10.2_rollup@2.79.1_vue-router@4.4.3_vue@3.4.37_typescript@5.5.4___vue@3.4.37_typescript@5.5.4_/node_modules/unplugin-vue-router/dist/vite.js";
import Vuetify, { transformAssetUrls } from "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/node_modules/.pnpm/vite-plugin-vuetify@2.0.4_vite@5.4.0_@types+node@20.14.15_sass@1.77.6_terser@5.31.6__vue@3.4._omqmv7b2c6ikyrfgy5zjmyhqcq/node_modules/vite-plugin-vuetify/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/node_modules/.pnpm/vite-plugin-pwa@0.20.1_vite@5.4.0_@types+node@20.14.15_sass@1.77.6_terser@5.31.6__workbox-bui_kyhgwdndn5nxm4knh62zu25rem/node_modules/vite-plugin-pwa/dist/index.js";
import { defineConfig } from "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/node_modules/.pnpm/vite@5.4.0_@types+node@20.14.15_sass@1.77.6_terser@5.31.6/node_modules/vite/dist/node/index.js";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///C:/Users/user/Desktop/Desktop/programming/stock-mangment-system/client/vite.config.mts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({
      dts: "src/typed-router.d.ts"
    }),
    Layouts(),
    AutoImport({
      imports: [
        "vue",
        {
          "vue-router/auto": ["useRoute", "useRouter"]
        }
      ],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true
      },
      vueTemplate: true
    }),
    Components({
      dts: "src/components.d.ts"
    }),
    Vue({
      template: { transformAssetUrls }
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss"
      }
    }),
    Fonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900"
          }
        ]
      }
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        navigateFallback: "/",
        cleanupOutdatedCaches: true,
        sourcemap: false,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => true,
            // Cache everything
            handler: "CacheFirst",
            options: {
              cacheName: "everything-cache",
              expiration: {
                maxEntries: 1e3,
                maxAgeSeconds: 60 * 60 * 24 * 365
                // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  },
  server: {
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXERlc2t0b3BcXFxccHJvZ3JhbW1pbmdcXFxcc3RvY2stbWFuZ21lbnQtc3lzdGVtXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXERlc2t0b3BcXFxccHJvZ3JhbW1pbmdcXFxcc3RvY2stbWFuZ21lbnQtc3lzdGVtXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3VzZXIvRGVza3RvcC9EZXNrdG9wL3Byb2dyYW1taW5nL3N0b2NrLW1hbmdtZW50LXN5c3RlbS9jbGllbnQvdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgRm9udHMgZnJvbSBcInVucGx1Z2luLWZvbnRzL3ZpdGVcIjtcbmltcG9ydCBMYXlvdXRzIGZyb20gXCJ2aXRlLXBsdWdpbi12dWUtbGF5b3V0c1wiO1xuaW1wb3J0IFZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgVnVlUm91dGVyIGZyb20gXCJ1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGVcIjtcbmltcG9ydCBWdWV0aWZ5LCB7IHRyYW5zZm9ybUFzc2V0VXJscyB9IGZyb20gXCJ2aXRlLXBsdWdpbi12dWV0aWZ5XCI7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZ1ZVJvdXRlcih7XG4gICAgICBkdHM6IFwic3JjL3R5cGVkLXJvdXRlci5kLnRzXCIsXG4gICAgfSksXG4gICAgTGF5b3V0cygpLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW1wb3J0czogW1xuICAgICAgICBcInZ1ZVwiLFxuICAgICAgICB7XG4gICAgICAgICAgXCJ2dWUtcm91dGVyL2F1dG9cIjogW1widXNlUm91dGVcIiwgXCJ1c2VSb3V0ZXJcIl0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgZHRzOiBcInNyYy9hdXRvLWltcG9ydHMuZC50c1wiLFxuICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGR0czogXCJzcmMvY29tcG9uZW50cy5kLnRzXCIsXG4gICAgfSksXG4gICAgVnVlKHtcbiAgICAgIHRlbXBsYXRlOiB7IHRyYW5zZm9ybUFzc2V0VXJscyB9LFxuICAgIH0pLFxuICAgIFZ1ZXRpZnkoe1xuICAgICAgYXV0b0ltcG9ydDogdHJ1ZSxcbiAgICAgIHN0eWxlczoge1xuICAgICAgICBjb25maWdGaWxlOiBcInNyYy9zdHlsZXMvc2V0dGluZ3Muc2Nzc1wiLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBGb250cyh7XG4gICAgICBnb29nbGU6IHtcbiAgICAgICAgZmFtaWxpZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIlJvYm90b1wiLFxuICAgICAgICAgICAgc3R5bGVzOiBcIndnaHRAMTAwOzMwMDs0MDA7NTAwOzcwMDs5MDBcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIG5hdmlnYXRlRmFsbGJhY2s6IFwiL1wiLFxuICAgICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZSxcbiAgICAgICAgc2tpcFdhaXRpbmc6IHRydWUsXG4gICAgICAgIHJ1bnRpbWVDYWNoaW5nOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdXJsUGF0dGVybjogKHsgdXJsIH0pID0+IHRydWUsIC8vIENhY2hlIGV2ZXJ5dGhpbmdcbiAgICAgICAgICAgIGhhbmRsZXI6IFwiQ2FjaGVGaXJzdFwiLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjYWNoZU5hbWU6IFwiZXZlcnl0aGluZy1jYWNoZVwiLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgbWF4RW50cmllczogMTAwMCxcbiAgICAgICAgICAgICAgICBtYXhBZ2VTZWNvbmRzOiA2MCAqIDYwICogMjQgKiAzNjUsIC8vIDEgeWVhclxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjYWNoZWFibGVSZXNwb25zZToge1xuICAgICAgICAgICAgICAgIHN0YXR1c2VzOiBbMCwgMjAwXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlZmluZTogeyBcInByb2Nlc3MuZW52XCI6IHt9IH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gICAgZXh0ZW5zaW9uczogW1wiLmpzXCIsIFwiLmpzb25cIiwgXCIuanN4XCIsIFwiLm1qc1wiLCBcIi50c1wiLCBcIi50c3hcIiwgXCIudnVlXCJdLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNaLE9BQU8sZ0JBQWdCO0FBQzdhLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZUFBZTtBQUN0QixPQUFPLFdBQVcsMEJBQTBCO0FBQzVDLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWUsV0FBVztBQVRpTyxJQUFNLDJDQUEyQztBQVlyVCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsTUFDUixLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsTUFDVCxTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxVQUNFLG1CQUFtQixDQUFDLFlBQVksV0FBVztBQUFBLFFBQzdDO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLFFBQ1IsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxNQUNGLFVBQVUsRUFBRSxtQkFBbUI7QUFBQSxJQUNqQyxDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixRQUFRO0FBQUEsUUFDTixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLE1BQ0osUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQ1I7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFFBQVE7QUFBQSxVQUNWO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLFNBQVM7QUFBQSxRQUNQLGtCQUFrQjtBQUFBLFFBQ2xCLHVCQUF1QjtBQUFBLFFBQ3ZCLFdBQVc7QUFBQSxRQUNYLGNBQWM7QUFBQSxRQUNkLGFBQWE7QUFBQSxRQUNiLGdCQUFnQjtBQUFBLFVBQ2Q7QUFBQSxZQUNFLFlBQVksQ0FBQyxFQUFFLElBQUksTUFBTTtBQUFBO0FBQUEsWUFDekIsU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1AsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNWLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSyxLQUFLO0FBQUE7QUFBQSxjQUNoQztBQUFBLGNBQ0EsbUJBQW1CO0FBQUEsZ0JBQ2pCLFVBQVUsQ0FBQyxHQUFHLEdBQUc7QUFBQSxjQUNuQjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRLEVBQUUsZUFBZSxDQUFDLEVBQUU7QUFBQSxFQUM1QixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsSUFDQSxZQUFZLENBQUMsT0FBTyxTQUFTLFFBQVEsUUFBUSxPQUFPLFFBQVEsTUFBTTtBQUFBLEVBQ3BFO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
