import { StyleSheet } from "react-native";
import Color from './../../styles/theme//color'

export default StyleSheet.create({
  message: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    borderColor: Color.grey,
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: Color.white
  },
  messageText: {
    fontSize: 16,
    color: "grey",
  }
});
