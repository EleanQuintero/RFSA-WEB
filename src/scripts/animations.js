import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

let isInitialized = false
let refreshTimer = null

// Función para inicializar la configuración global de ScrollTrigger y ScrollSmoother
export function initAnimations() {
  if (isInitialized) { return }

  // Configuración global de ScrollTrigger
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
  })

  // ScrollSmoother crea un scroll suave que se integra con ScrollTrigger
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true,
    normalizeScroll: true,
  })

  isInitialized = true
}

// Llamar a esto en vez de ScrollTrigger.refresh() directamente.
// Agrupa múltiples llamadas en un solo refresh diferido para evitar race conditions.
export function deferredRefresh() {
  if (refreshTimer) { clearTimeout(refreshTimer) }
  refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh()
    refreshTimer = null
  }, 100)
} 