import React, {Component} from 'react';
import axios from 'axios'
import './App.css';

const http = axios.create();

http.defaults.baseURL = 'https://things.ubidots.com/api/v1.6';
http.defaults.headers = {
  'X-Auth-Token': 'A1E-T4nuRb5giAARRDaw0he9K9Dkswh35Q'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  componentWillMount() {
    http({
      method: 'GET',
      url: '/variables/59e10131c03f973c4c22e002/values/'
    }).then(({data}) => {
      this.setState({checked: data.results[0].value === 1})
    })
  }

  turn = (on) => {
    return http({
      method: 'POST',
      url: '/variables/59e10131c03f973c4c22e002/values/',
      data: {
        value: on ? 1 : 0
      }
    })
  };

  onClick = (e) => {
    const checked = !this.state.checked;
    this.turn(checked).then(response => {
      this.setState({checked})
    })
  };

  render() {
    return (
      <div className="App outer">
        <div className="middle">
          <div className="inner">
            <input id="checkbox" type="checkbox" checked={this.state.checked}/>
            <label data-text-true="On" data-text-false="Off" onClick={this.onClick}><i></i></label>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
