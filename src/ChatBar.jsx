import React, {Component} from 'react';
// new
class ChatBar extends React.Component {
  //ChatBar has its own state that stores content and username only
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: ''
    };

    this.onContent = this.onContent.bind(this);
    this.onPost = this.onPost.bind(this);
    this.onNameUpdate = this.onNameUpdate.bind(this);
  }
  // function to set local state when cursor leaves the message input div
  onContent(event) {
      this.setState({
        content: event.target.value
      });
  }
  // function to set local state when cursor leaves the username input div, also
  // use the props onNameChange method to send name notifications to server
  onNameUpdate(event) {
    if (event.target.innerText.length == 0) {
      event.target.innerText = "Anonymous"
    }
    if (this.state.username !== event.target.innerText) {
      let notification = ("// SYSTEM NOTIFICATION: " + this.state.username + " has changed username to " + event.target.innerText)
      this.props.onNameChange(notification);
      this.setState({
        username: event.target.innerText
      });
    }
  }
  // this function is called here to send to server, it is called from the main App.jsx file
  onPost(event) {
    if (event.keyCode === 13) {
      let content = this.state.content;
      let usernamecontent = this.state.username;
      this.props.onPost(content, usernamecontent);
      this.setState({
        content: content,
        username: usernamecontent
      });
      document.getElementsByClassName("chatbar-message")[0].value = '';
      document.getElementsByClassName("chatbar-message")[0].select();
    }
  }
  // Chatbar input footer
  render() {
    console.log("Rendering <ChatBar />");
    return (
      <footer  className="chatbar">
        <div className="chatbar-username" onBlur= {this.onNameUpdate} contentEditable suppressContentEditableWarning={ true } >{this.state.username}</div>
        <input className="chatbar-message" onInput= {this.onContent} onKeyDown={this.onPost} placeholder="Enter msg here" />
      </footer>
    );
  }
}

export default ChatBar;