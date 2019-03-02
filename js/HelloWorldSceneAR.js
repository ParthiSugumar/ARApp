'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
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

export default class HelloWorldSceneAR extends Component {

  totalLength=20;
  totalWidth=20;
  LayoutLength=2;
  LayoutWidth=2;
  
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
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
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0.5, 0]} style={styles.helloWorldTextStyle}/>
        <ViroAmbientLight color={"#aaaaaa"}/>
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroARPlaneSelector>
        {
          Machine.map((machine) =>
          <React.Fragment>
            <Viro3DObject
              source={machine.location}
              resorces={machine.res}
              key={machine.machineID}
              onClick={this._onClick}
              position={machine.points.map(x => x * this.scale)}
              scale={[.0001, .0001, .0001].map(x => x * this.scale)}
              highAccuracyEvents={true}
              type="OBJ"/>
            </React.Fragment>
          )
        }
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

 /*_onClick(){
    //console.log("Clicked!!");
    const element=<ViroText text={'Clicked!!'} scale={[.5, .5, .5]} position={[0, 0.5, 0]} style={styles.helloWorldTextStyle}/>;
    ReactDOM.render(element,document.getElementById('root'));
  }*/

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


module.exports = HelloWorldSceneAR;