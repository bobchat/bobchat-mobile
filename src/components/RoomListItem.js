import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Card, ListItem, Button } from "react-native-elements";
import { timeSince } from './../lib/timeFormat';
import { Screens } from './../navigation/Navigation';

export default class RoomListItem extends Component {
  selectRoom(room){
    this.props.selectRoom(room);
    this.props.navigate(Screens.ROOM_DETAILS);
  }
  render() {
    let { room } = this.props;
    return (
      <TouchableOpacity onPress={() => this.selectRoom(room)}>
        <Card >
          <View>
            <Text>{room.title}</Text>
            <Text>{timeSince(new Date(room.created))}</Text>
          </View>
          <View>
            <Text>Up</Text>
            <Text>{room.upvoteCount - room.downvoteCount}</Text>
            <Text>Down</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}