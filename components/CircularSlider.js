import React, { useState } from 'react'
import { PanResponder, View, Dimensions, StyleSheet, Text} from 'react-native'
import Svg, { Path, Image } from 'react-native-svg'
const CenterBgImg = require('../assets/bg.png');

function CircleSlider(props) {

  const [angle, setAngle] = useState(0)
  const [circleRadius, setCircleRadius] = useState(props.dialRadius);

  const bR = props.btnRadius;
  const width = (circleRadius + bR) * 2;
  const startCoord = polarToCartesian(0);
  const endCoord = polarToCartesian(angle);
  const currentValue = Math.round(((props.maxValue - props.minValue) / 360) * angle) + props.minValue;

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gs) => true,
    onStartShouldSetPanResponderCapture: (e, gs) => true,
    onMoveShouldSetPanResponder: (e, gs) => true,
    onMoveShouldSetPanResponderCapture: (e, gs) => true,
    onPanResponderMove: (e, gs) => {
      const xOrigin = props.xCenter - circleRadius;
      const yOrigin = props.yCenter - circleRadius;
      const a = cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin);

      if (a <= props.min) {
        setAngle(props.min);
      } else if (a >= props.max) {
        setAngle(props.max);
      } else {
        setAngle(a);
      }
    },
    onPanResponderStart: (e, gestureState) => {
      setCircleRadius(props.dialRadius * 1.1)
    },
    onPanResponderEnd: (e, gestureState) => {
      setCircleRadius(props.dialRadius);
    }
  });

  function polarToCartesian(angle) {
    const r = circleRadius;
    const hC = circleRadius + bR;
    const a = (angle - 90) * Math.PI / 180.0;
    const x = hC + (r * Math.cos(a));
    const y = hC + (r * Math.sin(a));
    return { x, y };
  }

  function cartesianToPolar(x, y) {
    const hC = circleRadius + bR;

    if (x === 0) {
      return y > hC ? 0 : 180;
    }
    else if (y === 0) {
      return x > hC ? 90 : 270;
    }
    else {
      return (Math.round((Math.atan((y - hC) / (x - hC))) * 180 / Math.PI) +
        (x > hC ? 90 : 270));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <View style={styles.value}>
          <View style={styles.valueHeader}>
            <Text style={styles.minValueTitle}>Min Value</Text>
          </View>
          <Text style={styles.minmaxValue}>{currentValue}</Text>
        </View>
        <View style={styles.value}>
          <View style={styles.valueHeader}>
            <Text style={styles.maxValueTitle}>Max Value</Text>
          </View>
          <Text style={styles.minmaxValue}>{currentValue * 10}</Text>
        </View>
      </View>
      <View style={styles.circleContainer} >
        <Svg
          width={width}
          height={width}
          fill='#fff'
          {..._panResponder.panHandlers}>
          <Image
            x="0.7%"
            y="0.7%"
            opacity="0.5"
            width={circleRadius * 2.3}
            height={circleRadius * 2.3}
            href={CenterBgImg}
          />
          <Path stroke={props.meterColor}
            strokeWidth={props.dialWidth}
            fill='none'
            d={`M${startCoord.x} ${startCoord.y} A ${circleRadius} ${circleRadius} 0 ${angle > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`} />
        </Svg>
      </View>
    </View>
  )
}

export default CircleSlider;

CircleSlider.defaultProps = {
  btnRadius: 15,
  dialRadius: 80,
  dialWidth: 5,
  meterColor: '#3399ff',
  fillColor: 'none',
  strokeColor: '#fff',
  value: 0,
  min: 0,
  max: 360,
  xCenter: Dimensions.get('window').width / 2,
  yCenter: Dimensions.get('window').height / 2,
  onValueChange: x => x,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    display: 'flex',
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  display: {
    position: 'absolute',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  minValueTitle: {
    color: '#3399ff',
    marginLeft: 3,
    fontSize: 16,
  },
  maxValueTitle: {
    color: '#0dc195',
    marginLeft: 3,
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  value: {
    alignItems: 'center',
    flex: 1,
  },
  valueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minmaxValue: {
    color: 'white',
    fontSize: 35,
    fontWeight: "300",
  },
});