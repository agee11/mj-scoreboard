import React from "react";
import Button from "react-bootstrap/Button";
import {firebaseDB, firebaseAuth} from "../firebase";
import {withRouter} from "react-router-dom";

//The display when searching for game in Lobby
class GameData extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      status: "Open",
      ref: "",
      date: ""
    }

    this.joinGame = this.joinGame.bind(this);
    this.spectateGame = this.spectateGame.bind(this);
  }

  componentDidMount(){
    const ref = firebaseDB.ref("gamerooms").child(this.props.roomId);
    ref.on("value", (data) => {
      this.setState({
        status: data.val().status,
        ref: ref,
        date: data.val().date
      })
    })
  }

  componentWillUnmount(){
    this.state.ref.child("status").off();
  }

  joinGame(){
    this.state.ref.off();
    const playerListRef = firebaseDB.ref("gamerooms/"+this.props.roomId+"/players");
    playerListRef.update({
      [firebaseAuth.currentUser.uid]: {
        Total: 0
      }
    })
    this.props.history.push("/Gameroom/"+this.props.roomId);
  }

  spectateGame(){
    if(this.state.status === "Playing"){
      this.props.history.push("/Scoreboard/"+this.props.roomId, {spectator: true});
    }else if (this.state.status === "Closed"){
      this.props.history.push("/Result/"+this.props.roomId, {spectator: true});
    }
  }

  render(props){
    return <div>
    <hr/>
    <h3>{this.state.date}</h3>
    <p><strong>Status: </strong>{this.state.status}</p>
    {this.state.status === "Open" && <><Button onClick={this.joinGame} varient="Primary">Join</Button><br/></>}
    {this.state.status !== "Open" && <Button onClick={this.spectateGame} varient="Secondary">Spectate</Button>}
    </div>
  }
}

export default withRouter(GameData);
