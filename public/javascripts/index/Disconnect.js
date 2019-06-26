class Disconnect extends React.Component {
  render() {
    return React.createElement("div", {
      className: "disconnect"
    }, React.createElement("span", null, "You or the other has disconnected"), React.createElement("div", null, React.createElement("a", {
      href: "/"
    }, React.createElement("button", null, "Reset this page"))));
  }

}