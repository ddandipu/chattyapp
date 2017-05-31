import React, {Component} from 'react';
// new
class ChatBar extends React.Component {

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

  onContent(event) {
    console.log(event.target.innerText)
      this.setState({
        content: event.target.innerText
      });
  }

  onNameUpdate(event) {
    console.log(event.target.innerText);
    this.setState({
      username: event.target.innerText
    });
  }

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

  render() {
    console.log("Rendering <ChatBar />");
    return (
        <footer className="chatbar">
          <div className="chatbar-username" onBlur= {this.onNameUpdate} contentEditable suppressContentEditableWarning={ true }>{this.state.username}</div>
          <div className="chatbar-message textarea" onBlur= {this.onContent} contentEditable suppressContentEditableWarning={ true } data-text="Enter message here">{this.state.content}</div>
          <button className="chatbar-button" onClick={ this.onPost } >MESSAGE</button>
        </footer>
    );
  }
}

export default ChatBar;