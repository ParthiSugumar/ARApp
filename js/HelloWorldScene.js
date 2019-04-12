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
  ViroImage,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

var Machine = [
  {
    location:require('./res/CNC/CNC.obj'),
    res:require('./res/CNC/CNC.mtl'),
    points: [0,0,0],
    machineID: 'm-1',
    d1:'machineOn:true',
    d2:'spindleOn:true',
    d3:'jog:false',
    d4:'auto:true',
    d5:'mdi:false',
    d6:'alarm:false',
  },
  {
    location:require('./res/CNC/CNC.obj'),
    res:require('./res/CNC/CNC.mtl'),
    points: [1,0,0],
    machineID: 'm-2',
    d1:'machineOn:true',
    d2:'spindleOn:false',
    d3:'jog:false',
    d4:'auto:true',
    d5:'mdi:false',
    d6:'alarm:false',
  },
  {
    location:require('./res/CNC/CNC.obj'),
    res:require('./res/CNC/CNC.mtl'),
    points: [2,0,-1],
    machineID: 'm-3',
    d1:'machineOn:true',
    d2:'spindleOn:true',
    d3:'jog:true',
    d4:'auto:true',
    d5:'mdi:false',
    d6:'alarm:false',
  },
  {
    location:require('./res/CNC/CNC.obj'),
    res:require('./res/CNC/CNC.mtl'),
    points: [0,0,-1],
    machineID: 'm-4',
    d1:'machineOn:true',
    d2:'spindleOn:true',
    d3:'jog:false',
    d4:'auto:true',
    d5:'mdi:false',
    d6:'alarm:true',
  },
  {
    location:require('./res/CNC/CNC.obj'),
    res:require('./res/CNC/CNC.mtl'),
    points: [3,0,-2],
    machineID: 'm-5',
    d1:'machineOn:false',
    d2:'spindleOn:false',
    d3:'jog:false',
    d4:'auto:false',
    d5:'mdi:false',
    d6:'alarm:false',
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
        <ViroAmbientLight color={"#aaaaaa"}/>
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroARPlaneSelector width={this.LayoutWidth} height={this.LayoutLength}>
          <ViroImage 
            width={this.LayoutWidth} 
            height={this.LayoutLength}
            source={require('./res/tan.jpg')}
            scale={[.9, .9, .9].map(x => x * this.scale)}
            position={[2, 0, -0.5].map(x => x * this.scale)}
            animation={{name:'rotate',run:true}}  
          />
        {
          Machine.map((machine) =>
          machine.machineID==this.state.selectedId?
            <Viro3DObject
              onClick={() => this.setState({ selectedId : machine.machineID })}
              source={machine.location}
              resorces={machine.res}
              key={machine.machineID}
              position={machine.points.map(x => x * this.scale)}
              scale={[.0001, .0001, .0001]}
              highAccuracyEvents={true}
              type="OBJ"/>:
            <Viro3DObject
              onClick={() => this.setState({ selectedId : machine.machineID })}
              source={machine.location}
              resorces={machine.res}
              key={machine.machineID}
              position={machine.points.map(x => x * this.scale)}
              scale={[.0001, .0001, .0001].map(x => x * this.scale)}
              highAccuracyEvents={true}
              type="OBJ"/>
          )
        }
        {
          Machine.map((machine)=>
          machine.machineID==this.state.selectedId?
            <ViroText
              text={machine.machineID}
              key={machine.machineID}
              scale={[.1, .1, .1]} 
              position={[(machine.points[0])*this.scale,(machine.points[1]+0.8)*this.scale,machine.points[2]*this.scale]}
              style={styles.helloWorldTextStyle}/>:null
          )
        }
        {
          Machine.map((machine)=>
          machine.machineID==this.state.selectedId?
            <ViroText
              text={machine.d1}
              key={machine.machineID}
              scale={[.1, .1, .1]} 
              position={[(machine.points[0]+1.75)*this.scale,(machine.points[1]+0.5)*this.scale,machine.points[2]*this.scale]}
              style={styles.helloWorldTextStyle}/>:null
          )
        }
        {
          Machine.map((machine)=>
          machine.machineID==this.state.selectedId?
            <ViroText
              text={machine.d2}
              key={machine.machineID}
              scale={[.1, .1, .1]} 
              position={[(machine.points[0]+1.75)*this.scale,(machine.points[1]+0.4)*this.scale,machine.points[2]*this.scale]}
              style={styles.helloWorldTextStyle}/>:null
          )
        }
        {
          Machine.map((machine)=>
          machine.machineID==this.state.selectedId?
            <ViroText
              text={machine.d3}
              key={machine.machineID}
              scale={[.1, .1, .1]} 
              position={[(machine.points[0]+1.75)*this.scale,(machine.points[1]+0.3)*this.scale,machine.points[2]*this.scale]}
              style={styles.helloWorldTextStyle}/>:null
          )
        }
        {
          Machine.map((machine)=>
          machine.machineID==this.state.selectedId?
            <ViroText
              text={machine.d4}
              key={machine.machineID}
              scale={[.1, .1, .1]} 
              position={[(machine.points[0]+1.75)*this.scale,(machine.points[1]+0.2)*this.scale,machine.points[2]*this.scale]}
              style={styles.helloWorldTextStyle}/>:null
          )
        }
        {
          Machine.map((machine)=>
          machine.machineID==this.state.selectedId?
            <ViroText
              text={machine.d5}
              key={machine.machineID}
              scale={[.1, .1, .1]} 
              position={[(machine.points[0]+1.75)*this.scale,(machine.points[1]+0.1)*this.scale,machine.points[2]*this.scale]}
              style={styles.helloWorldTextStyle}/>:null
          )
        }
        {
          Machine.map((machine)=>
          machine.machineID==this.state.selectedId?
            <ViroText
              text={machine.d6}
              key={machine.machineID}
              scale={[.1, .1, .1]} 
              position={[(machine.points[0]+1.75)*this.scale,(machine.points[1])*this.scale,machine.points[2]*this.scale]}
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
    color: '#800080',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroAnimations.registerAnimations({
  rotate:{properties:{rotateX:"-=90"},duration:1000}
});

module.exports = HelloWorldScene;