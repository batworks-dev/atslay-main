"use client"

import { useState, useRef, useEffect } from "react"
import { Chrome, ArrowLeft, Sparkles, Shield, Lock, Zap, Star } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


// NeonCrystalCity Component
const vsSource = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fsSource = `#version 300 es
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_mouse;
uniform float u_cameraSpeed;
uniform float u_tileSize;
uniform float u_unionK;
uniform int   u_maxSteps;
uniform float u_maxDist;
uniform float u_surfDist;

out vec4 fragColor;

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float opSmoothUnion(float d1, float d2, float k) {
  float h = clamp(0.5 + 0.5*(d2 - d1)/k, 0.0, 1.0);
  return mix(d2, d1, h) - k*h*(1.0 - h);
}

float getDist(vec3 p) {
  vec2 id = floor(p.xz / u_tileSize);
  p.xz = mod(p.xz, u_tileSize) - u_tileSize*0.5;

  float n = fract(sin(dot(id, vec2(12.9898,78.233))) * 43758.5453);
  float h = 1.0 + n * 4.0;
  float b = sdBox(p - vec3(0.0, h - 1.0, 0.0),
                  vec3(0.4, h, 0.4));

  if (n > 0.8) {
    float s = length(p - vec3(0.0, h*2.0, 0.0)) - 0.5;
    b = opSmoothUnion(b, s, u_unionK);
  }

  float ground = p.y + 1.0;
  return min(b, ground);
}

float rayMarch(vec3 ro, vec3 rd) {
  float dist = 0.0;
  for (int i = 0; i < u_maxSteps; i++) {
    vec3 pos = ro + rd * dist;
    float dS = getDist(pos);
    dist += dS;
    if (dist > u_maxDist || abs(dS) < u_surfDist) break;
  }
  return dist;
}

vec3 getNormal(vec3 p) {
  vec2 e = vec2(u_surfDist, 0.0);
  return normalize(vec3(
    getDist(p + e.xyy) - getDist(p - e.xyy),
    getDist(p + e.yxy) - getDist(p - e.yxy),
    getDist(p + e.yyx) - getDist(p - e.yyx)
  ));
}

vec3 palette(float t) {
  vec3 a = vec3(0.5);
  vec3 b = vec3(0.5);
  vec3 c = vec3(1.0,1.0,0.5);
  vec3 d = vec3(0.8,0.9,0.3);
  return a + b * cos(6.28318 * (c*t + d));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;

  vec3 ro = vec3(0.0, 0.0, u_time * u_cameraSpeed);
  vec3 rd = normalize(vec3(uv, 1.0));

  float mx = (u_mouse.x / u_resolution.x - 0.5) * 3.14;
  float my = (u_mouse.y / u_resolution.y - 0.5) * 1.5;
  mat3 rotX = mat3(
    1, 0, 0,
    0, cos(my), -sin(my),
    0, sin(my), cos(my)
  );
  mat3 rotY = mat3(
    cos(mx), 0, sin(mx),
    0, 1, 0,
    -sin(mx),0, cos(mx)
  );
  rd = rotY * rotX * rd;

  float dist = rayMarch(ro, rd);
  vec3 col = vec3(0.0);

  if (dist < u_maxDist) {
    vec3 p = ro + rd * dist;
    float idSeed = floor(p.xz / u_tileSize).x * 157.0
                 + floor(p.xz / u_tileSize).y * 311.0;
    float n = fract(sin(idSeed) * 43758.5453);

    float lines = abs(fract(p.y * 2.0) - 0.5);
    float glow  = pow(0.01 / lines, 1.5);
    col += palette(n + u_time * 0.1) * glow;
  }

  col = mix(col, vec3(0.0, 0.0, 0.05),
            smoothstep(0.0, u_maxDist * 0.7, dist));

  fragColor = vec4(col, 1.0);
}
`;

function NeonCrystalCity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameId = useRef<number>();
  const mouse = useRef({ x: 0, y: 0 });
  const start = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    if (!gl) return;

    const compileShader = (type: GLenum, src: string): WebGLShader | null => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const posLoc = gl.getAttribLocation(prog, "a_position");
    const resLoc = gl.getUniformLocation(prog, "u_resolution")!;
    const timeLoc = gl.getUniformLocation(prog, "u_time")!;
    const mouseLoc = gl.getUniformLocation(prog, "u_mouse")!;
    const speedLoc = gl.getUniformLocation(prog, "u_cameraSpeed")!;
    const tileLoc = gl.getUniformLocation(prog, "u_tileSize")!;
    const unionLoc = gl.getUniformLocation(prog, "u_unionK")!;
    const stepsLoc = gl.getUniformLocation(prog, "u_maxSteps")!;
    const maxLoc = gl.getUniformLocation(prog, "u_maxDist")!;
    const surfLoc = gl.getUniformLocation(prog, "u_surfDist")!;

    const quadBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);

      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const now = (Date.now() - start.current) * 0.001;
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, now);
      gl.uniform2f(mouseLoc, mouse.current.x, mouse.current.y);
      gl.uniform1f(speedLoc, 5);
      gl.uniform1f(tileLoc, 2);
      gl.uniform1f(unionLoc, 0.5);
      gl.uniform1i(stepsLoc, 100);
      gl.uniform1f(maxLoc, 100);
      gl.uniform1f(surfLoc, 0.001);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId.current = requestAnimationFrame(render);
    };
    frameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId.current!);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// Login Page Component
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect to marketplace if already authenticated
  useEffect(() => {
    if (session) {
      router.push("/marketplace")
    }
  }, [session, router])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn("google", {
        callbackUrl: "/marketplace",
        redirect: true,
      })
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
    }
  }

  // Show loading spinner while checking authentication status
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-white absolute top-0 left-0"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Neon Crystal City Background */}
      <NeonCrystalCity />
      
      {/* Dark overlay for readability with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
      
      {/* Glowing blue/purple accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-blue-500/10 to-purple-600/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-t from-purple-600/10 to-blue-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm">Back to Home</span>
        </a>
   {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl shadow-blue-500/10">
          {/* Logo */}
        <div className="flex justify-center mb-8">
  <div className="relative">
    
    <img
      src="/logo.png"  
      alt="BATWORKS Logo"
      className="h-12 object-contain drop-shadow-lg"
    />
  </div>
</div>


          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-white/60 text-sm">
              Sign in to access premium web applications
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3.5 px-4 rounded-xl 
                     flex items-center justify-center gap-3 transition-all duration-200
                     hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-900" />
            ) : (
              <Chrome className="h-5 w-5" />
            )}
            <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[hsl(220,25%,8%)] backdrop-blur-sm px-3 py-1 text-white/50 border border-white/10 rounded-full inline-flex items-center gap-2">
                <Shield className="h-3 w-3" />
                <span>Secure authentication</span>
                <Lock className="h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-500/10 flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-xs text-white/60">Fast Setup</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-purple-500/10 flex items-center justify-center backdrop-blur-sm border border-purple-500/30">
                <Shield className="h-4 w-4 text-purple-400" />
              </div>
              <p className="text-xs text-white/60">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-blue-600/10 flex items-center justify-center backdrop-blur-sm border border-blue-600/30">
                <Star className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-xs text-white/60">Premium</p>
            </div>
          </div>

          {/* Footer Links */}
          <p className="text-center text-xs text-white/50">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-white/70 hover:text-white transition-colors">
              Terms
            </a>
            {" "}and{" "}
            <a href="/privacy" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Bottom CTA */}
        <p className="text-center mt-6 text-sm text-white/60">
          New to Batworks?{" "}
          <a href="/marketplace" className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium">
            Explore Marketplace →
          </a>
        </p>
      </div>
    </div>
  )
}