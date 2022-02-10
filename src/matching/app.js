import React from 'react';
import Number from './number';
import Name from './name';
import Pref from './pref';
import Option from './option';
import Button from 'react-bootstrap/Button';
import daAlgorithm from './da_algorithm';
import Result from './result';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      man_number: 1,
      woman_number: 1,
      determinate_number: false,
      number_error: false,
      man_name_list: [],
      woman_name_list: [],
      determinate_name: false,
      name_error: 0,
      man_pref_state: [],
      woman_pref_state: [],
      man_pref_list: [],
      woman_pref_list: [],
      determinate_pref: false,
      man_proposing: true,
      determinate_option: false,
      matching: [],
      done_matching: false,
    };

    this.handleChangeManNumber = this.handleChangeManNumber.bind(this);
    this.handleChangeWomanNumber = this.handleChangeWomanNumber.bind(this);
    this.determinateNumber = this.determinateNumber.bind(this);
    this.reverseToNumber = this.reverseToNumber.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.determinateName = this.determinateName.bind(this);
    this.reverseToName = this.reverseToName.bind(this);
    this.onClickPref = this.onClickPref.bind(this);
    this.addPref = this.addPref.bind(this);
    this.backPref = this.backPref.bind(this);
    this.confirmPref = this.confirmPref.bind(this);
    this.determinatePref = this.determinatePref.bind(this);
    this.reverseToPref = this.reverseToPref.bind(this);
    this.onClickOption = this.onClickOption.bind(this);
    this.determinateOption = this.determinateOption.bind(this);
    this.reverseToOption = this.reverseToOption.bind(this);
    this.runAlgorithm = this.runAlgorithm.bind(this);
  }

  handleChangeManNumber(event) {
    this.setState({man_number: event.target.value});
  }

  handleChangeWomanNumber(event) {
    this.setState({woman_number: event.target.value});
  }

  determinateNumber() {
    if (this.state.man_number >= 1 && this.state.woman_number >= 1) {
      this.setState({
        determinate_number: true,
        number_error: false,
        man_name_list: Array(parseInt(this.state.man_number, 10)).fill(""),
        woman_name_list: Array(parseInt(this.state.woman_number, 10)).fill(""),
      });
    } else {
      this.setState({number_error: true});
    }
  }

  reverseToNumber() {
    this.setState({
      determinate_number: false,
      determinate_name: false,
      determinate_pref: false,
      determinate_option: false,
      done_matching: false,
      number_error: false,
      man_name_list: [],
      woman_name_list: [],
      man_name_error: false,
      woman_name_error: false,
    })
  }

  handleChangeName(event, is_man) {
    if (is_man) {
      const man_name_list = this.state.man_name_list;
      const i = parseInt(event.target.name, 10);
      man_name_list[i] = event.target.value;
      this.setState({man_name_list: man_name_list});
    } else {
      const woman_name_list = this.state.woman_name_list;
      const i = parseInt(event.target.name, 10);
      woman_name_list[i] = event.target.value;
      this.setState({woman_name_list: woman_name_list});
    }
  }

  determinateName() {
    let error_code = nameListValidation(this.state.man_name_list, this.state.woman_name_list);
    if (error_code === 0) {
      const man_pref_list_copy = [];
      const woman_pref_list_copy = [];
      for (let i = 0; i < this.state.man_number; i++) {
        man_pref_list_copy.push([]);
      }
      for (let i = 0; i < this.state.woman_number; i++) {
        woman_pref_list_copy.push([]);
      }
      this.setState({
        determinate_name: true,
        name_error: error_code,
        man_pref_list: man_pref_list_copy,
        woman_pref_list: woman_pref_list_copy,
        man_pref_state: Array(parseInt(this.state.man_number, 10)).fill(0),
        woman_pref_state: Array(parseInt(this.state.woman_number, 10)).fill(0),
        determinate_pref: false,
      });
    } else {
      this.setState({name_error: error_code});
    }
  }

  reverseToName() {
    this.setState({
      determinate_name: false,
      determinate_pref: false,
      determinate_option: false,
      done_matching: false,
    });
  }

  onClickPref(self_idx, is_man) {
    if (is_man) {
      const man_pref_state_copy = this.state.man_pref_state.slice();
      man_pref_state_copy[self_idx] = 1;
      this.setState({man_pref_state: man_pref_state_copy});
      if (this.state.man_pref_state[self_idx] == 2) {
        const man_pref_list_copy = this.state.man_pref_list.slice();
        man_pref_list_copy[self_idx] = [];
        this.setState({man_pref_list: man_pref_list_copy});
      }
    } else {
      const woman_pref_state_copy = this.state.woman_pref_state.slice();
      woman_pref_state_copy[self_idx] = 1;
      this.setState({woman_pref_state: woman_pref_state_copy});
      if (this.state.woman_pref_state[self_idx] == 2) {
        const woman_pref_list_copy = this.state.woman_pref_list.slice();
        woman_pref_list_copy[self_idx] = [];
        this.setState({woman_pref_list: woman_pref_list_copy});
      }
    }
  }

  addPref(self_idx, choose_idx, is_man) {
    if (is_man) {
      if (choose_idx === -1) {
        const man_pref_state_copy = this.state.man_pref_state.slice();
        man_pref_state_copy[self_idx] = 3;
        this.setState({man_pref_state: man_pref_state_copy});    
      } else {
        const man_pref_list_copy = this.state.man_pref_list.slice();
        man_pref_list_copy[self_idx].push(choose_idx);
        this.setState({man_pref_list: man_pref_list_copy});
        if (man_pref_list_copy[self_idx].length == this.state.woman_number) {
          const man_pref_state_copy = this.state.man_pref_state.slice();
          man_pref_state_copy[self_idx] = 3;
          this.setState({man_pref_state: man_pref_state_copy});
        }
      }
    } else {
      if (choose_idx === -1) {
        const woman_pref_state_copy = this.state.woman_pref_state.slice();
        woman_pref_state_copy[self_idx] = 3;
        this.setState({woman_pref_state: woman_pref_state_copy});
      } else {
        const woman_pref_list_copy = this.state.woman_pref_list.slice();
        woman_pref_list_copy[self_idx].push(choose_idx);
        this.setState({woman_pref_list: woman_pref_list_copy});
        if (woman_pref_list_copy[self_idx].length == this.state.man_number) {
          const woman_pref_state_copy = this.state.woman_pref_state.slice();
          woman_pref_state_copy[self_idx] = 3;
          this.setState({woman_pref_state: woman_pref_state_copy});
        }
      }
    }
  }

  backPref(self_idx, is_man) {
    if (is_man) {
      if (this.state.man_pref_list[self_idx].length >= 1) {
        const man_pref_list_copy = this.state.man_pref_list.slice();
        man_pref_list_copy[self_idx].pop();
        this.setState({man_pref_list: man_pref_list_copy});
      }
      const man_pref_state_copy = this.state.man_pref_state.slice();
      man_pref_state_copy[self_idx] = 1;
      this.setState({man_pref_state: man_pref_state_copy});
    } else {
      if (this.state.woman_pref_list[self_idx].length >= 1) {
        const woman_pref_list_copy = this.state.woman_pref_list.slice();
        woman_pref_list_copy[self_idx].pop();
        this.setState({woman_pref_list: woman_pref_list_copy});
      }
      const woman_pref_state_copy = this.state.woman_pref_state.slice();
      woman_pref_state_copy[self_idx] = 1;
      this.setState({woman_pref_state: woman_pref_state_copy});
    }
  }

  confirmPref(self_idx, is_man) {
    if (is_man) {
      const man_pref_state_copy = this.state.man_pref_state.slice();
      man_pref_state_copy[self_idx] = 2;
      this.setState({man_pref_state: man_pref_state_copy});
    } else {
      const woman_pref_state_copy = this.state.woman_pref_state.slice();
      woman_pref_state_copy[self_idx] = 2;
      this.setState({woman_pref_state: woman_pref_state_copy});
    }
  }

  determinatePref() {
    this.setState({determinate_pref: true});
  }

  reverseToPref() {
    this.setState({
      determinate_pref: false,
      determinate_option: false,
      done_matching: false,
    });
  }

  onClickOption(is_man) {
    this.setState({man_proposing: is_man});
  };

  determinateOption() {
    this.setState({determinate_option: true});
  }

  reverseToOption() {
    this.setState({
      determinate_option: false,
      done_matching: false,
    });
  }

  runAlgorithm() {
    const _matching = daAlgorithm(
      this.state.man_pref_list,
      this.state.woman_pref_list,
      this.state.man_proposing
    );
    this.setState({
      done_matching: true,
      matching: _matching
    });
  }

  render() {
    let able_pref = ablePref(this.state.man_pref_state, this.state.woman_pref_state);
    let able_determinate_pref = ableDeterminatePref(this.state.man_pref_state, this.state.woman_pref_state);

    return (
      <>
        <Number
          man_number={this.state.man_number}
          woman_number={this.state.woman_number}
          determinate_number={this.state.determinate_number}
          number_error={this.state.number_error}
          handleChangeManNumber={this.handleChangeManNumber}
          handleChangeWomanNumber={this.handleChangeWomanNumber}
          determinateNumber={this.determinateNumber}
          reverseToNumber={this.reverseToNumber}
        />
        {
          this.state.determinate_number && 
          <>
          <br/>
            <Name
              man_name_list={this.state.man_name_list}
              woman_name_list={this.state.woman_name_list}
              determinate_name={this.state.determinate_name}
              handleChangeName={(event, is_man) => this.handleChangeName(event, is_man)}
              determinateName={this.determinateName}
              name_error={this.state.name_error}
              reverseToName={this.reverseToName}
            />
          </>
        }
        {
          this.state.determinate_name &&
          <>
            <br/>
            <Pref
              man_name_list={this.state.man_name_list}
              woman_name_list={this.state.woman_name_list}
              man_pref_state={this.state.man_pref_state}
              woman_pref_state={this.state.woman_pref_state}
              man_pref_list={this.state.man_pref_list}
              woman_pref_list={this.state.woman_pref_list}
              onClickPref={(self_idx, is_man) => this.onClickPref(self_idx, is_man)}
              able_pref={able_pref}
              addPref={
                (self_idx, choose_idx, is_man) =>
                this.addPref(self_idx, choose_idx, is_man)
              }
              backPref={
                (self_idx, is_man) =>
                this.backPref(self_idx, is_man)
              }
              confirmPref={
                (self_idx, is_man) =>
                this.confirmPref(self_idx, is_man)
              }
              determinatePref={() => this.determinatePref()}
              reverseToPref={() => this.reverseToPref()}
              determinate_pref={this.state.determinate_pref}
              able_determinate_pref={able_determinate_pref}
            />
          </>
        }
        {
          this.state.determinate_pref && 
          <>
            <br/>
            <br/>
            <Option
            man_proposing={this.state.man_proposing}
            onClickOption={(is_man) => this.onClickOption(is_man)}
            determinate_option={this.state.determinate_option}
            determinateOption={this.determinateOption}
            reverseToOption={this.reverseToOption}
            />
          </>
        }
        {
          this.state.determinate_option &&
          <>
            <br/>
            <br/>
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={this.runAlgorithm}
                disabled={this.state.done_matching}
              >
                マッチングを実行する
              </Button>
            </div>
          </>
        }
        {
          this.state.done_matching &&
          <>
            <br/>
            <Result
            matching={this.state.matching}
            man_name_list={this.state.man_name_list}
            woman_name_list={this.state.woman_name_list}
            />
          </>
        }
      </>
    );
  }
}

function nameValidation(str) {
  const reg = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んーァ-ヶｰｱ-ﾝﾞﾟｰ\u4E00-\u9FFF\u3005-\u3007]+$/i;
  if (!reg.test(str)) return false;
  return (str.length <= 10);
}

function nameListValidation(man_name_list, woman_name_list) {
  for (const str of man_name_list) {
    if (!nameValidation(str)) {
      return 1;
    }
  }
  for (const str of woman_name_list) {
    if (!nameValidation(str)) {
      return 1;
    }
  }
  const name_set = new Set(man_name_list);
  woman_name_list.map((woman_name) => {
    name_set.add(woman_name);
  })
  if (name_set.size != man_name_list.length + woman_name_list.length) {
    return 2;
  }
  return 0;
}

function ablePref(man_pref_state, woman_pref_state) {
  if (man_pref_state.length === 0 && woman_pref_state === 0) return false;
  for (let s of man_pref_state) {
    if (s != 0 && s != 2) return false;
  }
  for (let s of woman_pref_state) {
    if (s != 0 && s != 2) return false;
  }
  return true;
}

function ableDeterminatePref(man_pref_state, woman_pref_state) {
  if (man_pref_state.length === 0 && woman_pref_state === 0) return false;
  for (let s of man_pref_state) {
    if (s != 2) return false;
  }
  for (let s of woman_pref_state) {
    if (s != 2) return false;
  }
  return true;
}
