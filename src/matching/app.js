import React from 'react';
import Number from './number';
import ManName from './man_name';
import WomanName from './woman_name';
import Pref from './pref';

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
      determinate_man_name: false,
      determinate_woman_name: false,
      man_name_error: 0,
      woman_name_error: 0,
      man_pref_state: [],
      woman_pref_state: [],
      man_pref_list: [],
      woman_pref_list: [],
      determinate_pref: false,
    };

    this.handleChangeManNumber = this.handleChangeManNumber.bind(this);
    this.handleChangeWomanNumber = this.handleChangeWomanNumber.bind(this);
    this.determinateNumber = this.determinateNumber.bind(this);
    this.reverseToNumber = this.reverseToNumber.bind(this);
    this.handleChangeManName = this.handleChangeManName.bind(this);
    this.determinateManName = this.determinateManName.bind(this);
    this.reverseToManName = this.reverseToManName.bind(this);
    this.handleChangeWomanName = this.handleChangeWomanName.bind(this);
    this.determinateWomanName = this.determinateWomanName.bind(this);
    this.reverseToWomanName = this.reverseToWomanName.bind(this);
    this.onClickPref = this.onClickPref.bind(this);
    this.addPref = this.addPref.bind(this);
    this.backPref = this.backPref.bind(this);
    this.confirmPref = this.confirmPref.bind(this);
    this.determinatePref = this.determinatePref.bind(this);
    this.reverseToPref = this.reverseToPref.bind(this);
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
      number_error: false,
      man_name_list: [],
      woman_name_list: [],
      determinate_man_name: false,
      determinate_woman_name: false,
      man_name_error: false,
      woman_name_error: false,
    })
  }

  handleChangeManName(event) {
    let man_name_list = this.state.man_name_list;
    let i = parseInt(event.target.name, 10);
    man_name_list[i] = event.target.value;
    this.setState({man_name_list: man_name_list});
  }

  determinateManName() {
    let error_code = manNameListValidation(this.state.man_name_list);
    if (error_code === 0) {
      this.setState({
        determinate_man_name: true,
        man_name_error: error_code
      });
    } else {
      this.setState({man_name_error: error_code});
    }
  }

  reverseToManName() {
    this.setState({
      determinate_man_name: false,
      determinate_woman_name: false,
      man_name_error: false,
      woman_name_error: false,
    });
  }

  handleChangeWomanName(event) {
    let woman_name_list = this.state.woman_name_list;
    let i = parseInt(event.target.name, 10);
    woman_name_list[i] = event.target.value;
    this.setState({woman_name_list: woman_name_list});
  }

  determinateWomanName() {
    let error_code = womanNameListValidation(this.state.man_name_list, this.state.woman_name_list)
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
        determinate_woman_name: true,
        woman_name_error: error_code,
        man_pref_list: man_pref_list_copy,
        woman_pref_list: woman_pref_list_copy,
        man_pref_state: Array(parseInt(this.state.man_number, 10)).fill(0),
        woman_pref_state: Array(parseInt(this.state.woman_number, 10)).fill(0),
        determinate_pref: false,
      });
    } else {
      this.setState({woman_name_error: error_code});
    }
  }

  reverseToWomanName() {
    this.setState({
      determinate_woman_name: false,
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
    this.setState({determinate_pref: false});
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
            <ManName
              man_name_list={this.state.man_name_list}
              determinate_man_name={this.state.determinate_man_name}
              handleChangeManName={this.handleChangeManName}
              determinateManName={this.determinateManName}
              man_name_error={this.state.man_name_error}
              reverseToManName={this.reverseToManName}
            />
          </>
        }
        {
          this.state.determinate_man_name && 
          <>
          <br/>
            <WomanName
              woman_name_list={this.state.woman_name_list}
              determinate_woman_name={this.state.determinate_woman_name}
              handleChangeWomanName={this.handleChangeWomanName}
              determinateWomanName={this.determinateWomanName}
              woman_name_error={this.state.woman_name_error}
              reverseToWomanName={this.reverseToWomanName}
            />
          </>
        }
        {
          this.state.determinate_woman_name &&
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
      </>
    );
  }
}

function nameValidation(str) {
  let reg = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んーァ-ヶｰｱ-ﾝﾞﾟｰ\u4E00-\u9FFF\u3005-\u3007]+$/i;
  if (!reg.test(str)) return false;
  return (str.length <= 10);
}

function manNameListValidation(man_name_list) {
  for (let str of man_name_list) {
    if (!nameValidation(str)) {
      return 1;
    }
  }
  let name_set = new Set(man_name_list);
  if (man_name_list.length != name_set.size) {
    return 2;
  }
  return 0;
}

function womanNameListValidation(man_name_list, woman_name_list) {
  for (let str of woman_name_list) {
    if (!nameValidation(str)) {
      return 1;
    }
  }
  let name_set = new Set(woman_name_list);
  if (woman_name_list.length != name_set.size) {
    return 2;
  }

  for (let man_name of man_name_list) {
    name_set.add(man_name);
  }
  if (name_set.size != man_name_list.length + woman_name_list.length) {
    return 3;
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
