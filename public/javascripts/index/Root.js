function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Root extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "joinRoom", () => {
      document.body.classList.add('bodyAnimation');
      var home = document.querySelector('.home');
      home.classList.add('homeFadeOut'); // emit socket when animation end

      home.addEventListener('animationend', () => {
        home.style.display = 'none';
        socket.emit('joinRoom', response => {
          if (response) {
            if (response == 'wait') {
              this.setState({
                display: 'waiting'
              });
            } else {
              console.log(response);
            }
          }
        });
      });
    });

    _defineProperty(this, "goToRoom", () => {
      this.setState({
        display: 'talking'
      });
    });

    this.state = {
      display: 'home',
      // 'home', 'waiting', 'intermission', 'talking', 'disconnect'
      word: '',
      found: false
    };
  }

  componentDidMount() {
    socket.on('goToRoom', data => {
      socket.emit('pairing', {
        room: data.room
      }, () => {
        this.setState({
          found: true,
          word: data.word
        });
      });
    });
    socket.on('partnerDisconnected', () => {
      socket.emit('leaveRoom', () => {
        this.setState({
          display: 'disconnect'
        });
      });
    });
    socket.on('disconnect', reason => {
      this.setState({
        display: 'disconnect'
      });
      socket.disconnect();
    });
  }

  render() {
    var status = this.state.display;

    if (status == 'home') {
      return React.createElement(Home, {
        joinRoom: this.joinRoom
      });
    } else if (status == 'waiting') {
      return React.createElement(Wait, {
        found: this.state.found,
        word: this.state.word,
        goToRoom: this.goToRoom
      });
    } else if (status == 'talking') {
      return React.createElement(Chat, {
        word: this.state.word
      });
    } else if (status == 'disconnect') {
      return React.createElement(Disconnect, null);
    }
  }

}

ReactDOM.render(React.createElement(Root, null), document.querySelector('#root'));