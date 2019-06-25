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
          <img src="/images/GitHub-Mark-White.svg" alt="Github"/>
        </div>
      </div>
    );
  }
}
