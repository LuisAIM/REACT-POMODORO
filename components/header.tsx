import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface HeaderProps {
  currentTime: number;
  setCurrentTime: (value: number) => void;
  time: number;
  setTime: (value: number) => void;
}

const options = ["Pomodoro", "Short Break", "Long Break"];
const colorsh = ["#9CCACC","#B5C5D7","#ECDFDB"];
export default function Header({ currentTime, setCurrentTime, time, setTime }: HeaderProps) {
  function handlePress(index: number) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15; // Valores para cada opción
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={{ flexDirection: "row" , borderRadius:15}}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.itemStyle,
            currentTime === index && { backgroundColor: colorsh[currentTime]}, // Resalta la opción seleccionada
            currentTime === index && { borderWidth: 3 }, 
            currentTime !== index && { borderBlockColor: "Transparent" }, 
          ]}
        >
          <Text style={{ textAlign: "center",fontWeight: "bold" }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: "33%",
    borderWidth: 0,
    padding: 8,
    borderRadius:15,
    
  },
});