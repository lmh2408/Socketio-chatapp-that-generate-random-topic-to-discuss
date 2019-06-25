class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      input: '',
      word: '',
    }
  }

  addMessage(message, sender) {
    var msg = { sender: sender, message: message };

    this.setState((state)=>{
      var msglist = state.messages;
      msglist.push(msg);
      return {
        messages: msglist,
        input: '',
      }
    });
  }

  componentDidMount(){
    socket.on('receiveMessage', (data)=>{
      this.addMessage(data.message, 'other');
    });
  }

  handleInput = (e)=>{
    var change = e.target.value;
    this.setState({ input: change });
  };

  sendMessage = (e)=>{
    e.preventDefault();
    var message = this.state.input;
    socket.emit('sendMessage', {message: message}, ()=>{
      this.addMessage(message, 'self');
    });
  };

  render() {
    var msglist = this.state.messages;
    var msgArray = [];
    for (let i = 0, l = msglist.length; i < l; i++) {

      var msgClass = 'chatMsg chatMessageAppear ';
      var sender;
      if (msglist[i].sender == 'self') {
        msgClass += 'chatMsgSelf';
        sender = <p><b>You</b></p>;
      }
      else {
        msgClass += 'chatMsgOther';
        sender = <p><b>Other</b></p>;
      }

      var msg = <p>{ msglist[i].message }</p>;

      var html = <div className={msgClass} key={i}>{sender}{msg}</div>;
      msgArray.push(html);

    }

    return(
      <div className="chat">
        <div className='chatHeader chatHeaderSlideIn'>
          <span>{this.props.word}</span>
        </div>

        <div className='chatArray'>
          {msgArray}
        </div>

        <div className='chatSend chatSendAppear'>
          <form action="" onSubmit={this.sendMessage}>
            <textarea value={this.state.input} onChange={this.handleInput}></textarea>
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>


    );
  }
}
