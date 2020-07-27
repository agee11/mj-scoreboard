import React from "react";
import {firebaseDB, firebaseAuth} from "../firebase";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PlayerDisplay from "./PlayerDisplay";
import "./StyleComponents.css";


class AddScoreModal extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      target: [],
      points: 3,
      ref: ""
    }

    this.submitData = this.submitData.bind(this);
    this.handlePointChange = this.handlePointChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
  }

  componentDidMount(){
    this.setState({
      ref: firebaseDB.ref("gamerooms/"+this.props.roomId+"/players")
    })
  }

  submitData(){

    let points = parseInt(this.state.points);

//Normal win
    if(this.state.target.length === 1){
      if(points > 10){
        points = 10;
      }
      this.state.ref.child(this.state.target[0]).push({
        [firebaseAuth.currentUser.uid]: Math.pow(2, points+2) * -1
      });
      this.state.ref.child(firebaseAuth.currentUser.uid).push({
        [this.state.target[0]]: Math.pow(2,points+2)
      });
//Self draw win
    }else if(this.state.target.length === 3){
      if(points > 11){
        points = 11;
      }
      this.state.target.forEach(player => {
        this.state.ref.child(player).push({
          [firebaseAuth.currentUser.uid]: Math.pow(2, points+1) * -1
        });
        this.state.ref.child(firebaseAuth.currentUser.uid).push({
          [player]: Math.pow(2, points+1)
        });
      })
    }

    this.setState({
      target: [],
      points: 3
    })

    this.props.onHide();
  }

  handlePointChange(event){
    this.setState({
      points: event.target.value
    });
  }

  handleTargetChange(event){
    if(event.target.checked){
      this.setState({
        target: [...this.state.target, event.target.id]
      })
    }else{
      this.setState({
        target: this.state.target.filter(x => x !== event.target.id)
      })
    }
  }

  componentWillUnmount(){
    this.state.ref.off();
  }


  render(){
    return <Modal show={this.props.show} onHide={this.props.onHide} centered aria-labelledby="contained-modal-title-vcenter">
    <Modal.Header closeButton>
    <strong>Add Score</strong>
    </Modal.Header>
    <Modal.Body>

    <Form>
      <Form.Group controlId="formTargets">
        <Form.Label><strong>Players</strong></Form.Label>
        {this.props.players.map((player,index) => {
          return <Form.Check id={player.uid} key={index} type="checkbox" label=<PlayerDisplay playerId={player.uid}/> onChange={this.handleTargetChange} disabled={(player.uid) === firebaseAuth.currentUser.uid}/>
        })}

      </Form.Group>
      <Form.Group controlId="formPoints">
        <Form.Label><strong>Points Won</strong></Form.Label>
        <Form.Control defaultValue={3} as="select" htmlSize="5" custom onChange={this.handlePointChange}>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
        </Form.Control>
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button onClick={this.submitData}>Submit</Button>
    </Modal.Footer>
    </Modal>

}
}

export default AddScoreModal;
