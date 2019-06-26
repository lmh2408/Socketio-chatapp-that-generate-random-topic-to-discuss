class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class='home homeFadeIn'>
        <div>
          <span>Discuss a random topic with internet strangers</span>
        </div>

        <div>
          <button onClick={this.props.joinRoom}>Get started</button>
        </div>

        <div>
          <a href="https://github.com/lmh2408/Socketio-chatapp-that-generate-random-topic-to-discuss">
            <img src="/images/GitHub-Mark-White.svg" alt="Github"/>
          </a>
        </div>
      </div>
    );
  }
}
