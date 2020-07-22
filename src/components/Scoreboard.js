import React from "react";
import {firebaseDB} from "../firebase";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import DataEntry from "./DataEntry";
import {withRouter} from "react-router-dom";
import PlayerDisplay from "./PlayerDisplay";
import AddScoreModal from "./AddScoreModal";


class Scoreboard extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      scores: [],
      roomId: this.props.match.params.roomId,
      showModal: false,
      ref: ""
    }

    this.addScore = this.addScore.bind(this);
    this.endGame = this.endGame.bind(this);
  }
  componentDidMount(){
    const roomRef = firebaseDB.ref("gamerooms/"+this.state.roomId);

    roomRef.child("status").on("value", state => {
      if(state.val() === "Closed"){
        this.props.history.push("/Result/"+this.state.roomId, {data: this.state.scores});
      }
    })

    roomRef.child("players").on("value", (data) => {
      let playerContainer = [];
      let updatedScores = [];
      data.forEach(player => {
        updatedScores = [];
        let total = 0;
        //Iterates through every score entry
        Object.keys(player.val()).forEach(entry => {
          //Record the name and score change for this entry in order
          Object.entries(player.child(entry).val()).forEach(([key,value]) => {
            updatedScores.push({
              targetId: key,
              value: value
            });
            total += value;
          })
        })
        playerContainer.push({
          uid: player.key,
          record: updatedScores,
          total: total
        });

      });
      this.setState({
        scores: playerContainer.sort((a,b) => b.total-a.total),
        ref: roomRef
      });
    })
  }

  componentWillUnmount(){
    this.state.ref.child("players").off();
    this.state.ref.child("status").off();
  }

  addScore(){
    this.setState({showModal: true});
  }

  endGame(){
    const stateRef = firebaseDB.ref("gamerooms/"+this.props.match.params.roomId);
    stateRef.update({status: "Closed"});
  }


  render(){
    return <div>
    <h2>Scores {this.state.roomId}</h2>
    <Table responsive striped bordered hover variant="dark">
    <tbody>
      {this.state.scores.map((player,index) => {
        return <tr key={index}>
          <td>{index+1}</td>
          <td><PlayerDisplay playerId={player.uid}/></td>
          <td><strong>Total<br/>{player.total}</strong></td>
          {player.record.map((entry,index) => <DataEntry key={index} name={entry.targetId} value={entry.value}/>)}
          </tr>
      })}
    </tbody>
    </Table>
    <Button onClick={this.addScore} variant="primary" disabled={this.props.location.state.spectator}>Add Score</Button>
    <Button onClick={this.endGame} variant="danger" disabled={this.props.location.state.spectator}>End Game</Button>

    <AddScoreModal roomId={this.state.roomId} players={this.state.scores} show={this.state.showModal} onHide={() => this.setState({showModal: false})}/>
    </div>
  }
}

export default withRouter(Scoreboard);
