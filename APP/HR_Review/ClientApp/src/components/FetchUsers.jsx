import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class FetchUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Users: [],
      loading: true
    }
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  handleEdit = (id) => {
    this.props.history.push("/users/edit/" + id);
    console.log("edit clicked")
  }
  handleDelete = (id) => {
    console.log("delete clicked")

    if (!window.confirm("Do you want to delete employee with Id: " + id))
      return;
    else {
      fetch('api/Users/Delete/' + id, {
        method: 'delete'
      }).then(data => {
        console.log("Finished Delete.")
        this.setState(
          {
            Users: this.state.Users.filter((usr) => {
              return (usr.id !== id);
            })
          });
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      )
    }
    else {
      console.log(this.state.Users);
      return (
        <div className="text-center">
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>ID </th>
                <th>User Name</th>
                <th>Email</th>
                <th>Department</th>
                <th> Administrator</th>
                <th> Operation</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.Users.map(user =>
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.userName}</td>
                    <td>{user.emailAddress}</td>
                    <td>{user.departmentName}</td>
                    <td>
                      <input className="form-check-input" type="checkbox" checked={user.isAdmin} disabled />
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm mx-2" onClick={(id) => this.handleEdit(user.id)}>Edit</button>
                      <button className="btn btn-danger btn-sm mx-2" onClick={(id) => this.handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <div>
            <Link to="/add-user">
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
    const response = await fetch('api/Users/Index'
      // , { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }
    );
    const data = await response.json();
    this.setState({ Users: data, loading: false });
  }
}
