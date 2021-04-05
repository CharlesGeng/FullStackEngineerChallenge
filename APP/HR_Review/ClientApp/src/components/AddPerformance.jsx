import * as React from 'react';

export class AddPerformance extends React.Component {
  constructor(props) {
    console.log("Add User Component");
    super(props);

    this.state = {
      title: "Create",
      loading: true,
      performance: new Performance(),
      users: []
    };
  }

  async populateUsers() {
    const response = await fetch("api/users/index");
    const data = await response.json();
    this.setState({ users: data, loading: false });
  }

  componentDidMount() {
    this.populateUsers();
  }

  render() {
    let contents = this.state.loading
      ? React.createElement("p", null,
        React.createElement("em", null, "Loading..."))
      : this.renderCreateForm();
    return React.createElement("div", null,
      React.createElement("h1", null, this.state.title),
      React.createElement("h3", null, "Performance Review"),
      React.createElement("hr", null),
      contents);
  }

  handleChange = (e, isUser) => {
    const name = e.target.value;
    const usr = this.state.users.find(u => u.userName === name)
    console.log(usr);
    if (isUser) {
      this.setState(prevState => ({ performance: { ...prevState.performance, userId: usr.id } }));
    }
    else {
      this.setState(prevState => ({ performance: { ...prevState.performance, reviewerId: usr.id } }));
    }
  }
  // This will handle the submit form event.
  handleSave = (event) => {
    const performance = this.state.performance;
    event.preventDefault();

    if (performance.userId === performance.reviewerId) {
      window.confirm("User Name and Reviewer Name are same!");
      return;
    }

    const data = new FormData();
    data.append("userId", performance.userId);
    data.append("reviewerId", performance.reviewerId);
    data.append("isReviewed", false);
    console.log(event);
    fetch('api/Performance/Create', {
      method: 'POST',
      body: data,
    }).then((response) => response.json())
      .then((responseJson) => {
        this.props.history.push("/fetch-performances");
      });
  }
  // This will handle Cancel button click event.
  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push("/fetch-performances");
  }
  // Returns the HTML Form to the render() method.
  renderCreateForm() {
    console.log(this.state.users);
    return (
      <form onSubmit={this.handleSave} >
        {/* <div className="form-group row" >
          <input type="hidden" name="id" value={this.state.user.id} />
        </div> */}
        < div className="form-group row" >
          <label className=" control-label col-md-12" >User Name</label>
          <div className="col-md-4">
            {
              <select className="form-select" onChange={(e) => this.handleChange(e, true)} required >
                <option />
                {this.state.users.map(u =>
                  <option key={u.id} value={u.userName}>{u.userName}</option>
                )}
              </select>
            }
          </div>
        </div >
        <div className="form-group row">
          <label className="control-label col-md-12" htmlFor="ReviewerName" >Reviewer Name</label>
          <div className="col-md-4">
            <select onChange={(e) => this.handleChange(e, false)} required >
              <option />
              {
                this.state.users.map(u =>
                  <option key={u.id} value={u.userName}>{u.userName}</option>
                )}
            </select>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary m-2">Save</button>
          <button className="btn btn-primary m-2" onClick={this.handleCancel}>Cancel</button>
        </div >
      </form >
    )
  }
}

class Performance {
  constructor() {
    this.userId = "";
    this.reviewerId = "";
    this.isReviewed = false;
  }
}