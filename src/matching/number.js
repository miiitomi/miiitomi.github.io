import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default class Number extends React.Component {
  render() {
    return (
      <div id='number'>
        <p>参加する男性・女性の人数をそれぞれ入力してください。</p>
        <InputGroup size="lg">
        <InputGroup.Text>男性の人数</InputGroup.Text>
          <FormControl
            type="number"
            value={this.props.man_number}
            onChange={this.props.handleChangeManNumber}
            disabled={this.props.determinate_number}
          />
        </InputGroup>
        <InputGroup size="lg">
          <InputGroup.Text>女性の人数</InputGroup.Text>
          <FormControl
            type="number"
            value={this.props.woman_number}
            onChange={this.props.handleChangeWomanNumber}
            disabled={this.props.determinate_number}
          />
        </InputGroup>
        <p/>
        {
          !this.props.determinate_number &&
        <Button
          variant="primary"
          onClick={this.props.determinateNumber}
          disabled={this.props.determinate_number}
        >
          確定
        </Button>
        }
        {
          this.props.determinate_number &&
          <Button variant='success' onClick={this.props.reverseToNumber}>ここからやり直す</Button>
        }
        {this.props.number_error && <ul><li>男性側・女性側人数はどちらも 1 以上にしてください。</li></ul>}
      </div>
    );
  }
}
