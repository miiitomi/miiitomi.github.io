import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      man_number: 1,
      woman_number: 1,
      name: false,
    };

    this.handleChangeManNumber = this.handleChangeManNumber.bind(this);
    this.handleChangeWomanNumber = this.handleChangeWomanNumber.bind(this);
    this.determinateNumber = this.determinateNumber.bind(this);
  }

  handleChangeManNumber(event) {
    this.setState({man_number: event.target.value});
  }

  handleChangeWomanNumber(event) {
    this.setState({woman_number: event.target.value});
  }

  determinateNumber() {
    this.setState({name: true});
  }

  render() {
    console.log(this.state);
    return (
      <>
        <p>男性側・女性側それぞれの人数を入力してください。</p>
        <InputGroup size="lg">
          <InputGroup.Text>男性側人数</InputGroup.Text>
          <FormControl
            type="number"
            value={this.state.man_number}
            onChange={this.handleChangeManNumber}
            disabled={this.state.name}
          />
        </InputGroup>
        <InputGroup size="lg">
          <InputGroup.Text>女性側人数</InputGroup.Text>
          <FormControl
            type="number"
            value={this.state.woman_number}
            onChange={this.handleChangeWomanNumber}
            disabled={this.state.name}
          />
        </InputGroup>
        <p/>
        <Button
          variant="primary"
          size='lg'
          onClick={this.determinateNumber}
          disabled={this.state.name}
        >
          確定
        </Button>

      </>
    );
  }
}
