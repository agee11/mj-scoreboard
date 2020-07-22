import React from "react";
import {firebaseDB} from "../firebase";
import "./StyleComponents.css";


class PlayerDisplay extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      photo: ""
    }
  }

  componentDidMount(){
    const profileRef = firebaseDB.ref("userProfiles").child(this.props.playerId);

    profileRef.once("value", data => {
      this.setState({
        name: data.val().displayName,
        photo: data.val().photo
      })
    })
  }

  componentWillReceiveProps(nextProps){
    const profileRef = firebaseDB.ref("userProfiles").child(nextProps.playerId);

    profileRef.once("value", data => {
      this.setState({
        name: data.val().displayName,
        photo: data.val().photo
      })
    })
  }

  render(){
    return <div>
    <img className="profilePicture" src={this.state.photo} alt="profile"/>
    <p>{this.state.name}</p>
    </div>
  }
}

export default PlayerDisplay;
