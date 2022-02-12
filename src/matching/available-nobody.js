import React from "react";
import FormCheck from 'react-bootstrap/FormCheck'
import Button from 'react-bootstrap/Button'

export default class AvailableNobody extends React.Component {
    render() {
        return (
            <>
                <p>「誰も希望しない」という選択肢を有効にしますか。（無効にした場合、男性は {this.props.woman_number} 番目まで、女性は {this.props.man_number} 番目まで希望順位を入力する必要があります。）</p>
                <FormCheck
                id='man_proposing_check'
                label='有効にする'
                checked={this.props.available_nobody}
                onChange={() => this.props.onClickAvailableNobody(true)}
                disabled={this.props.determinate_available_nobody}
                />
                <FormCheck
                id='man_proposing_check'
                label='無効にする'
                checked={!this.props.available_nobody}
                onChange={() => this.props.onClickAvailableNobody(false)}
                disabled={this.props.determinate_available_nobody}
                />
                {
                    !this.props.determinate_available_nobody && 
                    <Button
                    variant='primary'
                    onClick={this.props.determinateAvailableNobody}
                    disabled={this.props.determinate_available_nobody}
                    >
                        確定
                    </Button>
                }
                {
                    this.props.determinate_available_nobody &&
                    <Button
                    variant="success"
                    onClick={this.props.reverseToAvailableNobody}
                    >ここからやり直す</Button>
                }
            </>
        );
    }    
}
