import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useControls } from "leva";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

type ActionName = "animation_0";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    ["0"]: THREE.Mesh;
    Ipa: THREE.Mesh;
    Blond: THREE.Mesh;
    Stout: THREE.Mesh;
    Neipa: THREE.Mesh;
  };
  materials: {
    ["Mat.1"]: THREE.MeshStandardMaterial;
    Ipa: THREE.MeshStandardMaterial;
    Blond: THREE.MeshStandardMaterial;
    Stout: THREE.MeshStandardMaterial;
    Neipa: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

const ModelWrapper = () => {
  const { color } = useControls({
    color: "#ffe6e7",
  });

  return (
    <Canvas
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      className="!absolute !h-[100vw]"
    >
      <directionalLight position={[4, -0.5, 0.5]} intensity={4} color={color} />
      <directionalLight position={[-3, -0.5, 1]} intensity={4} color={color} />
      <ambientLight intensity={0.5} color={"white"} />
      <Model />
    </Canvas>
  );
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group | null>(null);
  const { nodes, materials } = useGLTF(
    "/beer-model/beer-model-1-compressed.gltf"
  ) as GLTFResult;

  const phase1Rotation = useRef({ x: 0, y: 0, z: 0 });
  const transitionRotation = useRef({ x: 0, y: 0, z: 0 });
  const phase2Rotation = useRef({ x: 0, y: 0, z: 0 });

  useGSAP(
    () => {
      if (!group.current) return;

      // phase 1 rotation
      const phase1Trigger: ScrollTrigger.Vars = {
        trigger: "#hero-section",
        start: "top top",
        endTrigger: "#beers-section",
        end: "bottom bottom",
        scrub: true,
      };

      gsap
        .timeline({ defaults: { ease: "none" }, scrollTrigger: phase1Trigger })
        .to(phase1Rotation.current, { x: Math.PI * 2, y: Math.PI * 2 })
        .to(group.current.scale, { x: 0.155, y: 0.155, z: 0.155 }, 0);

      // transition rotation (from phase 1 to phase 2)
      new ScrollTrigger({
        trigger: "#about-section",
        start: "top 25%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(transitionRotation.current, {
            y: Math.PI * 2,
            duration: 1,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(transitionRotation.current, {
            y: Math.PI * 0,
            duration: 1,
            ease: "power3.out",
          });
        },
      });

      // phase 2 rotation
      const phase2BaseTrigger: ScrollTrigger.Vars = {
        trigger: "#about-section",
        endTrigger: "#canvas2-scrollarea",
        end: "bottom bottom",
        scrub: true,
      };

      gsap.to(phase2Rotation.current, {
        y: 5.2,
        z: 1.24,
        ease: "none",
        scrollTrigger: { ...phase2BaseTrigger, start: "top 25%" },
      });

      gsap.to(phase2Rotation.current, {
        x: -0.83,
        ease: "none",
        scrollTrigger: { ...phase2BaseTrigger, start: "bottom 30%" },
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (group.current) {
      group.current.position.x = -0.05;
      group.current.position.y = -0.225 + Math.sin(0.5 * time) * 0.1;

      group.current.rotation.set(
        phase1Rotation.current.x +
          transitionRotation.current.x +
          phase2Rotation.current.x -
          0.35 +
          Math.max(-0.025, Math.sin(time * 0.2 + 0.5) * 0.15),
        phase1Rotation.current.y +
          transitionRotation.current.y +
          phase2Rotation.current.y +
          0.85,
        phase1Rotation.current.z +
          transitionRotation.current.z +
          phase2Rotation.current.z -
          0.72 +
          Math.max(-0.075, Math.sin(time * 0.2 + 0.5) * 0.2)
      );
    }
  });

  return (
    <group ref={group} {...props} scale={0.175} dispose={null}>
      <group>
        <group
          name="groep_brewdistrict_blikjes"
          position={[-0.15, 0.891, 0.013]}
          rotation={[-1.29, -0.92, -1.297]}
        >
          <mesh
            name="0"
            geometry={nodes["0"].geometry}
            material={materials["Mat.1"]}
            position={[0.013, 0.027, 0.021]}
            rotation={[1.568, 0, 0]}
          />
          <mesh
            name="Stout"
            geometry={nodes.Stout.geometry}
            material={materials.Stout}
            position={[0.013, 0.027, 0.021]}
            rotation={[1.568, 0, 0]}
          />
          {/* <mesh
            name="Ipa"
            geometry={nodes.Ipa.geometry}
            material={materials.Ipa}
            position={[0.013, 0.027, 0.021]}
            rotation={[1.568, 0, 0]}
          />
          <mesh
            name="Blond"
            geometry={nodes.Blond.geometry}
            material={materials.Blond}
            position={[0.013, 0.027, 0.021]}
            rotation={[1.568, 0, 0]}
          /> 
          <mesh
            name="Neipa"
            geometry={nodes.Neipa.geometry}
            material={materials.Neipa}
            position={[0.013, 0.027, 0.021]}
            rotation={[1.568, 0, 0]}
          />*/}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/beer-model/beer-model-1-compressed.gltf");

export default ModelWrapper;
