import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircleSlider from './components/CircularSlider';

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CircularSlider</Text>
      <CircleSlider maxValue={400} minValue={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 40,
    fontSize: 24,
    color: '#fff'
  }
});
