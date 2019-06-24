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
        this.setState({ display: 'home' });
      });
    });

    socket.on('disconnect', (reason)=>{
      this.setState({ display: 'home' });
      if (reason === 'io server disconnect') {
        socket.connect();
      }
    });
  }

  joinRoom = ()=>{
    // play animation (1 sec)
    document.body.style.animationPlayState = 'running';
    // console.log(document.body.style.animationPlayState);
    var home = document.querySelector('#home');
    home.style.animation = 'homeFadeOut 1s forwards';

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
    if (this.state.display == 'home') {
      return (
        <Home
          joinRoom={this.joinRoom}/>
      );
    }
    else if (this.state.display == 'waiting') {
      return (
        <Wait
          found={this.state.found}
          word={this.state.word}
          goToRoom={this.goToRoom}/>
      );
    }
    else if (this.state.display == 'talking') {
      return (
        <Chat
          word={this.state.word}/>
      );
    }
  }
}

ReactDOM.render(<Root />, document.querySelector('#root'));
