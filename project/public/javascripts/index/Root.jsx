class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'home', // 'home', 'waiting', 'intermission', 'talking', 'disconnect'
      word: '',
      found: false,
    };
  }

  componentDidMount() {
    socket.on('goToRoom', (data)=>{
      socket.emit('pairing', {room: data.room}, ()=>{
        this.setState({ found: true, word: data.word });
      });
    });

    socket.on('partnerDisconnected', ()=>{
      socket.emit('leaveRoom', ()=>{
        this.setState({ display: 'disconnect' });
      });
    });

    socket.on('disconnect', (reason)=>{
      this.setState({ display: 'disconnect' });
      socket.disconnect();

    });
  }

  joinRoom = ()=>{
    document.body.classList.add('bodyAnimation');
    var home = document.querySelector('.home');
    home.classList.add('homeFadeOut');

    // emit socket when animation end
    home.addEventListener('animationend', ()=>{
      home.style.display = 'none';
      socket.emit('joinRoom', (response)=>{
        if (response) {
          if (response == 'wait') {
            this.setState({ display: 'waiting' });
          }
          else {
            console.log(response);
          }
        }
      });
    });
  };

  goToRoom = ()=>{
    this.setState({display: 'talking'});
  };

  render() {
    var status = this.state.display;
    if ( status == 'home') {
      return (
        <Home
          joinRoom={this.joinRoom}/>
      );
    }
    else if (status == 'waiting') {
      return (
        <Wait
          found={this.state.found}
          word={this.state.word}
          goToRoom={this.goToRoom}/>
      );
    }
    else if (status == 'talking') {
      return (
        <Chat
          word={this.state.word}/>
      );
    }
    else if (status == 'disconnect') {
      return (
        <Disconnect />
      );
    }
  }
}

ReactDOM.render(<Root />, document.querySelector('#root'));
