/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {CircularProgressBar, PieChart, LineChart} from "react-native-d3-charts";


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>

        <LineChart />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
