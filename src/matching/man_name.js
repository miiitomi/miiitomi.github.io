import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

class ManNameForm extends React.Component {
    render() {
        return (
        <InputGroup size="lg">
            <InputGroup.Text>{1 + this.props.i}人目</InputGroup.Text>
            <FormControl
            type='text'
            name={this.props.i}
            value={this.props.man_name}
            placeholder={1 + this.props.i + "人目の男性の名前"}
            onChange={this.props.handleChangeManName}
            disabled={this.props.disabled}
            />
        </InputGroup>
        );
    }
}

export default class ManName extends React.Component {
    render() {
        const form_list = this.props.man_name_list.map((man_name, idx) =>
                <ManNameForm
                key={idx}
                man_name={man_name}
                i={idx}
                handleChangeManName={this.props.handleChangeManName}
                disabled={this.props.determinate_man_name}
                />);
        return (
        <div id="man_name">
            <p>各男性の名前またはニックネームを記入してください。</p>
            <p/>
            {form_list}
            <p/>
            <Button
            variant='primary'
            onClick={this.props.determinateManName}
            size='lg'
            disabled={this.props.determinate_man_name}
            >確定</Button>
            {
                this.props.man_name_error && 
                <ul>
                    <li>名前は記号・数字・空白を含まず、かつ重複のないようにしてください。</li>
                </ul>
            }
        </div>
        );
    }
}
