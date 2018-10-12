import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from './styles/PrivateRoomMessagesStyle'

export class ReceivedPrivateMessage extends Component {
  render() {
    let { message, index } = this.props;
    return (
      <View key={index} style={styles.receivedPrivateMessage}>
        <Text style={styles.receivedPrivateText}>{message.content}</Text>
      </View>
    );
  }
}

export class SentPrivateMessage extends Component {
  render() {
    let { message, index } = this.props;
    return (
      <View key={index} style={styles.sentPrivateMessage}>
        <Text style={styles.sentPrivateText}>{message.content}</Text>
      </View>
    );
  }
}
