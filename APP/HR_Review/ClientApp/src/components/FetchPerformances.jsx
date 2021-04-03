import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class FetchPerformances extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Performances: [],
      loading: true
    }
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  handleEdit = (id) => {
    this.props.history.push("/performance/edit/" + id);
  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      )
    }
    else {
      console.log(this.state.Performances);
      return (
        <div className="text-center">
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Performance</th>
                <th> Operation</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.Performances.map(p =>
                  <tr key={p.id}>
                    <td>{p.userName}</td>
                    <td>{p.Performances}</td>
                    <td>
                      <button className="btn btn-primary btn-sm mx-2" onClick={(id) => this.handleEdit(p.id)}>Review</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      )
    }
  }

  async populateWeatherData() {
    //const token = await authService.getAccessToken();
    const response = await fetch('api/Performance/'
      // , { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }
    );
    const data = await response.json();
    this.setState({ Performances: data, loading: false });
  }
}
