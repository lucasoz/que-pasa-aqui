import React, { Component } from 'react';
import './circle.scss';
import './App.css';
import { db } from './firebase';
import _ from 'lodash';

const Profile = ({ person: { name, url }, circle, inline }) => (
  <p className={`${inline ? 'inline' : ''}`} >
    <img className={`profileImage ${circle ? 'circleImage' : ''}`} src={url} />
    <br/>
    {name}
  </p>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          
        },
        {
          
        },
        {
          
        },
        {
         
        },
        {
        
        },
        {
        
        },
        {
          
        },
        {
      
        },
        {
     
        },
        {
        
        }
      ],
      player: null,
      round: 1,
    }
  }

  componentDidMount() {
    db.collection('personas').onSnapshot(snapshot => {
      const personas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.setState({ data: personas});
    })
  }

  onClick = () => {
    const newData = this.state.data.sort(function (a, b) { return 0.5 - Math.random() });
    newData.map((person, index) => {
      const ref = db.collection('personas').doc(person.id);
      ref.update({
        order: index + 1
      })
    })
  }

  render() {
    const { data, round, player } = this.state;

    const dataToRender = _.orderBy(data, 'order');
    return (
      <div className="App">
        <header className="App-header">
          {player ? <div>
            <p className="title">
            <button className="myButton" onClick={() => this.setState({ round: 1 })}>1</button>
            <button className="myButton" onClick={() => this.setState({ round: 2 })}>2</button>
            <strong className="titleText">¿Qué está pasando?</strong>
            <button className="myButton" onClick={this.onClick}>Mentira</button>
          </p>
          {round === 1 &&
            <div className="grid-container">
              <div></div>
              <div><Profile person={dataToRender[0]} /></div>
              <div><Profile person={dataToRender[1]} /></div>
              <div><Profile person={dataToRender[2]} /></div>
              <div></div>
              <div><Profile person={dataToRender[3]} /></div>
              <div className="paint"> </div>
              <div className="paint"></div>
              <div className="paint"> 12 </div>
              <div> <Profile person={dataToRender[4]} /> </div>
              <div><Profile person={dataToRender[5]} /></div>
              <div className="paint"> </div>
              <div className="paint"> </div>
              <div className="paint"> </div>
              <div> <Profile person={dataToRender[6]} /> </div>
              <div>  </div>
              <div> <Profile person={dataToRender[7]} /> </div>
              <div> <Profile person={dataToRender[8]} /> </div>
              <div> <Profile person={dataToRender[9]} /> </div>
              <div></div>
              
            </div>
          }
          {round === 2 &&
            <ul className="circle-container">
              {
                dataToRender.map(({url, name, id}) => (
                  <li key={id}>
                    <img src={url}/>
                    {name}
                  </li>
                ))
              }
            </ul>}
          </div>
          : <div style={{width: '100%'}}>
              <h1>
                ¿Quién eres?
              </h1>
              <div style={{width: '100%'}}>
                {dataToRender.map((person) => (
                  <Profile person={person} inline style={{display: 'inline-block'}}/>
                ))}
              </div>
          </div>}
        </header>
        </div>
    );

  }
}

export default App;
