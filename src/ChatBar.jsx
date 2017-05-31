import React, {Component} from 'react';
// new
class ChatBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };

    this.onContent = this.onContent.bind(this);
    this.onPost = this.onPost.bind(this);
  }

  onContent(event) {
      this.setState({
        content: event.target.innerText
      });
  }

  onPost(event) {
    let content = this.state.content;
    this.props.onPost(content);
    content = '';
    this.setState({
      content: content
    });
  }

  render() {
    console.log("Rendering <ChatBar />");
    return (
        <section className="chatbar">
          <input className="chatbar-username" defaultValue={this.props.name} />
          <div className="chatbar-message textarea" onBlur= {this.onContent} contentEditable suppressContentEditableWarning={ true }>{this.state.content}</div>
          <button className="chatbar-button" onClick={ this.onPost } >MESSAGE</button>
        </section>
    );
  }
}

export default ChatBar;