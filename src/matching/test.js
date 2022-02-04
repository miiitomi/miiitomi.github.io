import React from 'react';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      list: []
    };
  }
  handleSubmit(e) {
    e.preventDefault();

    const input = '',
      list = this.state.list.slice();

    list.unshift(this.state.input);

    this.setState({
      input,
      list
    });
  }
  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.input}
          onChange={e => this.setState({ input: e.target.value })}
        />
        <button
          type="submit"
          onClick={this.handleSubmit.bind(this)}
        >
          add!
        </button>
        <ul>
          {this.state.list.map((v, i) => (
            <li key={i}>
              {v}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}
