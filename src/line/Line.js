import React from "react";
import Svg, {G, Path, Text, Circle} from "react-native-svg";
import PropTypes from "prop-types";
import * as scale from "d3-scale";
import * as shape from "d3-shape";

const d3 = {
  scale,
  shape
};
const {number, string, arrayOf} = PropTypes;
const object = PropTypes.shape;

const LineChart = (props) => {

  const {size, series, marginBottom, marginTop, marginRight, marginLeft} = props;
  let maxYvalue = Math.max(...[].concat.apply([], series.map(serie => serie.data)).map(d => d.y));
  let maxXvalue = Math.max(...[].concat.apply([], series.map(serie => serie.data)).map(d => d.x));
  const y = scale.scaleLinear().domain([0, maxYvalue])
    .range([marginBottom, size.height - ( marginTop)]);

  const x = scale.scaleLinear().domain([0, maxXvalue])
    .range([marginLeft, size.width - ( marginRight)]);

  const line = d3.shape.line()
    .x(function (d, i) {
      return x(d.x);
    })
    .y(function (d) {
      return -1 * y(d.y);
    }).curve(d3.shape.curveNatural);

  const lines = series.map((serie, index) => {
    let data = serie.data;
    if (index > 0) {
      data = [series[index - 1].data[series[index - 1].data.length - 1], ...serie.data]
    }
    return (
      <Path
        key={index}
        fill="none"
        strokeWidth={serie.width}
        strokeOpacity={serie.opacity}
        stroke={serie.color}
        d={line(data)}/>
    );
  });

  const circles = series.map((serie, index) => {
    return serie.data.map((s, i) => {
      return (
        <G key={index + i}>
          <Circle cx={x(s.x)} cy={-1*y(s.y)} r={serie.circleWidth} fill={serie.circleColor}
                  stroke={serie.circleColor}/>
          <Text x={x(s.x)-15} y={-1*y(s.y)-30}
                fontFamily={serie.fontFamily}
                fontWeight={"100"}
                fill={serie.circleFontColor}
                fontSize={serie.circleFontSize}
                stroke={serie.circleFontColor}>{s.y}</Text>
        </G>
      );
    });
  });

  return (
    <Svg width={size.width} height={size.height} fill="none" style={{borderWidth:2}}>
      <G x="10" y={size.height}>
        {lines}
        {circles}
      </G>
    </Svg>
  );
};

LineChart.propTypes = {
  size: object({
    width: number.isRequired,
    height: number.isRequired
  }).isRequired,
  marginRight: number,
  marginLeft: number,
  marginTop: number,
  marginBottom: number,
  series: arrayOf(object({
    data: arrayOf(object({x: number, y: number})),
    color: string,
    name: string,
    width: number,
    opacity: number
  }))
};

LineChart.defaultProps = {
  size: {
    width: 300,
    height: 150
  },
  marginRight: 15,
  marginLeft: 15,
  marginTop: 35,
  marginBottom: 0,
  series: [
    {
      data: [{x: 0, y: 28},
        {x: 2, y: 27},
        {x: 4, y: 25}],
      color: "#4AF55D",
      name: "Serie 1",
      circleColor: "#4AF55D",
      circleWidth: 5,
      circleFontColor: "#4AF55D",
      circleFontSize: 15,
      fontFamily: "",
      width: 2,
      opacity: 1
    },
    {
      data: [{x: 6, y: 21}, {x: 8, y: 20}],
      color: "#ffc416",
      name: "Serie 2",
      circleColor: "#ffc416",
      circleWidth: 5,
      circleFontColor: "#ffc416",
      circleFontSize: 15,
      fontFamily: "",
      width: 2,
      opacity: 1
    }]

};

export default LineChart;
