import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { clone as cloneSkinnedModel } from "three/addons/utils/SkeletonUtils.js";
import { ArrowDownRight, Sparkles } from "lucide-react";
import * as THREE from "three";
import gsap from "gsap";
import Styles from "./PortraitStage.module.scss";

const portraitPath = `${import.meta.env.BASE_URL}models/Naman%20standing%20rigged%20modal/base_basic_pbr.glb`;
const MOONWALK_CLIP_NAME = "human_000037";
const SALUTE_CLIP_NAME = "human_000052";
const SITTING_CLIP_NAME = "human_000056";
const STANDING_CLIP_NAME = "human_000092";

export type CharacterMotion = {
  wave: number;
  walk: number;
  run: number;
  sit: number;
  moonwalk: number;
  turn: number;
};

type LookState = {
  x: number;
  y: number;
  rotation: number;
  dragging: boolean;
};

function PortraitModel({
  look,
  motion,
  onLoaded,
}: {
  look: MutableRefObject<LookState>;
  motion: MutableRefObject<CharacterMotion>;
  onLoaded: () => void;
}) {
  const { scene, animations } = useGLTF(portraitPath);
  const modelRoot = useRef<THREE.Group>(null);
  const model = useMemo(() => {
    const clone = cloneSkinnedModel(scene);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    clone.position.set(-center.x, -bounds.min.y, -center.z);
    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);
  const clips = useMemo(
    () =>
      animations.map((animation) => {
        const clip = animation.clone();
        if (clip.name === MOONWALK_CLIP_NAME) {
          clip.tracks = clip.tracks.filter(
            (track) => track.name !== "Hips.position",
          );
        }
        if (clip.name === SALUTE_CLIP_NAME) {
          clip.tracks = clip.tracks.filter((track) =>
            /^(RightShoulder|RightArm|RightForeArm|RightHand(?:Thumb|Index|Middle|Ring|Pinky)?\d*)\./.test(
              track.name,
            ),
          );
        }
        return clip;
      }),
    [animations],
  );
  const { actions } = useAnimations(clips, model);
  const activeActions = useRef(new Set<THREE.AnimationAction>());
  const reduceMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    const standing = actions[STANDING_CLIP_NAME];
    const salute = actions[SALUTE_CLIP_NAME];
    const sitting = actions[SITTING_CLIP_NAME];
    const moonwalk = actions[MOONWALK_CLIP_NAME];
    const missing = [
      { name: "standing", action: standing },
      { name: "salute", action: salute },
      { name: "sitting", action: sitting },
      { name: "moonwalk", action: moonwalk },
    ]
      .filter(({ action }) => !action)
      .map(({ name }) => name);

    if (missing.length > 0 || !standing || !salute || !sitting || !moonwalk) {
      console.error(`The portrait model is missing required clips: ${missing.join(", ")}.`);
      onLoaded();
      return;
    }

    for (const action of Object.values(actions)) {
      action?.stop();
      action?.setEffectiveWeight(0);
    }

    standing.setLoop(
      reduceMotion ? THREE.LoopOnce : THREE.LoopRepeat,
      reduceMotion ? 1 : Number.POSITIVE_INFINITY,
    );
    standing.clampWhenFinished = reduceMotion;
    standing.setEffectiveTimeScale(0.45);
    standing.reset().setEffectiveWeight(1).play();
    standing.paused = reduceMotion;
    salute.setLoop(THREE.LoopOnce, 1);
    salute.clampWhenFinished = true;
    salute.setEffectiveTimeScale(0.85);
    sitting.setLoop(THREE.LoopOnce, 1);
    sitting.clampWhenFinished = true;
    sitting.setEffectiveTimeScale(1);
    moonwalk.setLoop(THREE.LoopRepeat, Number.POSITIVE_INFINITY);
    moonwalk.setEffectiveTimeScale(1);
    activeActions.current = new Set([standing]);
    onLoaded();

    if (reduceMotion) {
      return () => {
        for (const action of Object.values(actions)) action?.stop();
        activeActions.current.clear();
      };
    }

    const greeting = gsap.timeline({ delay: 0.2 });
    greeting
      .to(motion.current, { wave: 1, duration: 0.42, ease: "power2.out" })
      .to(motion.current, {
        wave: 0,
        duration: 0.52,
        delay: 0.8,
        ease: "power2.inOut",
      });
    return () => {
      greeting.kill();
      for (const action of Object.values(actions)) action?.stop();
      activeActions.current.clear();
    };
  }, [actions, motion, onLoaded, reduceMotion]);

  useFrame((state, delta) => {
    const group = modelRoot.current;
    if (!group) return;
    const time = state.clock.elapsedTime;
    const pose = motion.current;
    const locomotionWeight = Math.max(pose.walk, pose.run, pose.moonwalk);
    const specialWeight = THREE.MathUtils.clamp(
      pose.sit + locomotionWeight,
      0,
      1,
    );
    const desired = [
      [actions[STANDING_CLIP_NAME], 1 - specialWeight],
      [actions[SALUTE_CLIP_NAME], pose.wave],
      [actions[SITTING_CLIP_NAME], pose.sit],
      [actions[MOONWALK_CLIP_NAME], locomotionWeight],
    ] as const;

    for (const [action, weight] of desired) {
      if (!action) continue;
      const targetWeight = reduceMotion
        ? action === actions[STANDING_CLIP_NAME]
          ? 1
          : 0
        : weight;
      if (targetWeight > 0.001 && !activeActions.current.has(action)) {
        action.reset().play();
        activeActions.current.add(action);
      }
      action.setEffectiveWeight(targetWeight);
      if (action === actions[MOONWALK_CLIP_NAME]) {
        action.setEffectiveTimeScale(0.65 + pose.walk * 0.45 + pose.run * 1.3);
      }
      if (
        targetWeight <= 0.001 &&
        action !== actions[STANDING_CLIP_NAME] &&
        activeActions.current.has(action)
      ) {
        action.stop();
        activeActions.current.delete(action);
      }
    }

    const idle = reduceMotion ? 0 : Math.sin(time * 0.42) * 0.025;
    const targetRotation =
      look.current.rotation +
      look.current.x * 0.27 +
      idle +
      pose.turn * Math.PI * 0.72;
    const targetTilt = look.current.y * 0.075;
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotation,
      3,
      delta,
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      targetTilt,
      3,
      delta,
    );
    group.position.y = reduceMotion ? 0 : Math.sin(time * 0.75) * 0.012;
  });

  return (
    <group ref={modelRoot} scale={1.25}>
      <primitive object={model} />
    </group>
  );
}

class PortraitErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error("Unable to render the 3D portrait.", error);
    this.props.onError();
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export default function PortraitStage({
  motion,
}: {
  motion: MutableRefObject<CharacterMotion>;
}) {
  const look = useRef<LookState>({ x: 0, y: 0, rotation: 0, dragging: false });
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const handleLoaded = useMemo(() => () => setLoaded(true), []);

  function updatePointer(event: ReactPointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    look.current.x = THREE.MathUtils.clamp(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -1,
      1,
    );
    look.current.y = THREE.MathUtils.clamp(
      ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
      -1,
      1,
    );
    if (look.current.dragging) {
      look.current.rotation = THREE.MathUtils.clamp(
        look.current.rotation + event.movementX * 0.007,
        -1.2,
        1.2,
      );
    }
  }

  function stopDragging() {
    look.current.dragging = false;
    setIsDragging(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
      return;
    }
    event.preventDefault();
    if (event.key === "ArrowLeft") look.current.rotation -= 0.12;
    if (event.key === "ArrowRight") look.current.rotation += 0.12;
    if (event.key === "ArrowUp") look.current.y = -0.8;
    if (event.key === "ArrowDown") look.current.y = 0.8;
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      look.current.y = 0;
    }
  }

  const greet = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(motion.current, {
      wave: 1,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        gsap.to(motion.current, {
          wave: 0,
          duration: 0.5,
          delay: 0.85,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      },
    });
  }, []);

  return (
    <div className={`hero-visual ${Styles.visual}`}>
      <div
        className={`model-stage ${Styles.stage}${isDragging ? " is-dragging" : ""}`}
        role="group"
        tabIndex={0}
        aria-label="Interactive 3D portrait of Naman. Move your pointer, drag, or use the arrow keys to look around."
        onPointerMove={updatePointer}
        onPointerEnter={greet}
        onPointerDown={(event) => {
          if (!loaded) return;
          look.current.dragging = true;
          setIsDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={() => {
          if (!look.current.dragging) {
            look.current.x = 0;
            look.current.y = 0;
          }
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <div className="stage-grid" aria-hidden="true" />
        <div className="stage-orbit stage-orbit-one" aria-hidden="true" />
        <div className="stage-orbit stage-orbit-two" aria-hidden="true" />
        <div className="stage-label">
          <span>01 / THE BUILDER</span>
          <span>3D STUDY</span>
        </div>
        {!loaded && (
          <div
            className={`model-loader${failed ? " has-error" : ""}`}
            role="status"
            aria-live="polite"
          >
            <span className="loader-dot" />
            <span>
              {failed ? "The 3D scene could not be loaded" : "Preparing the scene"}
            </span>
          </div>
        )}
        {!failed && (
          <PortraitErrorBoundary onError={() => setFailed(true)}>
            <Canvas
              id="model-canvas"
              aria-hidden="true"
              dpr={[1, 1.65]}
              camera={{ position: [0, 1.42, 4.9], fov: 32, near: 0.1, far: 50 }}
              gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
              onCreated={({ gl, camera }) => {
                gl.outputColorSpace = THREE.SRGBColorSpace;
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.15;
                camera.lookAt(0, 1.08, 0);
              }}
            >
              <hemisphereLight args={[0xffeaf0, 0x26121e, 2.2]} />
              <directionalLight
                position={[-3.5, 5, 4]}
                intensity={3.1}
                color={0xffe5dc}
              />
              <directionalLight
                position={[3.2, 2.5, -3]}
                intensity={2.1}
                color={0x8e516f}
              />
              <Suspense fallback={null}>
                <PortraitModel
                  look={look}
                  motion={motion}
                  onLoaded={handleLoaded}
                />
              </Suspense>
            </Canvas>
          </PortraitErrorBoundary>
        )}
        <div className="stage-coordinates" aria-hidden="true">
          12° 58′ N
          <br />
          77° 35′ E
        </div>
        <div className="stage-caption">
          <span className="caption-index">FIG. 01</span>
          <span>A LITTLE FOCUS GOES A LONG WAY.</span>
        </div>
        <span className={`drag-hint ${Styles.dragHint}${loaded ? "" : " is-hidden"}`}>
          MOVE OR DRAG TO EXPLORE <ArrowDownRight aria-hidden="true" />
        </span>
      </div>
      <p className="model-note">
        <Sparkles className={`note-spark ${Styles.spark}`} aria-hidden="true" />
        A little 3D portrait. A lot of curiosity.
      </p>
    </div>
  );
}
