import React, { Component } from 'react'

const typeOfPerformance = [
  "",
  "Excellent",
  "Good",
  "Satisfactory",
  "Below Average"
]

const ISREVIEWED = true;

export class ReviewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      performances: [],
    }
  }

  componentDidMount() {
    this.GetPerformanceReviewList(2);
  }

  handleSubmit = (index) => {
    if (!this.state.performances[index].performance) {
      return;
    }
    let data = new FormData();
    data.append("id", this.state.performances[index].id);
    data.append("performance", this.state.performances[index].performance);
    data.append("isReviewed", ISREVIEWED);
    fetch('api/Performance/Edit', {
      method: 'PUT',
      body: data
    }).then((response) => response.json()
    ).then(
      this.setState({ performances: this.state.performances.filter(p => p.isReviewed === false) })
    )
  };

  handleEdit = (index) => {
    this.setState(prevState => ({ performances: prevState.performances.map((p, i) => i === index ? { ...p, editing: true } : p) }))
  }

  handleCancel = (index) => {
    this.setState(prevState => ({ performances: prevState.performances.map((p, i) => i === index ? { ...p, editing: false, performance: "", isReviewed: false } : p) }))
  }

  handleChange = (e, index) => {
    e.persist();
    this.setState(prevState => ({ performances: prevState.performances.map((p, i) => i === index ? { ...p, performance: e.target.value, isReviewed: true } : p) }))
  }


  render() {
    if (this.state.loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }
    else {
      return (
        <div className="text-center">
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>User Name</th>
                <th style={{ width: "30%" }}>Performance</th>
                <th style={{ width: "40%" }}>Operation</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.performances.map((p, index) =>
                  <tr key={index}>
                    <td >{p.userName}</td>
                    <td >
                      {
                        p.editing ?
                          <select onChange={(e) => this.handleChange(e, index)}>
                            {typeOfPerformance.map((p, i) =>
                              <option key={i} value={p}>{p}</option>)}
                          </select>
                          :
                          <> {p.performance} </>
                      }
                    </td>
                    <td >
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
        </div>
      )
    }
  }

  //TODO: Get User Id
  async GetPerformanceReviewList(id) {
    //const token = await authService.getAccessToken();
    const response = await fetch('api/Performance/2'
      // , { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }
    );
    const data = await response.json();
    this.setState({ performances: data, loading: false });
    console.log(data);
  }
}
