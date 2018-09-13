import React, { Component } from "react";
import { TouchableOpacity, View, ScrollView, RefreshControl, KeyboardAvoidingView, Text, TextInput } from "react-native";
import Message from "./../components/Message";
import { Screens } from "./../navigation/Navigation";
import { connect } from "react-redux";
import * as actions from "./../actions/actions";

class SignUp extends Component {
  listMessages() {
    this.props.listMessages(this.props.room._id);
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
  register: (username, phoneNumber) => dispatch(actions.registerRequest(username, phoneNumber)),
  setRegisterField: (key, value) => dispatch(actions.setRegisterField(key, value)),
});

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomDetails);
