react-native-d3-charts
=======================

*react-native-d3-charts* is a cross platform chart library built with *d3js* and *react-native-svg*. Currently 
there is a line-chart, circular progress chart, and pie-chart. 
 
## Installation

To install the library to your react-native project run the following commands:

```
npm install react-native-d3-charts --save
react-native link react-native-svg
```

## Usage & Options

### Line Chart

#### Options: 

| Prop | Type | Default | Definition |
|-----|--------|----|-------|
| size | object | {width: <Device Width>,height: 320} | width and height of the chart |
| data |array<object>| [<Browser usage statistics>]| the data object explained below  |
| showLegend |bool| true | a flag to show/hide the legend of the chart  |
| title |string| '' | the title of the chart  |

##### The structure of the data object:

| Prop | Type | Default | Definition |
|-----|--------|----|-------|
| value | number | - | the value of the data object |
| startColor | string| - | the start color of the gradient for the related data   |
| endColor | string | - | the end color of the gradient for the related data |
| label | string | - | the definition/label of the data  |
| labelStyle | object | {} | style object for the label  |

##### Example:

````javascript

import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PieChart from "react-native-d3-charts";


type Props = {};
export default class App extends Component<Props> {
  
  state={
    chartData: [
          {
            value: 61.41,
            startColor: "#7CB5EC",
            endColor: "#7CB5EC",
            label: "Chrome",
            labelStyle: {},
          },
          {
            value: 11.84,
            startColor: "#434348",
            endColor: "#434348",
            label: "Internet Explorer",
            labelStyle: {},
          },
          {
            value: 10.85,
            startColor: "#90ED7D",
            endColor: "#90ED7D",
            label: "Firefox",
            labelStyle: {},
          },
          {
            value: 4.67,
            startColor: "#F7A25D",
            endColor: "#F7A25D",
            label: "Edge",
            labelStyle: {},
          },
          {
            value: 4.18,
            startColor: "#8085E9",
            endColor: "#8085E9",
            label: "Safari",
            labelStyle: {},
          },
          {
            value: 7.05,
            startColor: "#F15C80",
            endColor: "#F15C80",
            label: "Other",
            labelStyle: {},
          }
    ]
  }
  
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <PieChart 
          size={{height: 300, width: 300}} 
          data={this.state.chartData} 
          title="Browser market shares in January, 2018" />
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

````


## For running the example application

To run the example application (from a cloned repo):

```
cd example
npm i
react-native link react-native-svg
react-native run-ios
# or
react-native run-android
```

## Todo

The next steps:
+ Add animations to the charts
+ More axis controls (to control scale)
+ Events
+ Improve the documentation
+ Bug fixing, unit testing, cleanup


