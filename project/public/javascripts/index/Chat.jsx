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

      var msgClass;
      if (msglist[i].sender == 'self') {
        msgClass = 'chatMsgSelf'
      }
      else {
        msgClass = 'chatMsgOther'
      }

      var msg = <p>{ msglist[i].message }</p>;

      var html = <div className={msgClass} id={i}>{msg}</div>;
      msgArray.push(html);

    }

    return(
      <div className="chat">
        <div>
          <span>{this.props.word}</span>
        </div>

        <div>
          {msgArray}
        </div>

        <div>
          <form action="" onSubmit={this.sendMessage}>
            <textarea value={this.state.input} onChange={this.handleInput}></textarea>
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>


    );
  }
}
