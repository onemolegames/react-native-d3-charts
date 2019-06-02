import React, {Component} from "react";
import Svg, {Defs, G, LinearGradient, Path, Rect, Stop, Text} from "react-native-svg";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import PropTypes from "prop-types";
import {Dimensions} from "react-native";

const d3 = {
  scale,
  shape,
};
const {number, string, arrayOf} = PropTypes;
const object = PropTypes.shape;

export default class PieChart extends Component {

  state = {};

  renderLabel(pie, index) {
    const {size} = this.props;

    if (!pie.label && !pie.label.text)
      return null;

    const replacedText = pie.label.text.replace(/&value/ig, pie.value);
    const rectSize = index == this.state.activePieIndex ? 23 : 20;
    return (
      <G>
        <Rect
          key={index}
          fill={"url(#grad" + index + ")"}
          width={rectSize}
          height={rectSize}
          onPress={() => this.setActivePie(index)}
          x={size.width / 2.7}
          y={-90 + (index * 30)}/>
        <Text onPress={() => this.setActivePie(index)} y={-75 + (index * 30)} x={size.width / 2.7 + 30}
              fill={pie.label.color}>{replacedText}</Text>
      </G>
    );
  }

  setActivePie(index) {
    if (this.state.activePieIndex === index) {
      this.setState({activePieIndex: -1});
    } else {
      this.setState({activePieIndex: index});
    }
  }

  render() {
    const {size, data} = this.props;

    const totalValue = data
      .map((pie) => pie.value)
      .reduce((first, second) => first + second);

    const sortedData = data.sort((first, second) => {
      return second.value - first.value;
    });

    const shortestEdge = size.width < size.height ? size.width : size.height;
    const radius = (shortestEdge / 2.4) - 40;
    const scaleValue = scale.scaleLinear()
      .domain([0, totalValue])
      .range([0, (2 * Math.PI)]);

    let startAngle = 0;
    let reduceThickness = 0;
    let reduceXY = 10;
    const arcs = sortedData.map((pie, index) => {
      const scaledValue = scaleValue(pie.value);
      const arc = d3.shape.arc()
        .innerRadius(0)
        .outerRadius(radius - ((this.state.activePieIndex === index ? -12 : 0)))
        .startAngle(startAngle)
        .endAngle(scaledValue + startAngle);

      reduceXY += reduceThickness;
      startAngle += scaledValue;

      return (
        <G key={index}>
          <Path
            id={"" + (index)}
            fill={"url(#grad" + index + ")"}
            onPress={() => this.setActivePie(index)}
            d={arc()}/>
          {this.renderLabel(pie, index)}
        </G>
      );
    });

    const gradients = sortedData.map((pie, index) => {
      return (
        <LinearGradient key={(index + 1) * 100} id={"grad" + index} x1="0%" x2="0%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={pie.endColor} stopOpacity="1"/>
          <Stop offset="100%" stopColor={pie.startColor} stopOpacity="1"/>
        </LinearGradient>
      );
    });
    return (
      <Svg width={size.width} height={size.height} fill="none">
        <Defs>
          {gradients}
        </Defs>
        <G x={size.width / 2.7} y={size.height / 2} width="100%" height="100%">
          {arcs}
        </G>
      </Svg>
    );
  }
}

PieChart.propTypes = {
  size: object({
    width: number.isRequired,
    height: number.isRequired
  }).isRequired,
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
    height: Dimensions.get('window').height
  },
  data: [
    {
      value: 30,
      startColor: "#4ff07f",
      endColor: "#2b3d7a",
      label: {
        text: "&value first",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 20,
      startColor: "#fd6098",
      endColor: "#2d4c64",
      label: {
        text: "&value second",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 20,
      startColor: "#F2A435",
      endColor: "#624119",
      label: {
        text: "&value third",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 7,
      startColor: "#4AF55D",
      endColor: "#1b5720",
      label: {
        text: "&value fourth",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 2,
      startColor: "#1120f5",
      endColor: "#06230c",
      label: {
        text: "&value fifth",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 10,
      startColor: "#F7E53B",
      endColor: "#6f661d",
      label: {
        text: "&value sixth",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    }
  ]
};
