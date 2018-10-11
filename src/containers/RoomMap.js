import React, { Component } from 'react'

import { Icon } from "react-native-elements";
import { Screens } from "../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from '../actions/actions'
import styles from '../styles/RoomStyle';
import { Constants, Location, Permissions } from "expo";
import MapView, { Marker } from "react-native-maps";

class RoomMap extends Component {
  render(){
    let { roomsMap } = this.props.room;
    let rooms = Object.values(roomsMap);
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {rooms.map((room, i) => {
          return (
            <Marker 
              key={i} 
              onPress={() => this.props.selectRoom(room._id)} 
              coordinate={{
                latitude: room.location.coords.latitude,
                longitude: room.location.coords.longitude,
              }}
            />
          );
        })}

      </MapView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getToken: deviceUniqueId => dispatch(actions.getTokenRequest(deviceUniqueId)),
  listRooms: (lat, lng, radius, units) => dispatch(actions.listRoomsRequest(lat, lng, radius, units)),
  selectRoom: room => dispatch(actions.selectRoom(room))
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
)(RoomMap);