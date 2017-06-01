import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let messagedatabase =
{
  currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
}

function generateRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    return text;
}

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ""},
      messages: []
    };
  this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
    console.log("Connected to server");
      this.socket = new WebSocket("ws://localhost:3001");
      this.socket.onmessage = (event) => {
        let messagearray = (JSON.parse(event.data));
        console.log(messagearray.username);
        let currentUser= messagearray.username;
        let messages = this.state.messages.concat(messagearray);
        this.setState({currentUser: {name : currentUser}, messages: messages})
    }
  }

  render() {
    // more code here..
  }


  onNewPost(content, username) {
    const newMessage = {username: username, content: content };
    const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <MessageList messages = {this.state.messages} />
        <ChatBar name = {this.state.currentUser.name} onPost= {this.onNewPost} />
      </div>
    );
  }

}
export default App;
