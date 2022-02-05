import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

class Number extends React.Component {
  render() {
    return (
      <div id='number'>
        <p>男性側・女性側それぞれの人数を入力してください。</p>
        <InputGroup size="lg">
          <InputGroup.Text>男性側人数</InputGroup.Text>
          <FormControl
            type="number"
            value={this.props.man_number}
            onChange={this.props.handleChangeManNumber}
            disabled={this.props.determinate_number}
          />
        </InputGroup>
        <InputGroup size="lg">
          <InputGroup.Text>女性側人数</InputGroup.Text>
          <FormControl
            type="number"
            value={this.props.woman_number}
            onChange={this.props.handleChangeWomanNumber}
            disabled={this.props.determinate_number}
          />
        </InputGroup>
        <p/>
        <Button
          variant="primary"
          onClick={this.props.determinateNumber}
          disabled={this.props.determinate_number}
        >
          確定
        </Button>
        {this.props.number_error && <ul><li>男性側・女性側人数はどちらも 1 以上にしてください。</li></ul>}
      </div>
    );
  }
}

class ManNameForm extends React.Component {
  render() {
    return (
      <FormControl
        type='text'
        name={this.props.i}
        value={this.props.man_name}
        placeholder={1 + this.props.i + "人目の男性の名前"}
        onChange={this.props.handleChangeManName}
        size='lg'
      />
    );
  }
}

class ManName extends React.Component {
  render() {
    const form_list = this.props.man_name_list.map((man_name, idx) =>
            <ManNameForm
              key={idx}
              man_name={man_name}
              i={idx}
              handleChangeManName={this.props.handleChangeManName}
            />);
    return (
      <div id="man_name">
        <p>男性陣の名前を記入してください。</p>
        <p/>
        {form_list}
      </div>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      man_number: 1,
      woman_number: 1,
      determinate_number: false,
      number_error: false,
      man_name_list: [],
      woman_name_list: [],
    };

    this.handleChangeManNumber = this.handleChangeManNumber.bind(this);
    this.handleChangeWomanNumber = this.handleChangeWomanNumber.bind(this);
    this.determinateNumber = this.determinateNumber.bind(this);
    this.handleChangeManName = this.handleChangeManName.bind(this);
  }

  handleChangeManNumber(event) {
    this.setState({man_number: event.target.value});
  }

  handleChangeWomanNumber(event) {
    this.setState({woman_number: event.target.value});
  }

  determinateNumber() {
    if (this.state.man_number >= 1 && this.state.woman_number >= 1) {
      this.setState({
        determinate_number: true,
        number_error: false,
        man_name_list: Array(parseInt(this.state.man_number, 10)).fill(""),
        woman_name_list: Array(parseInt(this.state.woman_number, 10)).fill("")
      });
    } else {
      this.setState({number_error: true});
    }
  }

  handleChangeManName(event) {
    let man_name_list = this.state.man_name_list;
    let i = parseInt(event.target.name, 10);
    man_name_list[i] = event.target.value;
    this.setState({man_name_list: man_name_list});
  }

  render() {
    console.log(this.state);
    return (
      <>
        <Number
          man_number={this.state.man_number}
          woman_number={this.state.woman_number}
          determinate_number={this.state.determinate_number}
          number_error={this.state.number_error}
          handleChangeManNumber={this.handleChangeManNumber}
          handleChangeWomanNumber={this.handleChangeWomanNumber}
          determinateNumber={this.determinateNumber}
        />
        {
          this.state.determinate_number && 
          <>
          <br/>
            <ManName
              man_name_list={this.state.man_name_list}
              handleChangeManName={this.handleChangeManName}
            />
          </>
        }
      </>
    );
  }
}
