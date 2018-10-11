import React, { Component } from "react";
import { TouchableOpacity, View, ScrollView, RefreshControl, KeyboardAvoidingView, Text, TextInput } from "react-native";
import Message from "../components/Message";
import { Screens } from "../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import PrivateRoomListItem from "../components/PrivateRoomListItem";
import styles from './styles/PrivateRoomDetailsStyle';
import * as PrivateRoomActions from '../actions/PrivateRoomActions';

class PrivateRoomDetails extends Component {
  componentDidMount() {
    this.listMessages();
    setTimeout(() => this.scrollView.scrollToEnd({ animated: true }), 500);
  }
  listMessages() {
    const { selectedPrivateRoomId } = this.props.privateRoom;
    this.props.listMessages(selectedPrivateRoomId);
  }
  sendMessage(newMessage, roomId, userId) {
    this.props.sendMessage(newMessage, roomId, userId);
    setTimeout(() => this.scrollView.scrollToEnd({ animated: true }), 200);
  }
  renderPrivateRoomDetails(room) {
    return (
      <PrivateRoomListItem
        auth={this.props.auth}
        room={room}
        isDetails={true}
        navigate={this.props.navigation.navigate}
      />
    );
  }
  renderMessages(messages, messagesXHR) {
    return (
      <ScrollView
        style={styles.messagesContainer}
        ref={ref => (this.scrollView = ref)}
        refreshControl={
          <RefreshControl
            refreshing={messagesXHR}
            onRefresh={() => this.listMessages()}
          />
        }
      >
        {messages.map((message, index) => (
          <Message key={index} message={message} index={index} />
        ))}
      </ScrollView>
    );
  }
  renderSendMessage() {
    let { user } = this.props.auth;
    let { newMessage } = this.props.message;
    let { selectedPrivateRoomId } = this.props.privateRoom;
    return (
      <View style={styles.newMessageContainer}>
        <TextInput
          style={styles.newMessageInput}
          value={newMessage}
          underlineColorAndroid="transparent"
          placeholder="Type something nice"
          onChangeText={text => this.props.updateNewMessage(text)}
        />
        <TouchableOpacity
          onPress={() => this.sendMessage(newMessage, selectedPrivateRoomId, user._id)}
        >
          <View style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    let { privateRoomsMap, selectedPrivateRoomId } = this.props.privateRoom;
    let { messages, messagesXHR } = this.props.message;

    return (
      <KeyboardAvoidingView style={styles.container}>
        {this.renderPrivateRoomDetails(privateRoomsMap[selectedPrivateRoomId])}
        {this.renderMessages(messages, messagesXHR)}
        {this.renderSendMessage()}
      </KeyboardAvoidingView>
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
    privateRoom: state.privateRoom,
    message: state.message,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoomDetails);
