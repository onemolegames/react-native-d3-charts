import React, {Component, Fragment} from "react";
import Svg, {Defs, G, LinearGradient, Path, Stop} from "react-native-svg";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import PropTypes from "prop-types";
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from "react-native";

const d3 = {
  scale,
  shape,
};
const {number, string, arrayOf, boolean} = PropTypes;
const object = PropTypes.shape;

export default class PieChart extends Component {

  state = {};

  renderLabels() {

    return (
      <View  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        {this.props.data.map((pie, index) => {
          const rectSize = index === this.state.activePieIndex ? 13 : 10;
          let opacity = 1;
          if (typeof this.state.activePieIndex !== 'undefined' && this.state.activePieIndex !== -1) {
            opacity =  index === this.state.activePieIndex ? 1 : 0.4;
          }
          return (<TouchableOpacity style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}} onPress={() => this.setActivePie(index)}>
            <View style={{width: rectSize, height: rectSize, backgroundColor: pie.startColor, margin: 10, borderRadius: rectSize / 2, opacity}}></View>
            <Text style={{fontWeight: 'bold', fontSize: 12, opacity, ...pie.label.style}}>{pie.label}</Text>
          </TouchableOpacity>)
        })}
      </View>
    )
  }

  setActivePie(index) {
    if (this.state.activePieIndex === index) {
      this.setState({activePieIndex: -1});
    } else {
      this.setState({activePieIndex: index});
    }
  }

  render() {
    const {size, data, showLegend} = this.props;

    const totalValue = data
      .map((pie) => pie.value)
      .reduce((first, second) => first + second);

    const shortestEdge = size.width < size.height ? size.width : size.height;
    const radius = (shortestEdge / 2) - 40;
    const scaleValue = scale.scaleLinear()
      .domain([0, totalValue])
      .range([0, (2 * Math.PI)]);

    let startAngle = 0;
    let reduceThickness = 0;
    let reduceXY = 10;
    const arcs = this.props.data.map((pie, index) => {
      const scaledValue = scaleValue(pie.value);
      const arc = d3.shape.arc()
        .innerRadius(0)
        .outerRadius(radius - ((this.state.activePieIndex === index ? -12 : 0)))
        .startAngle(startAngle)
        .endAngle(scaledValue + startAngle);

      reduceXY += reduceThickness;
      startAngle += scaledValue;
      let strokeWidth = 0;
      if (typeof this.state.activePieIndex !== 'undefined' && this.state.activePieIndex !== -1) {
        strokeWidth =  index === this.state.activePieIndex ? 2 : 0;
      }
      return (
        <G key={index}>
          <Path
            id={"" + (index)}
            fill={"url(#grad" + index + ")"}
            stroke="white"
            strokeWidth={strokeWidth}
            onPress={() => this.setActivePie(index)}
            d={arc()}/>
        </G>
      );
    });

    const gradients = this.props.data.map((pie, index) => {
      let opacity = 1;
      if (typeof this.state.activePieIndex !== 'undefined' && this.state.activePieIndex !== -1) {
        opacity =  index === this.state.activePieIndex ? 1 : 0.4;
      }

      return (
        <LinearGradient key={(index + 1) * 100} id={"grad" + index} x1="0%" x2="0%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={pie.endColor} stopOpacity={opacity} startOpacity={opacity}/>
          <Stop offset="100%" stopColor={pie.startColor} stopOpacity={opacity} startOpacity={opacity}/>
        </LinearGradient>
      );
    });
    return (
      <Fragment>
        <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Browser market shares in January, 2018</Text>
        <Svg width={size.width} height={size.height} fill="none">
          <Defs>
            {gradients}
          </Defs>
          <G x={size.width / 2 } y={size.height / 2} width="100%" height="100%">
            {arcs}
          </G>
        </Svg>
        {showLegend && this.renderLabels()}
      </Fragment>
    );
  }
}

PieChart.propTypes = {
  size: object({
    width: number.isRequired,
    height: number.isRequired
  }).isRequired,
  showLegend: boolean,
  data: arrayOf(object({
    value: number.isRequired,
    color: string,
    label: object({
      text: string,
      color: string,
      fontSize: number,
      fontFamily: string
    })
  }))
};

PieChart.defaultProps = {
  size: {
    width: Dimensions.get('window').width,
    height: 320
  },
  showLegend: true,
  data: [
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
};
