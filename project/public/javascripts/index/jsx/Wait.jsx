var waitLoadingdots;
var foundCountTo1;
class Wait extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: '.',
      count: 3,
      countFired: false,
    }
  }

  componentDidMount() {
    function addDot(state) {
      var dots = state.dots;
      if (dots.length >= 3) {
        dots = '.';
      }
      else {
        dots = dots + '.';
      }
      return { dots: dots };
    }

    waitLoadingdots = setInterval(()=>{
      this.setState((state)=>{return addDot(state);});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(waitLoadingdots);
  }

  countDown = ()=>{
    if ( this.state.countFired == true ) return;

    function countTo1(state, toRoom) {
      var count = state.count;
      if (count <= 0) {
        clearInterval(foundCountTo1);
        toRoom();
      }
      else {
        if (count == 1) {
          document.querySelector('.wait').classList.add('disappearFadeOut');
          document.querySelector('#foundTagline').classList.add('disappearFadeOut');
        }
        count = count - 1
      }
      return { count: count };
    }

    foundCountTo1 = setInterval(()=>{
      this.setState((state)=>{return countTo1(state, this.props.goToRoom);});
    }, 1500);

    // ensure setInterval fired only once
    this.setState({countFired: true});
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

      let text = <p>Looking for other person{this.state.dots}</p>;
      waitTagline = <div id="waitTagline">{text}</div>;
    }
    else {
      textCircle = 'Found!';

      let text = <p>Random topic of the day</p>;
      let generatedWord = <p>{this.props.word}</p>;
      let countToRoom = <p>Initiating conversation in {this.state.count}{this.state.dots}</p>;
      waitTagline = <div id="foundTagline">{text}{generatedWord}{countToRoom}</div>;

      let newAnimation = 'foundGreenPulse 2s ease-out forwards';
      document.querySelector('#waitCircle').style.animation = newAnimation;

    }


    return (
      <React.Fragment>
        <div className="wait">
          <div>
            <span>{textCircle}</span>
          </div>
          <svg width="200" height="200">
            <circle id="waitCircle" cx="100" cy="100" r="70"/>
          </svg>
        </div>
        {waitTagline}
      </React.Fragment>
    );
  }
}
