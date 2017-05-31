import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages.map((message, index) => {
      return <Message
        key = {index}
        username =  {message.username}
        content = {message.content} />
    });


    return (
      <section className="messages">
      {messages}
      </section>
    );
  }
}

export default MessageList;
