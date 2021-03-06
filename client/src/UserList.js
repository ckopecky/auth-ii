import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserList extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:[]
        }
    }

    componentDidMount() {
        console.log(this.state);
        // get the token from somewhere
            //go into localstorage....get key and give me that value
        // attach the token as the Authorization header
        const token = localStorage.getItem("jwt");
        axios
          .get('http://localhost:5500/api/users', {headers: {Authorization: token}})

          .then(response => {
                        this.setState({ users: response.data });
            console.log(response.data);
          })
          .catch(err => {
            console.error(err);
          });
      }
    //signout handler

      handleSignOut = () => {
        if (localStorage.getItem('jwt')) {
          localStorage.removeItem('jwt');
    
          this.props.history.push('/');
        }
      };


    render() {
        console.log(this.state);
        return (
            <div>
                {localStorage.getItem("jwt") && 
                    <div><div className="sign-out" onClick={this.handleSignOut}>Sign Out</div>  
                    <h1 className="sign-out">I'm a list of Harry Potter Characters</h1></div>}
                {!localStorage.getItem("jwt") &&
                    <div className="please-signin"><Link className="link-style" to="/login">Please Sign in to access list of users</Link></div>}
            <ul className="collection-of-users">
            {this.state.users.map(user => {
                return(
                    <li className="indiv-user" key={user._id}>
                        <h4>username:  {user.username}</h4>
                        <p>I'm a {user.race}</p>
                    </li>
                )}
            )}
            </ul>
            </div>
        );
        }
    }


export default UserList;
