import React, { Component } from 'react'

const typeOfPerformance = [
  "Excellent",
  "Good",
  "Satisfactory",
  "Below Average"
]

export class ReviewUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      performance: new Performance(),
    }
  }

  handleSave = () => { }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push("/fetch-performances");
  }


  render() {
    return (
      <form onSubmit={this.handleSave} >
        <div className="form-group row" >
          <input type="hidden" name="id" value={this.state.performance.id} />
        </div>
        < div className="form-group row" >
          <label className=" control-label col-md-12" htmlFor="Name">Name</label>
          <h1>{this.state.performance.userName}</h1>
        </div >
        < div className="form-group row" >
          <label className=" control-label col-md-12" htmlFor="Name">Performance</label>
          <div className="col-md-4">
            <select className="form-control" defaultValue={this.state.performance.performance} required>
              {typeOfPerformance.map(p =>
                <option value={p}>{p}</option>
              )}
            </select>
          </div>
        </div >
        <button className="btn btn-primary mx-2" onClick={this.handleSave}>Save</button>
        <button className="btn btn-primary mx-2" onClick={this.handleCancel}>Cancel</button>
      </form>
    )
  }
}

class Performance {
  constructor() {
    this.id = 0;
    this.userName = "";
    this.performance = "";
  }
}