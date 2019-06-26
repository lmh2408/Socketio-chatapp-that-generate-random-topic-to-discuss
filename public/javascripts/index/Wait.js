function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var waitLoadingdots;
var foundCountTo1;

class Wait extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "countDown", () => {
      if (this.state.countFired == true) return;

      function countTo1(state, toRoom) {
        var count = state.count;

        if (count <= 0) {
          clearInterval(foundCountTo1);
          toRoom();
        } else {
          if (count == 1) {
            document.querySelector('.wait').classList.add('disappearFadeOut');
            document.querySelector('#foundTagline').classList.add('disappearFadeOut');
          }

          count = count - 1;
        }

        return {
          count: count
        };
      }

      foundCountTo1 = setInterval(() => {
        this.setState(state => {
          return countTo1(state, this.props.goToRoom);
        });
      }, 1500); // ensure setInterval fired only once

      this.setState({
        countFired: true
      });
    });

    this.state = {
      dots: '.',
      count: 3,
      countFired: false
    };
  }

  componentDidMount() {
    function addDot(state) {
      var dots = state.dots;

      if (dots.length >= 3) {
        dots = '.';
      } else {
        dots = dots + '.';
      }

      return {
        dots: dots
      };
    }

    waitLoadingdots = setInterval(() => {
      this.setState(state => {
        return addDot(state);
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(waitLoadingdots);
  }

  componentDidUpdate() {
    if (this.props.found == true) {
      this.countDown();
    }
  }

  render() {
    var found = this.props.found;
    var textCircle;
    var waitTagline;

    if (found === false) {
      textCircle = 'Waiting';
      let text = React.createElement("p", null, "Looking for other person", this.state.dots);
      waitTagline = React.createElement("div", {
        id: "waitTagline"
      }, text);
    } else {
      textCircle = 'Found!';
      let text = React.createElement("p", null, "Random topic of the day");
      let generatedWord = React.createElement("p", null, this.props.word);
      let countToRoom = React.createElement("p", null, "Initiating conversation in ", this.state.count, this.state.dots);
      waitTagline = React.createElement("div", {
        id: "foundTagline"
      }, text, generatedWord, countToRoom);
      let newAnimation = 'foundGreenPulse 2s ease-out forwards';
      document.querySelector('#waitCircle').style.animation = newAnimation;
    }

    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "wait"
    }, React.createElement("div", null, React.createElement("span", null, textCircle)), React.createElement("svg", {
      width: "200",
      height: "200"
    }, React.createElement("circle", {
      id: "waitCircle",
      cx: "100",
      cy: "100",
      r: "70"
    }))), waitTagline);
  }

}