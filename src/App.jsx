import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let messagedatabase =
{
  currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
}


class App extends Component {

//setting state for the app level
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: [],
      notifications: "",
      usercount: ""
    };
  this.onNewPost = this.onNewPost.bind(this);
  this.onNameChange = this.onNameChange.bind(this);
  }
//takes in data submitted from webSocket server and set the state set above with new parameters from server data
  componentDidMount() {
    console.log("Connected to server");

      this.socket = new WebSocket("ws://localhost:3001");
      this.socket.onmessage = (event) => {
        let data = (JSON.parse(event.data));
        console.log(data);
        if (data.postNotification === undefined) {
          //if no username change
          let currentUser= data.username;
          let usercount = data.usercount;
          let messaging = this.state.messages.concat(data);
          this.setState({currentUser: {name : currentUser}, messages: messaging, usercount: usercount })
      } else {
        // if username changes
          let currentUser= data.newMessage.username;
          let usercount = data.newMessage.usercount;
          let messaging = this.state.messages.concat(data.newMessage);
          let notifications = data.postNotification.content;
          this.setState({currentUser: {name : currentUser}, messages: messaging, usercount: usercount })
      }
    }
  }

// this function is passed down to ChatBar, it takes in the local state from ChatBar and then
// submits it to the webSocket server.
  onNewPost(content, username) {
    const newMessage = {type: "postMessage", username: username, content: content };
      this.state.notifications = "";
      const messages = this.state.messages.concat(newMessage)
      this.socket.send(JSON.stringify(newMessage));

  }
// another function passed to chatbar, this one submits notification to webSocket server
  onNameChange (notification) {
    let notificationObject = {type: "postNotification", content: notification};
    this.socket.send(JSON.stringify(notificationObject));
  }
// passes App state to the MessageList and ChatBar
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages = {this.state.messages} notifications = {this.state.notifications} usercount = {this.state.usercount}/>
        <ChatBar name = {this.state.currentUser.name} onPost= {this.onNewPost} onNameChange = {this.onNameChange} />
      </div>
    );
  }

}
export default App;
