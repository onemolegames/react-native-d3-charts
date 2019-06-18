import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Svg, {Defs, G, LinearGradient, Path, Stop, Text} from "react-native-svg";
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import {Dimensions, Text as RNText} from "react-native";

const d3 = {
  scale,
  shape,
};
const {number, bool, string} = PropTypes;
const object = PropTypes.shape;

const CircularProgressBar = (props) => {

  const {
    text,
    fontSize,
    fontFamily,
    color,
  } = props.label;

  const {width, height} = props.size;

  const valueArcWidth = props.valueArc.arcWidth;
  const valueArcStartColor = props.valueArc.arcStartColor;
  const valueArcStopColor = props.valueArc.arcStopColor;
  const valueArcOpacity = props.valueArc.arcOpacity;

  const baseArcWidth = props.baseArc.arcWidth;
  const baseArcColor = props.baseArc.arcColor;
  const baseArcOpacity = props.baseArc.arcOpacity;

  const dashedArcWidth = props.dashedArc.arcWidth;
  const dashedArcColor = props.dashedArc.arcColor;
  const dashedArcOpacity = props.dashedArc.arcOpacity;

  const value = props.value;
  const showDashedArc = props.showDashedArc;

  const {max, min} = props.valueRange;

  const shortestEdge = width < height ? width : height;
  const thickestArc = valueArcWidth > baseArcWidth ? valueArcWidth : baseArcWidth;
  const radius = (shortestEdge / 2) - 2 * thickestArc;
  const scaleValue = scale.scaleLinear()
    .domain([min, max])
    .range([0, 2 * Math.PI]);
  const scaledValue = scaleValue(value);

  const formattedLabel = text.replace(/&value/ig, value);

  const valueArc = d3.shape.arc()
    .innerRadius(radius)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(scaledValue);

  const baseArc = d3.shape.arc()
    .innerRadius(radius)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(2 * Math.PI);

  let dashedArc = null;

  if (showDashedArc) {
    const dashedArcRadius = radius - ((thickestArc / 2) + (dashedArcWidth / 2));
    const dashedArcLines = d3.shape.arc()
      .startAngle(0)
      .endAngle(scaledValue)
      .innerRadius(dashedArcRadius)
      .outerRadius(dashedArcRadius);
    dashedArc = (<Path
      stroke={dashedArcColor}
      strokeWidth={dashedArcWidth}
      strokeOpacity={dashedArcOpacity}
      strokeDasharray={[1,3]}
      d={dashedArcLines()}/>);
  }

  return (
    <Fragment>
      <RNText style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>{props.title}</RNText>
      <Svg width={width} height={height} fill="none">
        <Defs>
          <LinearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
            <Stop offset="0%" stopColor={valueArcStartColor} stopOpacity="1"/>
            <Stop offset="100%" stopColor={valueArcStopColor} stopOpacity="1"/>
          </LinearGradient>
        </Defs>
        <G x={width / 2} y={height / 2} width="100%" height="100%">
          {dashedArc}
          <Path stroke={baseArcColor}
                strokeWidth={baseArcWidth}
                strokeOpacity={baseArcOpacity}
                d={baseArc()}>
          </Path>
          <Path
            stroke="url(#grad)"
            strokeWidth={valueArcWidth}
            strokeOpacity={valueArcOpacity}
            strokeLinecap="round"
            strokeLinejoin="round"
            d={valueArc()}/>
        </G>
        <Text x={width / 2 - 5} y={(height / 2) + (2 * thickestArc) - fontSize}
              textAnchor="middle"
              fontSize={fontSize}
              fontFamily={fontFamily}
              stroke={color}
              fill={color}>
          {formattedLabel}
        </Text>
      </Svg>
    </Fragment>
  );
};

CircularProgressBar.propTypes = {
  size: object({
    width: number.isRequired,
    height: number.isRequired
  }).isRequired,
  value: number.isRequired,
  title: string,
  valueRange: object({
    max: number.isRequired,
    min: number.isRequired,
  }),
  valueArc: object({
    arcWidth: number,
    arcOpacity: number,
    arcStartColor: string,
    arcStopColor: string
  }),
  baseArc: object({
    arcWidth: number,
    arcOpacity: number,
    arcColor: string,
  }),
  showDashedArc: bool,
  dashedArc: object({
    arcOpacity: number,
    arcWidth: number,
    arcColor: string,
  }),
  label: object({
    text: string,
    fontSize: number,
    fontFamily: string,
    color: string,
  }),
};

CircularProgressBar.defaultProps = {
  size: {
    width: Dimensions.get('window').width,
    height: 320
  },
  value: 47,
  title: "Today's Avarage",
  showDashedArc: true,
  valueRange: {
    max: 100,
    min: 0
  },
  valueArc: {
    arcWidth: 18,
    arcOpacity: 1,
    arcStartColor: "#5f96f6",
    arcStopColor: "#1a4de6"
  },
  baseArc: {
    arcWidth: 8,
    arcOpacity: 0.1,
    arcColor: "#53c4f5"
  },
  dashedArc: {
    arcOpacity: 0.3,
    arcWidth: 18,
    arcColor: "#182433"
  },
  label: {
    text: "&value%",
    fontSize: 30,
    fontFamily: "Helvetica",
    color: "black"
  }
};

export default CircularProgressBar;
