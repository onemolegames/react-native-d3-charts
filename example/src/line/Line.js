import React from "react";
import Svg, {G, Line, Path, Text} from "react-native-svg";
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

  let allData = [];
  series.forEach(s => {allData = allData.concat(s.data)});

  const maxInSeries = array.max(allData);
  const minInSeries = array.min(allData);

  const y = scale.scaleLinear().domain([minInSeries, maxInSeries])
    .range([margin, size.height - margin]);

  const x = scale.scaleLinear().domain([0, allData.length])
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
        <Text x={-10} y={-1 * y(tick)} dy="-10" dx="-5">{tick}</Text>
      </G>
    );
  });

  const xLabels = x.ticks(xAxis.ticks).filter((t) => t !== 0).map((tick, index) => {
    return (
      <G key={index}>
        <Text x={x(tick)} y={-1} dy="-20">{tick}</Text>
      </G>
    );
  });

  return (
    <Svg width={size.width + 20} height={size.height + 20} fill="none">
      <G x="20" y={size.height}>
        {lines}
        <Line x1={x(0)} x2={x(allData.length)} y1={-y(0)} y2={-y(0)} stroke="red"
              strokeWidth="2"/>
        <Line x1={x(0)} x2={x(0)} y1={-1 * y(minInSeries)} y2={-1 * y(maxInSeries)}
              stroke="red"
              strokeWidth="2"/>
        {yLabels}
        {xLabels}
      </G>
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
    height: 160
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
      data: [4, 7, 0, 4, 7, 0, 4],
      color: "#620b79",
      name: "Serie 0",
      width: 2,
      opacity: 0.4
    },
    {
      data: [-10, 6, 8, 2, 3, 5, 14],
      color: "#791a22",
      name: "Serie 0",
      width: 2,
      opacity: 1
    },
  ]
};

export default LineChart;
