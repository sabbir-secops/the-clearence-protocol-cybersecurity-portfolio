"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

type SystemMode =
  | "public"
  | "security"
  | "infrastructure"
  | "intelligence"
  | "restricted"
  | "connection";

type SystemSectionDetail = {
  id: string;
  label: string;
  clearance: string;
  mode: SystemMode;
  accent: string;
  rgb: string;
  energy: number;
  index: number;
};

type SystemProgressDetail = {
  id: string;
  pageProgress: number;
  sectionProgress: number;
  direction: string;
};

type CinematicDetail = {
  id: string;
};

type ReducedMotionDetail = {
  enabled: boolean;
};

type PerformanceProfileDetail = {
  maxDpr?: number;
  motionScale?: number;
  ambientDensity?: number;
};

type VisibilityDetail = {
  hidden?: boolean;
};

type LogicStageDetail = {
  index: number;
  name: string;
  progress: number;
};

type CapabilityClusterDetail = {
  id: string;
  number: string;
  title: string;
};

type SecurityLayerDetail = {
  id: string;
  number: string;
  name: string;
  status: string;
};

type SecurityLayerKey =
  | "application"
  | "vulnerability"
  | "mobile"
  | "infrastructure"
  | "network"
  | "intelligence";

type ArchiveProjectDetail = {
  id: string;
  code: string;
  name: string;
  type: string;
  status: string;
  classified: boolean;
};

type ArchiveProjectKey =
  | "hostsecual"
  | "aged"
  | "leemeo"
  | "softparallax"
  | "security-labs"
  | "classified";

type InfrastructureLayerDetail = {
  id: string;
  number: string;
  name: string;
  status: string;
  index: number;
};

type InfrastructureLayerKey =
  | "client"
  | "dns"
  | "edge"
  | "defense"
  | "server"
  | "container"
  | "application"
  | "data";

type SearchLayerDetail = {
  id: string;
  number: string;
  name: string;
  status: string;
  index: number;
};

type SearchLayerKey =
  | "performance"
  | "vitals"
  | "technical"
  | "architecture"
  | "structured"
  | "semantic"
  | "aeo"
  | "geo";

type ResearchNodeDetail = {
  id: string;
  number: string;
  name: string;
  status: string;
  index: number;
};

type ResearchNodeKey =
  | "security"
  | "technical"
  | "ai"
  | "llm"
  | "rag"
  | "visualization"
  | "interactive"
  | "documentation";

type ClassifiedState =
  | "idle"
  | "scanning"
  | "denied";

type ClassifiedStateDetail = {
  state: ClassifiedState;
  recovered: number;
  total: number;
};

type ContactState =
  | "idle"
  | "submitting"
  | "success"
  | "activation"
  | "error";

type ContactStateDetail = {
  state: ContactState;
};

type RealCoreModelProps = {
  onReady: (
    materials: THREE.MeshStandardMaterial[]
  ) => void;
};

const SYSTEM_COUNT = 8;

const SYSTEM_MODES: SystemMode[] = [
  "public",
  "security",
  "infrastructure",
  "intelligence",
  "restricted",
  "connection",
];

const MODEL_PATH =
  "/models/core/core-v1.glb";

const MODEL_SCALE =
  4.65;

const MODEL_FRONT_ROTATION_Y =
  Math.PI / 2;

const INFRASTRUCTURE_BLUE =
  new THREE.Color(
    "#1f7194"
  );

const SECURITY_CYAN =
  new THREE.Color(
    "#55ddff"
  );

const INTELLIGENCE_VIOLET =
  new THREE.Color(
    "#786dff"
  );

const PRODUCT_WHITE =
  new THREE.Color(
    "#dff8ff"
  );

const RESTRICTED_AMBER =
  new THREE.Color(
    "#ffb84d"
  );

function clamp01(
  value: number
) {
  return Math.min(
    Math.max(
      value,
      0
    ),
    1
  );
}

function activationRange(
  value: number,
  start: number,
  end: number
) {
  const normalized =
    clamp01(
      (value - start) /
        (end - start)
    );

  return (
    normalized *
    normalized *
    (
      3 -
      2 * normalized
    )
  );
}

function smoothValue(
  current: number,
  target: number,
  speed: number,
  delta: number
) {
  const amount =
    1 -
    Math.exp(
      -speed * delta
    );

  return THREE.MathUtils.lerp(
    current,
    target,
    amount
  );
}

function AdaptiveCamera() {
  const {
    size,
  } = useThree();

  const cameraSettings =
    useMemo(() => {
      let distance = 7;
      let fieldOfView = 42;

      if (
        size.width <= 360
      ) {
        distance = 10;
        fieldOfView = 49;
      } else if (
        size.width < 430
      ) {
        distance = 9.5;
        fieldOfView = 48;
      } else if (
        size.width < 640
      ) {
        distance = 9;
        fieldOfView = 47;
      } else if (
        size.width < 768
      ) {
        distance = 8.6;
        fieldOfView = 46;
      } else if (
        size.width < 1024
      ) {
        distance = 8;
        fieldOfView = 45;
      } else if (
        size.width < 1280
      ) {
        distance = 7.4;
        fieldOfView = 43;
      }

      return {
        distance,
        fieldOfView,
      };
    }, [
      size.width,
    ]);

  return (
    <PerspectiveCamera
      makeDefault
      position={[
        0,
        0,
        cameraSettings.distance,
      ]}
      fov={
        cameraSettings.fieldOfView
      }
      near={0.1}
      far={100}
    />
  );
}

function AdaptiveRenderer() {
  const {
    gl,
  } = useThree();

  useEffect(() => {
    const applyMaxDpr =
      (
        maxDpr: number
      ) => {
        const nextDpr =
          Math.min(
            window.devicePixelRatio ||
              1,
            Math.min(
              Math.max(
                maxDpr,
                1
              ),
              1.35
            )
          );

        gl.setPixelRatio(
          nextDpr
        );
      };

    const handlePerformanceProfile =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<PerformanceProfileDetail>;

        const maxDpr =
          customEvent.detail
            ?.maxDpr;

        if (
          typeof maxDpr !==
          "number"
        ) {
          return;
        }

        applyMaxDpr(
          maxDpr
        );
      };

    applyMaxDpr(
      1.35
    );

    window.addEventListener(
      "system:performance-profile",
      handlePerformanceProfile
    );

    window.dispatchEvent(
      new CustomEvent(
        "system:performance-query"
      )
    );

    return () => {
      window.removeEventListener(
        "system:performance-profile",
        handlePerformanceProfile
      );
    };
  }, [
    gl,
  ]);

  return null;
}

function RenderLoopController({
  active,
}: {
  active: boolean;
}) {
  const {
    invalidate,
    setFrameloop,
  } = useThree();

  useEffect(() => {
    const applyLoopState =
      (
        hidden: boolean
      ) => {
        if (
          !active ||
          hidden
        ) {
          setFrameloop(
            "never"
          );

          return;
        }

        setFrameloop(
          "always"
        );

        invalidate();
      };

    const handleVisibilityChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<VisibilityDetail>;

        applyLoopState(
          Boolean(
            customEvent.detail
              ?.hidden
          )
        );
      };

    applyLoopState(
      document.hidden
    );

    window.addEventListener(
      "system:visibility-change",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "system:visibility-change",
        handleVisibilityChange
      );
    };
  }, [
    active,
    invalidate,
    setFrameloop,
  ]);

  return null;
}

function AmbientSignals() {
  const {
    size,
  } = useThree();

  const pointsRef =
    useRef<THREE.Points | null>(
      null
    );

  const reducedMotionRef =
    useRef(false);

  const motionScaleRef =
    useRef(1);

  const ambientDensityRef =
    useRef(1);

  const signalCount =
    size.width < 640
      ? 20
      : size.width < 1024
        ? 28
        : 42;

  const geometry =
    useMemo(() => {
      const positions =
        new Float32Array(
          signalCount * 3
        );

      const goldenAngle =
        Math.PI *
        (
          3 -
          Math.sqrt(5)
        );

      for (
        let index = 0;
        index < signalCount;
        index += 1
      ) {
        const ratio =
          index /
          signalCount;

        const angle =
          index *
          goldenAngle;

        const radius =
          3.25 +
          ratio *
            2.1 +
          Math.sin(
            index * 1.7
          ) *
            0.14;

        positions[
          index * 3
        ] =
          Math.cos(angle) *
          radius;

        positions[
          index * 3 + 1
        ] =
          Math.sin(angle) *
          radius;

        positions[
          index * 3 + 2
        ] =
          Math.sin(
            index * 0.93
          ) *
          1.6;
      }

      const result =
        new THREE.BufferGeometry();

      result.setAttribute(
        "position",
        new THREE.BufferAttribute(
          positions,
          3
        )
      );

      return result;
    }, [
      signalCount,
    ]);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const applyReducedMotion =
      (
        value: boolean
      ) => {
        reducedMotionRef.current =
          value;
      };

    const handleMediaChange =
      (
        event:
          MediaQueryListEvent
      ) => {
        applyReducedMotion(
          event.matches
        );
      };

    const handleReducedMotionChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<ReducedMotionDetail>;

        applyReducedMotion(
          Boolean(
            customEvent.detail
              ?.enabled
          )
        );
      };

    const handlePerformanceProfile =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<PerformanceProfileDetail>;

        const detail =
          customEvent.detail;

        if (
          !detail
        ) {
          return;
        }

        if (
          typeof detail.motionScale ===
          "number"
        ) {
          motionScaleRef.current =
            THREE.MathUtils.clamp(
              detail.motionScale,
              0.2,
              1
            );
        }

        if (
          typeof detail.ambientDensity ===
          "number"
        ) {
          ambientDensityRef.current =
            THREE.MathUtils.clamp(
              detail.ambientDensity,
              0.35,
              1
            );
        }
      };

    applyReducedMotion(
      mediaQuery.matches
    );

    mediaQuery.addEventListener(
      "change",
      handleMediaChange
    );

    window.addEventListener(
      "system:reduced-motion-change",
      handleReducedMotionChange
    );

    window.addEventListener(
      "system:performance-profile",
      handlePerformanceProfile
    );

    window.dispatchEvent(
      new CustomEvent(
        "system:performance-query"
      )
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleMediaChange
      );

      window.removeEventListener(
        "system:reduced-motion-change",
        handleReducedMotionChange
      );

      window.removeEventListener(
        "system:performance-profile",
        handlePerformanceProfile
      );
    };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [
    geometry,
  ]);

  useFrame(
    (
      state,
      delta
    ) => {
      const points =
        pointsRef.current;

      if (!points) {
        return;
      }

      const motionScale =
        reducedMotionRef.current
          ? 0
          : motionScaleRef.current;

      points.rotation.z +=
        delta *
        0.004 *
        motionScale;

      const pointerFactor =
        size.width < 768 ||
        reducedMotionRef.current
          ? 0
          : motionScale;

      const material =
        points.material as THREE.PointsMaterial;

      material.opacity =
        0.3 *
        ambientDensityRef.current *
        (
          reducedMotionRef.current
            ? 0.7
            : 1
        );

      const targetX =
        state.pointer.x *
        0.08 *
        pointerFactor;

      const targetY =
        state.pointer.y *
        0.06 *
        pointerFactor;

      points.position.x =
        smoothValue(
          points.position.x,
          targetX,
          7,
          delta
        );

      points.position.y =
        smoothValue(
          points.position.y,
          targetY,
          7,
          delta
        );
    }
  );

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
    >
      <pointsMaterial
        color="#8be8ff"
        size={
          size.width < 640
            ? 0.021
            : 0.025
        }
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={
          THREE.AdditiveBlending
        }
        depthWrite={false}
      />
    </points>
  );
}

function RealCoreModel({
  onReady,
}: RealCoreModelProps) {
  const {
    scene,
  } = useGLTF(
    MODEL_PATH
  );

  const preparedModel =
    useMemo(() => {
      const model =
        scene.clone(true);

      const materials:
        THREE.MeshStandardMaterial[] =
          [];

      model.traverse(
        (
          child
        ) => {
          if (
            !(child instanceof THREE.Mesh)
          ) {
            return;
          }

          child.castShadow =
            false;

          child.receiveShadow =
            false;

          const sourceMaterials =
            Array.isArray(
              child.material
            )
              ? child.material
              : [
                  child.material,
                ];

          const clonedMaterials =
            sourceMaterials.map(
              (
                sourceMaterial
              ) => {
                const material =
                  sourceMaterial.clone();

                const standardMaterial =
                  material as THREE.MeshStandardMaterial;

                if (
                  standardMaterial
                    .isMeshStandardMaterial
                ) {
                  standardMaterial.emissive =
                    new THREE.Color(
                      "#07171d"
                    );

                  standardMaterial.emissiveIntensity =
                    0.06;

                  standardMaterial.needsUpdate =
                    true;

                  materials.push(
                    standardMaterial
                  );
                }

                return material;
              }
            );

          child.material =
            Array.isArray(
              child.material
            )
              ? clonedMaterials
              : clonedMaterials[0];
        }
      );

      return {
        model,
        materials,
      };
    }, [
      scene,
    ]);

  useEffect(() => {
    onReady(
      preparedModel.materials
    );

    return () => {
      preparedModel.materials.forEach(
        (
          material
        ) => {
          material.dispose();
        }
      );
    };
  }, [
    onReady,
    preparedModel,
  ]);

  return (
    <primitive
      object={
        preparedModel.model
      }
    />
  );
}

function CoreSystem() {
  const {
    size,
  } = useThree();

  const rootRef =
    useRef<THREE.Group | null>(
      null
    );

  const modelPivotRef =
    useRef<THREE.Group | null>(
      null
    );

  const infrastructureRef =
    useRef<THREE.Group | null>(
      null
    );

  const securityRef =
    useRef<THREE.Group | null>(
      null
    );

  const intelligenceRef =
    useRef<THREE.Group | null>(
      null
    );

  const productRef =
    useRef<THREE.Group | null>(
      null
    );

  const signalFieldRef =
    useRef<THREE.Group | null>(
      null
    );

  const securityRingOneRef =
    useRef<THREE.Mesh | null>(
      null
    );

  const securityRingTwoRef =
    useRef<THREE.Mesh | null>(
      null
    );

  const intelligenceShellRef =
    useRef<THREE.Mesh | null>(
      null
    );

  const intelligenceOrbitRef =
    useRef<THREE.Mesh | null>(
      null
    );

  const productHaloRef =
    useRef<THREE.Mesh | null>(
      null
    );

  const accentLightRef =
    useRef<THREE.PointLight | null>(
      null
    );

  const infrastructureMaterialRef =
    useRef<THREE.MeshBasicMaterial | null>(
      null
    );

  const routeMaterialRef =
    useRef<THREE.LineBasicMaterial | null>(
      null
    );

  const securityMaterialOneRef =
    useRef<THREE.MeshBasicMaterial | null>(
      null
    );

  const securityMaterialTwoRef =
    useRef<THREE.MeshBasicMaterial | null>(
      null
    );

  const intelligenceMaterialRef =
    useRef<THREE.MeshBasicMaterial | null>(
      null
    );

  const intelligenceOrbitMaterialRef =
    useRef<THREE.MeshBasicMaterial | null>(
      null
    );

  const productMaterialRef =
    useRef<THREE.MeshBasicMaterial | null>(
      null
    );

  const gatewayMaterialRefs =
    useRef<
      THREE.MeshBasicMaterial[]
    >([]);

  const packetMaterialRefs =
    useRef<
      THREE.MeshBasicMaterial[]
    >([]);

  const packetRefs =
    useRef<
      THREE.Mesh[]
    >([]);

  const modelMaterialRefs =
    useRef<
      THREE.MeshStandardMaterial[]
    >([]);

  const pointerTargetRef =
    useRef({
      x: 0,
      y: 0,
    });

  const pointerCurrentRef =
    useRef({
      x: 0,
      y: 0,
    });

  const elapsedRef =
    useRef(0);

  const heroProgressRef =
    useRef(0);

  const globalProgressRef =
    useRef(0);

  const targetEnergyRef =
    useRef(1);

  const currentEnergyRef =
    useRef(1);

  const targetAccentRef =
    useRef(
      new THREE.Color(
        "#48d7ff"
      )
    );

  const currentAccentRef =
    useRef(
      new THREE.Color(
        "#48d7ff"
      )
    );

  const modelAccentRef =
    useRef(
      new THREE.Color(
        "#48d7ff"
      )
    );

  const securityColorRef =
    useRef(
      new THREE.Color(
        "#55ddff"
      )
    );

  const intelligenceColorRef =
    useRef(
      new THREE.Color(
        "#786dff"
      )
    );

  const productColorRef =
    useRef(
      new THREE.Color(
        "#dff8ff"
      )
    );

  const reducedMotionRef =
    useRef(false);

  const motionScaleRef =
    useRef(1);

  const visibilityPausedRef =
    useRef(false);

  const awakeTargetRef =
    useRef(0);

  const awakeProgressRef =
    useRef(0);

  const coreReadySentRef =
    useRef(false);

  const activeSectionRef =
    useRef("hero");

  const activeModeRef =
    useRef<SystemMode>(
      "public"
    );

  const modeBlendRef =
    useRef<Record<
      SystemMode,
      number
    >>({
      public: 1,
      security: 0,
      infrastructure: 0,
      intelligence: 0,
      restricted: 0,
      connection: 0,
    });

  const identityFocusRef =
    useRef(0);

  const logicFocusRef =
    useRef(0);

  const capabilityFocusRef =
    useRef(0);

  const securityFocusRef =
    useRef(0);

  const archiveFocusRef =
    useRef(0);

  const infrastructureFocusRef =
    useRef(0);

  const searchFocusRef =
    useRef(0);

  const researchFocusRef =
    useRef(0);

  const classifiedFocusRef =
    useRef(0);

  const contactFocusRef =
    useRef(0);

  const logicStageTargetRef =
    useRef(0);

  const logicStageCurrentRef =
    useRef(0);

  const capabilityClusterRef =
    useRef("security");

  const securityLayerRef =
    useRef<SecurityLayerKey>(
      "application"
    );

  const securityLayerBlendRef =
    useRef<Record<
      SecurityLayerKey,
      number
    >>({
      application: 1,
      vulnerability: 0,
      mobile: 0,
      infrastructure: 0,
      network: 0,
      intelligence: 0,
    });

  const archiveProjectRef =
    useRef<ArchiveProjectKey>(
      "hostsecual"
    );

  const archiveProjectBlendRef =
    useRef<Record<
      ArchiveProjectKey,
      number
    >>({
      hostsecual: 1,
      aged: 0,
      leemeo: 0,
      softparallax: 0,
      "security-labs": 0,
      classified: 0,
    });

  const infrastructureLayerRef =
    useRef<InfrastructureLayerKey>(
      "server"
    );

  const infrastructureLayerBlendRef =
    useRef<Record<
      InfrastructureLayerKey,
      number
    >>({
      client: 0,
      dns: 0,
      edge: 0,
      defense: 0,
      server: 1,
      container: 0,
      application: 0,
      data: 0,
    });

  const searchLayerRef =
    useRef<SearchLayerKey>(
      "performance"
    );

  const searchLayerBlendRef =
    useRef<Record<
      SearchLayerKey,
      number
    >>({
      performance: 1,
      vitals: 0,
      technical: 0,
      architecture: 0,
      structured: 0,
      semantic: 0,
      aeo: 0,
      geo: 0,
    });

  const researchNodeRef =
    useRef<ResearchNodeKey>(
      "security"
    );

  const researchNodeBlendRef =
    useRef<Record<
      ResearchNodeKey,
      number
    >>({
      security: 1,
      technical: 0,
      ai: 0,
      llm: 0,
      rag: 0,
      visualization: 0,
      interactive: 0,
      documentation: 0,
    });

  const classifiedStateRef =
    useRef<ClassifiedState>(
      "idle"
    );

  const classifiedRecoveryTargetRef =
    useRef(0);

  const classifiedRecoveryCurrentRef =
    useRef(0);

  const contactStateRef =
    useRef<ContactState>(
      "idle"
    );

  const contactStateBlendRef =
    useRef<Record<
      ContactState,
      number
    >>({
      idle: 1,
      submitting: 0,
      success: 0,
      activation: 0,
      error: 0,
    });

  const restrictedTargetRef =
    useRef(0);

  const restrictedCurrentRef =
    useRef(0);

  const handoffTargetRef =
    useRef(0);

  const handoffCurrentRef =
    useRef(0);

  const handoffReleaseTimeoutRef =
    useRef<number | null>(
      null
    );

  const sectorAngle =
    (
      Math.PI *
      2
    ) /
    SYSTEM_COUNT;

  const orbitNodes =
    useMemo(
      () =>
        Array.from(
          {
            length:
              SYSTEM_COUNT,
          },
          (
            value,
            index
          ) => {
            const angle =
              index *
              sectorAngle;

            return {
              angle,
              x:
                Math.cos(
                  angle
                ) *
                2.58,
              y:
                Math.sin(
                  angle
                ) *
                2.58,
            };
          }
        ),
      [
        sectorAngle,
      ]
    );

  const routeGeometry =
    useMemo(() => {
      const positions =
        new Float32Array(
          SYSTEM_COUNT *
            2 *
            3
        );

      orbitNodes.forEach(
        (
          node,
          index
        ) => {
          const offset =
            index * 6;

          const innerRadius =
            2.28;

          const outerRadius =
            2.5;

          positions[
            offset
          ] =
            Math.cos(
              node.angle
            ) *
            innerRadius;

          positions[
            offset + 1
          ] =
            Math.sin(
              node.angle
            ) *
            innerRadius;

          positions[
            offset + 2
          ] = 0;

          positions[
            offset + 3
          ] =
            Math.cos(
              node.angle
            ) *
            outerRadius;

          positions[
            offset + 4
          ] =
            Math.sin(
              node.angle
            ) *
            outerRadius;

          positions[
            offset + 5
          ] = 0;
        }
      );

      const geometry =
        new THREE.BufferGeometry();

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
          positions,
          3
        )
      );

      return geometry;
    }, [
      orbitNodes,
    ]);

  useEffect(() => {
    return () => {
      routeGeometry.dispose();
    };
  }, [
    routeGeometry,
  ]);

  const responsiveScale =
    useMemo(() => {
      if (
        size.width <= 360
      ) {
        return 0.6;
      }

      if (
        size.width < 430
      ) {
        return 0.66;
      }

      if (
        size.width < 640
      ) {
        return 0.74;
      }

      if (
        size.width < 768
      ) {
        return 0.8;
      }

      if (
        size.width < 1024
      ) {
        return 0.87;
      }

      if (
        size.width < 1280
      ) {
        return 0.94;
      }

      return 1;
    }, [
      size.width,
    ]);

  const handleModelReady =
    useCallback(
      (
        materials:
          THREE.MeshStandardMaterial[]
      ) => {
        modelMaterialRefs.current =
          materials;
      },
      []
    );

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const resetPointer =
      () => {
        pointerTargetRef.current.x =
          0;

        pointerTargetRef.current.y =
          0;
      };

    const hardResetPointer =
      () => {
        resetPointer();

        pointerCurrentRef.current.x =
          0;

        pointerCurrentRef.current.y =
          0;
      };

    const applyReducedMotion =
      (
        value: boolean
      ) => {
        reducedMotionRef.current =
          value;

        if (
          value
        ) {
          awakeTargetRef.current =
            1;

          awakeProgressRef.current =
            1;

          hardResetPointer();
        }
      };

    const handleMediaChange =
      (
        event:
          MediaQueryListEvent
      ) => {
        applyReducedMotion(
          event.matches
        );
      };

    const handleReducedMotionChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<ReducedMotionDetail>;

        applyReducedMotion(
          Boolean(
            customEvent.detail
              ?.enabled
          )
        );
      };

    const handlePerformanceProfile =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<PerformanceProfileDetail>;

        const motionScale =
          customEvent.detail
            ?.motionScale;

        if (
          typeof motionScale !==
          "number"
        ) {
          return;
        }

        motionScaleRef.current =
          THREE.MathUtils.clamp(
            motionScale,
            0.2,
            1
          );
      };

    const handleVisibilityChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<VisibilityDetail>;

        visibilityPausedRef.current =
          Boolean(
            customEvent.detail
              ?.hidden
          );
      };

    applyReducedMotion(
      mediaQuery.matches
    );

    const handlePointerMove =
      (
        event: PointerEvent
      ) => {
        if (
          event.pointerType ===
            "touch" ||
          reducedMotionRef.current ||
          handoffTargetRef.current >
            0.01
        ) {
          return;
        }

        const width =
          Math.max(
            window.innerWidth,
            1
          );

        const height =
          Math.max(
            window.innerHeight,
            1
          );

        pointerTargetRef.current.x =
          THREE.MathUtils.clamp(
            (
              event.clientX /
              width
            ) *
              2 -
              1,
            -1,
            1
          );

        pointerTargetRef.current.y =
          THREE.MathUtils.clamp(
            (
              event.clientY /
              height
            ) *
              2 -
              1,
            -1,
            1
          );
      };

    const clearHandoffRelease =
      () => {
        if (
          handoffReleaseTimeoutRef.current !==
          null
        ) {
          window.clearTimeout(
            handoffReleaseTimeoutRef.current
          );

          handoffReleaseTimeoutRef.current =
            null;
        }
      };

    const heroTrigger =
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,

        onUpdate: (
          self
        ) => {
          heroProgressRef.current =
            self.progress;
        },
      });

    const handleSystemEntered =
      () => {
        awakeTargetRef.current =
          1;
      };

    const handleSectionChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<SystemSectionDetail>;

        const detail =
          customEvent.detail;

        if (!detail) {
          return;
        }

        activeSectionRef.current =
          detail.id;

        if (
          SYSTEM_MODES.includes(
            detail.mode
          )
        ) {
          activeModeRef.current =
            detail.mode;
        }

        targetAccentRef.current.set(
          detail.accent
        );

        targetEnergyRef.current =
          detail.energy;

        restrictedTargetRef.current =
          detail.mode ===
            "restricted" ||
          detail.id ===
            "classified"
            ? 1
            : 0;
      };

    const handleProgress =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<SystemProgressDetail>;

        const detail =
          customEvent.detail;

        if (!detail) {
          return;
        }

        globalProgressRef.current =
          detail.pageProgress;
      };

    const handleLogicStageChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<LogicStageDetail>;

        const index =
          customEvent.detail
            ?.index;

        if (
          typeof index !==
          "number"
        ) {
          return;
        }

        logicStageTargetRef.current =
          THREE.MathUtils.clamp(
            index,
            0,
            5
          );
      };

    const handleCapabilityClusterChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<CapabilityClusterDetail>;

        const id =
          customEvent.detail
            ?.id;

        if (!id) {
          return;
        }

        capabilityClusterRef.current =
          id;
      };

    const handleSecurityLayerChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<SecurityLayerDetail>;

        const id =
          customEvent.detail
            ?.id;

        if (
          id !== "application" &&
          id !== "vulnerability" &&
          id !== "mobile" &&
          id !== "infrastructure" &&
          id !== "network" &&
          id !== "intelligence"
        ) {
          return;
        }

        securityLayerRef.current =
          id;
      };

    const handleArchiveProjectChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<ArchiveProjectDetail>;

        const id =
          customEvent.detail
            ?.id;

        if (
          id !== "hostsecual" &&
          id !== "aged" &&
          id !== "leemeo" &&
          id !== "softparallax" &&
          id !== "security-labs" &&
          id !== "classified"
        ) {
          return;
        }

        archiveProjectRef.current =
          id;
      };

    const handleInfrastructureLayerChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<InfrastructureLayerDetail>;

        const id =
          customEvent.detail
            ?.id;

        if (
          id !== "client" &&
          id !== "dns" &&
          id !== "edge" &&
          id !== "defense" &&
          id !== "server" &&
          id !== "container" &&
          id !== "application" &&
          id !== "data"
        ) {
          return;
        }

        infrastructureLayerRef.current =
          id;
      };

    const handleSearchLayerChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<SearchLayerDetail>;

        const id =
          customEvent.detail
            ?.id;

        if (
          id !== "performance" &&
          id !== "vitals" &&
          id !== "technical" &&
          id !== "architecture" &&
          id !== "structured" &&
          id !== "semantic" &&
          id !== "aeo" &&
          id !== "geo"
        ) {
          return;
        }

        searchLayerRef.current =
          id;
      };

    const handleResearchNodeChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<ResearchNodeDetail>;

        const id =
          customEvent.detail
            ?.id;

        if (
          id !== "security" &&
          id !== "technical" &&
          id !== "ai" &&
          id !== "llm" &&
          id !== "rag" &&
          id !== "visualization" &&
          id !== "interactive" &&
          id !== "documentation"
        ) {
          return;
        }

        researchNodeRef.current =
          id;
      };

    const handleClassifiedStateChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<ClassifiedStateDetail>;

        const detail =
          customEvent.detail;

        if (!detail) {
          return;
        }

        if (
          detail.state !== "idle" &&
          detail.state !== "scanning" &&
          detail.state !== "denied"
        ) {
          return;
        }

        classifiedStateRef.current =
          detail.state;

        const recovered =
          typeof detail.recovered ===
          "number"
            ? detail.recovered
            : 0;

        const total =
          typeof detail.total ===
            "number" &&
          detail.total > 0
            ? detail.total
            : 1;

        classifiedRecoveryTargetRef.current =
          clamp01(
            recovered / total
          );
      };

    const handleContactStateChange =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<ContactStateDetail>;

        const state =
          customEvent.detail
            ?.state;

        if (
          state !== "idle" &&
          state !== "submitting" &&
          state !== "success" &&
          state !== "activation" &&
          state !== "error"
        ) {
          return;
        }

        contactStateRef.current =
          state;
      };

    const handleCinematicStart =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<CinematicDetail>;

        if (
          !customEvent.detail
        ) {
          return;
        }

        clearHandoffRelease();

        hardResetPointer();
      };

    const handleCinematicHandoff =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<CinematicDetail>;

        if (
          !customEvent.detail
        ) {
          return;
        }

        clearHandoffRelease();

        hardResetPointer();

        handoffTargetRef.current =
          1;
      };

    const handleCinematicEnd =
      (
        event: Event
      ) => {
        const customEvent =
          event as CustomEvent<CinematicDetail>;

        if (
          !customEvent.detail
        ) {
          return;
        }

        clearHandoffRelease();

        handoffReleaseTimeoutRef.current =
          window.setTimeout(
            () => {
              handoffTargetRef.current =
                0;

              handoffReleaseTimeoutRef.current =
                null;
            },
            reducedMotionRef.current
              ? 80
              : 520
          );
      };

    mediaQuery.addEventListener(
      "change",
      handleMediaChange
    );

    window.addEventListener(
      "system:reduced-motion-change",
      handleReducedMotionChange
    );

    window.addEventListener(
      "system:performance-profile",
      handlePerformanceProfile
    );

    window.addEventListener(
      "system:visibility-change",
      handleVisibilityChange
    );

    window.dispatchEvent(
      new CustomEvent(
        "system:performance-query"
      )
    );

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "blur",
      resetPointer
    );

    document.addEventListener(
      "mouseleave",
      resetPointer
    );

    window.addEventListener(
      "system:entered",
      handleSystemEntered
    );

    window.addEventListener(
      "system:section-change",
      handleSectionChange
    );

    window.addEventListener(
      "system:progress",
      handleProgress
    );

    window.addEventListener(
      "system:logic-stage-change",
      handleLogicStageChange
    );

    window.addEventListener(
      "system:capability-cluster-change",
      handleCapabilityClusterChange
    );

    window.addEventListener(
      "system:security-layer-change",
      handleSecurityLayerChange
    );

    window.addEventListener(
      "system:archive-project-change",
      handleArchiveProjectChange
    );

    window.addEventListener(
      "system:infrastructure-layer-change",
      handleInfrastructureLayerChange
    );

    window.addEventListener(
      "system:search-layer-change",
      handleSearchLayerChange
    );

    window.addEventListener(
      "system:research-node-change",
      handleResearchNodeChange
    );

    window.addEventListener(
      "system:classified-state-change",
      handleClassifiedStateChange
    );

    window.addEventListener(
      "system:contact-state-change",
      handleContactStateChange
    );

    window.addEventListener(
      "system:cinematic-start",
      handleCinematicStart
    );

    window.addEventListener(
      "system:cinematic-handoff",
      handleCinematicHandoff
    );

    window.addEventListener(
      "system:cinematic-end",
      handleCinematicEnd
    );

    ScrollTrigger.refresh();

    return () => {
      heroTrigger.kill();

      clearHandoffRelease();

      mediaQuery.removeEventListener(
        "change",
        handleMediaChange
      );

      window.removeEventListener(
        "system:reduced-motion-change",
        handleReducedMotionChange
      );

      window.removeEventListener(
        "system:performance-profile",
        handlePerformanceProfile
      );

      window.removeEventListener(
        "system:visibility-change",
        handleVisibilityChange
      );

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "blur",
        resetPointer
      );

      document.removeEventListener(
        "mouseleave",
        resetPointer
      );

      window.removeEventListener(
        "system:entered",
        handleSystemEntered
      );

      window.removeEventListener(
        "system:section-change",
        handleSectionChange
      );

      window.removeEventListener(
        "system:progress",
        handleProgress
      );

      window.removeEventListener(
        "system:logic-stage-change",
        handleLogicStageChange
      );

      window.removeEventListener(
        "system:capability-cluster-change",
        handleCapabilityClusterChange
      );

      window.removeEventListener(
        "system:security-layer-change",
        handleSecurityLayerChange
      );

      window.removeEventListener(
        "system:archive-project-change",
        handleArchiveProjectChange
      );

      window.removeEventListener(
        "system:infrastructure-layer-change",
        handleInfrastructureLayerChange
      );

      window.removeEventListener(
        "system:search-layer-change",
        handleSearchLayerChange
      );

      window.removeEventListener(
        "system:research-node-change",
        handleResearchNodeChange
      );

      window.removeEventListener(
        "system:classified-state-change",
        handleClassifiedStateChange
      );

      window.removeEventListener(
        "system:contact-state-change",
        handleContactStateChange
      );

      window.removeEventListener(
        "system:cinematic-start",
        handleCinematicStart
      );

      window.removeEventListener(
        "system:cinematic-handoff",
        handleCinematicHandoff
      );

      window.removeEventListener(
        "system:cinematic-end",
        handleCinematicEnd
      );
    };
  }, []);

  useFrame(
    (
      state,
      delta
    ) => {
      const root =
        rootRef.current;

      if (
        !root ||
        visibilityPausedRef.current
      ) {
        return;
      }

      const motionScale =
        reducedMotionRef.current
          ? 0
          : motionScaleRef.current;

      elapsedRef.current +=
        delta *
        motionScale;

      if (
        awakeTargetRef.current >
        awakeProgressRef.current
      ) {
        awakeProgressRef.current =
          Math.min(
            awakeProgressRef.current +
              delta *
                0.42,
            awakeTargetRef.current
          );
      }

      const awake =
        awakeProgressRef.current;

      const infrastructureActivation =
        activationRange(
          awake,
          0,
          0.26
        );

      const securityActivation =
        activationRange(
          awake,
          0.18,
          0.48
        );

      const intelligenceActivation =
        activationRange(
          awake,
          0.4,
          0.72
        );

      const productActivation =
        activationRange(
          awake,
          0.66,
          1
        );

      if (
        awake >= 1 &&
        !coreReadySentRef.current
      ) {
        coreReadySentRef.current =
          true;

        window.dispatchEvent(
          new CustomEvent(
            "system:core-ready"
          )
        );
      }

      currentEnergyRef.current =
        smoothValue(
          currentEnergyRef.current,
          targetEnergyRef.current,
          4,
          delta
        );

      currentAccentRef.current.lerp(
        targetAccentRef.current,
        1 -
          Math.exp(
            -5 * delta
          )
      );

      restrictedCurrentRef.current =
        smoothValue(
          restrictedCurrentRef.current,
          restrictedTargetRef.current,
          4.5,
          delta
        );

      handoffCurrentRef.current =
        smoothValue(
          handoffCurrentRef.current,
          handoffTargetRef.current,
          15,
          delta
        );

      pointerCurrentRef.current.x =
        smoothValue(
          pointerCurrentRef.current.x,
          pointerTargetRef.current.x,
          14,
          delta
        );

      pointerCurrentRef.current.y =
        smoothValue(
          pointerCurrentRef.current.y,
          pointerTargetRef.current.y,
          14,
          delta
        );

      const desktopPointerFactor =
        size.width < 768
          ? 0
          : size.width < 1024
            ? 0.75
            : 1;

      const handoff =
        handoffCurrentRef.current;

      const interactionFactor =
        (
          1 -
          handoff
        ) *
        motionScale;

      const pointerX =
        pointerCurrentRef.current.x *
        desktopPointerFactor *
        interactionFactor;

      const pointerY =
        pointerCurrentRef.current.y *
        desktopPointerFactor *
        interactionFactor;

      const energy =
        currentEnergyRef.current;

      const heroProgress =
        heroProgressRef.current;

      const globalProgress =
        globalProgressRef.current;

      const restricted =
        restrictedCurrentRef.current;

      const activeSection =
        activeSectionRef.current;

      const activeMode =
        activeModeRef.current;

      const modeBlend =
        modeBlendRef.current;

      SYSTEM_MODES.forEach(
        (mode) => {
          const target =
            activeMode === mode
              ? 1
              : 0;

          modeBlend[mode] =
            reducedMotionRef.current
              ? target
              : smoothValue(
                  modeBlend[mode],
                  target,
                  4.6,
                  delta
                );
        }
      );

      const publicModeFocus =
        modeBlend.public;

      const securityModeFocus =
        modeBlend.security;

      const infrastructureModeFocus =
        modeBlend.infrastructure;

      const intelligenceModeFocus =
        modeBlend.intelligence;

      const restrictedModeFocus =
        modeBlend.restricted;

      const connectionModeFocus =
        modeBlend.connection;

      const identityTarget =
        activeSection ===
          "identity"
          ? 1
          : 0;

      const identityFocus =
        reducedMotionRef.current
          ? identityTarget
          : smoothValue(
              identityFocusRef.current,
              identityTarget,
              4.2,
              delta
            );

      identityFocusRef.current =
        identityFocus;

      const logicTarget =
        activeSection ===
          "principle"
          ? 1
          : 0;

      const logicFocus =
        reducedMotionRef.current
          ? logicTarget
          : smoothValue(
              logicFocusRef.current,
              logicTarget,
              4,
              delta
            );

      logicFocusRef.current =
        logicFocus;

      const logicStage =
        reducedMotionRef.current
          ? logicStageTargetRef.current
          : smoothValue(
              logicStageCurrentRef.current,
              logicStageTargetRef.current,
              5.5,
              delta
            );

      logicStageCurrentRef.current =
        logicStage;

      const stageWeight =
        (
          stageIndex: number
        ) =>
          clamp01(
            1 -
              Math.abs(
                logicStage -
                  stageIndex
              )
          );

      const buildWeight =
        stageWeight(0);

      const secureWeight =
        stageWeight(1);

      const verifyWeight =
        stageWeight(2);

      const operateWeight =
        stageWeight(3);

      const optimizeWeight =
        stageWeight(4);

      const evolveWeight =
        stageWeight(5);

      const logicProductFocus =
        logicFocus *
        (
          buildWeight *
            0.9 +
          verifyWeight *
            0.16 +
          optimizeWeight *
            0.16
        );

      const logicSecurityFocus =
        logicFocus *
        (
          secureWeight *
            0.9 +
          verifyWeight *
            0.72
        );

      const logicInfrastructureFocus =
        logicFocus *
        operateWeight *
        0.9;

      const logicSignalFocus =
        logicFocus *
        (
          verifyWeight *
            0.42 +
          optimizeWeight *
            0.9
        );

      const logicIntelligenceFocus =
        logicFocus *
        evolveWeight *
        0.9;

      const capabilityTarget =
        activeSection ===
          "capabilities"
          ? 1
          : 0;

      const capabilityActive =
        reducedMotionRef.current
          ? capabilityTarget
          : smoothValue(
              capabilityFocusRef.current,
              capabilityTarget,
              4.2,
              delta
            );

      capabilityFocusRef.current =
        capabilityActive;

      const capabilityCluster =
        capabilityClusterRef.current;

      const capabilityNetworkFocus =
        capabilityActive *
        0.45;

      const capabilitySecurityFocus =
        capabilityActive *
        (
          capabilityCluster ===
            "security"
            ? 0.8
            : 0
        );

      const capabilityInfrastructureFocus =
        capabilityActive *
        (
          capabilityCluster ===
            "infrastructure"
            ? 0.8
            : capabilityCluster ===
                "engineering"
              ? 0.45
              : 0
        );

      const capabilityProductFocus =
        capabilityActive *
        (
          capabilityCluster ===
            "product"
            ? 0.8
            : capabilityCluster ===
                "engineering"
              ? 0.45
              : 0
        );

      const capabilitySignalFocus =
        capabilityActive *
        (
          capabilityCluster ===
            "search"
            ? 0.8
            : 0
        );

      const capabilityIntelligenceFocus =
        capabilityActive *
        (
          capabilityCluster ===
            "research"
            ? 0.8
            : 0
        );

      const securityTarget =
        activeSection ===
          "security"
          ? 1
          : 0;

      const securityFocus =
        reducedMotionRef.current
          ? securityTarget
          : smoothValue(
              securityFocusRef.current,
              securityTarget,
              4.2,
              delta
            );

      securityFocusRef.current =
        securityFocus;

      const securityLayer =
        securityLayerRef.current;

      const securityLayerBlend =
        securityLayerBlendRef.current;

      const securityLayerKeys:
        SecurityLayerKey[] = [
          "application",
          "vulnerability",
          "mobile",
          "infrastructure",
          "network",
          "intelligence",
        ];

      securityLayerKeys.forEach(
        (
          layerId
        ) => {
          const target =
            securityLayer ===
              layerId
              ? 1
              : 0;

          securityLayerBlend[
            layerId
          ] =
            reducedMotionRef.current
              ? target
              : smoothValue(
                  securityLayerBlend[
                    layerId
                  ],
                  target,
                  5.2,
                  delta
                );
        }
      );

      const securityApplicationFocus =
        securityFocus *
        securityLayerBlend.application;

      const securityVulnerabilityFocus =
        securityFocus *
        securityLayerBlend.vulnerability;

      const securityMobileFocus =
        securityFocus *
        securityLayerBlend.mobile;

      const securityInfrastructureFocus =
        securityFocus *
        securityLayerBlend.infrastructure;

      const securityNetworkFocus =
        securityFocus *
        securityLayerBlend.network;

      const securityIntelligenceFocus =
        securityFocus *
        securityLayerBlend.intelligence;

      const infrastructureTarget =
        activeSection ===
          "infrastructure"
          ? 1
          : 0;

      const infrastructureFocus =
        reducedMotionRef.current
          ? infrastructureTarget
          : smoothValue(
              infrastructureFocusRef.current,
              infrastructureTarget,
              4.2,
              delta
            );

      infrastructureFocusRef.current =
        infrastructureFocus;

      const infrastructureLayer =
        infrastructureLayerRef.current;

      const infrastructureLayerBlend =
        infrastructureLayerBlendRef.current;

      const infrastructureLayerKeys:
        InfrastructureLayerKey[] = [
          "client",
          "dns",
          "edge",
          "defense",
          "server",
          "container",
          "application",
          "data",
        ];

      infrastructureLayerKeys.forEach(
        (
          layerId
        ) => {
          const target =
            infrastructureLayer ===
              layerId
              ? 1
              : 0;

          infrastructureLayerBlend[
            layerId
          ] =
            reducedMotionRef.current
              ? target
              : smoothValue(
                  infrastructureLayerBlend[
                    layerId
                  ],
                  target,
                  4.8,
                  delta
                );
        }
      );

      const topologyClientFocus =
        infrastructureFocus *
        infrastructureLayerBlend.client;

      const topologyDnsFocus =
        infrastructureFocus *
        infrastructureLayerBlend.dns;

      const topologyEdgeFocus =
        infrastructureFocus *
        infrastructureLayerBlend.edge;

      const topologyDefenseFocus =
        infrastructureFocus *
        infrastructureLayerBlend.defense;

      const topologyServerFocus =
        infrastructureFocus *
        infrastructureLayerBlend.server;

      const topologyContainerFocus =
        infrastructureFocus *
        infrastructureLayerBlend.container;

      const topologyApplicationFocus =
        infrastructureFocus *
        infrastructureLayerBlend.application;

      const topologyDataFocus =
        infrastructureFocus *
        infrastructureLayerBlend.data;

      const topologyInfrastructureFocus =
        topologyClientFocus *
          0.25 +
        topologyDnsFocus *
          0.65 +
        topologyEdgeFocus *
          0.8 +
        topologyDefenseFocus *
          0.8 +
        topologyServerFocus +
        topologyContainerFocus *
          0.8 +
        topologyApplicationFocus *
          0.55 +
        topologyDataFocus *
          0.7;

      const topologySecurityFocus =
        topologyEdgeFocus *
          0.2 +
        topologyDefenseFocus *
          0.72 +
        topologyDataFocus *
          0.35;

      const topologySignalFocus =
        topologyClientFocus *
          0.4 +
        topologyDnsFocus *
          0.65 +
        topologyEdgeFocus *
          0.55 +
        topologyDefenseFocus *
          0.25;

      const topologyProductFocus =
        topologyClientFocus *
          0.25 +
        topologyContainerFocus *
          0.4 +
        topologyApplicationFocus *
          0.82 +
        topologyDataFocus *
          0.2;

      const researchTarget =
        activeSection ===
          "research" ||
        activeSection ===
          "research-intelligence"
          ? 1
          : 0;

      const intelligenceFocus =
        reducedMotionRef.current
          ? researchTarget
          : smoothValue(
              researchFocusRef.current,
              researchTarget,
              4.2,
              delta
            );

      researchFocusRef.current =
        intelligenceFocus;

      const searchTarget =
        activeSection ===
          "search-performance"
          ? 1
          : 0;

      const signalFocus =
        reducedMotionRef.current
          ? searchTarget
          : smoothValue(
              searchFocusRef.current,
              searchTarget,
              4.2,
              delta
            );

      searchFocusRef.current =
        signalFocus;

      const searchLayer =
        searchLayerRef.current;

      const searchLayerBlend =
        searchLayerBlendRef.current;

      const searchLayerKeys:
        SearchLayerKey[] = [
          "performance",
          "vitals",
          "technical",
          "architecture",
          "structured",
          "semantic",
          "aeo",
          "geo",
        ];

      searchLayerKeys.forEach(
        (
          layerId
        ) => {
          const target =
            searchLayer ===
              layerId
              ? 1
              : 0;

          searchLayerBlend[
            layerId
          ] =
            reducedMotionRef.current
              ? target
              : smoothValue(
                  searchLayerBlend[
                    layerId
                  ],
                  target,
                  4.4,
                  delta
                );
        }
      );

      const searchPerformanceFocus =
        signalFocus *
        searchLayerBlend.performance;

      const searchVitalsFocus =
        signalFocus *
        searchLayerBlend.vitals;

      const searchTechnicalFocus =
        signalFocus *
        searchLayerBlend.technical;

      const searchArchitectureFocus =
        signalFocus *
        searchLayerBlend.architecture;

      const searchStructuredFocus =
        signalFocus *
        searchLayerBlend.structured;

      const searchSemanticFocus =
        signalFocus *
        searchLayerBlend.semantic;

      const searchAeoFocus =
        signalFocus *
        searchLayerBlend.aeo;

      const searchGeoFocus =
        signalFocus *
        searchLayerBlend.geo;

      const searchLayerSignalFocus =
        searchPerformanceFocus *
          0.72 +
        searchVitalsFocus *
          0.82 +
        searchTechnicalFocus *
          0.76 +
        searchArchitectureFocus *
          0.68 +
        searchStructuredFocus *
          0.72 +
        searchSemanticFocus *
          0.78 +
        searchAeoFocus *
          0.84 +
        searchGeoFocus *
          0.88;

      const searchInfrastructureFocus =
        searchPerformanceFocus *
          0.2 +
        searchTechnicalFocus *
          0.18 +
        searchArchitectureFocus *
          0.12;

      const searchProductFocus =
        searchPerformanceFocus *
          0.12 +
        searchVitalsFocus *
          0.12 +
        searchArchitectureFocus *
          0.16 +
        searchStructuredFocus *
          0.12;

      const searchIntelligenceFocus =
        searchStructuredFocus *
          0.1 +
        searchSemanticFocus *
          0.16 +
        searchAeoFocus *
          0.2 +
        searchGeoFocus *
          0.24;

      const researchNode =
        researchNodeRef.current;

      const researchNodeBlend =
        researchNodeBlendRef.current;

      const researchNodeKeys:
        ResearchNodeKey[] = [
          "security",
          "technical",
          "ai",
          "llm",
          "rag",
          "visualization",
          "interactive",
          "documentation",
        ];

      researchNodeKeys.forEach(
        (
          nodeId
        ) => {
          const target =
            researchNode ===
              nodeId
              ? 1
              : 0;

          researchNodeBlend[
            nodeId
          ] =
            reducedMotionRef.current
              ? target
              : smoothValue(
                  researchNodeBlend[
                    nodeId
                  ],
                  target,
                  4.2,
                  delta
                );
        }
      );

      const researchSecurityFocus =
        intelligenceFocus *
        researchNodeBlend.security *
        0.34;

      const researchInfrastructureFocus =
        intelligenceFocus *
        (
          researchNodeBlend.technical *
            0.22 +
          researchNodeBlend.documentation *
            0.06
        );

      const researchProductFocus =
        intelligenceFocus *
        (
          researchNodeBlend.ai *
            0.3 +
          researchNodeBlend.llm *
            0.18 +
          researchNodeBlend.interactive *
            0.24 +
          researchNodeBlend.documentation *
            0.08
        );

      const researchSignalFocus =
        intelligenceFocus *
        (
          researchNodeBlend.llm *
            0.08 +
          researchNodeBlend.rag *
            0.32 +
          researchNodeBlend.visualization *
            0.28 +
          researchNodeBlend.interactive *
            0.18 +
          researchNodeBlend.documentation *
            0.1
        );

      const researchIntelligenceFocus =
        intelligenceFocus *
        (
          researchNodeBlend.security *
            0.18 +
          researchNodeBlend.technical *
            0.22 +
          researchNodeBlend.ai *
            0.3 +
          researchNodeBlend.llm *
            0.38 +
          researchNodeBlend.rag *
            0.42 +
          researchNodeBlend.visualization *
            0.34 +
          researchNodeBlend.interactive *
            0.28 +
          researchNodeBlend.documentation *
            0.24
        );

      const classifiedTarget =
        activeSection ===
          "classified"
          ? 1
          : 0;

      const classifiedActive =
        reducedMotionRef.current
          ? classifiedTarget
          : smoothValue(
              classifiedFocusRef.current,
              classifiedTarget,
              4.6,
              delta
            );

      classifiedFocusRef.current =
        classifiedActive;

      const classifiedState =
        classifiedStateRef.current;

      const classifiedRecovery =
        reducedMotionRef.current
          ? classifiedRecoveryTargetRef.current
          : smoothValue(
              classifiedRecoveryCurrentRef.current,
              classifiedRecoveryTargetRef.current,
              5.5,
              delta
            );

      classifiedRecoveryCurrentRef.current =
        classifiedRecovery;

      const classifiedScanning =
        classifiedActive *
        (
          classifiedState ===
            "scanning"
            ? 1
            : 0
        );

      const classifiedDenied =
        classifiedActive *
        (
          classifiedState ===
            "denied"
            ? 1
            : 0
        );

      const classifiedRestrictedFocus =
        classifiedActive *
        (
          0.42 +
          classifiedScanning *
            0.2 +
          classifiedDenied *
            0.3
        );

      const classifiedSignalFocus =
        classifiedActive *
        (
          0.18 +
          classifiedScanning *
            (
              0.34 +
              classifiedRecovery *
                0.22
            ) +
          classifiedDenied *
            0.28
        );

      const classifiedSecurityFocus =
        classifiedActive *
        (
          0.28 +
          classifiedScanning *
            0.22 +
          classifiedDenied *
            0.34
        );

      const classifiedInfrastructureFocus =
        classifiedActive *
        (
          0.12 +
          classifiedScanning *
            0.12 +
          classifiedDenied *
            0.08
        );

      const classifiedIntelligenceFocus =
        classifiedActive *
        (
          0.14 +
          classifiedScanning *
            classifiedRecovery *
            0.26 +
          classifiedDenied *
            0.16
        );

      const contactTarget =
        activeSection ===
          "contact"
          ? 1
          : 0;

      const contactActive =
        reducedMotionRef.current
          ? contactTarget
          : smoothValue(
              contactFocusRef.current,
              contactTarget,
              3.8,
              delta
            );

      contactFocusRef.current =
        contactActive;

      const contactState =
        contactStateRef.current;

      const contactStateBlend =
        contactStateBlendRef.current;

      const contactStateKeys:
        ContactState[] = [
          "idle",
          "submitting",
          "success",
          "activation",
          "error",
        ];

      contactStateKeys.forEach(
        (
          state
        ) => {
          const target =
            contactState ===
              state
              ? 1
              : 0;

          contactStateBlend[
            state
          ] =
            reducedMotionRef.current
              ? target
              : smoothValue(
                  contactStateBlend[
                    state
                  ],
                  target,
                  4.2,
                  delta
                );
        }
      );

      const contactIdleFocus =
        contactActive *
        contactStateBlend.idle;

      const contactSubmittingFocus =
        contactActive *
        contactStateBlend.submitting;

      const contactSuccessFocus =
        contactActive *
        contactStateBlend.success;

      const contactActivationFocus =
        contactActive *
        contactStateBlend.activation;

      const contactErrorFocus =
        contactActive *
        contactStateBlend.error;

      const contactConnectionFocus =
        contactActive *
        (
          contactIdleFocus *
            0.18 +
          contactSubmittingFocus *
            0.34 +
          contactSuccessFocus *
            0.46 +
          contactActivationFocus *
            0.2 +
          contactErrorFocus *
            0.16
        );

      const contactSignalFocus =
        contactActive *
        (
          contactIdleFocus *
            0.12 +
          contactSubmittingFocus *
            0.42 +
          contactSuccessFocus *
            0.28 +
          contactActivationFocus *
            0.16 +
          contactErrorFocus *
            0.18
        );

      const contactInfrastructureFocus =
        contactActive *
        (
          contactIdleFocus *
            0.08 +
          contactSubmittingFocus *
            0.18 +
          contactSuccessFocus *
            0.12 +
          contactActivationFocus *
            0.1 +
          contactErrorFocus *
            0.08
        );

      const contactSecurityFocus =
        contactActive *
        (
          contactIdleFocus *
            0.06 +
          contactSubmittingFocus *
            0.16 +
          contactSuccessFocus *
            0.08 +
          contactActivationFocus *
            0.1 +
          contactErrorFocus *
            0.12
        );

      const contactProductFocus =
        contactActive *
        (
          contactIdleFocus *
            0.08 +
          contactSubmittingFocus *
            0.12 +
          contactSuccessFocus *
            0.3 +
          contactActivationFocus *
            0.08 +
          contactErrorFocus *
            0.06
        );

      const archiveTarget =
        activeSection ===
          "archive"
          ? 1
          : 0;

      const projectFocus =
        reducedMotionRef.current
          ? archiveTarget
          : smoothValue(
              archiveFocusRef.current,
              archiveTarget,
              4.2,
              delta
            );

      archiveFocusRef.current =
        projectFocus;

      const archiveProject =
        archiveProjectRef.current;

      const archiveProjectBlend =
        archiveProjectBlendRef.current;

      const archiveProjectKeys:
        ArchiveProjectKey[] = [
          "hostsecual",
          "aged",
          "leemeo",
          "softparallax",
          "security-labs",
          "classified",
        ];

      archiveProjectKeys.forEach(
        (
          projectId
        ) => {
          const target =
            archiveProject ===
              projectId
              ? 1
              : 0;

          archiveProjectBlend[
            projectId
          ] =
            reducedMotionRef.current
              ? target
              : smoothValue(
                  archiveProjectBlend[
                    projectId
                  ],
                  target,
                  4.2,
                  delta
                );
        }
      );

      const archiveHostsecualFocus =
        projectFocus *
        archiveProjectBlend.hostsecual;

      const archiveAgedFocus =
        projectFocus *
        archiveProjectBlend.aged;

      const archiveLeemeoFocus =
        projectFocus *
        archiveProjectBlend.leemeo;

      const archiveSoftparallaxFocus =
        projectFocus *
        archiveProjectBlend.softparallax;

      const archiveSecurityLabsFocus =
        projectFocus *
        archiveProjectBlend[
          "security-labs"
        ];

      const archiveClassifiedFocus =
        projectFocus *
        archiveProjectBlend.classified;

      const archiveInfrastructureFocus =
        archiveHostsecualFocus *
          0.9 +
        archiveAgedFocus *
          0.3 +
        archiveLeemeoFocus *
          0.25;

      const archiveProductFocus =
        archiveAgedFocus *
          0.8 +
        archiveLeemeoFocus *
          0.45 +
        archiveSoftparallaxFocus *
          0.3;

      const archiveSignalFocus =
        archiveSoftparallaxFocus *
          0.7 +
        archiveSecurityLabsFocus *
          0.35;

      const archiveSecurityFocus =
        archiveHostsecualFocus *
          0.5 +
        archiveSecurityLabsFocus *
          0.85;

      const archiveIntelligenceFocus =
        archiveSecurityLabsFocus *
        0.35;

      const archiveRestrictedFocus =
        archiveClassifiedFocus *
        0.36;

      securityColorRef.current
        .copy(
          SECURITY_CYAN
        )
        .lerp(
          RESTRICTED_AMBER,
          restricted
        )
        .lerp(
          RESTRICTED_AMBER,
          archiveRestrictedFocus *
            0.5
        )
        .lerp(
          RESTRICTED_AMBER,
          classifiedRestrictedFocus *
            0.32
        );

      intelligenceColorRef.current
        .copy(
          INTELLIGENCE_VIOLET
        )
        .lerp(
          RESTRICTED_AMBER,
          restricted *
            0.35
        )
        .lerp(
          RESTRICTED_AMBER,
          archiveRestrictedFocus *
            0.28
        )
        .lerp(
          RESTRICTED_AMBER,
          classifiedRestrictedFocus *
            0.42
        );

      productColorRef.current
        .copy(
          PRODUCT_WHITE
        )
        .lerp(
          RESTRICTED_AMBER,
          restricted *
            0.72
        )
        .lerp(
          RESTRICTED_AMBER,
          archiveRestrictedFocus *
            0.46
        )
        .lerp(
          RESTRICTED_AMBER,
          classifiedRestrictedFocus *
            0.24
        );

      modelAccentRef.current
        .copy(
          currentAccentRef.current
        )
        .lerp(
          SECURITY_CYAN,
          identityFocus *
            0.12
        )
        .lerp(
          SECURITY_CYAN,
          securityModeFocus *
            0.16
        )
        .lerp(
          INFRASTRUCTURE_BLUE,
          infrastructureModeFocus *
            0.14
        )
        .lerp(
          INTELLIGENCE_VIOLET,
          intelligenceModeFocus *
            0.18
        )
        .lerp(
          PRODUCT_WHITE,
          connectionModeFocus *
            0.1
        )
        .lerp(
          RESTRICTED_AMBER,
          restrictedModeFocus *
            0.62
        )
        .lerp(
          RESTRICTED_AMBER,
          restricted *
            0.72
        )
        .lerp(
          RESTRICTED_AMBER,
          archiveRestrictedFocus *
            0.5
        );

      const settleSpeed =
        10 +
        handoff *
          8;

      root.rotation.y =
        smoothValue(
          root.rotation.y,
          pointerX *
            0.52,
          settleSpeed,
          delta
        );

      root.rotation.x =
        smoothValue(
          root.rotation.x,
          pointerY *
            -0.34,
          settleSpeed,
          delta
        );

      const baseScale =
        responsiveScale *
        (
          0.88 +
          awake *
            0.12
        ) *
        (
          1 +
          heroProgress *
            0.035 *
            interactionFactor
        );

      const energyScale =
        1 +
        (
          energy -
          1
        ) *
          0.028;

      const handoffScale =
        1 +
        handoff *
          0.015;

      const modeScale =
        1 +
        securityModeFocus *
          0.004 +
        infrastructureModeFocus *
          0.002 +
        intelligenceModeFocus *
          0.005 +
        restrictedModeFocus *
          0.008 -
        connectionModeFocus *
          0.002;

      const targetScale =
        baseScale *
        energyScale *
        handoffScale *
        modeScale;

      const nextScale =
        smoothValue(
          root.scale.x,
          targetScale,
          7 +
            handoff *
              5,
          delta
        );

      root.scale.setScalar(
        nextScale
      );

      root.position.x =
        smoothValue(
          root.position.x,
          pointerX *
            0.28,
          9 +
            handoff *
              7,
          delta
        );

      root.position.y =
        smoothValue(
          root.position.y,
          heroProgress *
              0.08 *
              interactionFactor +
            pointerY *
              0.18,
          9 +
            handoff *
              7,
          delta
        );

      const passiveRotationZ =
        (
          Math.sin(
            elapsedRef.current *
              0.11
          ) *
            0.01 +
          (
            globalProgress -
            0.5
          ) *
            0.008
        ) *
        interactionFactor;

      root.rotation.z =
        smoothValue(
          root.rotation.z,
          passiveRotationZ,
          10 +
            handoff *
              8,
          delta
        );

      if (
        modelPivotRef.current
      ) {
        modelPivotRef.current.rotation.x =
          smoothValue(
            modelPivotRef.current
              .rotation.x,
            pointerY *
              -0.045,
            8 +
              handoff *
                8,
            delta
          );

        modelPivotRef.current.rotation.y =
          smoothValue(
            modelPivotRef.current
              .rotation.y,
            pointerX *
              0.06,
            8 +
              handoff *
                8,
            delta
          );

        modelPivotRef.current.rotation.z =
          smoothValue(
            modelPivotRef.current
              .rotation.z,
            0,
            10 +
              handoff *
                8,
            delta
          );

        modelPivotRef.current.position.x =
          smoothValue(
            modelPivotRef.current
              .position.x,
            0,
            10 +
              handoff *
                6,
            delta
          );

        modelPivotRef.current.position.y =
          smoothValue(
            modelPivotRef.current
              .position.y,
            0,
            10 +
              handoff *
                6,
            delta
          );

        modelPivotRef.current.position.z =
          smoothValue(
            modelPivotRef.current
              .position.z,
            (
              projectFocus *
                0.04 +
              securityModeFocus *
                0.012 -
              infrastructureModeFocus *
                0.006 +
              intelligenceModeFocus *
                0.014 +
              restrictedModeFocus *
                0.028 -
              connectionModeFocus *
                0.008 +
              contactSubmittingFocus *
                0.01 +
              contactSuccessFocus *
                0.024
            ) *
              interactionFactor,
            8 +
              handoff *
                6,
            delta
          );
      }

      modelMaterialRefs.current.forEach(
        (
          material
        ) => {
          material.emissive.copy(
            modelAccentRef.current
          );

          material.emissiveIntensity =
            (
              0.025 +
              productActivation *
                0.105 +
              projectFocus *
                0.035 +
              identityFocus *
                0.018 +
              logicProductFocus *
                0.012 +
              capabilityProductFocus *
                0.014 +
              securityApplicationFocus *
                0.012 +
              securityMobileFocus *
                0.01 +
              archiveProductFocus *
                0.014 +
              archiveSecurityFocus *
                0.008 +
              archiveRestrictedFocus *
                0.018 +
              topologyProductFocus *
                0.016 +
              topologySecurityFocus *
                0.008 +
              searchProductFocus *
                0.01 +
              researchProductFocus *
                0.012 +
              classifiedRestrictedFocus *
                0.012 +
              contactConnectionFocus *
                0.01 +
              contactProductFocus *
                0.012
            ) *
            energy;
        }
      );

      if (
        infrastructureRef.current
      ) {
        infrastructureRef.current
          .position.z =
          smoothValue(
            infrastructureRef.current
              .position.z,
            heroProgress *
              0.1,
            6,
            delta
          );

        const infrastructureScale =
          0.98 +
          infrastructureActivation *
            0.02 +
          infrastructureFocus *
            0.018 +
          identityFocus *
            0.006 +
          logicInfrastructureFocus *
            0.012 +
          capabilityInfrastructureFocus *
            0.012 +
          securityInfrastructureFocus *
            0.014 +
          securityNetworkFocus *
            0.009 +
          archiveInfrastructureFocus *
            0.009 +
          topologyInfrastructureFocus *
            0.014 +
          searchInfrastructureFocus *
            0.006 +
          researchInfrastructureFocus *
            0.008 +
          classifiedInfrastructureFocus *
            0.014 +
          contactInfrastructureFocus *
            0.008;

        infrastructureRef.current
          .scale.setScalar(
            infrastructureScale
          );
      }

      if (
        infrastructureMaterialRef.current
      ) {
        infrastructureMaterialRef.current
          .color.copy(
            INFRASTRUCTURE_BLUE
          );

        infrastructureMaterialRef.current
          .opacity =
          (
            0.025 +
            infrastructureActivation *
              0.1 +
            infrastructureFocus *
              0.075 +
            infrastructureModeFocus *
              0.03 +
            identityFocus *
              0.028 +
            logicInfrastructureFocus *
              0.055 +
            capabilityInfrastructureFocus *
              0.05 +
            capabilityNetworkFocus *
              0.02 +
            securityInfrastructureFocus *
              0.055 +
            securityNetworkFocus *
              0.04 +
            archiveInfrastructureFocus *
              0.035 +
            topologyInfrastructureFocus *
              0.05 +
            searchInfrastructureFocus *
              0.024 +
            researchInfrastructureFocus *
              0.032 +
            classifiedInfrastructureFocus *
              0.07 +
            contactInfrastructureFocus *
              0.026
          ) *
          (
            1 -
            restricted *
              0.34
          );
      }

      gatewayMaterialRefs.current.forEach(
        (
          material
        ) => {
          material.color.copy(
            modelAccentRef.current
          );

          material.opacity =
            (
              0.08 +
              infrastructureActivation *
                0.5 +
              signalFocus *
                0.12 +
              identityFocus *
                0.06 +
              logicSignalFocus *
                0.07 +
              logicInfrastructureFocus *
                0.035 +
              capabilityNetworkFocus *
                0.1 +
              capabilitySignalFocus *
                0.04 +
              securityVulnerabilityFocus *
                0.035 +
              securityNetworkFocus *
                0.055 +
              archiveInfrastructureFocus *
                0.025 +
              archiveSignalFocus *
                0.045 +
              topologySignalFocus *
                0.09 +
              topologyInfrastructureFocus *
                0.035 +
              searchLayerSignalFocus *
                0.035 +
              researchSignalFocus *
                0.055 +
              researchInfrastructureFocus *
                0.02 +
              classifiedSignalFocus *
                0.15 +
              classifiedInfrastructureFocus *
                0.05 +
              contactConnectionFocus *
                0.07 +
              contactSignalFocus *
                0.085 +
              contactInfrastructureFocus *
                0.025
            ) *
            (
              1 -
              restricted *
                0.38
            );
        }
      );

      if (
        routeMaterialRef.current
      ) {
        routeMaterialRef.current
          .color.copy(
            modelAccentRef.current
          );

        routeMaterialRef.current
          .opacity =
          (
            0.025 +
            infrastructureActivation *
              0.13 +
            signalFocus *
              0.12 +
            identityFocus *
              0.04 +
            logicSignalFocus *
              0.075 +
            logicInfrastructureFocus *
              0.04 +
            capabilityNetworkFocus *
              0.08 +
            capabilitySignalFocus *
              0.06 +
            securityVulnerabilityFocus *
              0.045 +
            securityNetworkFocus *
              0.07 +
            archiveInfrastructureFocus *
              0.025 +
            archiveSignalFocus *
              0.045 +
            topologySignalFocus *
              0.1 +
            topologyInfrastructureFocus *
              0.04 +
            searchLayerSignalFocus *
              0.03 +
            researchSignalFocus *
              0.05 +
            researchInfrastructureFocus *
              0.018 +
            classifiedSignalFocus *
              0.18 +
            classifiedInfrastructureFocus *
              0.05 +
            contactConnectionFocus *
              0.055 +
            contactSignalFocus *
              0.075 +
            contactInfrastructureFocus *
              0.02
          ) *
          energy *
          (
            1 -
            restricted *
              0.55
          );
      }

      if (
        signalFieldRef.current
      ) {
        const signalScale =
          1 +
          signalFocus *
            0.045 +
          logicSignalFocus *
            0.025 +
          capabilitySignalFocus *
            0.025 +
          securityVulnerabilityFocus *
            0.018 +
          securityMobileFocus *
            0.012 +
          securityNetworkFocus *
            0.022 +
          archiveSignalFocus *
            0.015 +
          topologySignalFocus *
            0.025 +
          searchLayerSignalFocus *
            0.012 +
          researchSignalFocus *
            0.018 +
          classifiedSignalFocus *
            0.035 +
          contactSignalFocus *
            0.018;

        signalFieldRef.current
          .scale.setScalar(
            signalScale
          );
      }

      packetMaterialRefs.current.forEach(
        (
          material
        ) => {
          material.color.copy(
            modelAccentRef.current
          );

          material.opacity =
            (
              0.07 +
              securityActivation *
                0.54 +
              signalFocus *
                0.15 +
              logicSecurityFocus *
                0.08 +
              logicSignalFocus *
                0.08 +
              capabilitySecurityFocus *
                0.06 +
              capabilitySignalFocus *
                0.08 +
              securityVulnerabilityFocus *
                0.08 +
              securityMobileFocus *
                0.045 +
              securityNetworkFocus *
                0.09 +
              archiveSignalFocus *
                0.04 +
              archiveSecurityFocus *
                0.025 +
              topologySignalFocus *
                0.075 +
              topologySecurityFocus *
                0.055 +
              searchLayerSignalFocus *
                0.028 +
              researchSignalFocus *
                0.045 +
              researchSecurityFocus *
                0.03 +
              classifiedSignalFocus *
                0.14 +
              classifiedSecurityFocus *
                0.08 +
              contactSignalFocus *
                0.045 +
              contactSecurityFocus *
                0.03
            ) *
            (
              1 -
              restricted *
                0.58
            );
        }
      );

      packetRefs.current.forEach(
        (
          packet,
          index
        ) => {
          const baseAngle =
            orbitNodes[
              index
            ].angle;

          const speed =
            0.2 +
            index *
              0.006 +
            signalFocus *
              0.12;

          const angle =
            elapsedRef.current *
              speed *
              energy +
            baseAngle;

          const radius =
            2.48 +
            Math.sin(
              elapsedRef.current *
                0.7 +
              index
            ) *
              0.025;

          packet.position.x =
            Math.cos(
              angle
            ) *
            radius;

          packet.position.y =
            Math.sin(
              angle
            ) *
            radius;

          packet.position.z =
            Math.sin(
              angle *
                2
            ) *
            0.06;
        }
      );

      if (
        securityRef.current
      ) {
        const securityScale =
          0.985 +
          securityActivation *
            0.015 +
          securityFocus *
            0.022 +
          logicSecurityFocus *
            0.014 +
          capabilitySecurityFocus *
            0.012 +
          securityApplicationFocus *
            0.007 +
          securityVulnerabilityFocus *
            0.009 +
          securityMobileFocus *
            0.006 +
          securityInfrastructureFocus *
            0.006 +
          securityNetworkFocus *
            0.008 +
          securityIntelligenceFocus *
            0.006 +
          archiveSecurityFocus *
            0.009 +
          topologySecurityFocus *
            0.012 +
          researchSecurityFocus *
            0.01 +
          classifiedSecurityFocus *
            0.022;

        securityRef.current
          .scale.setScalar(
            securityScale
          );
      }

      if (
        securityMaterialOneRef.current
      ) {
        securityMaterialOneRef.current
          .color.copy(
            securityColorRef.current
          );

        securityMaterialOneRef.current
          .opacity =
          (
            0.02 +
            securityActivation *
              0.17 +
            securityFocus *
              0.12 +
            securityModeFocus *
              0.03 +
            logicSecurityFocus *
              0.075 +
            capabilitySecurityFocus *
              0.065 +
            securityApplicationFocus *
              0.032 +
            securityVulnerabilityFocus *
              0.04 +
            securityMobileFocus *
              0.028 +
            securityInfrastructureFocus *
              0.03 +
            securityNetworkFocus *
              0.036 +
            securityIntelligenceFocus *
              0.03 +
            archiveSecurityFocus *
              0.04 +
            topologySecurityFocus *
              0.06 +
            researchSecurityFocus *
              0.045 +
            classifiedSecurityFocus *
              0.11 +
            contactSecurityFocus *
              0.03
          ) *
          energy;
      }

      if (
        securityMaterialTwoRef.current
      ) {
        securityMaterialTwoRef.current
          .color.copy(
            securityColorRef.current
          );

        securityMaterialTwoRef.current
          .opacity =
          (
            0.015 +
            securityActivation *
              0.115 +
            securityFocus *
              0.085 +
            securityModeFocus *
              0.02 +
            logicSecurityFocus *
              0.055 +
            capabilitySecurityFocus *
              0.045 +
            securityApplicationFocus *
              0.022 +
            securityVulnerabilityFocus *
              0.028 +
            securityMobileFocus *
              0.02 +
            securityInfrastructureFocus *
              0.021 +
            securityNetworkFocus *
              0.025 +
            securityIntelligenceFocus *
              0.022 +
            archiveSecurityFocus *
              0.028 +
            topologySecurityFocus *
              0.045 +
            researchSecurityFocus *
              0.032 +
            classifiedSecurityFocus *
              0.08 +
            contactSecurityFocus *
              0.022
          ) *
          energy;
      }

      if (
        securityRingOneRef.current &&
        !reducedMotionRef.current
      ) {
        securityRingOneRef.current
          .rotation.z -=
          delta *
          motionScale *
          (
            0.045 +
            securityFocus *
              0.035
          ) *
          energy;
      }

      if (
        securityRingTwoRef.current &&
        !reducedMotionRef.current
      ) {
        securityRingTwoRef.current
          .rotation.z +=
          delta *
          motionScale *
          (
            0.032 +
            securityFocus *
              0.03
          ) *
          energy;
      }

      if (
        intelligenceRef.current
      ) {
        const intelligenceScale =
          0.98 +
          intelligenceActivation *
            0.02 +
          intelligenceFocus *
            0.028 +
          logicIntelligenceFocus *
            0.014 +
          capabilityIntelligenceFocus *
            0.012 +
          securityIntelligenceFocus *
            0.014 +
          archiveIntelligenceFocus *
            0.008 +
          searchIntelligenceFocus *
            0.006 +
          researchIntelligenceFocus *
            0.012 +
          classifiedIntelligenceFocus *
            0.02;

        intelligenceRef.current
          .scale.setScalar(
            intelligenceScale
          );
      }

      if (
        intelligenceMaterialRef.current
      ) {
        intelligenceMaterialRef.current
          .color.copy(
            intelligenceColorRef.current
          );

        intelligenceMaterialRef.current
          .opacity =
          (
            0.012 +
            intelligenceActivation *
              0.11 +
            intelligenceFocus *
              0.1 +
            intelligenceModeFocus *
              0.028 +
            logicIntelligenceFocus *
              0.06 +
            capabilityIntelligenceFocus *
              0.05 +
            securityIntelligenceFocus *
              0.065 +
            archiveIntelligenceFocus *
              0.035 +
            searchIntelligenceFocus *
              0.022 +
            researchIntelligenceFocus *
              0.04 +
            classifiedIntelligenceFocus *
              0.075
          ) *
          (
            1 -
            restricted *
              0.45
          );
      }

      if (
        intelligenceOrbitMaterialRef.current
      ) {
        intelligenceOrbitMaterialRef.current
          .color.copy(
            intelligenceColorRef.current
          );

        intelligenceOrbitMaterialRef.current
          .opacity =
          (
            0.02 +
            intelligenceActivation *
              0.15 +
            intelligenceFocus *
              0.1 +
            intelligenceModeFocus *
              0.022 +
            logicIntelligenceFocus *
              0.05 +
            capabilityIntelligenceFocus *
              0.04 +
            securityIntelligenceFocus *
              0.05 +
            archiveIntelligenceFocus *
              0.025 +
            searchIntelligenceFocus *
              0.018 +
            researchIntelligenceFocus *
              0.032 +
            classifiedIntelligenceFocus *
              0.06
          ) *
          (
            1 -
            restricted *
              0.42
          );
      }

      if (
        intelligenceShellRef.current &&
        !reducedMotionRef.current
      ) {
        intelligenceShellRef.current
          .rotation.x +=
          delta *
          motionScale *
          0.018 *
          energy;

        intelligenceShellRef.current
          .rotation.y -=
          delta *
          motionScale *
          0.022 *
          energy;
      }

      if (
        intelligenceOrbitRef.current &&
        !reducedMotionRef.current
      ) {
        intelligenceOrbitRef.current
          .rotation.z +=
          delta *
          motionScale *
          (
            0.07 +
            intelligenceFocus *
              0.05
          ) *
          energy;
      }

      if (
        productRef.current
      ) {
        productRef.current.position.x =
          smoothValue(
            productRef.current
              .position.x,
            pointerX *
              -0.025,
            8,
            delta
          );

        productRef.current.position.y =
          smoothValue(
            productRef.current
              .position.y,
            pointerY *
              -0.02,
            8,
            delta
          );
      }

      if (
        productMaterialRef.current
      ) {
        productMaterialRef.current
          .color.copy(
            productColorRef.current
          );

        const pulse =
          (
            Math.sin(
              elapsedRef.current *
                1.45
            ) +
            1
          ) *
          0.5;

        productMaterialRef.current
          .opacity =
          (
            0.022 +
            productActivation *
              0.07 +
            publicModeFocus *
              0.004 +
            connectionModeFocus *
              0.02 +
            pulse *
              0.03 +
            logicProductFocus *
              0.045 +
            capabilityProductFocus *
              0.04 +
            securityApplicationFocus *
              0.045 +
            securityMobileFocus *
              0.035 +
            archiveProductFocus *
              0.03 +
            topologyProductFocus *
              0.038 +
            searchProductFocus *
              0.018 +
            researchProductFocus *
              0.03 +
            contactProductFocus *
              0.026 +
            contactSuccessFocus *
              0.016
          ) *
          energy;
      }

      if (
        productHaloRef.current
      ) {
        const pulseScale =
          1 +
          Math.sin(
            elapsedRef.current *
              1.35
          ) *
            0.022 *
            productActivation;

        productHaloRef.current
          .scale.setScalar(
            pulseScale
          );
      }

      if (
        accentLightRef.current
      ) {
        accentLightRef.current
          .color.copy(
            productColorRef.current
          );

        accentLightRef.current
          .intensity =
          1.2 +
          productActivation *
            4.8 *
            energy +
          identityFocus *
            0.7 +
          logicProductFocus *
            0.65 +
          logicSecurityFocus *
            0.3 +
          logicInfrastructureFocus *
            0.24 +
          logicSignalFocus *
            0.28 +
          logicIntelligenceFocus *
            0.32 +
          capabilityProductFocus *
            0.6 +
          capabilitySecurityFocus *
            0.25 +
          capabilityInfrastructureFocus *
            0.2 +
          capabilitySignalFocus *
            0.25 +
          capabilityIntelligenceFocus *
            0.28 +
          securityApplicationFocus *
            0.3 +
          securityVulnerabilityFocus *
            0.24 +
          securityMobileFocus *
            0.24 +
          securityInfrastructureFocus *
            0.22 +
          securityNetworkFocus *
            0.26 +
          securityIntelligenceFocus *
            0.28 +
          archiveProductFocus *
            0.2 +
          archiveSecurityFocus *
            0.15 +
          archiveInfrastructureFocus *
            0.12 +
          archiveSignalFocus *
            0.14 +
          archiveIntelligenceFocus *
            0.13 +
          archiveRestrictedFocus *
            0.2 +
          topologyInfrastructureFocus *
            0.28 +
          topologySignalFocus *
            0.22 +
          topologySecurityFocus *
            0.26 +
          topologyProductFocus *
            0.3 +
          searchLayerSignalFocus *
            0.12 +
          searchInfrastructureFocus *
            0.08 +
          searchProductFocus *
            0.1 +
          searchIntelligenceFocus *
            0.1 +
          researchProductFocus *
            0.1 +
          researchSecurityFocus *
            0.1 +
          researchInfrastructureFocus *
            0.08 +
          researchSignalFocus *
            0.1 +
          researchIntelligenceFocus *
            0.14 +
          classifiedRestrictedFocus *
            0.9 +
          classifiedSignalFocus *
            0.28 +
          classifiedSecurityFocus *
            0.24 +
          classifiedIntelligenceFocus *
            0.2 +
          contactConnectionFocus *
            0.5 +
          contactSignalFocus *
            0.22 +
          contactSecurityFocus *
            0.12 +
          contactProductFocus *
            0.26 +
          contactSuccessFocus *
            0.24 +
          securityModeFocus *
            0.25 +
          infrastructureModeFocus *
            0.18 +
          intelligenceModeFocus *
            0.24 +
          restrictedModeFocus *
            0.5 +
          connectionModeFocus *
            0.32;
      }
    }
  );

  return (
    <group
      ref={rootRef}
      scale={0.9}
    >
      <group
        ref={modelPivotRef}
      >
        <group
          scale={MODEL_SCALE}
          rotation={[
            0,
            MODEL_FRONT_ROTATION_Y,
            0,
          ]}
        >
          <Suspense
            fallback={null}
          >
            <RealCoreModel
              onReady={
                handleModelReady
              }
            />
          </Suspense>
        </group>
      </group>

      <group
        ref={
          infrastructureRef
        }
      >
        <mesh>
          <torusGeometry
            args={[
              2.72,
              0.01,
              8,
              160,
            ]}
          />

          <meshBasicMaterial
            ref={
              infrastructureMaterialRef
            }
            color="#1f7194"
            transparent
            opacity={0.025}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>

        <lineSegments
          geometry={
            routeGeometry
          }
        >
          <lineBasicMaterial
            ref={
              routeMaterialRef
            }
            color="#48d7ff"
            transparent
            opacity={0}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </lineSegments>

        {orbitNodes.map(
          (
            node,
            index
          ) => (
            <group
              key={`gateway-${index}`}
              position={[
                node.x,
                node.y,
                0.035,
              ]}
            >
              <mesh>
                <octahedronGeometry
                  args={[
                    0.055,
                    0,
                  ]}
                />

                <meshBasicMaterial
                  ref={(
                    material
                  ) => {
                    if (
                      material
                    ) {
                      gatewayMaterialRefs.current[
                        index
                      ] =
                        material;
                    }
                  }}
                  color="#48d7ff"
                  transparent
                  opacity={0.08}
                  blending={
                    THREE.AdditiveBlending
                  }
                  depthWrite={false}
                />
              </mesh>

              <mesh>
                <torusGeometry
                  args={[
                    0.1,
                    0.005,
                    8,
                    30,
                  ]}
                />

                <meshBasicMaterial
                  color="#dff8ff"
                  transparent
                  opacity={0.09}
                  blending={
                    THREE.AdditiveBlending
                  }
                  depthWrite={false}
                />
              </mesh>
            </group>
          )
        )}
      </group>

      <group
        ref={
          signalFieldRef
        }
      >
        {orbitNodes.map(
          (
            node,
            index
          ) => (
            <mesh
              key={`packet-${index}`}
              ref={(
                mesh
              ) => {
                if (
                  mesh
                ) {
                  packetRefs.current[
                    index
                  ] =
                    mesh;
                }
              }}
              position={[
                Math.cos(
                  node.angle
                ) *
                  2.48,
                Math.sin(
                  node.angle
                ) *
                  2.48,
                0,
              ]}
            >
              <sphereGeometry
                args={[
                  0.022,
                  10,
                  10,
                ]}
              />

              <meshBasicMaterial
                ref={(
                  material
                ) => {
                  if (
                    material
                  ) {
                    packetMaterialRefs.current[
                      index
                    ] =
                      material;
                  }
                }}
                color="#48d7ff"
                transparent
                opacity={0}
                blending={
                  THREE.AdditiveBlending
                }
                depthWrite={false}
              />
            </mesh>
          )
        )}
      </group>

      <group
        ref={
          securityRef
        }
        rotation={[
          0.72,
          -0.22,
          0.15,
        ]}
      >
        <mesh
          ref={
            securityRingOneRef
          }
        >
          <torusGeometry
            args={[
              1.95,
              0.011,
              10,
              140,
              Math.PI *
                1.78,
            ]}
          />

          <meshBasicMaterial
            ref={
              securityMaterialOneRef
            }
            color="#55ddff"
            transparent
            opacity={0.02}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>

        <mesh
          ref={
            securityRingTwoRef
          }
          rotation={[
            0.58,
            0.4,
            0.45,
          ]}
        >
          <torusGeometry
            args={[
              1.72,
              0.008,
              10,
              120,
              Math.PI *
                1.62,
            ]}
          />

          <meshBasicMaterial
            ref={
              securityMaterialTwoRef
            }
            color="#55ddff"
            transparent
            opacity={0.02}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>
      </group>

      <group
        ref={
          intelligenceRef
        }
        rotation={[
          0.35,
          0.48,
          -0.14,
        ]}
      >
        <mesh
          ref={
            intelligenceShellRef
          }
        >
          <icosahedronGeometry
            args={[
              1.05,
              2,
            ]}
          />

          <meshBasicMaterial
            ref={
              intelligenceMaterialRef
            }
            color="#786dff"
            wireframe
            transparent
            opacity={0.012}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>

        <mesh
          ref={
            intelligenceOrbitRef
          }
          rotation={[
            0.68,
            0.15,
            0.32,
          ]}
        >
          <torusGeometry
            args={[
              1.27,
              0.007,
              8,
              96,
              Math.PI *
                1.7,
            ]}
          />

          <meshBasicMaterial
            ref={
              intelligenceOrbitMaterialRef
            }
            color="#786dff"
            transparent
            opacity={0.02}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>
      </group>

      <group
        ref={
          productRef
        }
      >
        <mesh
          ref={
            productHaloRef
          }
        >
          <icosahedronGeometry
            args={[
              0.66,
              2,
            ]}
          />

          <meshBasicMaterial
            ref={
              productMaterialRef
            }
            color="#dff8ff"
            wireframe
            transparent
            opacity={0.022}
            blending={
              THREE.AdditiveBlending
            }
            depthWrite={false}
          />
        </mesh>
      </group>

      <pointLight
        ref={
          accentLightRef
        }
        position={[
          0,
          0,
          2.2,
        ]}
        intensity={1.2}
        distance={7}
        color="#dff8ff"
      />
    </group>
  );
}

type CoreSceneProps = {
  fill?: boolean;
  active?: boolean;
};

export default function CoreScene({
  fill = false,
  active = true,
}: CoreSceneProps) {
  return (
    <div
      className={
        fill
          ? `
              relative
              h-full
              w-full
              min-w-0
              overflow-hidden
            `
          : `
              relative
              h-[320px]
              w-full
              min-w-0
              overflow-hidden
              min-[375px]:h-[350px]
              min-[430px]:h-[390px]
              sm:h-[440px]
              md:h-[500px]
              lg:h-[540px]
              xl:h-[620px]
              2xl:h-[690px]
            `
      }
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[72%]
          w-[72%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-300/[0.025]
          blur-[100px]
        "
      />

      <div
        className="
          absolute
          inset-0
          z-10
        "
      >
        <Canvas
          dpr={[
            1,
            1.35,
          ]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference:
              "high-performance",
          }}
          onCreated={(
            {
              gl,
            }
          ) => {
            gl.toneMapping =
              THREE.ACESFilmicToneMapping;

            gl.toneMappingExposure =
              1.05;

            gl.outputColorSpace =
              THREE.SRGBColorSpace;
          }}
        >
          <AdaptiveCamera />

          <AdaptiveRenderer />

          <RenderLoopController
            active={active}
          />

          <fog
            attach="fog"
            args={[
              "#080b0f",
              8,
              15,
            ]}
          />

          <ambientLight
            intensity={0.68}
          />

          <directionalLight
            position={[
              4,
              5,
              6,
            ]}
            intensity={2}
            color="#e8fbff"
          />

          <directionalLight
            position={[
              -4,
              -2,
              4,
            ]}
            intensity={1.05}
            color="#6268aa"
          />

          <pointLight
            position={[
              -3.5,
              1.5,
              3,
            ]}
            intensity={4.5}
            distance={9}
            color="#286f84"
          />

          <AmbientSignals />

          <CoreSystem />
        </Canvas>
      </div>

    </div>
  );
}

useGLTF.preload(
  MODEL_PATH
);