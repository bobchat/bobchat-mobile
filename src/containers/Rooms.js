import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { Icon } from "react-native-elements";
import RoomListItem from './../components/RoomListItem'
import { Screens } from "./../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from './../actions/actions'
import styles from './../styles/RoomStyle';


class RoomsHeader extends Component {
  render(){
    return (
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <Icon name='plus'
            type='font-awesome'
            containerStyle={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              flex: 1,
            }}
            iconStyle={{ color: 'white', marginRight: 30 }} />
        </View>
        <View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon name='rowing' />
        </View>
        <View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Icon name='new-message'
                type='entypo'
                containerStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  flex: 1,
                }}
                iconStyle={{color: 'white', marginLeft: 30}} />
        </View>
      </View>
    );
  }
}

class Rooms extends Component {
  
  static navigationOptions = {
    headerTitle: RoomsHeader,
    headerStyle: styles.headerStyle,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillMount() {
    this.props.login("sam", "4062104444");
    this.props.listRooms();
  }
  render() {
    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.roomsXHR}
              onRefresh={() => this.props.listRooms()}
            />
          }
        >
          {this.props.rooms.map((room, index) => (
            <RoomListItem
              key={index}
              room={room}
              selectRoom={this.props.selectRoom}
              navigate={this.props.navigation.navigate}
            />
          ))}
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

