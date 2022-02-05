import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

class WomanNameForm extends React.Component {
    render() {
        return (
        <InputGroup size="lg">
            <InputGroup.Text>{1 + this.props.i}人目</InputGroup.Text>
            <FormControl
            type='text'
            name={this.props.i}
            value={this.props.woman_name}
            placeholder={1 + this.props.i + "人目の女性の名前"}
            onChange={this.props.handleChangeWomanName}
            disabled={this.props.disabled}
            />
        </InputGroup>
        );
    }
}

export default class WomanName extends React.Component {
    render() {
        const form_list = this.props.woman_name_list.map((woman_name, idx) =>
                <WomanNameForm
                key={idx}
                woman_name={woman_name}
                i={idx}
                handleChangeWomanName={this.props.handleChangeWomanName}
                disabled={this.props.determinate_woman_name}
                />);
        return (
        <div id="woman_name">
            <p>女性陣の名前を記入してください。</p>
            <p/>
            {form_list}
            <p/>
            <Button
            variant='primary'
            onClick={this.props.determinateWomanName}
            size='lg'
            disabled={this.props.determinate_woman_name}
            >確定</Button>
        {
            this.props.woman_name_error && 
            <p>名前は記号・数字を含まないようにし、かつ重複のないようにしてください。</p>
        }
        </div>
        );
    }
}
