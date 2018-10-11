import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { Icon } from "react-native-elements";
import PrivateRoomListItem from '../components/PrivateRoomListItem'
import { Screens } from "../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from '../actions/actions'
import * as PrivateRoomActions from '../actions/PrivateRoomActions'
import styles from '../styles/RoomStyle';
import { Constants, Location, Permissions } from "expo";

class RoomsHeader extends Component {
  render() {
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
              iconStyle={{ color: 'white', marginLeft: 30 }} />
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
  componentWillMount() {
    if (!this.props.auth.token) {
      this.props.getToken("0123456789");
    }
    this.listPrivateRooms();
  }
  async listPrivateRooms() {
    this.props.listPrivateRooms();
  }
  renderRoomList(rooms) {
    if (!rooms.length) {
      return (
        <View>
          <Text>No Rooms. Pull to refresh</Text>
        </View>
      );
    }

    return rooms.map((room, index) => (
      <PrivateRoomListItem
        key={index}
        auth={this.props.auth}
        room={room}
        selectPrivateRoom={this.props.selectPrivateRoom}
        navigate={this.props.navigation.navigate}
      />
    ));
  }
  render() {
    const { privateRoomsMap, privateRoomsXHR, privateRoomsError } = this.props.privateRoom;
    return (
      <View>
        <ScrollView
          style={{
            height: '100%',
          }}
          refreshControl={
            <RefreshControl
              refreshing={privateRoomsXHR}
              onRefresh={() => this.listPrivateRooms()}
            />
          }
        >
        {this.renderRoomList(Object.values(privateRoomsMap))}
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  listPrivateRooms: () => dispatch(PrivateRoomActions.listPrivateRoomsRequest()),
  selectPrivateRoom: roomId => dispatch(PrivateRoomActions.selectPrivateRoom(roomId)),
  getToken: deviceUniqueId => dispatch(actions.getTokenRequest(deviceUniqueId)),
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    privateRoom: state.privateRoom,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rooms);

