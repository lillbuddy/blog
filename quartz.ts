import { readFileSync } from "fs"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"

// 自訂顯示條件：只在首頁顯示（quartz.config.yaml 的「最新文章」用 condition: index）
registerCondition("index", (props) => props.fileData.slug === "index")

const config = await loadQuartzConfig()

// 自訂：左右欄收合按鈕（程式在 custom/sidebar-toggle.js，外觀在 quartz/styles/custom.scss）
config.plugins.transformers.push({
  name: "SidebarToggle",
  externalResources: () => ({
    js: [
      {
        loadTime: "afterDOMReady" as const,
        contentType: "inline" as const,
        script: readFileSync("custom/sidebar-toggle.js", "utf-8"),
      },
    ],
  }),
})

export default config
export const layout = await loadQuartzLayout()
