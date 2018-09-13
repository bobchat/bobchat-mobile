import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Message extends Component {
  render(){
    let { message, index } = this.props;
    return (
      <View key={index}>
        <Text>{message.content}</Text>
      </View>
    );
  }
}
