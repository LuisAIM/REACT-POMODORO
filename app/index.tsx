import { StyleSheet, Text, View, Button, Platform, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from "react";
import Header from '@/components/header';
import Timer from '@/components/Timer';
import { Audio } from 'expo-av';

const colors = ["#9CCACC","#B5C5D7","#ECDFDB"];
export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState(0); // 0 para "Pomodoro", 1 para "Short Break", etc.
  const [isActive, setIsActive] =useState(false);
 

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1); // Usar una función de actualización
      }, 1000);
    } else {
      clearInterval(interval); // Detener el intervalo cuando el tiempo llegue a 0
    }
    if(time === 0 ){
      setIsActive(false);
      clearInterval(interval);
        if (currentTime === 1){
          setTime(300);
        }else if(currentTime === 2) {
          setTime(900);
        } else if(currentTime === 0){
          setTime(1500);
        }
      playSoundSuccess();
    }

    // Limpiar el intervalo cuando el componente se desmonte o `isActive` cambie
    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop(){
    playSound();
      setIsActive(!isActive);
  }
  async function playSoundSuccess(){
    const{sound} = await Audio.Sound.createAsync(
      require("@/assets/success.mp3")
    )
    await sound.playAsync();
  }
  async function playSound(){
    const{sound} = await Audio.Sound.createAsync(
      require("@/assets/click.mp3")
    )
    await sound.playAsync();
  }
  

  return (
    <SafeAreaView style={[styles.stepContainer, {backgroundColor: colors[currentTime]}]}>
      <View 
        style={styles.View}
       >
        <Text style={styles.Text}>Pomodoro</Text>  
        <Header
          time={time}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time}/>
        <TouchableOpacity onPress={handleStartStop} style={ styles.button}>
          <Text style={{color:"white", fontWeight:"bold"}}>{isActive ?"STOP":"START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    gap: 8,
    marginBottom: 8,
  },
  Text: {
    fontSize: 32,
    fontWeight: "bold",
    borderRadius:15
  },
  View:{
    flex: 1,
    paddingHorizontal:15,
    paddingTop: Platform.OS === "android" && 30,
    borderWidth:  3,
  },
  button:{
    alignItems:"center",
    color:"#FFFFFF",
    backgroundColor:"#333333",
    padding:15,
    marginTop:15,
    borderRadius: 15
  }
});