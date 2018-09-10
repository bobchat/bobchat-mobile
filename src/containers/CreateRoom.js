import React, { Component } from "react";
import { TouchableOpacity, View, Text, Button} from "react-native";
import { Screens } from "./../navigation/Navigation";

export default class CreateRoom extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(Screens.ROOMS)}>
            <Text style={styles.largeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, maxWidth: '80%', margin: '10%' }}
                     onChangeText={(text) => this.setNewRoomName(text)}
                     value={this.state.newRoomName}
                     multiline={true}
                     numberOfLines={4} />
          <Button onPress={() => this.createRoom()}
                  title="Create"
                  color="#841584"
                  accessibilityLabel="Create a new room" />
        </View>
      </View>
    );
  }
}
