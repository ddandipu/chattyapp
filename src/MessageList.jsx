import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const array = this.props.array.map(singlearray => {
      return <Message
        key = {singlearray.id}
        user= {singlearray.username}
        content={singlearray.content} />
    });


    return (
      <section className="array">
        {array}
      </section>
    );
  }
}

export default MessageList;
