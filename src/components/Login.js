import React from "react";
import Button from "react-bootstrap/Button";
import {firebaseAuth, firebaseGoogleAuth, firebaseDB} from "../firebase";
import {withRouter} from "react-router-dom";
import "./StyleComponents.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      photoURL: "",
      uid: ""
    }
    this.onLogin = this.onLogin.bind(this);
  }

//Write user data to server when logged in.
  onLogin() {

    firebaseAuth.signInWithPopup(firebaseGoogleAuth).then((result) => {
      this.setState({
        userName: result.user.displayName,
        photoURL: result.user.photoURL,
        uid: result.user.uid
      });

      const ref = firebaseDB.ref("userProfiles");
      ref.once("value").then(data => {
        if(data.child(firebaseAuth.currentUser.uid).exists()){
          ref.child(firebaseAuth.currentUser.uid).update({
            photo: result.user.photoURL,
            displayName: result.user.displayName
          })
        }else{
          ref.child(firebaseAuth.currentUser.uid).set({
            photo: result.user.photoURL,
            displayName: result.user.displayName,
            lifeTimeScore: 0,
            gamesWon: 0,
            gamesLost: 0,
            winPercentage: 0
          })
        }
      });
      this.props.history.push("/MainMenu");
    })
  }

  render() {
    return <div className="BasicScreen">
    <h1>MJ Scoreboard</h1>
      <Button size="lg" variant="primary" onClick={this.onLogin}> Google Login </Button>
      </div>
  }
}

export default withRouter(Login);
