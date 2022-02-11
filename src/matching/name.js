import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

class NameForm extends React.Component {
    render() {
        return (
        <InputGroup size="lg">
            <InputGroup.Text>{(this.props.is_man ? "男性" : "女性") + (1 + this.props.i)}人目</InputGroup.Text>
            <FormControl
            type='text'
            name={this.props.i}
            value={this.props.agent_name}
            placeholder={(this.props.is_man ? "男性" : "女性")+ (1+ this.props.i) + "人目の名前"}
            onChange={this.props.handleChangeName}
            disabled={this.props.disabled}
            />
        </InputGroup>
        );
    }
}

export default class Name extends React.Component {
    render() {
        const man_name_form_list = this.props.man_name_list.map((man_name, idx) =>
                <NameForm
                key={idx}
                agent_name={man_name}
                i={idx}
                handleChangeName={(event) => this.props.handleChangeName(event, true)}
                disabled={this.props.determinate_name}
                is_man={true}
                />);

        const woman_name_form_list = this.props.woman_name_list.map((woman_name, idx) =>
                <NameForm
                key={idx}
                agent_name={woman_name}
                i={idx}
                handleChangeName={(event) => this.props.handleChangeName(event, false)}
                disabled={this.props.determinate_name}
                is_man={false}
                />);

        return (
        <div id="man_name">
            <p>各参加者の名前またはニックネームを入力してください。</p>
            <p/>
            {man_name_form_list}
            <p/>
            {woman_name_form_list}
            <p/>
            {
                !this.props.determinate_name &&
                <Button
                variant='primary'
                onClick={this.props.determinateName}
                size='lg'
                disabled={this.props.determinate_name}
                >確定</Button>
            }
            {
                this.props.determinate_name && 
                <Button variant='success' onClick={this.props.reverseToName}>ここからやり直す</Button>
            }
            {
                this.props.name_error == 1 && 
                <ul>
                    <li>名前は記号・数字・空白を含まない10文字以下の文字列にしてください。</li>
                </ul>
            }
            {
                this.props.name_error == 2 && 
                <ul>
                    <li>名前は重複のないようにしてください。</li>
                </ul>
            }
        </div>
        );
    }
}
