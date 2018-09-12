import React, { Component } from "react";
import { TouchableOpacity, View, ScrollView, RefreshControl, KeyboardAvoidingView, Text, TextInput} from "react-native";
import Message from "./../components/Message";
import { Screens } from "./../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from "./../actions/actions";

class RoomDetails extends Component {
  componentWillMount() {
    this.listMessages();
  }
  listMessages() {
    this.props.listMessages(this.props.room._id);
  }
  renderMessages(messages) {
    return messages.map((message, index) => <Message key={index} message={message} index={index} />);
  }
  renderSendMessage() {
    let { newMessage, room, user } = this.props
    return (
      <KeyboardAvoidingView behavior="padding">
        <View>
          <TextInput
            value={newMessage}
            underlineColorAndroid="transparent"
            placeholder="Type something nice"
            onChangeText={text => this.props.updateNewMessage(text)}
          />
          <TouchableOpacity onPress={() => this.props.sendMessage(newMessage, room._id, user._id)}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  render() {
    let { room, messages, messagesXHR } = this.props;

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
            onRefresh={() => this.listMessages()}
          />}>}
        >
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
    user: state.user,
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
