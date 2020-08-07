import React, { Component } from 'react';
import './circle.scss';
import './App.css';
import { db } from './firebase';
import _ from 'lodash';
import { ReactComponent as Ready } from './icons8-de-acuerdo.svg';
import styled, { css } from 'styled-components';

const createItems = (itemCount, circleSize) => {
  const angle = 360 / itemCount;
  let styles = '';
  let rot = 0;

  for (let i = 1; i <= itemCount; i += 1) {
    styles += `
      &:nth-of-type(${i}) {
        transform: rotate(${rot}deg) translate(${circleSize / 2}em) rotate(-${rot}deg);
      }
    `
    rot = rot + angle;
  }

  return css`${styles}`;
}


const CircleContainer = styled.ul`
  position: relative;
  width:  ${props => props.circleSize}em;
  height: ${props => props.circleSize}em;
  border-radius: 50%;
  padding: 0; 
  list-style: none;
  margin: 5em auto 0;
  border: solid 5px white;

  img { 
    display: block; 
    max-width: 100%; 
    border-radius: 50%;
    transition: .15s;
     
    &:hover {
      filter: grayscale(0);
    }
  }

  > * {
    display: block;
    position: absolute;
    top:  50%; 
    left: 50%;
    margin: -${props => props.itemSize / 2}em;
    width:  ${props => props.itemSize}em;
    height: ${props => props.itemSize}em;
  
    ${props => createItems(props.itemCount, props.circleSize)}
  }
`;


const InitialProfile = ({ person: { name, url, character }, circle, inline, ready, onClick, id }) => (
  <p className={`${inline ? 'inline' : ''}`} >
    <div style={{width: '100px', height: '100px', margin: 'auto', position: 'relative'}}>
      <img className={`profileImage ${circle ? 'circleImage' : ''}`} src={url} />
      {!ready
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
      participantes: [],
      player: null,
      round: 1,
      character: null,
      selectedPerson: false,
      id: null,
      ready: false
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
    db.collection('participantes').onSnapshot(snapshot => {
      const personas = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      this.setState({ participantes: personas});
    })
  }

  onRestartGame = () => {
    this.state.participantes.map((person) => db.collection('participantes').doc(person.id).delete());
    this.setState({ ready: false });
  }

  onClickPerson = (id) => {
    if (_.isEmpty(this.state.character) || this.state.selectedPerson) {
      this.campo.current.focus();
    } else {
      const persona = this.state.data.find((p) => p.id === id);
      // db.collection('personas').doc(id).update({ character: this.state.character });
      db.collection('participantes').add({
        ...persona,
        personId: persona.id,
        order: this.state.participantes.length + 1,
        character: this.state.character,
      })
      this.setState({id, ready: true})
    }
  }

  onChangeCharacter = (event) => {
    this.setState({ character: event.target.value })
  }

  getCharacter= (order) => {
    let myOrder = order + 1;
    if (myOrder === this.state.participantes.length + 1) {
      myOrder = 1;
    }
    return this.state.participantes.find((person) => person.order === myOrder) || {};
  }

  render() {
    const { data, participantes, round, player, ready } = this.state;
    const dataToRender = _.orderBy(participantes, 'order');
    return (
      <div className="App">
        <header className="App-header">
          <button className="myButton" onClick={this.onRestartGame}>Volver a empezar</button>
          {ready ? <CircleContainer itemCount={dataToRender.length} circleSize={30} itemSize={6}>
              {
                dataToRender.map(({url, name, personId, order}) => (
                  <li key={personId}>
                    {personId!== this.state.id && <div style={{color: '#11998e', backgroundColor: 'white', borderRadius: '10px', marginBottom: '5px', fontSize: '20px'}}>{this.getCharacter(order).character}</div>}
                    <img src={url}/>
                    <div style={{fontSize: '12px'}}>{name}</div>
                  </li>
                ))
              }
            </CircleContainer>
            : <div style={{width: '100%'}}>
              <h1>
                Elige un personaje
              </h1>
              <p>
                Piensa en un personaje real o de ficción. <br/>
                Te será asignado un personaje que otro jugador haya escogido para que tú trates de adivinar. <br/>
                Sólo puedes hacer preguntas que se respondan con "Sí", "No" o "No se sabe".
              </p>
              <div class="form__group field" >
                <input type="input" class="form__field" placeholder="Name" name="name" id='name' required ref={this.campo} onChange={this.onChangeCharacter} value={this.character} />
                <label for="name" class="form__label">¿El nombre de tu personaje es?</label>
              </div>
              <h2>
                ¿Quién eres?
              </h2>
              <div style={{width: '100%'}}>
                {data.map((person) => {
                  const ready = !_.isEmpty(participantes.find((p) => p.personId === person.id));
                  return (
                    <InitialProfile id={person.id} person={person} ready={ready} inline style={{display: 'inline-block'}} onClick={this.onClickPerson} />
                  );
                })}
              </div>
          </div>}
        </header>
        </div>
    );

  }
}

export default App;
