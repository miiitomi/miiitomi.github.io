import React from 'react';
import FormCheck from 'react-bootstrap/FormCheck'
import Button from 'react-bootstrap/Button'

export default class Option extends React.Component {
    render() {
        return (
            <>
            <p>実行するアルゴリズムを選択してください。</p>
            <FormCheck
            id='man_proposing_check'
            label='男性側提案DA'
            checked={this.props.man_proposing}
            onChange={() => this.props.onClickOption(true)}
            disabled={this.props.determinate_option}
            />
            <FormCheck
            id='woman_proposing_check'
            label='女性側提案DA'
            checked={!this.props.man_proposing}
            onChange={() => this.props.onClickOption(false)}
            disabled={this.props.determinate_option}
            />
            <Button
            variant='primary'
            onClick={this.props.determinateOption}
            disabled={this.props.determinate_option}
            >
                確定
            </Button>
            {
                this.props.determinate_option &&
                <Button variant='success' onClick={this.props.reverseToOption}>
                    ここからやり直す
                </Button>
            }
            </>
        );
    }
}
