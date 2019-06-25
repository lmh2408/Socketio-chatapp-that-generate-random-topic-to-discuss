function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Chat extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleInput", e => {
      var change = e.target.value;
      this.setState({
        input: change
      });
    });

    _defineProperty(this, "sendMessage", e => {
      e.preventDefault();
      var message = this.state.input;
      socket.emit('sendMessage', {
        message: message
      }, () => {
        this.addMessage(message, 'self');
      });
    });

    this.state = {
      messages: [],
      input: '',
      word: ''
    };
  }

  addMessage(message, sender) {
    var msg = {
      sender: sender,
      message: message
    };
    this.setState(state => {
      var msglist = state.messages;
      msglist.push(msg);
      return {
        messages: msglist,
        input: ''
      };
    });
  }

  componentDidMount() {
    socket.on('receiveMessage', data => {
      this.addMessage(data.message, 'other');
    });
  }

  render() {
    var msglist = this.state.messages;
    var msgArray = [];

    for (let i = 0, l = msglist.length; i < l; i++) {
      var msgClass = 'chatMsg chatMessageAppear ';
      var sender;

      if (msglist[i].sender == 'self') {
        msgClass += 'chatMsgSelf';
        sender = React.createElement("p", null, React.createElement("b", null, "You"));
      } else {
        msgClass += 'chatMsgOther';
        sender = React.createElement("p", null, React.createElement("b", null, "Other"));
      }

      var msg = React.createElement("p", null, msglist[i].message);
      var html = React.createElement("div", {
        className: msgClass,
        key: i
      }, sender, msg);
      msgArray.push(html);
    }

    return React.createElement("div", {
      className: "chat"
    }, React.createElement("div", {
      className: "chatHeader chatHeaderSlideIn"
    }, React.createElement("a", {
      href: "/"
    }, React.createElement("div", null, "x")), React.createElement("span", null, this.props.word)), React.createElement("div", {
      className: "chatArray"
    }, msgArray), React.createElement("div", {
      className: "chatSend chatSendAppear"
    }, React.createElement("form", {
      action: "",
      onSubmit: this.sendMessage
    }, React.createElement("textarea", {
      value: this.state.input,
      onChange: this.handleInput
    }), React.createElement("button", {
      type: "submit"
    }, "Send"))));
  }

}