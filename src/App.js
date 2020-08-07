import React, { Component } from 'react';
import './circle.scss';
import './App.css';
import { db } from './firebase';
import _ from 'lodash';
import { ReactComponent as Ready } from './icons8-de-acuerdo.svg';


const InitialProfile = ({ person: { name, url, character }, circle, inline, ready, onClick, id }) => (
  <p className={`${inline ? 'inline' : ''}`} >
    <div style={{width: '100px', height: '100px', margin: 'auto', position: 'relative'}}>
      <img className={`profileImage ${circle ? 'circleImage' : ''}`} src={url} />
      {_.isNull(character)
        ? <div className="lds-roller" onClick={() => onClick(id)}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        : <div className="ready"><Ready/></div>}
    </div>
    <br/>
    {name}
  </p>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.campo = React.createRef();
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
      character: null,
      selectedPerson: false,
      id: null,
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

  onRestartGame = () => {
    this.state.data.map((person) => db.collection('personas').doc(person.id).update({ character: null }));
  }

  onClickPerson= (id) => {
    if (_.isEmpty(this.state.character) || this.state.selectedPerson) {
      this.campo.current.focus();
    } else {
      db.collection('personas').doc(id).update({ character: this.state.character });
      this.setState({selectedPerson : true, id})
    }
  }

  onChangeCharacter = (event) => {
    this.setState({ character: event.target.value })
  }
  

  getCharacter= (order) => {
    let myOrder = order + 1;
    if (myOrder === 11) {
      myOrder = 1;
    }

    return this.state.data.find((person) => person.order === myOrder) || {};
  }
  

  render() {
    const { data, round, player } = this.state;
    const allReady = data.reduce((acum, person) => !_.isEmpty(person.character) && acum, true)
    const dataToRender = _.orderBy(data, 'order');
    return (
      <div className="App">
        <header className="App-header">
          {allReady ? <ul className="circle-container">
              {
                dataToRender.map(({url, name, id, order}) => (
                  <li key={id}>
                    {id!== this.state.id && <div style={{color: '#11998e', backgroundColor: 'white', borderRadius: '10px', marginBottom: '5px', fontSize: '20px'}}>{this.getCharacter(order).character}</div>}
                    <img src={url}/>
                    <div style={{fontSize: '12px'}}>{name}</div>
                  </li>
                ))
              }
            </ul>
            : <div style={{width: '100%'}}>
              <h1>
                Elije un personaje
              </h1>
              <p>
                Puedes elejir personajes históricos, de películas, famosos, todos vivos o muertos. Elijé uno que creas que todos conocen.
              </p>
              <div class="form__group field" >
                <input type="input" class="form__field" placeholder="Name" name="name" id='name' required ref={this.campo} onChange={this.onChangeCharacter} value={this.character} />
                <label for="name" class="form__label">¿El nombre de tu personajes es?</label>
              </div>
              <h2>
                ¿Quién eres?
              </h2>
              <div style={{width: '100%'}}>
                {dataToRender.map((person) => (
                  <InitialProfile id={person.id} person={person} inline style={{display: 'inline-block'}} onClick={this.onClickPerson} />
                ))}
              </div>
          </div>}
        </header>
        </div>
    );

  }
}

export default App;
