import React from 'react';
import './App.css';
import axios from 'axios';

const testData = [
  {name: "Kavya", avatar_url: "https://avatars0.githubusercontent.com/u/45337962?v=4", company: "HopeBuild Inc."},
  {name: "Bhagi", avatar_url: "https://avatars2.githubusercontent.com/u/10722712?v=4", company: "Microsoft"},
  {name: "Ironman", avatar_url: "https://avatars3.githubusercontent.com/u/22140592?v=4", company: "Google"},
  {name: "Starwars", avatar_url: "https://avatars3.githubusercontent.com/u/559552?v=4", company: "Apple"}, 
];

const CardList = (props) =>(
  <div>
    {props.profiles.map(profile=> <Card key={profile.id} {...profile}/>)}

    {/* {testData.map(profile=> <Card {...profile}/>)} */}
    {/* above step to be avoided as we shouldn/t read data from global variable/array, we should access it thru props */}
    {/* above step is the dynamic card allocation through map based on testData */}
    {/* <Card {...testData[0]}/>
    <Card {...testData[1]}/> */}
  </div>
);

class Form extends React.Component{
  state = {userName:''}
  handleSubmit= async (event) => {
    event.preventDefault();
    const resp= await axios.get(`https://api.github.com/users/${this.state.userName}`);
    console.log(this.state.userName);
    console.log(resp);
    this.props.onSubmit(resp.data);
  }
  render(){
    return(
      <form action="" onSubmit={this.handleSubmit}>
        <input 
          type="text"
          value= {this.state.userName}
          onChange = {event=>this.setState({userName: event.target.value})}
          placeholder="Github Username" 
          required 
        />
        <button style={{backgroundColor:'skyblue', cursor:'pointer'}} >Add Card</button>
      </form>
    );
  }
}

class Card extends React.Component{
  render(){
    const profile= this.props;
    return(
      <div className="github-profile">
        <img src={profile.avatar_url}></img>
          <div className="info" >
            <div className="name">{profile.name}</div>
            <div className="company">{profile.company}</div> 
            {/* <div className="info" style={{display:'inline-block', marginLeft:10}}>
            <div className="name" style={{fontSize:'125%'}}>Name here...</div> */}          
        </div>
      </div>
    );
  }
}

class App extends React.Component{
  // contructor(props){
  //   super(props);
  //   this.state={
  //     profiles: testData,
  //   };
  // }
  state={
    profiles: testData
  }
  addNewprofile=(profileData)=>{
    this.setState(prevState => ({
      profiles:[...prevState.profiles, profileData],
    }));
  }
  render(){
    return(
      <div>
        <div className="header">Github Cards App</div>
        <Form onSubmit={this.addNewprofile}/>
        <CardList profiles={this.state.profiles}/>
        {/* <CardList profiles={testData}/> */}
        {/* profiles- testData in above statement to be removed as testData needs to be accessed by Form also, so make it avaiable for all the components of App component thru 'state' variable*/}
      </div>     
    )
  }
}

export default App;
