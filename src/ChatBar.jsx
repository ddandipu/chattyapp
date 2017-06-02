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
    let content = this.state.content;
    let usernamecontent = this.state.username;
    this.props.onPost(content, usernamecontent);
    content = '';
    this.setState({
      content: content,
      username: usernamecontent

    });
  }
  // Chatbar input footer
  render() {
    console.log("Rendering <ChatBar />");
    return (
        <footer className="chatbar">
          <div className="chatbar-username" onBlur= {this.onNameUpdate} contentEditable suppressContentEditableWarning={ true } >{this.props.name}</div>
          <div className="chatbar-message textarea" onBlur= {this.onContent} contentEditable suppressContentEditableWarning={ true } data-text="Enter message here">{this.state.content}</div>
          <button className="chatbar-button" onClick={ this.onPost } >MESSAGE</button>
        </footer>
    );
  }
}

export default ChatBar;