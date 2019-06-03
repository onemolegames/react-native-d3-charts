import React, {Component, Fragment} from "react";
import Svg, {Defs, G, LinearGradient, Path, Stop} from "react-native-svg";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import PropTypes from "prop-types";
import {Dimensions, Text, View, TouchableOpacity} from "react-native";

const d3 = {
  scale,
  shape,
};
const {number, string, arrayOf} = PropTypes;
const object = PropTypes.shape;

export default class PieChart extends Component {

  state = {};

  renderLabels() {
    const sortedData = this.props.data.sort((first, second) => {
      return second.value - first.value;
    });


    return (
      <View  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        {sortedData.map((pie, index) => {
          const replacedText = pie.label.text.replace(/&value/ig, pie.value);
          const rectSize = index === this.state.activePieIndex ? 13 : 10;

          return (<TouchableOpacity style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}} onPress={() => this.setActivePie(index)}>
            <View style={{width: rectSize, height: rectSize, backgroundColor: pie.startColor, margin: 10, borderRadius: rectSize / 2}}></View>
            <Text>{replacedText}</Text>
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
    const {size, data} = this.props;

    const totalValue = data
      .map((pie) => pie.value)
      .reduce((first, second) => first + second);

    const sortedData = data.sort((first, second) => {
      return second.value - first.value;
    });

    const shortestEdge = size.width < size.height ? size.width : size.height;
    const radius = (shortestEdge / 2) - 40;
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
        </G>
      );
    });

    const gradients = sortedData.map((pie, index) => {
      let opacity = 1;
      if(typeof this.state.activePieIndex !== 'undefined') {
        opacity =  index === this.state.activePieIndex ? 1 : 0.5;
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
        <Svg width={size.width} height={size.height} fill="none">
          <Defs>
            {gradients}
          </Defs>
          <G x={size.width / 2 } y={size.height / 2} width="100%" height="100%">
            {arcs}
          </G>
        </Svg>
        {this.renderLabels()}
      </Fragment>
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
    height: 320
  },
  data: [
    {
      value: 30,
      startColor: "#4ff07f",
      endColor: "#4ff07f",
      label: {
        text: "&value firstfirstfirst",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 20,
      startColor: "#fd6098",
      endColor: "#fd6098",
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
      endColor: "#F2A435",
      label: {
        text: "&value third",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 7,
      startColor: "#efbef5",
      endColor: "#efbef5",
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
      endColor: "#1120f5",
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
      endColor: "#F7E53B",
      label: {
        text: "&value sixth",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    }
  ]
};
