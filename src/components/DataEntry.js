import React from "react";
import {firebaseDB} from "../firebase";

//Data displayed for each scoreboard entry
class DataEntry extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      value: "",
      ref: ""
    }
  }

  componentDidMount(){
    const profileRef = firebaseDB.ref("userProfiles").child(this.props.playerId);

    profileRef.once("value", data => {
      this.setState({
        name: data.val().displayName,
        value: this.props.value,
        ref: profileRef
      })
    })
  }

  componentDidUpdate(prevProps){

    this.state.ref.once("value", data => {
      this.setState({
        name: data.val().displayName,
        value: this.props.value
      })
    });
  }

  componentWillUnmount(){
    this.state.ref.off();
  }

  render(){
    return <td className={this.state.value > 0 ? "positive" : "negative"}>
    {this.state.name}<br/>
    {this.state.value}
    </td>
  }
}

export default DataEntry;
