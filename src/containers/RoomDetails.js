import React, { Component } from "react";
import { TouchableOpacity, View, ScrollView, RefreshControl, KeyboardAvoidingView, Text, TextInput} from "react-native";
import Message from "./../components/Message";
import { Screens } from "./../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from "./../actions/actions";

class RoomDetails extends Component {
  componentDidMount(){
    this.listMessages();
  }
  listMessages() { 
    this.props.listMessages(this.props.room.room._id);
  }
  renderMessages(messages) {
    return messages.map((message, index) => (
      <Message key={index} message={message} index={index} />
    ));
  }
  renderSendMessage() {
    let { user } = this.props.auth;
    let { newMessage } = this.props.message;
    let { room } = this.props.room;
    return (
      <KeyboardAvoidingView behavior="padding">
        <View>
          <TextInput
            value={newMessage}
            underlineColorAndroid="transparent"
            placeholder="Type something nice"
            onChangeText={text => this.props.updateNewMessage(text)}
          />
          <TouchableOpacity
            onPress={() =>
              this.props.sendMessage(newMessage, room._id, user._id)
            }
          >
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  render() {
    let { messages, messagesXHR } = this.props.message;
    console.log(this.props.room.room._id);
    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={messagesXHR}
              onRefresh={() => this.listMessages()}
            />
          }
        >
          }}>
          {this.renderMessages(messages)}
        </ScrollView>
        {this.renderSendMessage()}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  listMessages: roomId => dispatch(actions.listMessagesRequest(roomId)),
  updateNewMessage: newMessage => dispatch(actions.updateNewMessage(newMessage)),
  sendMessage: (message, roomId, ownerId) => dispatch(actions.sendMessage(message, roomId, ownerId)),
});

const mapStateToProps = state => {
  return {
    auth: state.auth,
    room: state.room,
    message: state.message,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomDetails);
