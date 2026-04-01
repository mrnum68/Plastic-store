import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, RoundedBox, Cylinder, ContactShadows, SoftShadows } from "@react-three/drei";
import { useDrag } from "@use-gesture/react";
import * as THREE from "three";
import { ROOM_FURNITURE, FurnitureItem } from "./FloorPlan2D";

/* ─── Configs ─── */
export interface FurnitureConfig {
  height: number;
  color: string;
  width: number;
  depth: number;
  isVisible: boolean;
  styleVariant: string;
}

export type FurnitureConfigs = Record<string, FurnitureConfig>;
export type FurniturePositions = Record<string, { x: number; z: number; rotated: boolean }>;

export const DEFAULT_FURNITURE_HEIGHTS: Record<string, number> = {
  giuong: 0.55,
  "tu-quan-ao": 2.4,
  "ban-td": 0.75,
  "ban-hoc": 0.75,
  "ke-tivi": 0.45,
  tab1: 0.55,
  tab2: 0.55,
  "bep-tren": 0.7, 
  "bep-duoi": 0.85,
  "tu-lanh": 1.8,
};

export const DEFAULT_FURNITURE_COLORS: Record<string, string> = {
  giuong: "#d4b895",
  "tu-quan-ao": "#f8fafc",
  "ban-td": "#f8fafc",
  "ban-hoc": "#d4b895",
  "ke-tivi": "#334155",
  tab1: "#d4b895",
  tab2: "#d4b895",
  "bep-tren": "#f8fafc",
  "bep-duoi": "#334155",
  "tu-lanh": "#cbd5e1",
};

export const COLOR_PALETTE = [
  "#f8fafc", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#334155", "#0f172a", 
  "#d4b895", "#b45309", "#78350f", 
  "#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#fb7185", 
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return new THREE.Color(r, g, b);
}

/* ─── Room Shell with Architectural Details ─── */
function RoomShell({ width, depth, wallHeight = 2.6 }: { width: number; depth: number; wallHeight?: number }) {
  const floorColor = new THREE.Color("#d1bfae"); 
  const wallColor = new THREE.Color("#f8fafc"); 
  const doorW = 0.9;
  const doorH = 2.2;
  const doorZPos = depth * 0.7; 

  return (
    <group>
      <mesh receiveShadow position={[width / 2, 0, depth / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={floorColor} roughness={0.7} metalness={0.1} />
      </mesh>
      <gridHelper args={[Math.max(width, depth) * 2, Math.max(width, depth) * 10, 0x000000, 0x000000]} position={[width/2, 0.001, depth/2]} material-opacity={0.06} material-transparent />

      <mesh receiveShadow position={[width / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[width, wallHeight, 0.15]} />
        <meshStandardMaterial color={wallColor} roughness={1} />
      </mesh>
      <mesh receiveShadow position={[0, wallHeight / 2, depth / 2]}>
        <boxGeometry args={[0.15, wallHeight, depth]} />
        <meshStandardMaterial color={wallColor} roughness={1} />
      </mesh>

      <group position={[width, 0, 0]}>
        <mesh receiveShadow position={[0, wallHeight / 2, (doorZPos - doorW/2) / 2]}>
          <boxGeometry args={[0.15, wallHeight, doorZPos - doorW/2]} />
          <meshStandardMaterial color={wallColor} roughness={1} />
        </mesh>
        
        <mesh receiveShadow position={[0, doorH + (wallHeight - doorH) / 2, doorZPos]}>
          <boxGeometry args={[0.15, wallHeight - doorH, doorW]} />
          <meshStandardMaterial color={wallColor} roughness={1} />
        </mesh>

        <mesh receiveShadow position={[0, wallHeight / 2, doorZPos + doorW/2 + (depth - doorZPos - doorW/2) / 2]}>
          <boxGeometry args={[0.15, wallHeight, depth - doorZPos - doorW/2]} />
          <meshStandardMaterial color={wallColor} roughness={1} />
        </mesh>

        <group position={[-0.05, 0, doorZPos - doorW/2]} rotation={[0, -Math.PI / 3, 0]}>
          <RoundedBox args={[0.04, doorH - 0.02, doorW - 0.02]} radius={0.01} position={[0, doorH/2, doorW/2]} castShadow receiveShadow>
            <meshStandardMaterial color="#b47d53" roughness={0.5} />
          </RoundedBox>
          <Cylinder args={[0.01, 0.01, 0.15]} position={[-0.04, doorH/2, doorW * 0.85]} rotation={[0, 0, Math.PI/2]} castShadow>
             <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </Cylinder>
        </group>
        
        <mesh position={[-0.08, doorH/2, doorZPos - doorW/2 - 0.03]} castShadow>
          <boxGeometry args={[0.04, doorH, 0.05]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[-0.08, doorH/2, doorZPos + doorW/2 + 0.03]} castShadow>
          <boxGeometry args={[0.04, doorH, 0.05]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[-0.08, doorH + 0.02, doorZPos]} castShadow>
          <boxGeometry args={[0.04, 0.05, doorW + 0.1]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      </group>

      <mesh position={[width / 2, 0.05, 0.08]} castShadow>
        <boxGeometry args={[width - 0.15, 0.1, 0.02]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.05, depth / 2]} castShadow>
        <boxGeometry args={[0.02, 0.1, depth - 0.15]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* ─── Highly Detailed Models ─── */

function BedModel({ w, h, d, color, variant }: { w: number; h: number; d: number; color: THREE.Color; variant: string }) {
  const legH = variant === "minimalist" ? 0.02 : 0.1;
  const frameH = variant === "classic" ? 0.3 : 0.15;
  const headboardH = variant === "minimalist" ? 0 : h;
  const mattressH = 0.25;

  return (
    <group position={[0, -h/2, 0]}>
      {/* Legs (if applicable) */}
      {variant !== "classic" && (
        [[-w/2+0.05, -d/2+0.1], [w/2-0.05, -d/2+0.1], [-w/2+0.05, d/2-0.05], [w/2-0.05, d/2-0.05]].map((pos, i) => (
            <Cylinder key={i} args={[0.03, 0.02, legH, 16]} position={[pos[0], legH/2, pos[1]]} castShadow>
            <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
            </Cylinder>
        ))
      )}

      {/* Frame */}
      {variant === "minimalist" ? (
        // Wide low platform
        <RoundedBox args={[w + 0.3, frameH, d + 0.3]} radius={0.02} smoothness={4} position={[0, legH + frameH/2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={color} roughness={0.3} />
        </RoundedBox>
      ) : (
        // Standard or classic box
        <RoundedBox args={[w, frameH, d - 0.05]} radius={0.02} smoothness={4} position={[0, legH + frameH/2, 0.025]} castShadow receiveShadow>
          <meshStandardMaterial color={color} roughness={0.3} />
        </RoundedBox>
      )}

      {/* Headboard */}
      {variant === "classic" && (
          <RoundedBox args={[w + 0.1, headboardH*1.2, 0.15]} radius={0.05} smoothness={4} position={[0, headboardH*0.6, -d/2 + 0.04]} castShadow receiveShadow>
            <meshStandardMaterial color={color} roughness={0.5} />
          </RoundedBox>
      )}
      {variant === "modern" && (
          <RoundedBox args={[w + 0.04, headboardH, 0.08]} radius={0.02} smoothness={4} position={[0, headboardH/2, -d/2 + 0.04]} castShadow receiveShadow>
            <meshStandardMaterial color={color} roughness={0.3} />
          </RoundedBox>
      )}

      {/* Mattress */}
      <RoundedBox args={[w - 0.02, mattressH, d - 0.02]} radius={0.04} smoothness={5} position={[0, legH + frameH + mattressH/2, variant==='minimalist'?0:0.02]} castShadow receiveShadow>
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </RoundedBox>

      {/* Blanket/Comforter */}
      <group position={[0, legH + frameH + mattressH/2 + 0.015, d*0.25]}>
        <RoundedBox args={[w + 0.06, mattressH + 0.02, d*0.5]} radius={0.03} smoothness={4} castShadow receiveShadow>
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[w + 0.06, 0.05, 0.2]} radius={0.02} smoothness={4} position={[0, mattressH/2 + 0.02, -d*0.25]} rotation={[0.1, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#64748b" roughness={0.9} />
        </RoundedBox>
      </group>

      {/* Pillows */}
      {[-w*0.22, w*0.22].map((px, i) => (
        <group key={i} position={[px, legH + frameH + mattressH + 0.06, -d*0.35 + 0.1]} rotation={[0.15, 0, 0]}>
            <RoundedBox args={[w*0.38, 0.1, d*0.2]} radius={0.04} smoothness={4} castShadow receiveShadow>
                <meshStandardMaterial color="#f1f5f9" roughness={1} />
            </RoundedBox>
            {i === 0 && variant !== "minimalist" && (
                <RoundedBox args={[w*0.15, 0.08, d*0.12]} radius={0.03} position={[w*0.22, 0.04, 0.06]} rotation={[0, 0, 0.1]} castShadow receiveShadow>
                    <meshStandardMaterial color="#b45309" roughness={0.8} />
                </RoundedBox>
            )}
        </group>
      ))}
    </group>
  );
}

function WardrobeModel({ w, h, d, color, variant }: { w: number; h: number; d: number; color: THREE.Color; variant: string }) {
  const doors = Math.max(2, Math.round(w / 0.5));
  const doorW = (w - 0.04) / doors;
  const plinthH = 0.08;

  const isOpenFrame = variant === "open";
  const isClassic = variant === "classic";

  return (
    <group position={[0, -h/2, 0]}>
      {/* Plinth */}
      <mesh position={[0, plinthH/2, -0.02]} receiveShadow>
        <boxGeometry args={[w - 0.02, plinthH, d - 0.04]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {isOpenFrame ? (
        <group>
            {/* Back panel */}
            <RoundedBox args={[w, h - plinthH, 0.02]} radius={0.005} position={[0, plinthH + (h-plinthH)/2, -d/2 + 0.02]} castShadow receiveShadow>
                <meshStandardMaterial color={color} roughness={0.3} />
            </RoundedBox>
            {/* Sides */}
            <RoundedBox args={[0.02, h - plinthH, d]} radius={0.005} position={[-w/2 + 0.01, plinthH + (h-plinthH)/2, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={color} roughness={0.3} />
            </RoundedBox>
            <RoundedBox args={[0.02, h - plinthH, d]} radius={0.005} position={[w/2 - 0.01, plinthH + (h-plinthH)/2, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={color} roughness={0.3} />
            </RoundedBox>
            {/* Top Shelf */}
            <RoundedBox args={[w, 0.02, d]} radius={0.005} position={[0, h - 0.02, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={color} roughness={0.3} />
            </RoundedBox>
            {/* Bottom Shelf */}
            <RoundedBox args={[w, 0.02, d]} radius={0.005} position={[0, plinthH + 0.02, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={color} roughness={0.3} />
            </RoundedBox>
            {/* Mid Shelf */}
            <RoundedBox args={[w, 0.02, d]} radius={0.005} position={[0, plinthH + (h-plinthH)*0.4, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={color} roughness={0.3} />
            </RoundedBox>
            {/* Hanging Rail */}
            <Cylinder args={[0.01, 0.01, w - 0.04]} position={[0, h - 0.2, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
                <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
            </Cylinder>
            {/* Clothing mockups with realistic staggered heights and depth */}
            {[-w*0.35, -w*0.2, -w*0.05, w*0.1, w*0.25, w*0.4].map((cx, i) => (
                <RoundedBox key={i} args={[0.06, 0.6 + Math.random()*0.4, d*0.7]} radius={0.03} position={[cx, h - 0.25 - (0.6 + Math.random()*0.4)/2, 0]} castShadow receiveShadow>
                    <meshStandardMaterial color={['#f8fafc', '#334155', '#475569', '#cbd5e1', '#b45309', '#0f172a'][i % 6]} roughness={0.9} />
                </RoundedBox>
            ))}
            {/* Folded clothes on shelves */}
            {[-w*0.2, w*0.2].map((cx, i) => (
                <group key={i} position={[cx, plinthH + 0.03, 0]}>
                    <RoundedBox args={[0.3, 0.05, d*0.5]} radius={0.01} position={[0, 0.025, 0]} castShadow receiveShadow>
                        <meshStandardMaterial color={i===0?'#64748b':'#cbd5e1'} roughness={0.9} />
                    </RoundedBox>
                    <RoundedBox args={[0.28, 0.05, d*0.48]} radius={0.01} position={[0, 0.075, 0]} castShadow receiveShadow>
                        <meshStandardMaterial color={i===0?'#cbd5e1':'#475569'} roughness={0.9} />
                    </RoundedBox>
                </group>
            ))}
        </group>
      ) : (
        <group>
            <RoundedBox args={[w, h - plinthH, d - 0.02]} radius={0.01} smoothness={2} position={[0, plinthH + (h-plinthH)/2, -0.01]} castShadow receiveShadow>
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.05} />
            </RoundedBox>

            {Array.from({ length: doors }).map((_, i) => {
                const dx = -w/2 + 0.02 + doorW/2 + i * doorW;
                const handleX = dx + (i % 2 === 0 ? doorW/2 - 0.05 : -doorW/2 + 0.05);

                // Make the middle door a mirror in Modern variant if there's enough doors
                const isMirror = !isClassic && doors >= 3 && i === Math.floor(doors / 2);

                return (
                <group key={i}>
                    {isClassic ? (
                        <group>
                            <RoundedBox args={[doorW - 0.006, h - plinthH - 0.04, 0.018]} radius={0.005} position={[dx, plinthH + (h-plinthH)/2, d/2 - 0.002]} castShadow receiveShadow>
                                <meshStandardMaterial color={color} roughness={0.5} />
                            </RoundedBox>
                            {/* Inner classical panel detail */}
                            <mesh position={[dx, plinthH + (h-plinthH)/2, d/2 + 0.008]} receiveShadow>
                                <planeGeometry args={[doorW - 0.12, h - plinthH - 0.3]} />
                                <meshStandardMaterial color={color} roughness={0.6} />
                            </mesh>
                            <mesh position={[dx, plinthH + (h-plinthH)/2, d/2 + 0.009]} receiveShadow>
                                <boxGeometry args={[doorW - 0.1, h - plinthH - 0.28, 0.008]} />
                                <meshStandardMaterial color={color} roughness={0.4} />
                            </mesh>
                            {/* Round classic knob */}
                            <Cylinder args={[0.015, 0.015, 0.03]} position={[handleX, plinthH + (h-plinthH)*0.45, d/2 + 0.02]} rotation={[Math.PI/2, 0, 0]} castShadow>
                                <meshStandardMaterial color="#b45309" metalness={0.8} />
                            </Cylinder>
                        </group>
                    ) : (
                        <group>
                            <RoundedBox args={[doorW - 0.006, h - plinthH - 0.04, 0.018]} radius={0.005} position={[dx, plinthH + (h-plinthH)/2, d/2 - 0.002]} castShadow receiveShadow>
                                {isMirror ? (
                                    <meshPhysicalMaterial color="#ffffff" metalness={0.95} roughness={0.05} clearcoat={1.0} />
                                ) : (
                                    <meshStandardMaterial color={color} roughness={0.2} metalness={0.05} />
                                )}
                            </RoundedBox>
                            <RoundedBox args={[0.012, Math.min(1.2, h*0.4), 0.02]} radius={0.005} position={[handleX, h/2, d/2 + 0.015]} castShadow>
                                <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.1} />
                            </RoundedBox>
                        </group>
                    )}
                </group>
                );
            })}
        </group>
      )}
    </group>
  );
}

function DeskModel({ w, h, d, color }: { w: number; h: number; d: number; color: THREE.Color }) {
  const topH = 0.04;
  const legW = 0.05;
  const drawerW = w * 0.35;
  
  return (
    <group position={[0, -h/2, 0]}>
      {/* Desk Surface */}
      <RoundedBox args={[w, topH, d]} radius={0.015} position={[0, h - topH/2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, h - topH/2 + 0.02, 0]} receiveShadow>
         <planeGeometry args={[w - 0.05, d - 0.05]} />
         <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>

      {/* Modern Legs */}
      <Cylinder args={[0.015, 0.01, h-topH, 16]} position={[-w/2 + legW, (h-topH)/2, -d/2 + 0.05]} castShadow>
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
      </Cylinder>
      <Cylinder args={[0.015, 0.01, h-topH, 16]} position={[-w/2 + legW, (h-topH)/2, d/2 - 0.05]} castShadow>
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
      </Cylinder>
      <Cylinder args={[0.015, 0.01, h-topH, 16]} position={[w/2 - legW, (h-topH)/2, -d/2 + 0.05]} castShadow>
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.3} />
      </Cylinder>

      {/* Drawer Unit (Suspended) */}
      <RoundedBox args={[drawerW, topH*4, d-0.05]} radius={0.01} position={[w/2 - drawerW/2 - 0.02, h - topH - topH*2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.3} />
      </RoundedBox>
      {/* Drawer cutout detail */}
      <mesh position={[w/2 - drawerW/2 - 0.02, h - topH - topH*2, d/2 - 0.024]} castShadow>
         <boxGeometry args={[drawerW - 0.02, 0.01, 0.01]} />
         <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Prop: Monitor */}
      <group position={[w*0.1, h + 0.01, -d*0.1]}>
        {/* Screen */}
        <RoundedBox args={[0.6, 0.35, 0.02]} radius={0.01} position={[0, 0.25, -0.1]} rotation={[-0.05, -0.1, 0]} castShadow>
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </RoundedBox>
        <mesh position={[0, 0.25, -0.089]} rotation={[-0.05, -0.1, 0]}>
           <planeGeometry args={[0.58, 0.33]} />
           <meshPhysicalMaterial color="#000000" roughness={0.1} clearcoat={1.0} />
        </mesh>
        {/* Monitor Stand */}
        <mesh position={[0, 0.1, -0.12]} rotation={[0, -0.1, 0]} castShadow>
           <boxGeometry args={[0.08, 0.2, 0.04]} />
           <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </mesh>
        <RoundedBox args={[0.2, 0.01, 0.15]} radius={0.005} position={[0, 0, -0.15]} rotation={[0, -0.1, 0]} castShadow>
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </RoundedBox>
        
        {/* Keyboard & Mouse */}
        <RoundedBox args={[0.3, 0.012, 0.12]} radius={0.005} position={[0, 0, 0.15]} rotation={[0, -0.1, 0]} castShadow>
            <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.08, 0.015, 0.1]} radius={0.02} position={[0.25, 0, 0.15]} rotation={[0, -0.1, 0]} castShadow>
            <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </RoundedBox>
      </group>

      {/* Prop: Books/Notebooks */}
      <group position={[-w*0.3, h + 0.01, 0]} rotation={[0, 0.2, 0]}>
          <RoundedBox args={[0.2, 0.02, 0.25]} radius={0.005} position={[0, 0.01, 0]} castShadow>
              <meshStandardMaterial color="#b45309" roughness={0.7} />
          </RoundedBox>
          <RoundedBox args={[0.18, 0.015, 0.23]} radius={0.005} position={[0.02, 0.03, 0.01]} rotation={[0, 0.1, 0]} castShadow>
              <meshStandardMaterial color="#0f172a" roughness={0.7} />
          </RoundedBox>
          {/* Coffee Mug */}
          <Cylinder args={[0.03, 0.03, 0.08, 16]} position={[-0.05, 0.04, -0.15]} castShadow>
              <meshPhysicalMaterial color="#ffffff" roughness={0.2} clearcoat={0.5} />
          </Cylinder>
      </group>

      {/* Chair (Tucked Under) */}
      <group position={[-0.1, 0, d*0.4]} rotation={[0, -Math.PI/6, 0]}>
        {/* Seat */}
        <RoundedBox args={[0.45, 0.06, 0.45]} radius={0.03} position={[0, 0.45, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </RoundedBox>
        {/* Backrest */}
        <RoundedBox args={[0.4, 0.4, 0.05]} radius={0.03} position={[0, 0.7, -0.2]} rotation={[0.15, 0, 0]} castShadow>
         <meshStandardMaterial color="#334155" roughness={0.8} />
        </RoundedBox>
        {/* Support */}
        <Cylinder args={[0.02, 0.02, 0.4, 16]} position={[0, 0.25, 0]} castShadow>
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </Cylinder>
        {/* Wheels Base */}
        <Cylinder args={[0.25, 0.25, 0.03, 5]} position={[0, 0.03, 0]} castShadow>
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
        </Cylinder>
        {[0, 1, 2, 3, 4].map(i => {
           const angle = (i * Math.PI * 2) / 5;
           return (
             <mesh key={i} position={[Math.cos(angle)*0.22, 0.02, Math.sin(angle)*0.22]} castShadow>
                 <sphereGeometry args={[0.02]} />
                 <meshStandardMaterial color="#0f172a" />
             </mesh>
           );
        })}
      </group>
    </group>
  );
}

function CabinetModel({ w, h, d, color, isUpper }: { w: number; h: number; d: number; color: THREE.Color, isUpper: boolean }) {
  const plinthH = isUpper ? 0 : 0.1;
  const countertopH = 0.04;
  
  const hasDetails = !isUpper && w > 1.5;
  
  // Splitting total width into sections: Stove/Oven (Left), Drawers (Middle), Sink (Right)
  // If it's a simple cabinet (not wide enough), just do generic doors
  const secW = w / Math.max(1, Math.round(w / 0.6)); 
  const doors = Math.round(w / secW);

  return (
    <group position={[0, -h/2, 0]}>
      {/* Plinth */}
      {!isUpper && (
        <mesh position={[0, plinthH/2, -0.02]} receiveShadow>
          <boxGeometry args={[w - 0.02, plinthH, d - 0.06]} />
          <meshStandardMaterial color="#0f172a" roughness={0.9} />
        </mesh>
      )}

      {/* Main Carcass */}
      <RoundedBox args={[w, h - plinthH, d - 0.02]} radius={0.005} position={[0, plinthH + (h-plinthH)/2, -0.01]} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.3} />
      </RoundedBox>
      
      {/* Stone Countertop (Lower only) */}
      {!isUpper && (
        <RoundedBox args={[w + 0.02, countertopH, d + 0.02]} radius={0.005} position={[0, h, 0]} castShadow receiveShadow>
          {/* Using Physical Material for realistic stone/quartz reflectance */}
          <meshPhysicalMaterial color="#f8fafc" roughness={0.1} metalness={0.05} clearcoat={1.0} clearcoatRoughness={0.1} />
        </RoundedBox>
      )}

      {/* Tile Backsplash (attached to the back of the lower cabinet extending upwards) */}
      {!isUpper && (
         <group position={[0, h + 0.3, -d/2 + 0.01]}>
            <mesh receiveShadow>
                <planeGeometry args={[w, 0.6]} />
                <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            <gridHelper args={[Math.max(w, 0.6)*2, Math.max(w, 0.6)*2 / 0.1, 0xcccccc, 0xcccccc]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.001]} />
         </group>
      )}
      
      {/* Kitchen Details: Stove, Oven, Sink */}
      {hasDetails && (
        <group>
          {/* Induction Stove (Left side) */}
          <group position={[-w/2 + secW/2, h + countertopH/2 + 0.002, 0]}>
            <RoundedBox args={[0.55, 0.01, 0.4]} radius={0.005} castShadow>
              <meshPhysicalMaterial color="#000000" roughness={0.05} clearcoat={1.0} metalness={0.8} />
            </RoundedBox>
            {/* Stove heating rings */}
            <mesh position={[-0.15, 0.006, 0]} rotation={[-Math.PI/2, 0, 0]}>
               <ringGeometry args={[0.08, 0.09, 32]} />
               <meshBasicMaterial color="#ef4444" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0.15, 0.006, 0]} rotation={[-Math.PI/2, 0, 0]}>
               <ringGeometry args={[0.06, 0.07, 32]} />
               <meshBasicMaterial color="#ef4444" transparent opacity={0.4} />
            </mesh>
            <mesh position={[0.15, 0.006, -0.08]} rotation={[-Math.PI/2, 0, 0]}>
               <ringGeometry args={[0.04, 0.05, 32]} />
               <meshBasicMaterial color="#ef4444" transparent opacity={0.4} />
            </mesh>
          </group>

          {/* Built-in Oven (Under stove) */}
          <group position={[-w/2 + secW/2, plinthH + (h-plinthH)/2 + 0.05, d/2 - 0.01]}>
             <RoundedBox args={[secW - 0.04, 0.6, 0.03]} radius={0.005} castShadow>
                 <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.5} />
             </RoundedBox>
             {/* Oven Glass */}
             <mesh position={[0, -0.05, 0.016]}>
                 <planeGeometry args={[secW - 0.1, 0.4]} />
                 <meshPhysicalMaterial color="#000000" metalness={0.9} roughness={0.1} clearcoat={1.0} />
             </mesh>
             {/* Oven Handle */}
             <Cylinder args={[0.008, 0.008, secW - 0.1]} position={[0, 0.2, 0.03]} rotation={[0, 0, Math.PI/2]} castShadow>
                 <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
             </Cylinder>
             {/* UI Display */}
             <mesh position={[0.15, 0.22, 0.016]}>
                 <planeGeometry args={[0.08, 0.03]} />
                 <meshBasicMaterial color="#10b981" />
             </mesh>
          </group>

          {/* Sink Area (Right side) */}
          <group position={[w/2 - secW/2, h + countertopH, 0]}>
            {/* Cutout illusion (Black plane mapping) */}
            <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.018, 0]}>
               <planeGeometry args={[0.7, 0.4]} />
               <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Double sink metallic rims */}
            <RoundedBox args={[0.33, 0.01, 0.38]} radius={0.02} position={[-0.17, -0.015, 0]} castShadow>
               <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
            </RoundedBox>
            <mesh position={[-0.17, -0.01, 0]} rotation={[-Math.PI/2, 0, 0]}>
               <planeGeometry args={[0.29, 0.34]} />
               <meshStandardMaterial color="#334155" roughness={0.5} />
            </mesh>

            <RoundedBox args={[0.33, 0.01, 0.38]} radius={0.02} position={[0.17, -0.015, 0]} castShadow>
               <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
            </RoundedBox>
            <mesh position={[0.17, -0.01, 0]} rotation={[-Math.PI/2, 0, 0]}>
               <planeGeometry args={[0.29, 0.34]} />
               <meshStandardMaterial color="#334155" roughness={0.5} />
            </mesh>

            {/* Faucet Base */}
            <Cylinder args={[0.025, 0.025, 0.04]} position={[0, -0.01, -0.22]} castShadow>
               <meshStandardMaterial color="#e2e8f0" metalness={1.0} roughness={0.1} />
            </Cylinder>
            {/* Main Arching Faucet */}
            <Cylinder args={[0.008, 0.008, 0.2]} position={[0, 0.1, -0.22]} castShadow>
               <meshStandardMaterial color="#e2e8f0" metalness={1.0} roughness={0.1} />
            </Cylinder>
            <Cylinder args={[0.008, 0.008, 0.18]} position={[0, 0.2, -0.14]} rotation={[Math.PI/2, 0, 0]} castShadow>
               <meshStandardMaterial color="#e2e8f0" metalness={1.0} roughness={0.1} />
            </Cylinder>
            <Cylinder args={[0.01, 0.008, 0.05]} position={[0, 0.18, -0.05]} rotation={[0, 0, 0]} castShadow>
               <meshStandardMaterial color="#e2e8f0" metalness={1.0} roughness={0.1} />
            </Cylinder>
          </group>
        </group>
      )}

      {/* Cabinet Doors/Drawers Generation */}
      {Array.from({ length: doors }).map((_, i) => {
        const dx = -w/2 + secW/2 + i * secW;
        const isOvenSection = hasDetails && i === 0;
        const isDrawerSection = hasDetails && i === Math.floor(doors / 2); // Middle section gets drawers
        const isSinkSection = hasDetails && i === doors - 1;

        if (isOvenSection) return null; // Oven rendered separately

        if (isDrawerSection && !isUpper) {
            // Render 3 horizontal drawers instead of a single door
            return (
                <group key={i}>
                    {[0, 1, 2].map(drawerIdx => {
                       const dH = (h - plinthH) / 3;
                       const dy = plinthH + dH/2 + drawerIdx * dH;
                       return (
                         <group key={drawerIdx} position={[dx, dy, d/2]}>
                             <RoundedBox args={[secW - 0.006, dH - 0.008, 0.018]} radius={0.005} castShadow receiveShadow>
                                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
                             </RoundedBox>
                             <RoundedBox args={[secW*0.6, 0.01, 0.02]} radius={0.004} position={[0, dH*0.25, 0.01]} castShadow>
                                <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                             </RoundedBox>
                         </group>
                       );
                    })}
                </group>
            );
        }

        // Standard Door
        const handleX = dx + (i % 2 === 0 ? secW/2 - 0.05 : -secW/2 + 0.05);
        return (
          <group key={i}>
            <RoundedBox args={[secW - 0.006, h - plinthH - 0.008, 0.018]} radius={0.005} position={[dx, plinthH + (h-plinthH)/2, d/2 - 0.005]} castShadow receiveShadow>
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.05} />
            </RoundedBox>
            <RoundedBox args={[0.012, (h-plinthH)*0.4, 0.02]} radius={0.005} position={[handleX, plinthH + (h-plinthH)*0.6, d/2 + 0.01]} castShadow>
              <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </RoundedBox>
          </group>
        );
      })}
    </group>
  );
}

function FridgeModel({ w, h, d }: { w: number; h: number; d: number }) {
  // Realistic Double Door Fridge with dispenser
  return (
    <group position={[0, -h/2, 0]}>
      {/* Fridge Body */}
      <RoundedBox args={[w, h, d]} radius={0.02} position={[0, h/2, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#cbd5e1" metalness={0.9} roughness={0.15} clearcoat={0.5} />
      </RoundedBox>
      
      {/* Vertical door split */}
      <mesh position={[0, h/2, d/2 + 0.005]} receiveShadow>
        <boxGeometry args={[0.02, h - 0.04, 0.02]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      
      {/* Handles */}
      <Cylinder args={[0.01, 0.01, h*0.5]} position={[-0.04, h*0.5, d/2 + 0.025]} castShadow>
        <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
      </Cylinder>
      <Cylinder args={[0.01, 0.01, h*0.5]} position={[0.04, h*0.5, d/2 + 0.025]} castShadow>
        <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.1} />
      </Cylinder>

      {/* Water Dispenser */}
      <group position={[-w*0.25, h*0.55, d/2 + 0.01]}>
         <RoundedBox args={[0.2, 0.35, 0.02]} radius={0.02} castShadow>
           <meshStandardMaterial color="#0f172a" roughness={0.4} />
         </RoundedBox>
         {/* Dispenser cavity */}
         <mesh position={[0, -0.02, 0.005]}>
            <boxGeometry args={[0.16, 0.25, 0.02]} />
            <meshStandardMaterial color="#1e293b" />
         </mesh>
         <mesh position={[0, 0.08, 0.015]} rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.05]} />
            <meshStandardMaterial color="#cbd5e1" metalness={1} roughness={0.1} />
         </mesh>
      </group>
      
      {/* Info Screen */}
      <mesh position={[w*0.25, h*0.75, d/2 + 0.011]}>
         <planeGeometry args={[0.15, 0.25]} />
         <meshPhysicalMaterial color="#000000" metalness={0.9} roughness={0.1} clearcoat={1.0} />
      </mesh>
    </group>
  );
}

function TVStandModel({ w, h, d, color }: { w: number; h: number; d: number; color: THREE.Color }) {
   return (
     <group position={[0, -h/2, 0]}>
       {/* Detailed Hollow Stand */}
       <RoundedBox args={[w, 0.04, d]} radius={0.01} position={[0, h - 0.02, 0]} castShadow receiveShadow>
         <meshStandardMaterial color={color} roughness={0.3} />
       </RoundedBox>
       <RoundedBox args={[w, 0.04, d]} radius={0.01} position={[0, 0.06, 0]} castShadow receiveShadow>
         <meshStandardMaterial color={color} roughness={0.3} />
       </RoundedBox>
       <RoundedBox args={[0.04, h - 0.08, d]} radius={0.01} position={[-w/2 + 0.02, h/2, 0]} castShadow receiveShadow>
         <meshStandardMaterial color={color} roughness={0.3} />
       </RoundedBox>
       <RoundedBox args={[0.04, h - 0.08, d]} radius={0.01} position={[w/2 - 0.02, h/2, 0]} castShadow receiveShadow>
         <meshStandardMaterial color={color} roughness={0.3} />
       </RoundedBox>
       <RoundedBox args={[0.04, h - 0.08, d]} radius={0.01} position={[0, h/2, 0]} castShadow receiveShadow>
         <meshStandardMaterial color={color} roughness={0.3} />
       </RoundedBox>
       {/* Receiver / Console Unit inside it */}
       <RoundedBox args={[0.4, 0.1, 0.25]} radius={0.01} position={[-w*0.25, 0.14, 0]} castShadow receiveShadow>
           <meshStandardMaterial color="#0f172a" roughness={0.8} />
       </RoundedBox>

       {/* TV Frame and Screen */}
       <group position={[0, h, 0]}>
          {/* Base */}
          <mesh position={[0, 0.02, 0]} castShadow>
             <boxGeometry args={[0.4, 0.02, 0.2]} />
             <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0.1, 0]} castShadow>
             <boxGeometry args={[0.1, 0.2, 0.05]} />
             <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Display Panel */}
          <RoundedBox args={[w * 0.9, w * 0.5, 0.04]} radius={0.01} position={[0, w*0.25 + 0.2, 0]} castShadow>
             <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
          </RoundedBox>
          <mesh position={[0, w*0.25 + 0.2, 0.021]}>
              <planeGeometry args={[w * 0.88, w * 0.48]} />
              <meshPhysicalMaterial color="#000000" metalness={1.0} roughness={0.0} clearcoat={1.0} />
          </mesh>
          {/* Soundbar */}
          <RoundedBox args={[w * 0.6, 0.06, 0.06]} radius={0.01} position={[0, 0.03, 0.1]} castShadow>
             <meshStandardMaterial color="#1e293b" roughness={0.9} />
          </RoundedBox>
       </group>
     </group>
   );
}

function NightstandModel({ w, h, d, color }: { w: number; h: number; d: number; color: THREE.Color }) {
    return (
       <group position={[0, -h/2, 0]}>
          {/* Box / Drawers */}
          <RoundedBox args={[w, h*0.8, d]} radius={0.02} position={[0, h*0.4, 0]} castShadow receiveShadow>
             <meshStandardMaterial color={color} roughness={0.3} />
          </RoundedBox>
          <mesh position={[0, h*0.4, d/2 + 0.005]}>
              <boxGeometry args={[w - 0.04, 0.01, 0.01]} />
              <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Knob */}
          <Cylinder args={[0.015, 0.015, 0.02]} position={[0, h*0.6, d/2 + 0.01]} rotation={[Math.PI/2, 0, 0]} castShadow>
             <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </Cylinder>
          <Cylinder args={[0.015, 0.015, 0.02]} position={[0, h*0.2, d/2 + 0.01]} rotation={[Math.PI/2, 0, 0]} castShadow>
             <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </Cylinder>

          {/* Lamp */}
          <group position={[w*0.2, h*0.8, -d*0.1]}>
             <Cylinder args={[0.06, 0.06, 0.02]} position={[0, 0.01, 0]} castShadow>
                <meshStandardMaterial color="#f8fafc" />
             </Cylinder>
             <Cylinder args={[0.005, 0.005, 0.2]} position={[0, 0.1, 0]} castShadow>
                <meshStandardMaterial color="#94a3b8" metalness={0.9} />
             </Cylinder>
             <Cylinder args={[0.06, 0.1, 0.15, 32]} position={[0, 0.22, 0]} castShadow>
                <meshPhysicalMaterial color="#fef08a" transmission={0.2} roughness={0.5} emissive="#fef08a" emissiveIntensity={0.2} />
             </Cylinder>
          </group>
       </group>
    );
}

function GenericBoxModel({ w, h, d, color, id }: { w: number; h: number; d: number; color: THREE.Color, id: string }) {
  if (id === "tu-lanh") return <FridgeModel w={w} h={h} d={d} />;
  if (id === "ke-tivi") return <TVStandModel w={w} h={h} d={d} color={color} />;
  if (id.startsWith("tab")) return <NightstandModel w={w} h={h} d={d} color={color} />;

  return (
    <RoundedBox args={[w, h, d]} radius={0.02} position={[0, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </RoundedBox>
  );
}

/* ─── Draggable Furniture Component ─── */
interface FurnitureDragProps {
  item: FurnitureItem;
  pos: { x: number; z: number; rotated: boolean };
  config: FurnitureConfig;
  selected: boolean;
  onSelect: () => void;
  onMove: (x: number, z: number) => void;
  onRotate: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  roomW: number;
  roomD: number;
}

function FurnitureItem3D({ item, pos, config, selected, onSelect, onMove, onRotate, onDragStart, onDragEnd, roomW, roomD }: FurnitureDragProps) {
  const cRGB = hexToRgb(config.color);
  
  const cw = config.width ?? item.w;
  const cd = config.depth ?? item.h;

  const fw = pos.rotated ? cd : cw;
  const fd = pos.rotated ? cw : cd;
  const fh = config.height;
  
  const isUpperCabinet = item.id === "bep-tren";
  const baseY = isUpperCabinet ? 1.45 : 0;
  
  const cx = pos.x + fw / 2;
  const cy = baseY + fh / 2;
  const cz = pos.z + fd / 2;

  const bind = useDrag(({ active, event, first, last }) => {
    event.stopPropagation();
    if (first) {
      document.body.style.cursor = 'grabbing';
      onSelect();
      onDragStart();
    }
    
    const sensitivity = (roomW > 5 ? 0.02 : 0.015);
    
    if (active) {
      let nx = pos.x + (event as any).movementX * sensitivity;
      let nz = pos.z + (event as any).movementY * sensitivity;

      nx = Math.max(0, Math.min(nx, roomW - fw));
      nz = Math.max(0, Math.min(nz, roomD - fd));
      
      onMove(nx, nz);
    }
    if (last) {
      document.body.style.cursor = 'auto';
      onDragEnd();
    }
  }, { 
    pointerEvents: true,
    filterTaps: true 
  });

  return (
    <group 
      position={[cx, cy, cz]} 
      {...(bind() as any)}
      onClick={(e) => { 
        e.stopPropagation(); 
        onSelect(); 
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onRotate();
      }}
    >
      {selected && (
        <group position={[0, -fh/2 + 0.01, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[Math.max(fw, fd)/2 + 0.1, Math.max(fw, fd)/2 + 0.15, 32]} />
            <meshBasicMaterial color="#f97316" transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      <group rotation={[0, pos.rotated ? Math.PI/2 : 0, 0]}>
        {item.id === "giuong" ? <BedModel w={cw} h={fh} d={cd} color={cRGB} variant={config.styleVariant} /> :
         item.id === "tu-quan-ao" ? <WardrobeModel w={cw} h={fh} d={cd} color={cRGB} variant={config.styleVariant} /> :
         (item.id === "ban-hoc" || item.id === "ban-td") ? <DeskModel w={cw} h={fh} d={cd} color={cRGB} /> :
         item.id.startsWith("bep") ? <CabinetModel w={cw} h={fh} d={cd} color={cRGB} isUpper={isUpperCabinet} /> :
         <GenericBoxModel id={item.id} w={cw} h={fh} d={cd} color={cRGB} />}
      </group>

      <Html
        position={[0, fh / 2 + 0.2, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: "none" }}
      >
        <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-md transition-all ${selected ? 'bg-orange-500 text-white scale-110' : 'bg-white/90 text-slate-800'}`}>
          {item.label}
        </div>
      </Html>
    </group>
  );
}

/* ─── Controls ─── */
function CameraSetup({ roomW, roomD, isDragging }: { roomW: number; roomD: number; isDragging: boolean }) {
  const diagonal = Math.sqrt(roomW * roomW + roomD * roomD);
  return (
    <OrbitControls
      target={[roomW / 2, 0.5, roomD / 2]}
      minDistance={2}
      maxDistance={diagonal * 2}
      maxPolarAngle={Math.PI / 2 - 0.1}
      enableDamping
      dampingFactor={0.05}
      makeDefault
      enabled={!isDragging}
    />
  );
}

/* ─── Main Scene Export ─── */
export interface Room3DSceneProps {
  roomWidth: number;
  roomDepth: number;
  roomType: string;
  configs: FurnitureConfigs;
  positions: FurniturePositions;
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
  onUpdatePosition: (id: string, x: number, z: number, rotated: boolean) => void;
}

export function Room3DScene({
  roomWidth,
  roomDepth,
  roomType,
  configs,
  positions,
  selectedItemId,
  onSelectItem,
  onUpdatePosition
}: Room3DSceneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const furniture = ROOM_FURNITURE[roomType] || [];

  const diagonal = Math.sqrt(roomWidth * roomWidth + roomDepth * roomDepth);
  const initCamPos: [number, number, number] = [
    roomWidth / 2 + diagonal * 0.4,
    diagonal * 0.9,
    roomDepth + diagonal * 0.4,
  ];

  return (
    <Canvas
      shadows
      camera={{ position: initCamPos, fov: 40 }} 
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      style={{ background: "#e2e8f0" }} 
      onClick={() => onSelectItem(null)}
    >
      <SoftShadows size={25} samples={10} focus={0.5} />
      <ambientLight intensity={0.6} />
      <hemisphereLight args={["#ffffff", "#cbd5e1", 0.7]} />
      
      <directionalLight
        position={[roomWidth * 0.5, 12, roomDepth * 0.8]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[4096, 4096]} 
        shadow-bias={-0.0005}
        shadow-camera-near={0.1}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <directionalLight
        position={[-8, 6, -8]}
        intensity={0.5}
        color="#ffffff"
      />

      <RoomShell width={roomWidth} depth={roomDepth} />
      
      {/* Critical for realism: ground shadows */}
      <ContactShadows position={[roomWidth/2, 0.01, roomDepth/2]} opacity={0.5} scale={Math.max(roomWidth, roomDepth) + 5} blur={1.5} far={4} color="#1e293b" />

      {furniture.map((f, idx) => {
        const id = f.id;
        if (!positions[id]) return null;
        
        const cfg = configs[id];
        if (!cfg || cfg.isVisible === false) return null; // HIDDEN
        
        const pos = positions[id];

        return (
          <FurnitureItem3D
            key={`${id}-${idx}`}
            item={f}
            pos={pos}
            config={cfg}
            selected={selectedItemId === id}
            onSelect={() => onSelectItem(selectedItemId === id ? null : id)}
            onMove={(nx, nz) => onUpdatePosition(id, nx, nz, pos.rotated)}
            onRotate={() => onUpdatePosition(id, pos.x, pos.z, !pos.rotated)}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            roomW={roomWidth}
            roomD={roomDepth}
          />
        );
      })}

      <CameraSetup roomW={roomWidth} roomD={roomDepth} isDragging={isDragging} />
    </Canvas>
  );
}
