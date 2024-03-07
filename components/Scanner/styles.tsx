import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cameraContainer: {
    borderRadius: 20,
    overflow: "hidden",
    width: 305,
    height: 305,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  button: {
    backgroundColor: "#faedcd",
    borderColor: "#faedcd",
    borderRadius: 10,
  },
  text: {
    color: "#313857",
    fontFamily: "first",
  },
});

export default styles;
