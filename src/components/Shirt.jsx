import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { DecalOnShirt } from "./DecalOnShirt";

export function Shirt({ color, decal, decalProps }) { 
  const { nodes, materials } = useGLTF("/models/shirt.glb");

  useEffect(() => {
    if (materials.lambert1 && color) {
      materials.lambert1.color.set(color);
    }
  }, [color, materials]);

  return (
    <group dispose={null} scale={8}>
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      >
        {decal && <DecalOnShirt decalName={decal} decalProps={decalProps} />}
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/shirt.glb");
