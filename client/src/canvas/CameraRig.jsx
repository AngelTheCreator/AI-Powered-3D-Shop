import React, {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../store'

const CameraRig = ({ children }) => {
    const snap = useSnapshot(state);
    const group = useRef();

    useFrame((state, delta) => {
        
        //set the model rotation smoothly
        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        )
    });

    

    
  return (
    <div>CameraRig</div>
  )
}

export default CameraRig