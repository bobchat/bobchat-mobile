import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Message extends Component {
  render(){
    let { message } = this.props;
    return (
      <View>
        <View>
          <Text>{message.content}</Text>
        </View>
      </View>
    );
  }
}
