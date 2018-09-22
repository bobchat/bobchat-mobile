import React, { Component } from "react";
import styles from './styles/CreateRoomStyle';
import { TouchableOpacity, View, Text, Button, TextInput } from "react-native";
import * as actions from "../actions/actions";
import { connect } from 'react-redux'
import { Slider } from "react-native-elements";
import { friendlyDuration, WEEK, MINUTE } from './../lib/time';
import { Constants, Location, Permissions } from "expo";

class CreateRoom extends Component {
  componentDidMount(){
    this.props.updateNewRoomField('ownerId', this.props.auth.user._id);
  }
  componentWillUnmount(){
    this.props.resetNewRoomFields();
  }
  async getLocationAsync(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('DENIED LOCATION');
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(JSON.stringify(location));
    this.props.updateNewRoomField('coords', location);
    this.props.createRoom(this.props.room.newRoom);
  }
  renderTitle(title) {
    return (
      <TextInput
        placeholder='Enter Post Content...'
        style={styles.input}
        onChangeText={(text) => this.props.updateNewRoomField('title', text)}
        value={title}
        multiline={true}
        numberOfLines={4} />
    );
  }
  renderRadius(radius, units) {
    return (
      <View style={{ justifyContent: 'center', width: '80%', left: '10%' }}>
        <Slider
          value={radius}
          minimumValue={50}
          maximumValue={5280}
          onValueChange={(value) => this.props.updateNewRoomField('radius', Math.ceil(value))} />
        <Text>Viewable only from within {radius} {units} of my current location</Text>
      </View>
    );
  }
  renderExpiresIn(expiresIn) {
    return(
      <View style={{ justifyContent: 'center', width: '80%', left: '10%' }}>
        <Slider
          value={expiresIn}
          minimumValue={30*MINUTE}
          maximumValue={2*WEEK}
          onValueChange={(value) => this.props.updateNewRoomField('expiresIn', Math.ceil(value))} />
        <Text>Expires in {friendlyDuration(expiresIn)}</Text>
      </View>
    );
  }
  renderAlias(alias){
    return (
      <TextInput
        placeholder='Enter an optional alias...'
        style={styles.input}
        onChangeText={(text) => this.props.updateNewRoomField('alias', text)}
        value={alias}
        multiline={true}
        numberOfLines={4} />
    );
  }
  renderButton(){
    return (
      <Button 
        onPress={() => this.getLocationAsync()}
        title="Create"
        color="#841584"
        accessibilityLabel="Create a new room" />
    );
  }
  render() {
    let { title, radius, units, expiresIn, alias } = this.props.room.newRoom;
    return (
      <View style={styles.container}>
        {this.renderTitle(title)}
        {this.renderRadius(radius, units)}
        {this.renderExpiresIn(expiresIn)}
        {this.renderAlias(alias)}
        {this.renderButton()}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewRoomField: (key, value) => dispatch(actions.updateNewRoomField(key, value)),
  createRoom: newRoom => dispatch(actions.createRoomRequest(newRoom)),
  resetNewRoomFields: () => dispatch(actions.resetNewRoomFields()),
  
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    room: state.room,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoom);
