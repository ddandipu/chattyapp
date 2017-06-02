import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const notifications = this.props.notifications;
    const messages = this.props.messages.map(message => {
      return <Message
        key = {message.id}
        username =  {message.username}
        content = {message.content}
        notifications = {notifications}
        />
    });


    return (
      <div>
        <div className="active-users"> Last msg sent to : {this.props.usercount} users </div>
        <section className="messages">
        {messages}
        </section>
        <div className="message system"> {this.props.notifications} </div>
      </div>
    );
  }
}

export default MessageList;
