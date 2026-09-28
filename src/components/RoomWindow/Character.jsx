import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

const SKIN = '#f0c4a0';
const HAIR = '#3b2a20';
const HOODIE = '#2774ae'; // UCLA blue
const PANTS = '#2b2d3a';
const SHOES = '#f2efe9';

function Arm({ groupRef, side }) {
  return (
    <group ref={groupRef} position={[side * 0.5, 2.0, 0]} rotation={[0, 0, side * 0.12]}>
      <mesh position={[0, -0.32, 0]}>
        <capsuleGeometry args={[0.13, 0.42, 8, 16]} />
        <meshStandardMaterial color={HOODIE} roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} />
      </mesh>
    </group>
  );
}

function Leg({ side }) {
  return (
    <group position={[side * 0.2, 0, 0]}>
      <mesh position={[0, 1.0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.16, 0.5, 8, 16]} />
        <meshStandardMaterial color={PANTS} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.55, 0.62]}>
        <capsuleGeometry args={[0.14, 0.5, 8, 16]} />
        <meshStandardMaterial color={PANTS} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.16, 0.72]}>
        <boxGeometry args={[0.28, 0.16, 0.5]} />
        <meshStandardMaterial color={SHOES} roughness={0.6} />
      </mesh>
    </group>
  );
}

// Cartoon stand-in built from primitives. Swap this component for a loaded GLB later.
export default function Character({ pointer, animate, ...props }) {
  const head = useRef();
  const torso = useRef();
  const rightArm = useRef();
  const leftArm = useRef();

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;

    // Head follows the cursor
    head.current.rotation.y = MathUtils.damp(head.current.rotation.y, px * 0.55, 4, delta);
    head.current.rotation.x = MathUtils.damp(head.current.rotation.x, -py * 0.25, 4, delta);

    if (!animate) return;

    torso.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
    head.current.position.y = 2.68 + Math.sin(t * 1.6) * 0.012;

    // Wave every ~7 seconds
    const phase = t % 7;
    const waving = phase < 1.8;
    const target = waving ? Math.PI * 0.8 + Math.sin(phase * 11) * 0.25 : 0.12;
    rightArm.current.rotation.z = MathUtils.damp(rightArm.current.rotation.z, target, 8, delta);
    leftArm.current.rotation.z = -0.12 + Math.sin(t * 1.6 + 1) * 0.015;
  });

  return (
    <group {...props}>
      {/* torso */}
      <mesh ref={torso} position={[0, 1.62, 0]}>
        <capsuleGeometry args={[0.4, 0.5, 8, 24]} />
        <meshStandardMaterial color={HOODIE} roughness={0.9} />
      </mesh>
      {/* gold hoodie stripe */}
      <mesh position={[0, 1.35, 0.4]}>
        <boxGeometry args={[0.5, 0.05, 0.03]} />
        <meshStandardMaterial color="#ffd100" roughness={0.8} />
      </mesh>

      <Arm groupRef={leftArm} side={-1} />
      <Arm groupRef={rightArm} side={1} />
      <Leg side={-1} />
      <Leg side={1} />

      {/* head */}
      <group ref={head} position={[0, 2.68, 0]}>
        <mesh>
          <sphereGeometry args={[0.58, 32, 32]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
        <mesh rotation={[-0.35, 0, 0]} position={[0, 0.04, -0.04]}>
          <sphereGeometry args={[0.62, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color={HAIR} roughness={0.85} />
        </mesh>
        {[-1, 1].map((s) => (
          <group key={s} position={[s * 0.2, 0.02, 0.5]}>
            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color="#1a1512" roughness={0.3} />
            </mesh>
            <mesh position={[0.02, 0.03, 0.05]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
        <mesh position={[0, -0.18, 0.52]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.13, 0.022, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#8a4a3a" roughness={0.6} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={`cheek${s}`} position={[s * 0.34, -0.12, 0.42]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#f0a090" roughness={0.9} transparent opacity={0.55} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
