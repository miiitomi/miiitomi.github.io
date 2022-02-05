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
            <p>各女性の名前またはニックネームを入力してください。</p>
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
            this.props.determinate_woman_name &&
            <Button variant='secondary' onClick={this.props.reverseToWomanName}>ここからやり直す</Button>
        }
        {
            this.props.woman_name_error === 1 && 
            <ul>
                <li>名前は記号・数字・空白を含まない10文字以下の文字列にしてください。</li>
            </ul>
        }
        {
            this.props.woman_name_error === 2 && 
            <ul>
                <li>名前は重複のないようにしてください。</li>
            </ul>
        }
        {
            this.props.woman_name_error === 3 && 
            <ul>
                <li>名前は男性・女性通じて重複のないようにしてください。</li>
            </ul>
        }
        </div>
        );
    }
}
