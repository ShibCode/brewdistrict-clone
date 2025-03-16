import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useControls } from "leva";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  models,
  modelTransitionConfig,
  useModel,
} from "../../context/ModelProvider";
import useStageEffect from "../../hooks/useStageEffect";

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
  const { color } = useControls({ color: "#ffe6e7" });

  return (
    <Canvas
      gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
      className="!absolute !h-[100vw] !pointer-events-none"
    >
      <directionalLight position={[4, -0.5, 0.5]} intensity={4} color={color} />
      <directionalLight position={[-3, -0.5, 1]} intensity={4} color={color} />
      <ambientLight intensity={0.5} color={"white"} />
      <Model />
    </Canvas>
  );
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { activeModel, inactiveModels } = useModel();

  const group = useRef<THREE.Group | null>(null);
  const { nodes, materials } = useGLTF(
    "/beer-model/beer-model-1-compressed.gltf"
  ) as GLTFResult;

  const initialPosition = useRef({ x: 0, y: 1, z: 0 });

  const phase1Rotation = useRef({ x: 0, y: 0, z: 0 });
  const transitionRotation = useRef({ x: 0, y: 0, z: 0 });
  const phase2Rotation = useRef({ x: 0, y: 0, z: 0 });

  const modelChangeRotation = useRef(0);
  const modelChangePositionY = useRef(0);

  useStageEffect(
    () => {
      gsap.to([materials[activeModel], materials["Mat.1"]], {
        opacity: 1,
        delay: 0.75,
        duration: 0.75,
        ease: "sine.out",
      });

      gsap.fromTo(
        modelChangeRotation,
        { current: Math.PI * 0 },
        { current: Math.PI * 2, duration: 0.75, delay: 0.75, ease: "sine.out" }
      );

      gsap.to(initialPosition.current, {
        y: 0,
        duration: 0.4,
        delay: 0.75,
        ease: "sine.out",
      });
    },
    () => {
      const inactiveMaterials = inactiveModels.map((model) => materials[model]);

      gsap.fromTo(
        modelChangeRotation,
        { current: Math.PI * 0 },
        { current: Math.PI * -4, ...modelTransitionConfig }
      );

      gsap
        .timeline({
          defaults: {
            ...modelTransitionConfig,
            duration: Number(modelTransitionConfig.duration) * 0.5,
          },
        })
        .to(modelChangePositionY, { current: 0.3 })
        .to(modelChangePositionY, { current: 0 });

      gsap.to(materials[activeModel], {
        opacity: 1,
        ...modelTransitionConfig,
        onComplete: () => {
          gsap.set(inactiveMaterials, { opacity: 0 });
        },
      });
    },
    [activeModel]
  );

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
        .to(phase1Rotation.current, { x: Math.PI * 2, z: Math.PI * 2 })
        .to(group.current.scale, { x: 0.155, y: 0.155, z: 0.155 }, 0);

      // transition rotation (from phase 1 to phase 2)
      new ScrollTrigger({
        trigger: "#about-section",
        start: "top 25%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(transitionRotation.current, {
            z: Math.PI * 2,
            duration: 1,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(transitionRotation.current, {
            z: Math.PI * 0,
            duration: 1,
            ease: "power3.out",
          });
        },
      });

      // phase 2 rotation
      const phase2BaseTrigger: ScrollTrigger.Vars = {
        trigger: "#about-section",
        endTrigger: "#canvas2-scrollarea",
        start: "center center",
        end: "bottom bottom",
        scrub: 0.5,
      };

      gsap
        .timeline({ scrollTrigger: phase2BaseTrigger })
        .to(phase2Rotation.current, {
          x: Math.PI * 0.5,
          y: Math.PI * 0.5,
          ease: "none",
        })
        .to(phase2Rotation.current, {
          y: Math.PI * 1.5,
          ease: "none",
        });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  useFrame(({ clock }) => {
    if (!group.current) return;

    const time = clock.getElapsedTime();

    group.current.position.y =
      Math.sin(0.5 * time) * 0.1 +
      modelChangePositionY.current +
      initialPosition.current.y -
      0.12;

    group.current.rotation.x =
      Math.PI * 1.5 +
      phase1Rotation.current.x +
      transitionRotation.current.x +
      phase2Rotation.current.x +
      Math.max(-0.125, Math.sin(time * 0.2 + 0.5) * 0.2);

    group.current.rotation.y =
      phase1Rotation.current.y +
      transitionRotation.current.y +
      phase2Rotation.current.y +
      Math.sin(time * 0.5 + 0.5) * 0.1;

    group.current.rotation.z =
      -0.6 +
      phase1Rotation.current.z +
      transitionRotation.current.z +
      phase2Rotation.current.z -
      modelChangeRotation.current;
  });

  return (
    <group ref={group} {...props} scale={0.175} dispose={null}>
      <group>
        <group name="groep_brewdistrict_blikjes" rotation={[0.05, 0.05, 0]}>
          <mesh
            name="0"
            geometry={nodes["0"].geometry}
            material={materials["Mat.1"]}
            position={[0.013, 0.027, 0.021]}
            rotation={[1.568, 0, 0]}
            material-transparent
            material-opacity={0}
          />

          {models.map((model) => (
            <mesh
              key={model}
              name={model}
              renderOrder={model === activeModel ? 1 : 0}
              geometry={nodes[model].geometry}
              material={materials[model]}
              position={[0.013, 0.027, 0.021]}
              rotation={[1.568, 0, 0]}
              material-transparent
              material-opacity={0}
            />
          ))}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/beer-model/beer-model-1-compressed.gltf");

export default ModelWrapper;
