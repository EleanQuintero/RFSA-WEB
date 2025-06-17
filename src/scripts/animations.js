import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

// Timeline maestra para coordinar todas las animaciones
const masterTl = gsap.timeline({
  paused: true // La timeline maestra comienza pausada
})

let isInitialized = false

// Función para inicializar todas las animaciones
export function initAnimations() {
  if (isInitialized) { return }

  
  // Aseguramos que las animaciones se ejecuten en el orden correcto
  ScrollTrigger.getAll().forEach(trigger => {
    trigger.kill()
  })

  // Configuración global de ScrollTrigger
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
  })

  // Aseguramos que las animaciones se reinicien correctamente
  ScrollTrigger.refresh()

  // Iniciamos la timeline maestra
  masterTl.play()
  
  isInitialized = true
}

// Exportamos la timeline maestra para poder usarla en otros componentes
export { masterTl } 