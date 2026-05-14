"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── Types ─── */
export type LowerModuleType = "sink" | "stove" | "dw" | "rice" | "spice" | "dish-rack" | "drawer";
export type UpperModuleType = "altar" | "hood" | "dish-rack" | "drawer";

export interface ModuleLayoutItem {
  id: string;
  type: LowerModuleType | UpperModuleType;
  width: number; // width in mm (if flex=true, this is initial/min, will be expanded)
  flex: boolean; // if true, it expands to fill remaining space
}

export interface KitchenConfig {
  layout: "I" | "L";
  lengthA: number;
  lengthB: number;
  upperHeight: number;
  upperDepth: number;
  lowerHeight: number;
  lowerDepth: number;
  lowerModules: ModuleLayoutItem[];
  upperModules: ModuleLayoutItem[];
  material: "penco" | "golden" | "ecoplast" | "chinhue";
}

const C = {
  cabinet: "#c8cfd8",
  edge: "#1a202c",
  countertop: "#dedad0",
  sink: "#7ec8e3",
  stove: "#f4a261",
  dishwasher: "#a8dadc",
  spice: "#c4b5fd",
  rice: "#fcd34d",
  dishRack: "#bae6fd",
  altar: "#e9c46a",
  altarFrame: "#7a5a10",
  corner: "#b0bac5",
  wall: "#d0d5de",
  floor: "#c8c4ba",
  hood: "#2c3344",
  hoodDark: "#1e2433",
};

const mm = (v: number) => v / 1000;

/* ─── Box with edges ─── */
function Box({
  w, h, d, pos, color = C.cabinet, edgeColor = C.edge, opacity = 1,
}: { w: number; h: number; d: number; pos: [number, number, number]; color?: string; edgeColor?: string; opacity?: number }) {
  const geo = useMemo(() => new THREE.BoxGeometry(w, h, d), [w, h, d]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geo, 5), [geo]);
  return (
    <group position={pos}>
      <mesh>
        <primitive object={geo} />
        <meshStandardMaterial color={color} roughness={0.75} metalness={0.06}
          transparent={opacity < 1} opacity={opacity} />
      </mesh>
      <lineSegments>
        <primitive object={edges} />
        <lineBasicMaterial color={edgeColor} />
      </lineSegments>
    </group>
  );
}

/* ─── Floating label ─── */
function Label({ pos, text, color, icon }: { pos: [number, number, number]; text: string; color: string; icon: string; }) {
  return (
    <Html position={pos} center zIndexRange={[0, 50]} style={{ pointerEvents: "none" }}>
      <div style={{
        background: color, color: "#fff", padding: "2px 6px", borderRadius: 4,
        fontSize: 10, fontWeight: 700, whiteSpace: "nowrap",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)",
        fontFamily: "system-ui, sans-serif", display: "flex", alignItems: "center", gap: 4,
      }}>
        <span style={{ fontSize: 12 }}>{icon}</span>
        <span>{text}</span>
      </div>
    </Html>
  );
}

/* ─── Door rectangle ─── */
function DoorRect({ w, h, d, cx, cy, cz }: { w: number; h: number; d: number; cx: number; cy: number; cz: number }) {
  const fz = cz + d / 2 + 0.002;
  const inset = 0.022;
  const x0 = cx - w / 2 + inset, x1 = cx + w / 2 - inset;
  const y0 = cy - h / 2 + inset, y1 = cy + h / 2 - inset;
  const pts = useMemo(() => new Float32Array([
    x0, y0, fz, x1, y0, fz, x1, y0, fz, x1, y1, fz,
    x1, y1, fz, x0, y1, fz, x0, y1, fz, x0, y0, fz,
    cx - 0.01, cy, fz, cx + 0.01, cy, fz,
  ]), [x0, x1, y0, y1, fz, cx, cy]);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    return g;
  }, [pts]);
  return <lineSegments><primitive object={geo} /><lineBasicMaterial color="#2d3748" /></lineSegments>;
}

/* ─── Appliances / Extras ─── */
function SinkBasin({ cx, cy, cz, w, d }: { cx: number; cy: number; cz: number; w: number; d: number }) {
  const basinW = Math.min(w * 0.8, 0.7);
  const basinD = d * 0.55;
  const basinH = 0.14;
  return (
    <group>
      <Box w={basinW} h={0.025} d={basinD} pos={[cx, cy + 0.012, cz]} color="#90cce0" edgeColor="#2980b9" />
      <Box w={basinW - 0.04} h={basinH} d={basinD - 0.04} pos={[cx, cy - basinH / 2 + 0.01, cz]} color="#1c6080" edgeColor="#1a5070" />
      <Box w={0.04} h={0.06} d={0.04} pos={[cx - basinW * 0.25, cy + 0.05, cz - basinD * 0.35]} color="#9ca3af" />
      <Box w={0.016} h={0.016} d={0.15} pos={[cx - basinW * 0.25, cy + 0.1, cz - basinD * 0.25 + 0.06]} color="#9ca3af" />
    </group>
  );
}

function StoveTop({ cx, cy, cz, w, d }: { cx: number; cy: number; cz: number; w: number; d: number }) {
  const bW = Math.min(w * 0.8, 0.75);
  const bD = d * 0.7;
  return (
    <group>
      <Box w={bW} h={0.018} d={bD} pos={[cx, cy + 0.009, cz]} color="#1f2937" edgeColor="#111827" />
      {([-0.12, 0.12] as number[]).map((ox) =>
        ([-0.08, 0.08] as number[]).map((oz, j) => (
          <group key={`${ox}-${j}`} position={[cx + ox * (bW / 0.3), cy + 0.022, cz + oz * (bD / 0.2)]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.026, 0.044, 20]} /><meshBasicMaterial color="#7f1d1d" /></mesh>
          </group>
        ))
      )}
    </group>
  );
}

function RangeHood({ cx, cy, cz, w, h }: { cx: number; cy: number; cz: number; w: number; h: number }) {
  const hoodH = h * 0.55;
  const hoodW = Math.min(w * 0.85, 0.7);
  const hoodD = 0.42;
  const ductH = h * 0.38;
  const ductW = hoodW * 0.38;
  return (
    <group>
      <Box w={hoodW} h={hoodH} d={hoodD} pos={[cx, cy + h / 2 - hoodH / 2, cz]} color={C.hood} edgeColor={C.hoodDark} />
      <Box w={ductW} h={ductH} d={hoodD * 0.35} pos={[cx, cy + h / 2 - hoodH - ductH / 2, cz - hoodD * 0.1]} color={C.hoodDark} />
    </group>
  );
}

/* ─── Upper Cabinet Row ─── */
function UpperRow({ items, height, depth, wallY }: {
  items: ModuleLayoutItem[]; height: number; depth: number; wallY: number;
}) {
  const cy = wallY + height / 2;
  const cz = -depth / 2;

  let currentX = 0;

  return (
    <>
      {items.map((item, i) => {
        const mw = item.width;
        if (mw <= 0) return null;
        const cx = currentX + mw / 2;
        currentX += mw;

        const maxDoors = Math.max(1, Math.round(mw / 0.45));
        const dw = mw / maxDoors;

        if (item.type === "altar") {
          const t = 0.018;
          return (
            <group key={item.id}>
              <Box w={mw} h={t} d={depth} pos={[cx, cy + height / 2 - t / 2, cz]} color={C.altarFrame} />
              <Box w={mw} h={t} d={depth} pos={[cx, cy - height / 2 + t / 2, cz]} color={C.altarFrame} />
              <Box w={t} h={height} d={depth} pos={[cx - mw / 2 + t / 2, cy, cz]} color={C.altarFrame} />
              <Box w={t} h={height} d={depth} pos={[cx + mw / 2 - t / 2, cy, cz]} color={C.altarFrame} />
              <Box w={mw - t * 2} h={height - t * 2} d={0.012} pos={[cx, cy, cz - depth / 2 + 0.006]} color={C.altar} />
              <Box w={mw - 0.04} h={0.008} d={depth - t * 2 - 0.01} pos={[cx, cy - height * 0.08, cz + 0.005]} color="#c8a030" />
              <Label pos={[cx, cy + height / 2 + 0.14, cz + depth / 2]} text="Ông Táo" color="#92700a" icon="🙏" />
            </group>
          );
        }

        return (
          <group key={item.id}>
            <Box w={mw - 0.004} h={height} d={depth} pos={[cx, cy, cz]} color={C.cabinet} />
            {item.type === "hood" && (
              <>
                <RangeHood cx={cx} cy={cy} cz={cz} w={mw} h={height} />
                <Label pos={[cx, cy - height / 2 - 0.1, cz + depth / 2]} text="Hút Mùi" color="#374151" icon="💨" />
              </>
            )}
            {item.type === "dish-rack" && (
              <>
                <Box w={mw - 0.04} h={height - 0.1} d={0.01} pos={[cx, cy, cz + depth / 2 + 0.005]} color="#9ca3af" opacity={0.6} />
                <Label pos={[cx, cy, cz + depth / 2 + 0.02]} text="Kệ chén trên" color="#0369a1" icon="🍽️" />
              </>
            )}
            {(item.type === "drawer" || item.type === "dish-rack") && Array.from({ length: maxDoors }).map((_, di) => (
              <DoorRect key={di} w={dw - 0.008} h={height - 0.008} d={depth} cx={cx - mw / 2 + dw * (di + 0.5)} cy={cy} cz={cz} />
            ))}
          </group>
        );
      })}
    </>
  );
}

/* ─── Lower Cabinet Row ─── */
function LowerRow({ items, height, depth }: {
  items: ModuleLayoutItem[]; height: number; depth: number;
}) {
  const cy = height / 2;
  const cz = -depth / 2;
  const topY = height + 0.028;

  let currentX = 0;

  return (
    <>
      {items.map((item, i) => {
        const mw = item.width;
        if (mw <= 0) return null;
        const cx = currentX + mw / 2;
        currentX += mw;

        const maxDoors = Math.max(1, Math.round(mw / 0.6));
        const dw = mw / maxDoors;

        const col = 
          item.type === "sink" ? C.sink : 
          item.type === "stove" ? C.stove : 
          item.type === "dw" ? C.dishwasher : 
          item.type === "rice" ? C.rice : 
          item.type === "spice" ? C.spice : 
          item.type === "dish-rack" ? C.dishRack : C.cabinet;

        return (
          <group key={item.id}>
            <Box w={mw - 0.004} h={height} d={depth} pos={[cx, cy, cz]} color={col} />
            
            {item.type === "sink" && (
              <>
                <SinkBasin cx={cx} cy={topY + 0.01} cz={cz} w={mw} d={depth} />
                <Label pos={[cx, topY + 0.22, cz + depth / 2 + 0.02]} text="Bồn Rửa" color="#1a6e98" icon="🚿" />
                {Array.from({ length: 2 }).map((_, di) => (
                  <DoorRect key={di} w={mw / 2 - 0.008} h={height - 0.008} d={depth} cx={cx - mw / 2 + (mw / 2) * (di + 0.5)} cy={cy} cz={cz} />
                ))}
              </>
            )}
            
            {item.type === "stove" && (
              <>
                <StoveTop cx={cx} cy={topY} cz={cz} w={mw} d={depth} />
                <Label pos={[cx, topY + 0.12, cz + depth / 2 + 0.02]} text="Bếp Nấu" color="#b45309" icon="🔥" />
                {Array.from({ length: 2 }).map((_, di) => (
                  <DoorRect key={di} w={mw / 2 - 0.008} h={height - 0.008} d={depth} cx={cx - mw / 2 + (mw / 2) * (di + 0.5)} cy={cy} cz={cz} />
                ))}
              </>
            )}

            {item.type === "dw" && (
              <>
                <DoorRect w={mw - 0.008} h={height - 0.008} d={depth} cx={cx} cy={cy} cz={cz} />
                <Label pos={[cx, topY + 0.1, cz + depth / 2 + 0.02]} text="Máy Rửa Bát" color="#0e7490" icon="🍽️" />
              </>
            )}

            {item.type === "dish-rack" && (
              <>
                {/* 2 large drawers */}
                <DoorRect w={mw - 0.008} h={height * 0.48} d={depth} cx={cx} cy={cy + height * 0.24} cz={cz} />
                <DoorRect w={mw - 0.008} h={height * 0.48} d={depth} cx={cx} cy={cy - height * 0.24} cz={cz} />
                <Label pos={[cx, topY + 0.1, cz + depth / 2 + 0.02]} text="Tủ Chén Bát" color="#0369a1" icon="🥣" />
              </>
            )}

            {item.type === "spice" && (
              <>
                {/* Vertical pull out */}
                <DoorRect w={mw - 0.008} h={height - 0.008} d={depth} cx={cx} cy={cy} cz={cz} />
                <Label pos={[cx, topY + 0.1, cz + depth / 2 + 0.02]} text="Gia Vị" color="#6d28d9" icon="🧂" />
              </>
            )}

            {item.type === "rice" && (
              <>
                {/* Small rice hole graphic */}
                <DoorRect w={mw - 0.008} h={height - 0.008} d={depth} cx={cx} cy={cy} cz={cz} />
                <Box w={mw * 0.4} h={0.15} d={0.015} pos={[cx, cy + 0.1, cz + depth / 2 + 0.005]} color="#fcd34d" edgeColor="#d97706" />
                <Label pos={[cx, topY + 0.1, cz + depth / 2 + 0.02]} text="Tủ Gạo" color="#d97706" icon="🌾" />
              </>
            )}

            {item.type === "drawer" && Array.from({ length: maxDoors }).map((_, di) => (
              <group key={di}>
                <DoorRect w={dw - 0.008} h={height * 0.3} d={depth} cx={cx - mw / 2 + dw * (di + 0.5)} cy={cy + height * 0.32} cz={cz} />
                <DoorRect w={dw - 0.008} h={height * 0.55} d={depth} cx={cx - mw / 2 + dw * (di + 0.5)} cy={cy - height * 0.18} cz={cz} />
              </group>
            ))}
          </group>
        );
      })}

      {/* Countertop */}
      <Box w={currentX} h={0.028} d={depth + 0.04} pos={[currentX / 2, height + 0.014, cz]} color={C.countertop} edgeColor="#8a8070" />
    </>
  );
}

function splitModules(items: ModuleLayoutItem[], maxA: number, maxB: number) {
  const fixedTotal = items.filter(i => !i.flex).reduce((acc, i) => acc + i.width, 0);
  const flexCount = items.filter(i => i.flex).length;
  const spaceLeft = Math.max(0, maxA + maxB - fixedTotal);
  const flexWidth = flexCount > 0 ? spaceLeft / flexCount : 0;

  const segA: ModuleLayoutItem[] = [];
  const segB: ModuleLayoutItem[] = [];
  let currA = 0;
  let currB = 0;

  for (const item of items) {
    let mw = item.flex ? flexWidth : item.width;
    if (mw <= 0) continue;

    if (currA < maxA) {
      if (currA + mw <= maxA + 0.001) {
        segA.push({ ...item, width: mw });
        currA += mw;
      } else {
        if (item.flex) {
          const partA = maxA - currA;
          if (partA > 0) {
            segA.push({ ...item, id: item.id + "_A", width: partA });
            currA += partA;
          }
          const partB = mw - partA;
          if (maxB > 0 && partB > 0) {
            segB.push({ ...item, id: item.id + "_B", width: partB });
            currB += partB;
          }
        } else {
          const filler = maxA - currA;
          if (filler > 0) {
            segA.push({ id: item.id + "_filler", type: "drawer", width: filler, flex: false });
            currA += filler;
          }
          if (maxB > 0) {
            const placedW = Math.min(mw, maxB - currB);
            segB.push({ ...item, width: placedW });
            currB += placedW;
          }
        }
      }
    } else if (maxB > 0 && currB < maxB) {
      const placedW = Math.min(mw, maxB - currB);
      segB.push({ ...item, width: placedW });
      currB += placedW;
    }
  }

  if (currA < maxA) {
    segA.push({ id: "end_fill_A", type: "drawer", width: maxA - currA, flex: false });
  }
  if (maxB > 0 && currB < maxB) {
    segB.push({ id: "end_fill_B", type: "drawer", width: maxB - currB, flex: false });
  }

  return { segA, segB };
}

/* ─── Full scene ─── */
function KitchenSceneInner({ config }: { config: KitchenConfig }) {
  const { layout, lengthA, lengthB, upperHeight, upperDepth, lowerHeight, lowerDepth, lowerModules, upperModules } = config;
  const LA = mm(lengthA);
  const LB = mm(lengthB);
  const uh = mm(upperHeight);
  const ud = mm(upperDepth);
  const lh = mm(lowerHeight);
  const ld = mm(lowerDepth);
  const wallY = lh + 0.28;
  const cs = Math.max(ld, ud);

  const camTargetX = LA / 2;
  const camTargetZ = layout === "L" ? (LB / 2 - cs) : -ld / 2;
  const camDist = Math.max(LA, layout === "L" ? LB : 0) * 1.6 + 2;

  const maxLowA = layout === "L" ? LA - cs : LA;
  const maxLowB = layout === "L" ? LB - cs : 0;
  const maxUpA = layout === "L" ? LA - cs : LA;
  const maxUpB = layout === "L" ? LB - cs : 0;

  const lowSplit = splitModules(lowerModules.map(m => ({...m, width: mm(m.width)})), maxLowA, maxLowB);
  const upSplit = splitModules(upperModules.map(m => ({...m, width: mm(m.width)})), maxUpA, maxUpB);

  return (
    <>
      <PerspectiveCamera makeDefault fov={42} position={[camTargetX + camDist * 0.55, camDist * 0.72, camTargetZ + camDist * 0.9]} />
      <OrbitControls target={[camTargetX, lh * 0.7, camTargetZ]} minDistance={1.5} maxDistance={14} maxPolarAngle={Math.PI / 2.05} enablePan />
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 7, 5]} intensity={1.1} castShadow />
      <directionalLight position={[-2, 3, -3]} intensity={0.35} color="#b0c8e0" />

      {/* Floor & Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[camTargetX, -0.001, camTargetZ]} receiveShadow>
        <planeGeometry args={[LA * 3 + 4, (layout === "L" ? LB : LA) * 3 + 4]} />
        <meshStandardMaterial color={C.floor} roughness={0.9} />
      </mesh>
      <Grid args={[20, 20]} position={[camTargetX, -0.002, camTargetZ]} cellColor="#8898aa" sectionColor="#607080" cellSize={0.5} fadeDistance={14} fadeStrength={1.5} infiniteGrid />

      {/* Wall A */}
      <Box w={LA} h={2.6} d={0.04} pos={[LA / 2, 1.3, -cs - 0.02]} color={C.wall} edgeColor="#b0b8c4" opacity={0.28} />

      {/* ── Segment A ── */}
      <group>
        <LowerRow items={lowSplit.segA} height={lh} depth={ld} />
        <UpperRow items={upSplit.segA} height={uh} depth={ud} wallY={wallY} />
      </group>

      {/* ── L-Shape segment B ── */}
      {layout === "L" && (
        <>
          <Box w={0.04} h={2.6} d={LB} pos={[LA + 0.02, 1.3, LB / 2 - cs]} color={C.wall} edgeColor="#b0b8c4" opacity={0.28} />
          {/* Corner units */}
          <Box w={cs} h={lh} d={cs} pos={[LA - cs / 2, lh / 2, -cs / 2]} color={C.corner} />
          <Box w={cs + 0.042} h={0.028} d={cs + 0.042} pos={[LA - cs / 2, lh + 0.014, -cs / 2]} color={C.countertop} />
          <Box w={cs} h={uh} d={cs} pos={[LA - cs / 2, wallY + uh / 2, -cs / 2]} color={C.corner} />

          <group position={[LA - cs, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <LowerRow items={lowSplit.segB} height={lh} depth={ld} />
            <UpperRow items={upSplit.segB} height={uh} depth={ud} wallY={wallY} />
          </group>
        </>
      )}
    </>
  );
}

export function KitchenScene({ config }: { config: KitchenConfig }) {
  return <Canvas shadows gl={{ antialias: true, alpha: false }} style={{ background: "#0f172a" }}><KitchenSceneInner config={config} /></Canvas>;
}
