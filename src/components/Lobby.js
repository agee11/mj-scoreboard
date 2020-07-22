import React from "react";
import GameData from "./GameData";
import {firebaseDB} from "../firebase.js";

class Lobby extends React.Component{
  constructor(props){
    super(props);

    this.state ={
      gameRooms: [],
      ref: ""
    }
  }

componentDidMount(){
  const ref = firebaseDB.ref("gamerooms");
  ref.orderByKey().limitToLast(5).on("value", (data) => {
    //getting the list of gamerooms made and storing the ids into array
    let rooms = [];
    Object.keys(data.val()).forEach(key =>{
      rooms.push(key);
    })
    this.setState({
      gameRooms: rooms,
      ref: ref
    });
  })
}

componentWillUnmount(){
  this.state.ref.off();
}

  render(){
    return <div>
    <h1>Game Rooms</h1>
    {this.state.gameRooms.map(room =>
      <GameData key={room} roomId={room} />
      )}

    </div>
  }
}

export default Lobby;
