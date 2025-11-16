import Experience from './Experience'
import { Canvas } from '@react-three/fiber'

const CanvasContainer = ({color, decal, decalProps}) => {
  return (
      <div className="canvas-container">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <fog attach="fog" args={["#fff", 10, 20]} />
          <ambientLight intensity={0.7} />
          <spotLight
            position={[5, 10, 5]}
            intensity={1}
            angle={0.3}
            penumbra={0.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />

          <Experience color={color} decal={decal} decalProps={decalProps} />
        </Canvas>
      </div>
  )
}

export default CanvasContainer