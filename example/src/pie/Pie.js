import React from "react";
import Svg, {G, Path, Use, Defs, LinearGradient, Stop, Text} from "react-native-svg";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import PropTypes from "prop-types";

const d3 = {
  scale,
  shape,
};
const {number, string, arrayOf} = PropTypes;
const object = PropTypes.shape;


const PieChart = (props) => {
  const {size, data} = props;

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
    .range([0, (2 * Math.PI - 0.7)]);

  const renderLabel = (pie) => {
    if (!pie.label && !pie.label.text)
      return null;

    const replacedText = pie.label.text.replace(/&value/ig, pie.value);
    let lines = replacedText.split("\n");
    return lines.map((line, index) => {
      if (index == 0) {
        return (
          <Text key={index}
                fill={pie.label.color}
                textAnchor="middle"
                fontSize={pie.label.fontSize}
                fontFamily={pie.label.fontFamily}>
            {line}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            fill={pie.label.color}

            textAnchor="middle"
            fontSize={pie.label.fontSize}
            fontFamily={pie.label.fontFamily}
            x={-4}
            y={pie.label.fontSize +4}>
            {line}
          </Text>
        );
      }

    });
  };

  let startAngle = 0;
  let reduceThickness = 6;
  let reduceXY = 10;
  const arcs = sortedData.map((pie, index) => {
    const scaledValue = scaleValue(pie.value);
    const arc = d3.shape.arc()
      .innerRadius(radius - 80)
      .outerRadius(radius - ((2 * index ) * reduceThickness))
      .startAngle(startAngle)
      .endAngle(scaledValue + startAngle);
    let textMargin = 0;
    if ((scaledValue + startAngle) <= (Math.PI)) {
      textMargin = 30
    } else {
      textMargin = 3
    }
    let labelPositionX =
      -Math.sin((startAngle + scaledValue + startAngle) / 2) * (-radius + (index - 1) * textMargin);
    let labelPositionY =
      Math.cos((startAngle + scaledValue + startAngle) / 2) * (-radius + (index - 1) * textMargin);

    reduceXY += reduceThickness;
    startAngle += scaledValue;

    return (
      <G key={index}>
        <Path
          id={"" + (index)}
          fill={"url(#grad"+ index+")"}
          d={arc()}/>
        <G x={labelPositionX} y={labelPositionY}>
          {renderLabel(pie)}
        </G>
      </G>
    );
  });

  const gradients = sortedData.map((pie, index) => {
    return (
      <LinearGradient key={(index+1)*100} id={"grad"+index} x1="0%" x2="0%" y1="0%" y2="100%">
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
      <G x={size.width/2} y={size.height/2} width="100%" height="100%">
        {arcs}
      </G>
    </Svg>
  );
};

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
    width: 320,
    height: 380
  },
  data: [
    {
      value: 30,
      startColor: "#4F7EF0",
      endColor: "#2b3d7a",
      label: {
        text: "&value \n Red",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 20,
      startColor: "#56CDFD",
      endColor: "#2d4c64",
      label: {
        text: "&value \n Blue",
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
        text: "&value \n Red",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 17,
      startColor: "#4AF55D",
      endColor: "#1b5720",
      label: {
        text: "&value \n Red",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    },
    {
      value: 12,
      startColor: "#1120f5",
      endColor: "#06230c",
      label: {
        text: "&value \n Red",
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
        text: "&value \n",
        color: "#ff6464",
        fontSize: 12,
        fontFamily: "Helvetica"
      }
    }
  ]
};

export default PieChart;
