// 左右欄收合按鈕（B 方案）
// 點左上／右上角的按鈕拉出側欄；再點一次、點旁邊空白處或按 Esc 就收起來，換頁時也會自動收起來。
// 外觀設定在 quartz/styles/custom.scss 的「左右欄收合」段落。
;(function () {
  if (window.__sidebarToggleReady) return
  window.__sidebarToggleReady = true

  const root = document.documentElement
  const icons = {
    left: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>',
    right: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/></svg>',
  }
  const labels = { left: "開關左側欄", right: "開關右側欄" }
  // 螢幕不夠寬時，一次只開一邊
  const narrow = window.matchMedia("(max-width: 1199px)")

  const isOpen = (side) => root.getAttribute("data-sidebar-" + side) === "open"
  const setOpen = (side, open) => {
    if (open) root.setAttribute("data-sidebar-" + side, "open")
    else root.removeAttribute("data-sidebar-" + side)
  }
  const closeAll = () => {
    setOpen("left", false)
    setOpen("right", false)
  }
  const toggle = (side) => {
    const open = !isOpen(side)
    if (open && narrow.matches) closeAll()
    setOpen(side, open)
  }
  const addButtons = () => {
    for (const side of ["left", "right"]) {
      if (document.querySelector(".sidebar-toggle." + side)) continue
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className = "sidebar-toggle " + side
      btn.title = labels[side]
      btn.setAttribute("aria-label", labels[side])
      btn.innerHTML = icons[side]
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        toggle(side)
      })
      document.body.appendChild(btn)
    }
  }

  document.addEventListener("click", (e) => {
    const t = e.target
    if (t instanceof Element && t.closest(".sidebar, .sidebar-toggle")) return
    closeAll()
  })
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll()
  })
  document.addEventListener("nav", () => {
    closeAll()
    addButtons()
  })
  addButtons()
})()
