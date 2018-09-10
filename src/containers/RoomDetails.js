import React, { Component } from "react";
import { TouchableOpacity, View, ScrollView, RefreshControl, KeyboardAvoidingView, Text, TextInput} from "react-native";
import Message from "./../components/Message";
import { Screens } from "./../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from "./../actions/actions";

class RoomDetails extends Component {
  componentWillMount(){
    this.props.listMessages(this.props.room._id);
  }
  renderMessages(messages){  
    return messages.map((message, index) => <Message key={index} message={message} index={index} /> );
  }
  render() {
    let { room, messages, messagesXHR, newMessage } = this.props;
   
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(Screens.ROOMS)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{room.title}</Text>
        </View>
        <ScrollView ref={ref => this.roomMessages = ref}
          refreshControl={<RefreshControl
            refreshing={messagesXHR}
            onRefresh={() => this.listMessages(this.state.currentRoom)}
          />}>}
        >
        {this.renderMessages(messages)}
        </ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <TextInput
              value={newMessage}
            
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
              onChangeText={text => this.setState({ newMessage: text })}
            />
            <TouchableOpacity onPress={() => this.sendMessage()}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  listMessages: (roomId) => dispatch(actions.listMessagesRequest(roomId)),
});

const mapStateToProps = state => {
  return {
    room: state.room,
    messages: state.messages,
    messagesXHR: state.messagesXHR,
    messagesError: state.messagesError,
    newMessage: state.newMessage,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomDetails);


