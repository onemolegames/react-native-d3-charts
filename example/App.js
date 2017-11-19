/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {CircularProgressBar, PieChart} from "react-native-d3-charts";


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CircularProgressBar renderLabel={() => {
        }} size={{width: 300, height: 400}}
                             baseArc={{
                               arcWidth: 3,
                               arcOpacity: 0.1,
                               arcColor: "#f5b3ec"
                             }}
        />
        <PieChart />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red"
  },
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
