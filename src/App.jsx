import { Canvas } from "@react-three/fiber";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import Experience from "./components/Experience";
import "./App.css";

function App() {
  const [color, setColor] = useState("#000");

  return (
    <div className="App">
      <div className="picker-container">
        <HexColorPicker className="picker" color={color} onChange={setColor} />
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={["#fff"]} />
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
        <Experience color={color} />
      </Canvas>
    </div>
  );
}

export default App;
