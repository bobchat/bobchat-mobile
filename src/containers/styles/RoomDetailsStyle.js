import { StyleSheet } from "react-native";
import Color from './../../styles/theme//color'

export default StyleSheet.create({
container: {
  flex: 1,
},
messagesContainer: {
},
 newMessageContainer: {
   bottom: 0,
   backgroundColor: Color.white,
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   height: 60,
   paddingLeft: 10,
   paddingRight: 10,
   borderColor: Color.grey,
   borderTopWidth: 1,
 },
 newMessageInput: {
  backgroundColor: Color.white,
  borderRadius: 5,
  flex: 3,
  height: 40,
  marginRight: 10,
  padding: 5
 },
 sendButton: {
   backgroundColor: Color.lightBlue,
  height: 40,
  width: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
 },
  sendButtonText: {
    color: Color.white,
  }
});
