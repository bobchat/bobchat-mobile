import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import RoomListItem from './../components/RoomListItem'
import { Screens } from "./../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from './../actions/actions'

class Rooms extends Component {
  componentWillMount(){
    this.props.login('sam', '4062104444');
    this.props.listRooms();
  }
  render() {
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(Screens.CREATE_ROOM)}>
            <Text>New Post</Text>
          </TouchableOpacity>
        </View>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.props.roomsXHR}
            onRefresh={() => this.props.listRooms()}
          />}>
          {this.props.rooms.map((room, index) => <RoomListItem key={index} 
                                                               room={room} 
                                                               selectRoom={this.props.selectRoom}
                                                               navigate={this.props.navigation.navigate} /> )}
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (username, phoneNumber) => dispatch(actions.loginRequest(username, phoneNumber)),
  register: (username, phoneNumber) => dispatch(actions.registerRequest(username, phoneNumber)),
  createRoom: (title) => dispatch(actions.createRoomRequest(title)),
  listRooms: () => dispatch(actions.listRoomsRequest()),
  selectRoom: (room) => dispatch(actions.selectRoom(room)),
  listMessage: (roomId) => dispatch(actions.listMessageRequest(roomId)),
});

const mapStateToProps = state => {
  return {
    user: state.user,
    rooms: state.rooms,
    roomsXHR: state.roomsXHR,
    roomsError: state.roomsError,
    selectedRoom: state.selectedRoom,
    currentMessages: state.currentMessages,
    newMessage: state.newMessage,
    socket: state.socket,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);

