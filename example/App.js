/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {StyleSheet, View,ScrollView} from "react-native";
import {CircularProgressBar, LineChart, PieChart} from "./src";


export default class App extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <PieChart/>
        <LineChart />
        <CircularProgressBar size={{width:200,height:200}}  />
      </ScrollView>
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
