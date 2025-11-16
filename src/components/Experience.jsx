import { ContactShadows, OrbitControls, Center, Stage } from "@react-three/drei";
import { Shirt } from "./Shirt";

const Experience = ({ color, decal, decalProps }) => {
  return (
    <>
      <Stage
        environment="city"
        intensity={0.6}
        castShadow={false}
        adjustCamera={false}
      >
        <Center position={[0, -0.3, 0]}>
          <Shirt color={color} decal={decal} decalProps={decalProps} />
        </Center>
      </Stage>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[0, 0]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>
      <ContactShadows
        position={[0, 0, -2]}
        opacity={0.45}
        scale={12}
        blur={3.5}
        far={3.5}
        color="#000000"
      />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.1}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
      />
    </>
  );
};

export default Experience;