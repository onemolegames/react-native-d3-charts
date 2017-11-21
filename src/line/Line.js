import React from "react";
import Svg, {G, Path, Use, Line, Text} from "react-native-svg";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as array from "d3-array";
import PropTypes from "prop-types";

const d3 = {
  scale,
  shape,
  array
};
const {number, string, arrayOf, instanceOf} = PropTypes;
const object = PropTypes.shape;


const LineChart = (props) => {
  const {size, series, xAxis, yAxis, margin} = props;

  const y = scale.scaleLinear().domain([0, array.max(series[0].data)])
    .range([margin, size.height - margin]);

  const x = scale.scaleLinear().domain([0, series[0].data.length])
    .range([margin, size.width - margin]);

  const line = d3.shape.line()
    .x(function (d, i) {
      return x(i);
    })
    .y(function (d) {
      return -1 * y(d);
    }).curve(d3.shape.curveNatural);

  const lines = series.map((serie, index) => {
    return (
      <Path
        key={index}
        fill="none"
        strokeWidth={serie.width}
        strokeOpacity={serie.opacity}
        stroke={serie.color}
        d={line(serie.data)}/>
    );
  });

  const yLabels = y.ticks(yAxis.ticks).map((tick, index) => {
    return (
      <G key={index}>
        <Text x={-10} y={-1 * y(tick)} dy="-5">{tick}</Text>
        <Line x1={x(-0.05)} x2={0} y1={-1 * y(tick)} y2={-1 * y(tick)} stroke="red" strokeWidth="2"/>
      </G>
    );
  });

  const xLabels = x.ticks(xAxis.ticks).map((tick, index) => {
    return (
      <G key={index}>
        <Text x={-10} y={-1 * x(tick)} dy="-5">{tick}</Text>
        <Line x1={x(-0.05)} x2={-1*x(tick)} y1={0} y2={0} stroke="red" strokeWidth="2"/>
      </G>
    );
  });

  return (
    <Svg width={size.width} height={size.height} fill="none">
      <G x="10" y={size.height}>
        {lines}
        <Line x1={x(0)} x2={x(size.width)} y1={-1 * y(0)} y2={-1 * y(0)} stroke="red"
              strokeWidth="2"/>
        <Line x1={x(0)} x2={x(0)} y1={-1*y(0)} y2={-1 * y(array.max(series[0].data))}
              stroke="red"
              strokeWidth="2"/>
        {yLabels}

      </G>
      <Use href={"#10"}/>
    </Svg>
  );
};

LineChart.propTypes = {
  size: object({
    width: number.isRequired,
    height: number.isRequired
  }).isRequired,
  xAxis: object({
    type: string.isRequired,
    start: instanceOf(Date),
    end: instanceOf(Date),
    ticks: number
  }),
  margin: number,
  yAxis: object({
    ticks: number
  }),
  series: arrayOf(object({
    data: arrayOf(number),
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
  xAxis: {
    type: "Date",
    start: new Date(),
    end: new Date("October 13, 2018 11:47:00"),
    ticks: 5
  },
  yAxis: {
    ticks: 5
  },
  margin: 10,
  series: [
    {
      data: [4, 7, 0, 4, 7, 0, 4, 7, 0, 4, 8, 4, 7],
      color: "#620b79",
      name: "Serie 0",
      width: 2,
      opacity: 0.4
    },
    {
      data: [0, 6, 8, 2, 3, 5, 4, 7, 0, 4, 7, 4, 7],
      color: "#791a22",
      name: "Serie 0",
      width: 2,
      opacity: 1
    },
  ]
};

export default LineChart;
