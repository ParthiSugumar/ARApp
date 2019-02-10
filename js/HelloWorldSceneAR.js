'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
} from 'react-viro';


var Machine = [
  {
      location:'./res/CNC/CNC.obj',
      res:'./res/CNC/CNC.mtl',
      points: [0,0,0],
      machineID: 'machine-1',
  },
  {
    location:'./res/CNC/CNC.obj',
    res:'./res/CNC/CNC.mtl',
    points: [1,0,0],
    machineID: 'machine-2',
  }
]

export default class HelloWorldSceneAR extends Component {
  
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color={"#aaaaaa"}/>
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroARPlaneSelector>
        {
          Machine.map((machine) =>
            <Viro3DObject
              source={require(machine.location)}
              resorces={[require(machine.res)]}
              position={machine.points}
              scale={[.0001, .0001, .0001]}
              highAccuracyEvents={true}
              type="OBJ" />
          )
        }
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

}

module.exports = HelloWorldSceneAR;