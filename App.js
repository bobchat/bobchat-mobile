import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, RefreshControl } from 'react-native';
import Client from './src/util/client'
import { ScrollView } from 'react-native-gesture-handler';
import io from 'socket.io-client';

const views = {
  ROOMS: 'ROOMS',
  CREATE_ROOM: 'CREATE_ROOM',
  ROOM_DETAILS: 'ROOM_DETAILS',
};


export default class App extends React.Component {
  state = {
    user: null,
    rooms: [],
    currentRoom: null,
    currentView: 'ROOMS',
    currentMessages: [],
    client: new Client('http://10.0.0.4:8080'),
    newRoomName: '',
    newMessage: '',
    socket: null,
  };
  componentDidMount(){
    this.createSocket();
    this.login()
    this.listRooms();
  }
  createSocket(){
    const socket = io("http://10.0.0.4:8080");

    socket.on('message', data => {
      console.log(data);
      this.setState({
        currentMessages: [
          ...this.state.currentMessages,
          data
        ]
      }, () => {
        this.scrollRoomToBottom();
      })
    });

    this.setState({
      socket,
    });
  }
  scrollRoomToBottom(animated = true){
    setTimeout(() => {
      this.roomMessages.scrollToEnd({ animated });
    }, 0);
  }
  login() {
    return this.state.client.login('hughy', '9077504844')
    .then(res => this.setState({user: res.user}))
    .catch(err => console.error(err));
  }
  setView(view){
    if(views[view]) {
      this.setState({
        currentView: view
      });
    }
  }
  viewRoomDetails(room){
    this.state.socket.emit('room', room._id);

    this.setState({
      currentRoom: room,
      currentView: views.ROOM_DETAILS,
    });
    this.loadRoomMessages(room);
  }
  loadRoomMessages(room){
    this.state.client
      .listMessages(room._id)
      .then(res =>
        this.setState(
          {
            currentMessages: res.messages
          },
          () => this.scrollRoomToBottom(false)
        )
      );
  }
  setNewRoomName(text){
    this.setState({
      newRoomName: text
    });
  }
  listRooms(){
    return this.state.client.listRooms().then(res => {
      this.setState({ rooms: res.rooms });
    });
  }
  createRoom(){
    let roomName = this.state.newRoomName;
    let owner = this.state.user._id;
    this.state.client.createRoom(roomName, owner)
    .then(() => this.listRooms())
    .then(() => this.setView(views.ROOMS))
  }
  sendMessage(){
    let room = this.state.currentRoom;
    let message = this.state.newMessage;

    this.state.socket.emit('message', {
      content: message,
      room: room._id,
      owner: this.state.user._id,
    });

    this.setState({
      newMessage: ''
    });
  }
  renderRooms() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.setView(views.CREATE_ROOM)}>
            <Text style={styles.largeText}>New Post</Text>
          </TouchableOpacity>
        </View>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.listRooms()}
          />}>
          {this.state.rooms.map((room, i) => this.renderRoomListItem(room, i))}
        </ScrollView>
      </View>
    );
  }
  renderRoomListItem(room, i) {
    return (
      <TouchableOpacity key={i} onPress={() => this.viewRoomDetails(room)}>
        <View style={styles.row} >
          <View style={styles.mainTextContainer}>
            <Text style={styles.mainText}>{room.title}</Text>
            <Text style={styles.time}>{room.created}</Text>
          </View>
          <View style={styles.voteCount}>
            <Text>Up</Text>
            <Text>{room.upvoteCount - room.downvoteCount}</Text>
            <Text>Down</Text>
          </View>
        </View>
      </TouchableOpacity>
    ); 
  }
  renderCreateRoom() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.setView(views.ROOMS)}>
            <Text style={styles.largeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 , maxWidth: '80%', margin: '10%'}}
            onChangeText={(text) => this.setNewRoomName(text)}
            value={this.state.newRoomName}
            multiline={true}
            numberOfLines={4}
          />
          <Button
            onPress={() => this.createRoom()}
            title="Create"
            color="#841584"
            accessibilityLabel="Create a new room"
          />
        </View>
      </View>
    );
  }

  renderRoomDetails(){
    let room = this.state.currentRoom;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.setView(views.ROOMS)}>
            <Text style={styles.largeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subheader}>
          <Text style={styles.mediumText}>{room.title}</Text>
        </View>
        <ScrollView ref={ref => this.roomMessages = ref} style={styles.roomMessages}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.listMessages(this.state.currentRoom)}
          />}>}
        >
          {this.state.currentMessages.map((message, i) => {
            return <View key={i} style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.sender}>{message.content}</Text>
              </View>
            </View>;
          })}
        </ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.footer}>
            <TextInput
              value={this.state.newMessage}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type something nice"
              onChangeText={text => this.setState({ newMessage: text })}
            />
            <TouchableOpacity onPress={() => this.sendMessage()}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  render() {
    switch(this.state.currentView) {
      case 'ROOMS':
        return this.renderRooms();
    
      case 'CREATE_ROOM':
        return this.renderCreateRoom();
      
      case 'ROOM_DETAILS':
        return this.renderRoomDetails();

      default:
        return this.renderRooms();
    }
  }
}

const styles = StyleSheet.create({
  roomMessages: {
    position: "relative",
    height: "50%"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    paddingTop: 30,
    borderBottomWidth: 1,
    backgroundColor: "lightblue"
  },
  subheader: {
    borderBottomWidth: 1,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "lightblue"
  },
  newMessage: {
    bottom: 0,
    height: 50,
    backgroundColor: "red"
  },
  largeText: {
    fontSize: 20
  },
  mediumText: {
    fontSize: 16
  },
  smallText: {
    fontSize: 12
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#EEE"
  },
  mainTextContainer: {
    width: '80%',
  },
  voteCount: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    flex: 1,
    fontSize: 20,
    color: '#999',
    marginBottom: 10,
  },
  message: {
    fontSize: 18
  },
  sender: {
    fontWeight: "bold",
    paddingRight: 10
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee"
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: "center",
    color: "lightseagreen",
    fontSize: 16,
    fontWeight: "bold",
    padding: 20
  }
});
