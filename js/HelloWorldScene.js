'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

var Machine = [
  {
      location:require('./res/CNC/CNC.obj'),
      res:require('./res/CNC/CNC.mtl'),
      points: [0,0,0],
      machineID: 'm-1',
  },
  {
    location:require('./res/CNC/CNC.obj'),
    res:require('./res/CNC/CNC.mtl'),
    points: [1,0,0],
    machineID: 'm-2',
  },
  {
    location:require('./res/CNC/CNC.obj'),
    res:require('./res/CNC/CNC.mtl'),
    points: [2,0,-1],
    machineID: 'm-3',
  },
  {
  location:require('./res/CNC/CNC.obj'),
  res:require('./res/CNC/CNC.mtl'),
  points: [0,0,-1],
  machineID: 'm-4',
  },
  {
  location:require('./res/CNC/CNC.obj'),
  res:require('./res/CNC/CNC.mtl'),
  points: [3,0,-2],
  machineID: 'm-5',
  },
]

export default class HelloWorldScene extends Component {

  totalLength=20;
  totalWidth=20;
  LayoutLength=5;
  LayoutWidth=5;

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      selectedId: ""
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {

    this.scale = Math.min(
      (this.LayoutLength / this.totalLength),
      (this.LayoutWidth / this.totalWidth)
    );

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroARPlaneSelector width={this.LayoutWidth} height={this.LayoutLength}>
        {
          Machine.map((machine) =>
            <Viro3DObject
              source={machine.location}
              resorces={machine.res}
              key={machine.machineID}
              position={machine.points.map(x => x * this.scale)}
              scale={[.0001, .0001, .0001].map(x => x * this.scale)}
              highAccuracyEvents={true}
              type="OBJ"
              onClick={() => this.setState({ selectedId : machine.machineID })}/>
          )
        }
        {
          Machine.map((machine)=>
          machine.machineID==this.state.selectedId?
              <ViroText 
              text={machine.machineID}
              key={machine.machineID}
              scale={[.5, .5, .5].map(x => x * this.scale)} 
              position={machine.points.map(x => (x-0.1) * this.scale)}
              style={styles.helloWorldTextStyle}/>:null
          )
        }
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "MachDatum"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldScene;