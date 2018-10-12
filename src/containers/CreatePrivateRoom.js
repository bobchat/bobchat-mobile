import React, { Component } from "react";
import styles from './styles/CreateRoomStyle';
import { ScrollView, Button, TextInput } from "react-native";
import * as PrivateRoomActions from "../actions/PrivateRoomActions";
import * as actions from "../actions/actions";
import { connect } from 'react-redux'

class CreatePrivateRoom extends Component {
  componentDidMount(){
    this.props.updateNewPrivateRoomField('senderId', this.props.auth.user._id);
    this.props.updateNewPrivateRoomField("parentRoomId", this.props.room.selectedRoomId);
  }
  componentWillUnmount(){
    this.props.resetNewPrivateRoomFields();
  }
  renderAlias(alias){
    return (
      <TextInput
        placeholder='Enter an alias...'
        style={styles.input}
        onChangeText={(text) => this.props.updateNewPrivateRoomField('senderAlias', text)}
        value={alias}
        multiline={true}
        numberOfLines={4} />
    );
  }
  renderButton(){
    return (
      <Button 
        onPress={() => this.props.createPrivateRoom(this.props.privateRoom.newPrivateRoom)}
        title="Create"
        color="#841584"
        accessibilityLabel="Create private chat" />
    );
  }
  render() {
    let { title, radius, units, expiresIn, alias } = this.props.room.newRoom;
    return (
      <ScrollView style={styles.container}>
        {this.renderAlias(alias)}
        {this.renderButton()}
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateNewPrivateRoomField: (key, value) => dispatch(PrivateRoomActions.updateNewPrivateRoomField(key, value)),
  createPrivateRoom: newRoom => dispatch(PrivateRoomActions.createPrivateRoomRequest(newRoom)),
  resetNewPrivateRoomFields: () => dispatch(PrivateRoomActions.resetNewPrivateRoomFields()),
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    room: state.room,
    privateRoom: state.privateRoom,
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePrivateRoom);
