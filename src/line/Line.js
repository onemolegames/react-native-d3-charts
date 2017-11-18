import React from "react";
import Svg, {Circle, G, Path, Text} from "react-native-svg";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import moment from "moment";
import PropTypes from "prop-types";

const d3 = {
  scale,
  shape
};
const {number, string, any, arrayOf, instanceOf} = PropTypes;
const object = PropTypes.shape;

const LineChart = (props) => {
  const {size, series, criticMinLevel, criticMaxLevel, offsetCritic, marginTop, marginRight, marginLeft} = props;
  let marginBottom = 0;
  let maxYvalue = Math.max(...[].concat.apply([], series.map(serie => serie.data)).map(d => d.y));
  let minYvalue = Math.min(...[].concat.apply([], series.map(serie => serie.data)).map(d => d.y));
  let minXValue = moment.min(...[].concat.apply([], series.map(serie => serie.data)).map(d => moment(d.x)));
  let maxXValue = moment.max(...[].concat.apply([], series.map(serie => serie.data)).map(d => moment(d.x)));

  if (minYvalue < criticMinLevel || maxYvalue > criticMaxLevel) {
    marginBottom = size.height - offsetCritic;
  }

  const y = scale.scaleLinear().domain([0, maxYvalue])
    .range([marginBottom, size.height - ( marginTop)]);

  const x = scale.scaleTime().domain([minXValue, maxXValue])
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
  const renderCirclePointText = (s, serie) => {
    if (s.x === (moment(maxXValue).unix() * 1000)) {
      return (
        <G>
          <Text x={x(s.x) - 15} y={-1 * y(s.y) - 30}
                fontFamily={serie.fontFamily}
                fontWeight={"500"}
                fill={serie.circleFontColor}
                fontSize={serie.circleFontSize}
                stroke={serie.circleFontColor}>{s.y}</Text>
          <Text x={x(s.x) - 30} y={-1 * y(s.y) - 48}
                fontFamily={serie.fontFamily}
                fontWeight={"bold"}
                fill={"white"}
                fontSize={serie.circleFontSize}
                stroke={serie.circleFontColor}>{moment(s.x).format("MMM D")}</Text>
        </G>
      );
    } else {
      return (
        <G>
          <Text x={x(s.x) - 15} y={-1 * y(s.y) - 30}
                fontFamily={serie.fontFamily}
                fontWeight={"500"}
                fill={serie.circleFontColor}
                fontSize={serie.circleFontSize}
                stroke={serie.circleFontColor}>{s.y}</Text>
        </G>
      );
    }

  };

  const circles = series.map((serie, index) => {
    return serie.data.map((s, i) => {
      return (
        <G key={index + i}>
          <Circle cx={x(s.x)} cy={-1 * y(s.y)} r={serie.circleWidth} fill={serie.circleColor}
                  stroke={serie.circleColor}/>
          {renderCirclePointText(s, serie)}
        </G>
      );
    });
  });

  return (
    <Svg width={size.width} height={size.height} fill="none">
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
  xAxis: object({
    type: string.isRequired,
    start: instanceOf(Date),
    end: instanceOf(Date),
    ticks: number
  }),
  marginRight: number,
  marginLeft: number,
  marginTop: number,
  criticMinLevel: number,
  criticMaxLevel: number,
  offsetCritic: number,
  yAxis: object({
    ticks: number
  }),
  series: arrayOf(object({
    data: arrayOf(object({x: any, y: number})),
    color: string,
    name: string,
    width: number,
    opacity: number
  })),
};

LineChart.defaultProps = {
  size: {
    width: 280,
    height: 350
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
  marginRight: 40,
  marginLeft: 10,
  marginTop: 35,
  criticMinLevel: 130,
  criticMaxLevel: 180,
  offsetCritic: 200,
  series: [
    {
      data: [
        {x: 1484900915046, y: 166},
        {x: 1484900915046, y: 160},
        {x: 1484900915046, y: 150},
        {x: 1484900915046, y: 153},
        {x: 1484900915046, y: 149},
        {x: 1484900915046, y: 141},
        {x: 1484900915046, y: 138}],
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
      data: [{x: 1484900915046, y: 138}],
      color: "#ff475b",
      name: "Serie s1",
      circleColor: "#ff475b",
      circleWidth: 5,
      circleFontColor: "#ff475b",
      circleFontSize: 15,
      fontFamily: "",
      width: 2,
      opacity: 1
    }]

};

export default LineChart;
