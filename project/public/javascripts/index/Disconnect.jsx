class Disconnect extends React.Component {
  render() {
    return (
      <div className="disconnect">
        <span>You or the other has disconnected</span>
        <div>
          <a href="/"><button>Reset this page</button></a>
        </div>
      </div>
    );
  }
}
