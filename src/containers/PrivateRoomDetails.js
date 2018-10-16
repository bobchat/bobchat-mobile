import React, { Component } from "react";
import { Animated, TouchableOpacity, View, ScrollView, RefreshControl, KeyboardAvoidingView, Text, TextInput, Keyboard } from "react-native";
import { SentPrivateMessage, ReceivedPrivateMessage } from "../components/PrivateRoomMessages";
import { Screens } from "../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import PrivateRoomListItem from "../components/PrivateRoomListItem";
import styles from './styles/PrivateRoomDetailsStyle';
import * as PrivateRoomActions from '../actions/PrivateRoomActions';

class PrivateRoomDetails extends Component {
  constructor(){
    super();
    this.state = {
      showDetails: true,
    };
  }
  componentDidMount() {
    this.listMessages();
    this.scrollToEnd(500);
  }
  listMessages() {
    const { selectedPrivateRoomId } = this.props.privateRoom;
    this.props.listMessages(selectedPrivateRoomId);
  }
  sendMessage(newMessage, roomId, userId) {
    this.props.sendMessage(newMessage, roomId, userId);
    this.scrollToEnd();
  }
  scrollToEnd(msWait = 200) {
    setTimeout(() => this.scrollView.scrollToEnd({ animated: true }), msWait);
  }
  onScroll(e) {
    console.log(e);
  }
  renderPrivateRoomDetails(room) {
    if(!this.state.showDetails) return null;
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
    let userId = this.props.auth.user._id;

    return (
      <ScrollView
        style={styles.messagesContainer}
        // onScroll={e => this.onScroll(e)}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        ref={ref => (this.scrollView = ref)}
        refreshControl={
          <RefreshControl
            refreshing={messagesXHR}
            onRefresh={() => this.listMessages()}
          />
        }
      >
        {messages.map((message, index) => (
          userId == message.owner ? <SentPrivateMessage key={index} message={message} index={index} />
                                  : <ReceivedPrivateMessage key={index} message={message} index={index} />
        ))}
        <View style={styles.spacer}></View>
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
          multiline={true}
          style={styles.newMessageInput}
          value={newMessage}
          underlineColorAndroid="transparent"
          placeholder="Type something nice"
          onChangeText={text => this.props.updateNewMessage(text)}
          onFocus={() => this.scrollToEnd()}
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
    let { messagesMap, messagesXHR } = this.props.message;
    let messages = messagesMap[selectedPrivateRoomId] || [];

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
