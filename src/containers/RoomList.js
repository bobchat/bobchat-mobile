import React, { Component } from 'react'
import { Platform, View, Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { Icon } from "react-native-elements";
import RoomListItem from '../components/RoomListItem'
import { Screens } from "../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from '../actions/actions'
import * as PrivateRoomActions from "../actions/PrivateRoomActions";
import styles from '../styles/RoomStyle';
import { Constants, Location, Permissions } from "expo";
import { getDeviceToken } from './../lib/auth';

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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateRoom')}>
          <Icon name='new-message'
                type='entypo'
                containerStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  flex: 1,
                }}
                iconStyle={{color: 'white', marginLeft: 30}} />
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Rooms extends Component {
  static navigationOptions = navigation => ({
    headerTitle: () => <RoomsHeader navigation={navigation.navigation} />,
    headerStyle: styles.headerStyle,
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });
  async componentWillMount() {
    const token = await getDeviceToken();


    if(!this.props.auth.token) {
      this.props.getToken(token);
    }
    
    this.listRooms();
  }
  async listRooms(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('DENIED LOCATION');
    }

    let location = await Location.getCurrentPositionAsync({});
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    this.props.listRooms(lat, lng);
    this.props.listPrivateRooms();
  }
  renderRoomList(rooms){
    if(!rooms.length) {
      return (
        <View>
          <Text>No Rooms. Pull to refresh</Text>
        </View>
      );
    }
    
    return rooms.map((room, index) => (
      <RoomListItem
        key={index}
        auth={this.props.auth}
        room={room}
        selectRoom={this.props.selectRoom}
        upVoteRoom={this.props.upVoteRoom}
        downVoteRoom={this.props.downVoteRoom}
        navigate={this.props.navigation.navigate}
      />
    ));
  }
  render() {
    const {roomsMap, roomsXHR, roomsError} = this.props.room;
    return (
      <View>
        <ScrollView
          style={{
            height: '100%',
          }}
          refreshControl={
            <RefreshControl
              refreshing={roomsXHR}
              onRefresh={() => this.listRooms()}
            />
          }
        >
        {this.renderRoomList(Object.values(roomsMap))}
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getToken: deviceUniqueId => dispatch(actions.getTokenRequest(deviceUniqueId)),
  listRooms: (lat, lng, radius, units) => dispatch(actions.listRoomsRequest(lat, lng, radius, units)),
  listPrivateRooms: () => dispatch(PrivateRoomActions.listPrivateRoomsRequest()),
  selectRoom: roomId => dispatch(actions.selectRoom(roomId)),
  upVoteRoom: (roomId, userId) => dispatch(actions.upVoteRoom(roomId, userId)),
  downVoteRoom: (roomId, userId) => dispatch(actions.downVoteRoom(roomId, userId)),
});

const mapStateToProps = state => {
  return {
    room: state.room,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);

