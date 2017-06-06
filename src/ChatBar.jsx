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
        content: event.target.innerText
      });
  }
  // function to set local state when cursor leaves the username input div
  onNameUpdate(event) {
    this.setState({
      username: event.target.innerText
    });
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
      document.getElementsByClassName("chatbar-message")[0].innerText = '';
      this.state.content = '';
    }
  }
  // Chatbar input footer
  render() {
    console.log("Rendering <ChatBar />");
    return (
      <footer  className="chatbar">
        <div className="chatbar-username" onInput= {this.onNameUpdate} contentEditable suppressContentEditableWarning={ true } ></div>
        <div className="chatbar-message" onInput= {this.onContent} onKeyDown={this.onPost} contentEditable suppressContentEditableWarning={ true } data-text="Enter message here"></div>
      </footer>
    );
  }
}

export default ChatBar;