import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from './styles/MessageStyle'

export default class Message extends Component {
  render(){
    let { message, index } = this.props;
    return (
      <View key={index} style={styles.message}>
        <Text style={styles.messageText}>{message.content}</Text>
      </View>
    );
  }
}
