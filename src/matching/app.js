import React from 'react';
import Number from './number';
import ManName from './man_name';
import WomanName from './woman_name';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      man_number: 3,
      woman_number: 3,
      determinate_number: false,
      number_error: false,
      man_name_list: [],
      woman_name_list: [],
      determinate_man_name: false,
      determinate_woman_name: false,
      man_name_error: 0,
      woman_name_error: 0,
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
    let error_code = nameListValidation(this.state.man_name_list);
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
      woman_name_list: Array(parseInt(this.state.woman_number, 10)).fill(""),
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
    let error_code = nameListValidation(this.state.woman_name_list)
    if (error_code === 0) {
      this.setState({
        determinate_woman_name: true,
        woman_name_error: error_code,
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
      </>
    );
  }
}

function nameValidation(str) {
  let reg = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んーァ-ヶｰｱ-ﾝﾞﾟｰ\u4E00-\u9FFF\u3005-\u3007]+$/i;
  if (!reg.test(str)) return false;
  return (str.length <= 10);
}

function nameListValidation(list) {
  for (let str of list) {
    if (!nameValidation(str)) {
      return 1;
    }
  }
  let name_set = new Set(list);
  if (list.length != name_set.size) {
    return 2;
  }
  return 0;
}
