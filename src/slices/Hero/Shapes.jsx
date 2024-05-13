"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [prevCursorPos, setPrevCursorPos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    setPrevCursorPos({ x: cursorPos.x, y: cursorPos.y });
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0"
      onMouseMove={handlePointerMove}
    >
      <Canvas
        className="z=0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries cursorPos={cursorPos} prevCursorPos={prevCursorPos} />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="dawn" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries({ cursorPos, prevCursorPos }) {
    const geometries = [
        {
          position: [0, 0, 0],
          r: 0.3,
          geometry: new THREE.DodecahedronGeometry(3), //Gem
        },
        {
          position: [1, -0.75, 4],
          r: 0.4,
          geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), //pill
        },
        {
          position: [-1.4, 2, -4],
          r: 0.6,
          geometry: new THREE.TetrahedronGeometry(1.6), //football
        },
        {
          position: [-0.8, -0.75, 5],
          r: 0.5,
          geometry: new THREE.TorusGeometry(0.6, 0.25, 18, 32), //donut
        },
        {
          position: [2, 1.75, -5],
          r: 0.7,
          geometry: new THREE.OctahedronGeometry(1.6), //diamond
        },
        // Add more geometries if needed
      ];
    
      const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0xffd32a, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x718093, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x66f950, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0xff0109, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x1B1464, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x8854d0, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x6D214F, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0xF97F51, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x55E6C1, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0xf78fb3, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x63cdda, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x808e9b, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0xf53b57, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0x4bcffa, roughness: 0.2, metalness: 1 }),
        new THREE.MeshStandardMaterial({ color: 0xfff200, roughness: 0.2, metalness: 1 }),
        // Add more materials as needed
      ];

    const soundEffects = [
        // new Audio("/sounds/knock1.ogg"),
        // new Audio("/sounds/soothing-bg.ogg"),
        new Audio("/sounds/knock7.ogg"),    
    ]

    

  return geometries.map(({ position, r, geometry }, index) => (
    <Geometry
      key={index}
      position={position.map((p) => p * 2)}
      soundEffects={soundEffects}
      geometry={geometry}
      materials={materials}
      r={r}
      cursorPos={cursorPos}
      prevCursorPos={prevCursorPos}
    />
  ));
}

function Geometry({ r, position, geometry, materials, soundEffects, cursorPos, prevCursorPos }) {
    const meshRef = useRef();
    const [visible, setVisible] = useState(true);
  
    const startingMaterial = useRef(getRandomMaterial());
  
    function getRandomMaterial() {
      return gsap.utils.random(materials);
    }
  
    function handleClick(e) {
      const mesh = e.object;
  
      gsap.utils.random(soundEffects).play();
    
      gsap.to(mesh.rotation, {
        x: `+=${gsap.utils.random(0, 3)}`,
        y: `+=${gsap.utils.random(0, 3)}`,
        z: `+=${gsap.utils.random(0, 3)}`,
        duration: 1.4,
        ease: "back.out(1.7)",
      });
      mesh.material = getRandomMaterial();
    }
  
    const handlePointerOver = () => {
      document.body.style.cursor = "pointer";
    };
    const handlePointerOut = () => {
      document.body.style.cursor = "default";
    };
  
    useEffect(() => {
      if (cursorPos.x !== prevCursorPos.x) {
        const deltaX = cursorPos.x - prevCursorPos.x;
        const deltaY = cursorPos.y - prevCursorPos.y;
        gsap.to(meshRef.current.position, {
          x: position[0] + deltaX * 0.004, // Adjust the movement speed as needed
          y: position[1] - deltaY * 0.004,
          duration: 0.6,
          ease: "circ.out",
        });
      }
    }, [cursorPos, prevCursorPos, position]);
  
    useEffect(() => {
      let ctx = gsap.context(() => {
        setVisible(true);
        gsap.from(meshRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 2,
          ease: "circ.out",
          delay: 0.4,
        });
      });
      return () => ctx.revert(); // Cleanup
    }, []);
  
    return (
      <group position={position} ref={meshRef}>
        <Float speed={8 * r} rotationIntensity={14 * r} floatIntensity={9 * r}>
          <mesh
            geometry={geometry}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            visible={visible}
            material={startingMaterial.current}
          />
        </Float>
      </group>
    );
  }
  