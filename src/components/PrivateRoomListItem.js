import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Card } from "react-native-elements";
import { timeSince } from '../lib/time';
import styles from './styles/PrivateRoomListItemStyle';
import { Icon } from "react-native-elements";
import * as NavigationService from "./../navigation/NavigationService";

//<Text>{timeSince(new Date(room.created))}</Text>

export default class PrivateRoomListItem extends Component {
  selectPrivateRoom(room) {
    if (this.props.selectPrivateRoom) {
      this.props.selectPrivateRoom(room._id);
    }
  }
  renderMeta(room) {
    return (
      <View style={styles.meta}>
        <Text>
          Messaging&nbsp;
            <Text style={styles.alias}>{room.alias}&nbsp;</Text>
          as&nbsp;
          <Text style={styles.alias}>{room.senderAlias}</Text>
        </Text>
      </View>
    );
  }
  renderCard(room) {
    return (
      <Card containerStyle={styles.containerStyle} wrapperStyle={styles.wrapperStyle}>
        <View style={styles.leftContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{room.title}</Text>
          </View>
          {this.renderMeta(room)}
        </View>
      </Card>
    );
  }
  renderCard(room) {
    return (
      <Card containerStyle={styles.containerStyle} wrapperStyle={styles.wrapperStyle}>
        <View style={styles.leftContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{room.title}</Text>
          </View>
          {this.renderMeta(room)}
        </View>
      </Card>
    );
  }
  render() {
    const { room } = this.props;
    return (
      <TouchableOpacity onPress={() => this.selectPrivateRoom(room)}>
        {this.renderCard(room)}
      </TouchableOpacity>
    );
  }
}