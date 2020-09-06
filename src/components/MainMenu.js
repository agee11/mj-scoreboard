import React from "react";
import Button from "react-bootstrap/Button";
import {firebaseAuth, firebaseDB} from "../firebase";
import {withRouter} from "react-router-dom";

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.joinGameRoom = this.joinGameRoom.bind(this);
    this.createGameRoom = this.createGameRoom.bind(this);
  }

  joinGameRoom(){
    this.props.history.push("/Lobby");
  }

  createGameRoom(event){
    let time = new Date().toDateString() + " " + new Date().toLocaleTimeString();
    time = time.split(" ");
    time = time.join("-");

    const roomRef = firebaseDB.ref("gamerooms/");
    let playerData;
    if(event.target.id === "newRoomButton"){
      playerData = {[firebaseAuth.currentUser.uid]: {Total: 0}}
    }else if (event.target.id === "testRoomButton"){
      console.log(event.target.id);
      playerData = {[firebaseAuth.currentUser.uid]: {Total: 0}, tester1: {Total: 0}, tester2: {Total: 0}, tester3: {Total: 0}}
    }
    const newRoom = roomRef.push({
      date: time,
      status: "Open",
      players: playerData
    })

    this.props.history.push("/GameRoom/" + newRoom.key);
  }

  render() {
    return <div className="BasicScreen">
    <h1> Main Menu </h1>
    <Button onClick={this.joinGameRoom} varient="primary">Join Game</Button><br/>
    <Button id="newRoomButton" onClick={this.createGameRoom} varient = "primary"> Create Game </Button><br/>
    <Button id="testRoomButton" onClick={this.createGameRoom} varient = "primary"> Test Game </Button>
    </div>
  }
}

export default withRouter(MainMenu);
