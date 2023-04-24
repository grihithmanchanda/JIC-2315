import React, { useEffect, useState } from "react";
import {Text, View} from 'react-native';
import styles from "../styles/styles";

function Stopwatch({running}) {
    const [time, setTime] = useState(0);
    useEffect(() => {
      let interval;
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => {
            let newTime = prevTime + 1000;
            global.lastWorkoutDuration = newTime;
            return newTime
          });
        }, 1000);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => {
        // global.lastWorkoutDuration = time;
        // console.log(time)
        //console.log(global.lastWorkoutDuration)
        clearInterval(interval)
      };
    }, [running]);
    return (
      <View style={styles.outer}>
        <View style={styles.stopwatchContainer}>
          <Text style={styles.subheader}>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</Text>
        </View>
      </View>
    );
};

export default Stopwatch;