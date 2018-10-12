import { StyleSheet } from "react-native";
import Color from './../../styles/theme//color'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  messagesContainer: {},
  newMessageContainer: {
    backgroundColor: Color.white,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: Color.grey,
    borderTopWidth: 1
    // marginTop: 10
  },
  spacer: {
    height: 10
  },
  newMessageInput: {
    backgroundColor: Color.white,
    borderRadius: 15,
    flex: 3,
    minHeight: 40,
    padding: 5,
    paddingLeft: 10,
    paddingTop: 9,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    maxWidth: 340,
    backgroundColor: "#f1f2f3",
    fontSize: 16,
    borderColor: Color.lightGrey,
    borderTopWidth: 1
  },
  sendButton: {
    backgroundColor: Color.lightBlue,
    height: 40,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  sendButtonText: {
    color: Color.white
  }
});
