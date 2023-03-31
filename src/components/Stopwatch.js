import React, { useEffect, useState } from "react";
import {Pressable, Text, View} from 'react-native';
import styles from "../styles/styles";

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    useEffect(() => {
      let interval;
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 1000);
        }, 1000);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running]);
    return (
      <View style={styles.outer}>
        <View style={styles.container}>
          <Text style={styles.header}>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</Text>
        </View>
        <View style={styles.stopwatchContainer}>
          <Pressable style={styles.button3} onPress={() => setRunning(true)}><Text style={styles.text}>Start</Text></Pressable>
          <Pressable style={styles.button3} onPress={() => setRunning(false)}><Text style={styles.text}>Stop</Text></Pressable>
          <Pressable style={styles.button3} onPress={() => setTime(0)}><Text style={styles.text}>Reset</Text></Pressable>       
        </View>
      </View>
    );
};

export default Stopwatch