import React from "react";
import {firebaseDB} from "../firebase";
import "./StyleComponents.css";


class PlayerDisplay extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      photo: "",
      ref: ""
    }
  }

  componentDidMount(){
    const profileRef = firebaseDB.ref("userProfiles");

    profileRef.child(this.props.playerId).once("value", data => {
      this.setState({
        name: data.val().displayName,
        photo: data.val().photo,
        ref: profileRef
      })
    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.playerId !== this.props.playerId){
      this.state.ref.child(this.props.playerId).once("value", data => {
        this.setState({
          name: data.val().displayName,
          photo: data.val().photo
        })
      })
    }
  }

  componentWillUnmount(){
    this.state.ref.off();
  }

  render(){
    return <div>
    <img className="profilePicture" src={this.state.photo} alt="profile"/>
    <p>{this.state.name}</p>
    </div>
  }
}

export default PlayerDisplay;
