import { StyleSheet, Pressable, Text, ActivityIndicator } from "react-native";
import React from "react";

const Btn = ({ children, onPress, isLoading }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
      {isLoading && <ActivityIndicator color={"white"} />}
    </Pressable>
  );
};

export default Btn;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000000",
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
