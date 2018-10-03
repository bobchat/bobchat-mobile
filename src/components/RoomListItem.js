import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Card } from "react-native-elements";
import { timeSince } from '../lib/time';
import styles from './styles/RoomListItemStyle';
import { Icon } from "react-native-elements";

export default class RoomListItem extends Component {
  selectRoom(room){
    if(this.props.selectRoom) {
      this.props.selectRoom(room._id);
    }
  }
  renderMeta(room){
    return (
      <View style={styles.meta}>
        <Text>{timeSince(new Date(room.created))}</Text>
        {room.alias ? [
          <Text key={1}> by </Text>,
          <Text key={2} style={styles.alias}>{room.alias}</Text>
        ] : null}
      </View>
    );
  }
  renderVotes(){
    let { room } = this.props;
    let { user } = this.props.auth;

    let upVoteStyles = [styles.icon];
    let downVoteStyles = [styles.icon];

    if (room.upVoteUserIds.includes(user._id)) upVoteStyles.push(styles.iconSelected);
    if (room.downVoteUserIds.includes(user._id)) downVoteStyles.push(styles.iconSelected);

    return (
      <View style={styles.voteContainer}>
        <TouchableOpacity onPress={() => this.props.upVoteRoom(room._id, user._id)}>
          <Icon name="chevron-up" type="entypo" size={30} iconStyle={upVoteStyles} containerStyle={styles.iconContainer} />
        </TouchableOpacity>
        <Text style={styles.voteCount}>{room.upVoteUserIds.length - room.downVoteUserIds.length}</Text>
        <TouchableOpacity onPress={() => this.props.downVoteRoom(room._id, user._id )}>
          <Icon name="chevron-down" type="entypo" size={30} iconStyle={downVoteStyles} containerStyle={styles.iconContainer} />
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    let { room } = this.props;
    console.log(this.props);
    return (
      <TouchableOpacity onPress={() => this.selectRoom(room)}>
        <Card containerStyle={styles.containerStyle} wrapperStyle={styles.wrapperStyle}>
          <View style={styles.leftContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{room.title}</Text>
            </View>
            {this.renderMeta(room)}
          </View>
          {this.renderVotes()}
        </Card>
      </TouchableOpacity>
    );
  }
}