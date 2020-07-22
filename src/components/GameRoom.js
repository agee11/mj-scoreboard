import React from "react";
import {firebaseDB, firebaseAuth} from "../firebase";
import Button from "react-bootstrap/Button";
import PlayerList from "./PlayerList";
import {withRouter} from "react-router-dom";


class GameRoom extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      roomId: this.props.match.params.roomId,
      playerInfo: [],
      ref: ""
    }

    this.startGame = this.startGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
  }

  componentDidMount(){
//When a player leaves/joins gameroom, update playerIds
    const ref = firebaseDB.ref("gamerooms/"+this.state.roomId);
    ref.child("status").on("value", state => {
      if(state.val() === "Playing"){
        this.props.history.push("/Scoreboard/" + this.state.roomId, {playerInfo: this.state.playerInfo});
      }
    })

    ref.child("players").on("value", (players) => {
      let playerIds = [];

      Object.keys(players.val()).forEach(id =>{
        playerIds.push(id);
        this.setState({
          playerInfo: playerIds,
          ref: ref
        })
      })
    })
  }

  componentWillUnmount(){
    this.state.ref.child("status").off();
  }

  startGame(){
    //Update room status and redirect to scoreboard component
    const stateRef = firebaseDB.ref("gamerooms/"+this.props.match.params.roomId);
    stateRef.update({
      status: "Playing"
    })
  }

  leaveGame(){
    const roomRef = firebaseDB.ref("gamerooms/"+this.props.match.params.roomId);
    this.state.ref.child("players").off();

//Remove player, if last player in room, delete room from server
    if(this.state.playerInfo.length > 1){
      roomRef.child("/players/"+firebaseAuth.currentUser.uid).remove()
    }else{
      roomRef.remove();
    }
    this.props.history.push("/MainMenu");
  }

  render(){
    return <div>
    <h2>{this.state.roomId}</h2>
    <PlayerList playerInfo={this.state.playerInfo}/>
    <Button disabled={this.state.playerInfo.length < 4} onClick={this.startGame} variant="success">Start</Button>
    <Button onClick={this.leaveGame} variant="danger">Cancel</Button>
    </div>
  }
}

export default withRouter(GameRoom);
//<PlayerList roomId={this.state.roomId}/>
