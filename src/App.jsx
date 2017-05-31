import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let messagedatabase =
{
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
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
      messages: messagedatabase.messages
    };
  this.onNewPost = this. onNewPost.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
  }

  render() {
    // more code here..
  }


  onNewPost(content, username) {
    const newMessage = {id: generateRandomString(), content: content, username: username};
    const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages })
  }

  render() {
    console.log("Rendering <App/>");
    console.log(this.state);
    return (
      <div>
        <MessageList messages = {this.state.messages} />
        <ChatBar name = {messagedatabase.currentUser.name} onPost= {this.onNewPost} />
      </div>
    );
  }

}
export default App;
