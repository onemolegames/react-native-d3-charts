/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import PieChart from "./src/pie/Pie";
import CircularProgressBar from "./src/circular-progress-bar/CircularProgressBar";
import LineChart from "./src/line/Line";


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <PieChart size={{height: 300, width: 300}} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50
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
