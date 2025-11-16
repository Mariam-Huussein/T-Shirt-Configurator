import { Decal, useTexture } from '@react-three/drei'

export function DecalOnShirt({ decalName, decalProps }) {
  const texture = useTexture(decalName)

  return (
    <Decal 
      position={[decalProps.x, decalProps.y, 0.15]} 
      rotation={[0, 0, decalProps.rotation]} 
      scale={decalProps.scale} 
      map={texture} 
    />
  )
}   