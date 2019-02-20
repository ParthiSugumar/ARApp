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
      location:require('./res/CNC/CNC.obj'),
      res:require('./res/CNC/CNC.mtl'),
      points: [0,0,0],
      machineID: 'machine-1',
  },
  {
    location:require('./res/CNC/CNC.obj'),
    res:require('./res/CNC/CNC.mtl'),
    points: [1,0,0],
    machineID: 'machine-2',
  },
  {
    location:require('./res/CNC/CNC.obj'),
    res:require('./res/CNC/CNC.mtl'),
    points: [2,0,-1],
    machineID: 'machine-3',
  },
  {
  location:require('./res/CNC/CNC.obj'),
  res:require('./res/CNC/CNC.mtl'),
  points: [0,0,-1],
  machineID: 'machine-4',
  },
  {
  location:require('./res/CNC/CNC.obj'),
  res:require('./res/CNC/CNC.mtl'),
  points: [3,0,-2],
  machineID: 'machine-5',
  },
]

export default class HelloWorldSceneAR extends Component {

  totalLength=20;
  totalWidth=20;
  LayoutLength=2;
  LayoutWidth=2;
  
  render() {
    this.scale = Math.min(
      Math.floor(this.LayoutLength / this.totalLength),
      Math.floor(this.LayoutWidth / this.totalWidth)
  );
  
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color={"#aaaaaa"}/>
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroARPlaneSelector>
        {
          Machine.map((machine) =>
            <Viro3DObject
              source={machine.location}
              resorces={machine.res}
              key={machine.machineID}
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