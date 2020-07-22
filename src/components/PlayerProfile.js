import React from "react";
import "./StyleComponents.css";

class PlayerProfile extends React.Component {
  constructor(props) {
    super(props);

//Player Profile will read all data from props to limit calls to server
    this.state = {
      userName: props.userName,
      photo: props.photo,
      uid: props.uid
    }
  }

  render() {
    return <div>
    <h1> Player Profile </h1>
    <img className="profilePicture" src={this.state.photo} alt="profile"/>
    <h5>{this.state.userName}</h5>
    <p>User ID: {this.state.uid}</p>
    </div>
  }
}

export default PlayerProfile;
