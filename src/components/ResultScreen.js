import React from "react";
import {withRouter} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col'
import PlayerDisplay from "./PlayerDisplay";

class ResultScreen extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data: this.props.location.state.data,
      payingPlayers: [],
      billAmount: "",
      payout: []
    }

    this.handleBill = this.handleBill.bind(this);
    this.handleNPC = this.handleNPC.bind(this);
    this.calcBill = this.calcBill.bind(this);
  }

  componentDidMount(){
    let players = []
    this.state.data.forEach(player =>{
      players.push(player.uid);
    })

    this.setState({
      payingPlayers: players
    })
  }

  componentWillUnmount(){

  }

  handleBill(event){
    this.setState({
      billAmount: event.target.value
    })
  }

  handleNPC(event){
//remove player from paying pool if checked
    if(event.target.checked){
      this.setState({
        payingPlayers: this.state.payingPlayers.filter(player => player !== event.target.id)
      })
    }else{
      this.setState({
        payingPlayers: [...this.state.payingPlayers, event.target.id]
      })
    }
  }

  calcBill(){
    const size = this.state.payingPlayers.length;
    const breakDown = [[0, 0.3, 0.7],
    [0, 0.2, 0.3, 0.5],
    [0, 0.15, 0.2, 0.3, 0.35],
    [0, 0, 0.15, 0.2, 0.3, 0.35],
    [0, 0, 0.1, 0.15, 0.2, 0.25, 0.3],
    [0, 0, 0, 0.1, 0.15, 0.2, 0.25, 0.3],
    [0, 0, 0, 0.1, 0.1, 0.15, 0.2, 0.2, 0.25],
    [0, 0, 0, 0.05, 0.1, 0.1, 0.15, 0.15, 0.2, 0.25]];

    let calcBill = [];
    const amount = this.state.billAmount;

    for(let i = 0; i < size; i++){
      let payment = amount * breakDown[size-3][i];
      calcBill.push(payment.toFixed(2));
    }
    this.state.data.forEach((player, index) => {
      if(!this.state.payingPlayers.includes(player.uid)){
        calcBill.splice(index, 0, 0);
      }
    })
    this.setState({
      payout: calcBill
    })
  }

  render(){
    return <div>
    <h1>Results</h1>
    <Form>
    <Form.Group as={Form.Row}>
      <Form.Label column>Bill:</Form.Label>
      <Col>
      <Form.Control as="input" type="number" placeholder="9.99" onChange={this.handleBill}/>
      </Col>
      <Col>
      <Button variant="primary" onClick={this.calcBill}>Submit</Button>
      </Col>
    </Form.Group>
    </Form>

    <Table responsive striped bordered hover variant="dark">
    <tbody>
    {this.state.data.map((object,index) => <tr key={index}>
    <td>NPC<br/><input type="checkbox" id={object.uid} onClick={this.handleNPC}/></td>
    <td><PlayerDisplay playerId={object.uid}/></td>
    <td>{object.total}</td>
    <td>${this.state.payout[index]}</td></tr>)}
    </tbody>
    </Table>

    <Button variant="primary" onClick={() => this.props.history.push("/MainMenu")}>Main Menu</Button>

    </div>
  }
}

export default withRouter(ResultScreen);
