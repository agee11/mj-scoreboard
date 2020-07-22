import React from "react";
import {firebaseDB} from "../firebase";

//Data displayed for each scoreboard entry
class DataEntry extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      value: ""
    }
  }

  componentDidMount(){
    const profileRef = firebaseDB.ref("userProfiles").child(this.props.name);

    profileRef.once("value", data => {
      this.setState({
        name: data.val().displayName,
        value: this.props.value
      })
    })
  }
  render(){
    return <td>
    {this.state.name}<br/>
    {this.state.value}
    </td>
  }
}

export default DataEntry;
