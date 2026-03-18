"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const AuroraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: any
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Setup scene, camera, renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x0f0f0f, 1)
    container.appendChild(renderer.domElement)

    // Vertex shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    // Fragment shader with ATSlay Aurora colors
    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      
      // Simplex noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Create flowing aurora-like patterns
        float flow1 = snoise(vec2(uv.x * 2.0 + time * 0.1, uv.y * 0.5 + time * 0.05));
        float flow2 = snoise(vec2(uv.x * 1.5 + time * 0.08, uv.y * 0.8 + time * 0.03));
        float flow3 = snoise(vec2(uv.x * 3.0 + time * 0.12, uv.y * 0.3 + time * 0.07));
        
        // Create streaky patterns
        float streaks = sin((uv.x + flow1 * 0.3) * 8.0 + time * 0.2) * 0.5 + 0.5;
        streaks *= sin((uv.y + flow2 * 0.2) * 12.0 + time * 0.15) * 0.5 + 0.5;
        
        // Combine flows for aurora effect
        float aurora = (flow1 + flow2 + flow3) * 0.33 + 0.5;
        aurora = pow(aurora, 2.0);
        
        // ATSlay Colors
        vec3 darkBg = vec3(0.05, 0.05, 0.07);          // #0F0F0F
        vec3 darkCyan = vec3(0.0, 0.1, 0.15);
        vec3 cyan = vec3(0.0, 0.85, 1.0);              // #00D9FF
        vec3 brightCyan = vec3(0.2, 0.9, 1.0);
        vec3 lime = vec3(0.0, 1.0, 0.53);              // #00FF88
        vec3 accentGreen = vec3(0.0, 0.8, 0.6);
        
        // Create flowing color transitions
        vec3 color = darkBg;
        
        // Add dark cyan base
        float cyanBaseFlow = smoothstep(0.2, 0.6, aurora + streaks * 0.2);
        color = mix(color, darkCyan, cyanBaseFlow);
        
        // Add cyan highlights
        float cyanFlow = smoothstep(0.5, 0.85, aurora + flow1 * 0.4);
        color = mix(color, cyan, cyanFlow * 0.8);
        
        // Add bright cyan streaks (main accent)
        float brightFlow = smoothstep(0.75, 1.0, streaks + aurora * 0.5);
        color = mix(color, brightCyan, brightFlow * 0.9);
        
        // Add lime green accents
        float limeFlow = smoothstep(0.6, 0.95, flow3 + streaks * 0.3);
        color = mix(color, lime, limeFlow * 0.6);
        
        // Add subtle green accents
        float greenAccent = smoothstep(0.7, 1.0, flow2 + aurora * 0.4);
        color = mix(color, accentGreen, greenAccent * 0.4);
        
        // Add subtle noise texture
        float noise = snoise(uv * 100.0) * 0.02;
        color += noise;
        
        // Enhance brightness for better visibility
        color = pow(color, vec3(0.95));
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Create geometry and material
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Handle resize
    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      uniforms.resolution.value.set(width, height)
    }

    window.addEventListener('resize', onWindowResize)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.01
      renderer.render(scene, camera)
    }

    sceneRef.current = {
      scene,
      renderer,
      uniforms,
      animationId: 0
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize)
      cancelAnimationFrame(animationId)
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen"
      style={{
        background: '#0f0f0f',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    />
  )
}