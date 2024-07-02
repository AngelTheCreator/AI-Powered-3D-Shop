import React, { useEffect } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Set texture properties if textures are loaded
  useEffect(() => {
    if (logoTexture) {
      logoTexture.magFilter = THREE.LinearFilter;
      logoTexture.minFilter = THREE.LinearFilter;
      logoTexture.wrapS = THREE.RepeatWrapping;
      logoTexture.wrapT = THREE.RepeatWrapping;
      logoTexture.repeat.set(1, 1);
    }
    if (fullTexture) {
      fullTexture.magFilter = THREE.LinearFilter;
      fullTexture.minFilter = THREE.LinearFilter;
      fullTexture.wrapS = THREE.RepeatWrapping;
      fullTexture.wrapT = THREE.RepeatWrapping;
      fullTexture.repeat.set(1, 1);
    }
  }, [logoTexture, fullTexture]);

  useFrame((state, delta) => {
    if (materials.lambert1) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && fullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && logoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
