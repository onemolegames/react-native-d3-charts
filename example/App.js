/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {Platform, StyleSheet, View} from "react-native";
import {CircularProgressBar} from "react-native-d3-charts";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CircularProgressBar renderLabel={() => {
        }} size={{width:300,height:400}}
                             baseArc={{
                               arcWidth: 3,
                               arcOpacity: 0.1,
                               arcColor: "#f5b3ec"
                             }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
