import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class PrefForm extends React.Component {
    form() {
        const rank = this.props.pref_list.map((chosen_idx, idx) =>
            <p key={'rank'+idx}>
                第{1 + idx}希望 : {this.props.available_name_list[chosen_idx]}さん
                {
                    (idx === this.props.pref_list.length-1 && this.props.state === 1) &&
                    <Button variant='success' onClick={() => this.props.backPref()}>戻る</Button>
                }
            </p>
        );
        if (this.props.state === 3 && this.props.pref_list.length < this.props.available_name_list.length) {
            if (this.props.pref_list.length === 0) {
                rank.push(<p key='confirm'>誰も希望しない。</p>);
            } else {
                rank.push(<p key='confirm'>上記以外の方は希望しない。</p>);
            }
        }
        const buttons = [];
        if (this.props.state === 1) {
            this.props.available_name_list.forEach((name, idx) => {
                if (!this.props.pref_list.includes(idx)) {
                    buttons.push(
                        <Button
                        key={'pref-button-'+idx}
                        variant='primary'
                        onClick={() => this.props.addPref(idx)}
                        >
                            {name}さん
                        </Button>
                    );
                }
            });
            if (this.props.available_nobody) {
                buttons.push(
                    <Button
                    key='pref-button-none'
                    variant='primary'
                    onClick={() => this.props.addPref(-1)}
                    >
                        誰も希望しない
                    </Button>
                );
            }
        } else {
            buttons.push(
                <Button
                key='pref-button-confirm'
                variant='primary'
                onClick={() => this.props.confirmPref()}
                >
                    確定
                </Button>             
            );
            buttons.push(
                <Button
                    key='pref-button-back'
                    variant='success'
                    onClick={() => this.props.backPref()}>戻る</Button>
            );
        }

        return (
            <td colSpan={2}>
            {rank}
            {this.props.state === 1 && <p>第{this.props.pref_list.length + 1}希望を選んでください。</p>}
            {buttons}
            </td>
        );
    }

    render() {
        let forms;
        if (this.props.state === 1 || this.props.state === 3) {
            forms = this.form();
        }

        return (
            <>
                <tr>
                    <td><p>{this.props.name}さん</p></td>
                    { this.props.state === 0 &&
                        <td>
                            <Button
                            variant='primary'
                            onClick={() => this.props.onClickPref(this.props.i)}
                            disabled={!this.props.able_pref || this.props.determinate_pref}
                            >
                                入力する
                            </Button>
                        </td>
                    }
                    { this.props.state === 2 &&
                        <td>
                            <Button
                            variant='success'
                            onClick={() => this.props.onClickPref(this.props.i)}
                            disabled={!this.props.able_pref || this.props.determinate_pref}
                            >
                                やり直す
                            </Button>
                        </td>
                    }
                    {(this.props.state === 1 || this.props.state === 3)&& <td></td>}
                </tr>
                    {
                        (this.props.state === 1 || this.props.state === 3) &&
                        <tr>
                            {forms}
                        </tr>
                    }
            </>
        );
    }
}

export default class Pref extends React.Component {

    render() {
        const man_pref_form_list = this.props.man_name_list.map((man_name, idx) =>
            <PrefForm
                key={'man_pref_form_'+idx}
                is_man={true}
                i={idx}
                name={man_name}
                state={this.props.man_pref_state[idx]}
                available_nobody={this.props.available_nobody}
                onClickPref={(self_idx) => this.props.onClickPref(self_idx, true)}
                able_pref={this.props.able_pref}
                available_name_list={this.props.woman_name_list}
                pref_list={this.props.man_pref_list[idx]}
                addPref={(choose_idx) => this.props.addPref(idx, choose_idx, true)}
                backPref={() => this.props.backPref(idx, true)}
                confirmPref={() => this.props.confirmPref(idx, true)}
                determinate_pref={this.props.determinate_pref}
            />
        );

        const woman_pref_form_list = this.props.woman_name_list.map((woman_name, idx) =>
            <PrefForm
                key={'woman_pref_form_'+idx}
                is_man={false}
                i={idx}
                name={woman_name}
                state={this.props.woman_pref_state[idx]}
                available_nobody={this.props.available_nobody}
                onClickPref={(self_idx) => this.props.onClickPref(self_idx, false)}
                able_pref={this.props.able_pref}
                available_name_list={this.props.man_name_list}
                pref_list={this.props.woman_pref_list[idx]}
                addPref={(choose_idx) => this.props.addPref(idx, choose_idx, false)}
                backPref={() => this.props.backPref(idx, false)}
                confirmPref={() => this.props.confirmPref(idx, false)}
                determinate_pref={this.props.determinate_pref}
            />
        );

        return (
            <>
                <p>各参加者の希望順位を入力してください。</p>
                <Table>
                    <tbody>
                        {man_pref_form_list}
                    </tbody>
                </Table>
                <Table>
                    <tbody>
                        {woman_pref_form_list}
                    </tbody>
                </Table>
                {
                    !this.props.determinate_pref &&
                    <Button
                    variant='primary'
                    onClick={() => this.props.determinatePref()}
                    disabled={!this.props.able_determinate_pref || this.props.determinate_pref}
                    >
                        確定
                    </Button>
                }
                {
                    this.props.determinate_pref && 
                    <Button
                    variant='success'
                    onClick={() => this.props.reverseToPref()}
                    >
                        ここからやり直す
                    </Button>
                }
            </>
        );
    }
}
