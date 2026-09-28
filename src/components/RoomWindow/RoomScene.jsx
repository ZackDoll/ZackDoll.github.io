import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import { MathUtils, Vector3 } from 'three';
// Character model removed for now — see Character.jsx to bring it back.

const WALL = '#4a4139';
const FLOOR = '#3b332c';
const WOOD = '#8a6a4a';
const CAM_BASE = new Vector3(5.6, 4.4, 7.4);
const CAM_INTRO = new Vector3(9, 6.5, 12);
const LOOK_AT = new Vector3(0, 1.7, -0.4);

function Room() {
  return (
    <group>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[6.4, 0.2, 6.4]} />
        <meshStandardMaterial color={FLOOR} roughness={1} />
      </mesh>
      <mesh position={[0, 2, -3.2]}>
        <boxGeometry args={[6.4, 4, 0.2]} />
        <meshStandardMaterial color={WALL} roughness={1} />
      </mesh>
      <mesh position={[-3.2, 2, 0]}>
        <boxGeometry args={[0.2, 4, 6.4]} />
        <meshStandardMaterial color={WALL} roughness={1} />
      </mesh>
      {/* baseboards */}
      <mesh position={[0, 0.12, -3.08]}>
        <boxGeometry args={[6.2, 0.24, 0.04]} />
        <meshStandardMaterial color="#5a4f45" roughness={1} />
      </mesh>
      <mesh position={[-3.08, 0.12, 0]}>
        <boxGeometry args={[0.04, 0.24, 6.2]} />
        <meshStandardMaterial color="#5a4f45" roughness={1} />
      </mesh>
    </group>
  );
}

function Desk() {
  const legs = [[-1.3, -0.45], [1.3, -0.45], [-1.3, 0.45], [1.3, 0.45]];
  return (
    <group position={[0.2, 0, -2.4]}>
      <RoundedBox args={[3, 0.12, 1.3]} radius={0.04} position={[0, 1.15, 0]}>
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </RoundedBox>
      {legs.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.55, z]}>
          <boxGeometry args={[0.1, 1.1, 0.1]} />
          <meshStandardMaterial color="#2d2926" roughness={0.6} />
        </mesh>
      ))}
      {/* monitor */}
      <mesh position={[0, 1.3, -0.2]}>
        <boxGeometry args={[0.12, 0.3, 0.1]} />
        <meshStandardMaterial color="#1f1c1a" />
      </mesh>
      <RoundedBox args={[1.5, 0.9, 0.07]} radius={0.03} position={[0, 1.9, -0.2]}>
        <meshStandardMaterial color="#1f1c1a" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 1.9, -0.16]}>
        <planeGeometry args={[1.4, 0.8]} />
        <meshStandardMaterial color="#1b2a38" emissive="#2a5a86" emissiveIntensity={0.55} />
      </mesh>
      {[0.25, 0.1, -0.05, -0.2].map((y, i) => (
        <mesh key={y} position={[-0.25 + i * 0.05, 1.9 + y, -0.15]}>
          <planeGeometry args={[0.6 - i * 0.08, 0.04]} />
          <meshBasicMaterial color={i % 2 ? '#d4a574' : '#7fb4e0'} />
        </mesh>
      ))}
      {/* keyboard */}
      <RoundedBox args={[0.9, 0.04, 0.3]} radius={0.015} position={[0, 1.23, 0.3]}>
        <meshStandardMaterial color="#d9d3ca" roughness={0.6} />
      </RoundedBox>
    </group>
  );
}

function Chair() {
  return (
    <group position={[0.2, 0, -0.9]} rotation={[0, 0.35, 0]}>
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.12, 32]} />
        <meshStandardMaterial color="#2d2926" roughness={0.8} />
      </mesh>
      <RoundedBox args={[0.9, 1.1, 0.14]} radius={0.06} position={[0, 1.5, -0.5]}>
        <meshStandardMaterial color="#2d2926" roughness={0.8} />
      </RoundedBox>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 12]} />
        <meshStandardMaterial color="#1a1817" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.06, 5]} />
        <meshStandardMaterial color="#1a1817" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

// Dollies the camera in on load, then drifts it slightly with the cursor.
function Rig({ pointer, animate }) {
  const intro = useRef(animate ? 0 : 1);
  const target = useRef(new Vector3());

  useFrame(({ camera }, delta) => {
    intro.current = Math.min(1, intro.current + delta / 2);
    const eased = 1 - Math.pow(1 - intro.current, 3);
    target.current
      .copy(CAM_INTRO)
      .lerp(CAM_BASE, eased)
      .add(new Vector3(pointer.current.x * 0.7, pointer.current.y * -0.4, 0));
    camera.position.lerp(target.current, 1 - Math.exp(-6 * delta));
    camera.lookAt(LOOK_AT);
  });
  return null;
}

export default function RoomScene({ active }) {
  const pointer = useRef({ x: 0, y: 0 });
  const animate = useRef(!window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = MathUtils.clamp((e.clientX / window.innerWidth) * 2 - 1, -1, 1);
      pointer.current.y = MathUtils.clamp((e.clientY / window.innerHeight) * 2 - 1, -1, 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 2]}
      camera={{ fov: 32, position: CAM_INTRO.toArray() }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 8, 6]} intensity={1.6} color="#ffe2bd" />
      <pointLight position={[0.2, 2.1, -1.8]} intensity={4} distance={4} color="#6aa6dc" />
      <Room />
      <Desk />
      <Chair />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={8} blur={2.4} far={3.5} />
      <Rig pointer={pointer} animate={animate} />
    </Canvas>
  );
}
