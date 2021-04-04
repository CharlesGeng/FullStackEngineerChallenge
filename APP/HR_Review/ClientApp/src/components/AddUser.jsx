import * as React from 'react';

export class AddUser extends React.Component {
  constructor(props) {
    console.log("Add User Component");
    super(props);

    this.state = {
      title: "",
      loading: true,
      user: new User()
    };

    var id = this.props.match.params["id"];
    // This will set state for Edit user
    if (id > 0) {
      fetch('api/Users/Details/' + id)
        .then(response => response.json())
        .then(data => {
          this.setState({ title: "Edit", loading: false, user: data });
        });
    }
    // This will set state for Add user
    else {
      this.state = { title: "Create", loading: false, user: new User() };
    }
    // This binding is necessary to make "this" work in the callback
  }

  render() {
    let contents = this.state.loading
      ? React.createElement("p", null,
        React.createElement("em", null, "Loading..."))
      : this.renderCreateForm();
    return React.createElement("div", null,
      React.createElement("h1", null, this.state.title),
      React.createElement("h3", null, "User"),
      React.createElement("hr", null),
      contents);
  }
  // This will handle the submit form event.
  handleSave = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(event);
    // PUT request for Edit User
    if (this.state.user.id) {
      fetch('api/Users/Edit', {
        method: 'PUT',
        body: data,
      }).then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push("/fetch-users");
        });
    }
    // POST request for Add User
    else {
      fetch('api/Users/Create', {
        method: 'POST',
        body: data,
      }).then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push("/fetch-users");
        });
    }
  }
  // This will handle Cancel button click event.
  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push("/fetch-users");
  }
  // Returns the HTML Form to the render() method.
  renderCreateForm() {
    return (
      <form onSubmit={this.handleSave} >
        <div className="form-group row" >
          <input type="hidden" name="id" value={this.state.user.id} />
        </div>
        < div className="form-group row" >
          <label className=" control-label col-md-12" htmlFor="Name">Name</label>
          <div className="col-md-4">
            <input className="form-control" id="Name" type="text" name="userName" defaultValue={this.state.user.userName} required />
          </div>
        </div >
        <div className="form-group row">
          <label className="control-label col-md-12" htmlFor="Email">E-Mail</label>
          <div className="col-md-4">
            <input className="form-control" id="Email" type="email" name="emailAddress" defaultValue={this.state.user.emailAddress} required />
          </div>
        </div >
        <div className="form-group row">
          <label className="control-label col-md-12" htmlFor="Department" >Department</label>
          <div className="col-md-4">
            <input className="form-control" id="Department" type="text" name="departmentName" defaultValue={this.state.user.departmentName} required />
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

class User {
  constructor() {
    this.id = 0;
    this.userName = "";
    this.emailAddress = "";
    this.departmentName = "";
    this.isAdmin = false;
  }
}