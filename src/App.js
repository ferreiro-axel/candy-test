import React, { Component } from 'react';
import Land from './components/land';
import firebase from 'firebase';

class App extends Component {
  state = {
    user:null,
    candy_name:'',
    candies:[],
  }

  handleChange = name => (e, { newValue } = {}) => {
    const value = newValue || e.target.value;
    const errors = {
      ...this.state.errors,
      username: '',
    };
    this.setState({ [name]: value, errors });
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(
      user=>{
          if(user){
            this.setState({user})
            this.getCandy()
          }else{
            this.setState({user:null})
            }
        }
    )
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(result=>console.log(result.user.email))
      .catch(err=>console.log(err.message))
  }

  handleLogOut () {
    firebase.auth().signOut()
      .then(result=>console.log('desconectado'))
      .catch(err=>console.log(err.message))
  }

  sendCandy=()=>{
    var db=firebase.firestore();
    console.log(this.state.candy_name)
    db.collection('candies').add({
      name:this.state.candy_name
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    this.getCandy();
  };

  getCandy=()=>{
    console.log('hi!')
    var db=firebase.firestore();
    db.collection('candies').get().then((querySnapshot) => {
      var x=[];
      querySnapshot.forEach((doc) => {
          x.push(doc.data())
      });
      this.setState({candies:x})
      console.log(this.state.candies)
    });
  }

  render() {
    return(
      <Land
        candies={this.state.candies}
        candy_name={this.state.candy_name}
        user={this.state.user}
        onAuth={this.handleAuth}
        onLogout={this.handleLogOut}
        handleChange={this.handleChange}
        sendCandy={this.sendCandy.bind(this)}
      />
    );
  }
}

export default App;
