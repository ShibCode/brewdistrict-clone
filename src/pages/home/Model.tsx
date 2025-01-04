import { useRef } from "react";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useControls } from "leva";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  const wrapper = useRef<HTMLDivElement>(null);

  const { color } = useControls({
    color: "#ffe6e7",
  });

  useGSAP(
    () => {
      gsap.to(wrapper.current, {
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          endTrigger: "#beers-section",
          end: "bottom bottom",
          scrub: true,
          pin: wrapper.current,
        },
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <div ref={wrapper} className="absolute w-full h-screen z-10 isolate">
      <Canvas
        gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
        className="!absolute w-full !h-[100vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <directionalLight
          position={[4, -0.5, 0.5]}
          intensity={4}
          color={color}
        />
        <directionalLight
          position={[-3, -0.5, 1]}
          intensity={4}
          color={color}
        />
        <ambientLight intensity={0.5} color={"white"} />
        <Model />
      </Canvas>
    </div>
  );
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group | null>(null);
  const { nodes, materials, animations } = useGLTF(
    "/beer-model/beer-model-1-compressed.gltf"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const scrollRotate = useRef({ x: 0, y: 0, z: 0 });

  useGSAP(
    () => {
      if (!group.current) return;

      const scrollTrigger = {
        trigger: "#hero-section",
        start: "top top",
        endTrigger: "#beers-section",
        end: "bottom bottom",
        scrub: true,
      };

      gsap
        .timeline({ defaults: { ease: "none" }, scrollTrigger })
        .to(scrollRotate.current, {
          x: Math.PI * 2,
          y: Math.PI * 2,
        })
        .to(group.current.scale, { x: 0.155, y: 0.155, z: 0.155 }, 0);
    },
    { dependencies: [], revertOnUpdate: true }
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (group.current) {
      group.current.position.x = -0.05;
      group.current.position.y = -0.3 + Math.sin(0.5 * time) * 0.1;

      group.current.rotation.set(
        scrollRotate.current.x -
          0.35 +
          Math.max(-0.025, Math.sin(time * 0.2 + 0.5) * 0.15),
        scrollRotate.current.y + 0.85,
        scrollRotate.current.z -
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
