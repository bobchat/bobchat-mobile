import React, { Component } from "react";
import { TouchableOpacity, View, ScrollView, RefreshControl, KeyboardAvoidingView, Text, TextInput} from "react-native";
import Message from "./../components/Message";
import { Screens } from "./../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from "./../actions/actions";
import RoomListItem from "./../components/RoomListItem";
import styles from './styles/RoomDetailsStyle'

class RoomDetails extends Component {
  componentDidMount(){
    this.listMessages();
    setTimeout(() => this.scrollView.scrollToEnd({ animated: true }), 400);
  }
  listMessages() { 
    this.props.listMessages(this.props.room.room._id);
  }
  sendMessage(newMessage, roomId, userId){
    this.props.sendMessage(newMessage, roomId, userId)
    setTimeout(() => this.scrollView.scrollToEnd({animated: true}), 200);
  }
  renderRoomDetails(room){
    return (
      <RoomListItem
        auth={this.props.auth}
        room={room}
        upVoteRoom={this.props.upVoteRoom}
        downVoteRoom={this.props.downVoteRoom}
        navigate={this.props.navigation.navigate}
      />
    );
  }
  renderMessages(messages, messagesXHR) {
    return (
      <ScrollView style={styles.messagesContainer} ref={ref => this.scrollView = ref} refreshControl={
        <RefreshControl
          refreshing={messagesXHR}
          onRefresh={() => this.listMessages()}
        />}>
        {messages.map((message, index) => (
          <Message key={index} message={message} index={index} />
        ))}
      </ScrollView>
    )
  }
  renderSendMessage() {
    let { user } = this.props.auth;
    let { newMessage } = this.props.message;
    let { room } = this.props.room;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.newMessageContainer}>
        
          <TextInput
            style={styles.newMessageInput}
            value={newMessage}
            underlineColorAndroid="transparent"
            placeholder="Type something nice"
            onChangeText={text => this.props.updateNewMessage(text)}
          />
          <TouchableOpacity
            onPress={() => this.sendMessage(newMessage, room._id, user._id)} >
          <View style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </View>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
  render() {
    let { room } = this.props.room;
    let { messages, messagesXHR } = this.props.message;
    
    return (
      <View style={styles.container}>
        {this.renderRoomDetails(room)}
        {this.renderMessages(messages, messagesXHR)}
        {this.renderSendMessage()}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  listMessages: roomId => dispatch(actions.listMessagesRequest(roomId)),
  updateNewMessage: newMessage => dispatch(actions.updateNewMessage(newMessage)),
  sendMessage: (message, roomId, ownerId) => dispatch(actions.sendMessage(message, roomId, ownerId)),
  upVoteRoom: (roomId, userId) => dispatch(actions.upVoteRoom(roomId, userId)),
  downVoteRoom: (roomId, userId) => dispatch(actions.downVoteRoom(roomId, userId)),
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
