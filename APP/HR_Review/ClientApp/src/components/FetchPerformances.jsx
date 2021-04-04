import React, { Component } from 'react';
import { typeOfPerformance } from '../constants/PerformanceType';
import { Link } from "react-router-dom";

export class FetchPerformances extends Component {
  constructor(props) {
    super(props)

    this.state = {
      performances: [],
      loading: true
    }
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  handleCancel = (index) => {
    this.setState(prevState => ({ performances: prevState.performances.map((p, i) => i === index ? { ...p, editing: false, performance: "", isReviewed: false } : p) }))
  }

  handleSubmit = (index) => {
    let data = new FormData();
    data.append("id", this.state.performances[index].id);
    data.append("performance", this.state.performances[index].performance);
    data.append("isReviewed", this.state.performances[index].performance ? true : false);
    fetch('api/Performance/Edit', {
      method: 'PUT',
      body: data
    }).then((response) => response.json()
    ).then(
      this.setState(prevState => ({ performances: prevState.performances.map((p, i) => i === index ? { ...p, editing: false } : p) }))
    )
    console.log(this.state);
  };



  handleEdit = (ei) => {
    console.log(ei);
    this.setState(prevState => ({ performances: prevState.performances.map((p, i) => i === ei ? { ...p, editing: true } : p) }))
  }

  handleChange = (e, index) => {
    e.persist();
    this.setState(prevState => ({ performances: prevState.performances.map((p, i) => i === index ? { ...p, performance: e.target.value, isReviewed: true } : p) }))
  }


  render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      )
    }
    else {
      return (
        <div className="text-center">
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th style={{ width: "25%" }}>User Name</th>
                <th style={{ width: "25%" }}>Reviewer Name</th>
                <th style={{ width: "25%" }}>Performance</th>
                <th style={{ width: "25%" }}> Operation</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.performances.map((p, index) =>
                  <tr key={index}>
                    <td>{p.userName}</td>
                    <td>{p.reviewerName}</td>
                    <td>
                      {
                        p.editing ?
                          <select onChange={(e) => this.handleChange(e, index)} value={p.performance ? p.performance : ""}>
                            {typeOfPerformance.map((p, i) =>
                              <option key={i} value={p}>{p}</option>)}
                          </select>
                          :
                          <> {p.performance} </>
                      }
                    </td>
                    <td>
                      {p.editing ?
                        <>
                          <button className="btn btn-primary btn-sm mx-2" onClick={() => this.handleSubmit(index)}>Submit</button>
                          <button className="btn btn-primary btn-sm mx-2" onClick={() => this.handleCancel(index)}>Cancel</button>
                        </>
                        :
                        <button className="btn btn-primary btn-sm mx-2" onClick={() => this.handleEdit(index)}>Edit</button>
                      }
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <div>
            <Link to="/add-performance">
              <button className="btn btn-primary">
                Create New
              </button>
            </Link>
          </div>
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
    this.setState({ performances: data, loading: false });
  }
}
