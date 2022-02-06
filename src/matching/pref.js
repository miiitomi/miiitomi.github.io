import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class PrefEach extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}さん</td>
                { this.props.state === 0 &&
                    <td>
                        <Button
                        variant='primary'
                        onClick={() => this.props.onClickManPref(this.props.i)}
                        >
                            入力する
                        </Button>
                    </td>
                }
                { this.props.state === 2 &&
                    <td>
                        <Button
                        variant='primary'
                        onClick={() => this.props.onClickManPref(this.props.i)}
                        >
                            やり直す
                        </Button>
                    </td>
                }
            </tr>
        );
    }
}

export default class Pref extends React.Component {

    render() {
        const pref_list = this.props.man_name_list.map((man_name, idx) =>
            <PrefEach
                key={idx}
                i={idx}
                name={man_name}
                state={this.props.man_pref_state[idx]}
                onClickManPref={(i) => this.props.onClickManPref(i)}
            />
        );

        return (
            <>
                <p>各参加者の希望順位を入力してください。</p>
                <Table >
                    <tbody>
                        {pref_list}
                    </tbody>
                </Table>
            </>
        );
    }
}
