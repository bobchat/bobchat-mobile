import { StyleSheet } from "react-native";
import Color from "./../../styles/theme//color";

export default StyleSheet.create({
  sentPrivateMessage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    borderRadius: 15,
    marginTop: 5,
    marginRight: 5,
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Color.lightBlue,
    display: "flex",
    alignSelf: "flex-end",
    maxWidth: 320,
  },
  sentPrivateText: {
    fontSize: 16,
    color: Color.white,
  },
  receivedPrivateMessage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    borderRadius: 15,
    marginTop: 5,
    marginLeft: 5,
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: Color.gold,
    alignSelf: "flex-start",
    maxWidth: 320,
  },
  receivedPrivateText: {
    fontSize: 16,
    color: Color.white
  }
});
