- Flags

```jsx
class Welcome extends React.Component {
  constructor(props){
  	super(props);
    this.state={judge:false,judge1:false};
    this.changeJudge=this.changeJudge.bind(this);
    this.changeJudge1=this.changeJudge1.bind(this);
  }
  changeJudge(){
  	this.setState({judge:true,judge1:true});
  }
  changeJudge1(){
  	this.setState({judge:true,judge1:false});
  }
  render() {
    return (<div>
      {this.state.judge&&<h1>Hello, {this.props.name}</h1>}
      <h2 onClick={this.changeJudge}>44444</h2>
      {this.state.judge1&&<h2>Hello, {this.props.name}</h2>}
      <h2 onClick={this.changeJudge1}>dddesw</h2>
    </div>);
  }
}
var element = <Welcome name="luey"/>
```

```javascript
"use strict";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      judge: false,
      judge1: false
    };
    this.changeJudge = this.changeJudge.bind(this);
    this.changeJudge1 = this.changeJudge1.bind(this);
  }
  changeJudge() {
    this.setState({
      judge: true,
      judge1: true
    });
  }
  changeJudge1() {
    this.setState({
      judge: true,
      judge1: false
    });
  }
  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      null,
      this.state.judge &&
        /*#__PURE__*/ React.createElement(
          "h1",
          null,
          "Hello, ",
          this.props.name
        ),
      /*#__PURE__*/ React.createElement(
        "h2",
        {
          onClick: this.changeJudge
        },
        "44444"
      ),
      this.state.judge1 &&
        /*#__PURE__*/ React.createElement(
          "h2",
          null,
          "Hello, ",
          this.props.name
        ),
      /*#__PURE__*/ React.createElement(
        "h2",
        {
          onClick: this.changeJudge1
        },
        "dddesw"
      )
    );
  }
}
var element = /*#__PURE__*/ React.createElement(Welcome, {
  name: "luey"
});

```

