import React from 'react';
import Number from './number';
import ManName from './man_name';
import WomanName from './woman_name';

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
      man_name_error: false,
      woman_name_error: false,
    };

    this.handleChangeManNumber = this.handleChangeManNumber.bind(this);
    this.handleChangeWomanNumber = this.handleChangeWomanNumber.bind(this);
    this.determinateNumber = this.determinateNumber.bind(this);
    this.handleChangeManName = this.handleChangeManName.bind(this);
    this.determinateManName = this.determinateManName.bind(this);
    this.handleChangeWomanName = this.handleChangeWomanName.bind(this);
    this.determinateWomanName = this.determinateWomanName.bind(this);
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
        woman_name_list: Array(parseInt(this.state.woman_number, 10)).fill("")
      });
    } else {
      this.setState({number_error: true});
    }
  }

  handleChangeManName(event) {
    let man_name_list = this.state.man_name_list;
    let i = parseInt(event.target.name, 10);
    man_name_list[i] = event.target.value;
    this.setState({man_name_list: man_name_list});
  }

  determinateManName() {
    if (nameListValidation(this.state.man_name_list)) {
      this.setState({determinate_man_name: true, man_name_error: false});
    } else {
      this.setState({man_name_error: true});
    }
  }

  handleChangeWomanName(event) {
    let woman_name_list = this.state.woman_name_list;
    let i = parseInt(event.target.name, 10);
    woman_name_list[i] = event.target.value;
    this.setState({woman_name_list: woman_name_list});
  }

  determinateWomanName() {
    if (nameListValidation(this.state.woman_name_list)) {
      this.setState({determinate_woman_name: true});
    } else {
      this.setState({woman_name_error: true});
    }
  }

  render() {
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
            />
          </>
        }
      </>
    );
  }
}

function nameValidation(str) {
  let reg = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んーァ-ヶｰｱ-ﾝﾞﾟｰ\u4E00-\u9FFF\u3005-\u3007]+$/i;
  return reg.test(str);
}

function nameListValidation(list) {
  for (let str of list) {
    if (!nameValidation(str)) {
      return false;
    }
  }
  let name_set = new Set(list);
  return list.length === name_set.size;
}
