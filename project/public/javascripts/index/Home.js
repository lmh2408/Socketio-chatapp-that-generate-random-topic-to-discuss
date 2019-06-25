class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("div", {
      class: "home homeFadeIn"
    }, React.createElement("div", null, React.createElement("span", null, "Discuss a random topic with internet strangers")), React.createElement("div", null, React.createElement("button", {
      onClick: this.props.joinRoom
    }, "Get started")), React.createElement("div", null, React.createElement("img", {
      src: "/images/GitHub-Mark-White.svg",
      alt: "Github"
    })));
  }

}