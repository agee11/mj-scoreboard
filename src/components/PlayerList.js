import React from "react";
import PlayerDisplay from "./PlayerDisplay";


class PlayerList extends React.Component{

  render(){
    //console.log(this.props.playerInfo.join(","));
    return <ol>
    {this.props.playerInfo.map((player,index) => <li key={index}><PlayerDisplay playerId={player}/></li>)}
    </ol>
  }
}

export default PlayerList;
