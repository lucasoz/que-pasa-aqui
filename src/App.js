import React, { Component } from 'react';
import './circle.scss';
import './App.css';

const Profile = ({ person: { name, url }, circle }) => (
  <p>
    <img className={`profileImage ${circle && 'circleImage'}`} src={url} />
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
          id: 1,
          name: 'Lucas Muñoz',
          url: 'https://ca.slack-edge.com/TFWC51JTX-UTSAF1USK-e30aef7d6038-512',
        },
        {
          id: 2,
          name: 'Marco',
          url: 'https://ca.slack-edge.com/TFWC51JTX-UFWCG3877-456c6f007993-512',
        },
        {
          id: 3,
          name: 'Andrea Solórzano',
          url: 'https://ca.slack-edge.com/TFWC51JTX-U01718UQTSN-e18c4e8f2ab9-512',
        },
        {
          id: 4,
          name: 'C. Daniel Sanchez R.',
          url: 'https://ca.slack-edge.com/TFWC51JTX-UFWCBQ7L5-383af0f655f9-512',
        },
        {
          id: 5,
          name: 'Camilo Parra Mariño',
          url: 'https://ca.slack-edge.com/TFWC51JTX-UTSPV2KNJ-ac34c5ebacc9-512',
        },
        {
          id: 6,
          name: 'Daniel Marulanda',
          url: 'https://ca.slack-edge.com/TFWC51JTX-UFXJR1JRL-dda096ccc35d-512',
        },
        {
          id: 7,
          name: 'Jesús Márquez',
          url: 'https://ca.slack-edge.com/TFWC51JTX-UFVHV31S5-f276e185a354-512',
        },
        {
          id: 8,
          name: 'Mariel Baquero',
          url: 'https://ca.slack-edge.com/TFWC51JTX-U01661EJV9D-a585e8482752-512',
        },
        {
          id: 9,
          name: 'Parker Irving',
          url: 'https://ca.slack-edge.com/TFWC51JTX-UFX9TAMM1-3ddc1bf9df01-512',
        },
        {
          id: 10,
          name: 'Vincent Restrepo',
          url: 'https://ca.slack-edge.com/TFWC51JTX-UHRSS19RR-d5c42389a731-512',
        }
      ],
      round: 1,
    }
  }

  onClick = () => {
    const newData = this.state.data.sort(function (a, b) { return 0.5 - Math.random() });
    this.setState({data: newData});
  }

  render() {
    const { data, round } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p className="title">
            <button className="myButton" onClick={() => this.setState({ round: 1 })}>1</button>
            <button className="myButton" onClick={() => this.setState({ round: 2 })}>2</button>
            <strong className="titleText">¿Qué está pasando?</strong>
            <button className="myButton" onClick={this.onClick}>Mentira</button>
          </p>
          {round === 1 &&
            <div class="grid-container">
              <div></div>
              <div><Profile person={data[0]} /></div>
              <div><Profile person={data[1]} /></div>
              <div><Profile person={data[2]} /></div>
              <div></div>
              <div><Profile person={data[3]} /></div>
              <div className="paint"> </div>
              <div className="paint"></div>
              <div className="paint"> 12 </div>
              <div> <Profile person={data[4]} /> </div>
              <div><Profile person={data[5]} /></div>
              <div className="paint"> </div>
              <div className="paint"> </div>
              <div className="paint"> </div>
              <div> <Profile person={data[6]} /> </div>
              <div>  </div>
              <div> <Profile person={data[7]} /> </div>
              <div> <Profile person={data[8]} /> </div>
              <div> <Profile person={data[9]} /> </div>
              <div></div>
              
            </div>
          }
          {round === 2 &&
            <ul class="circle-container">
              {
                data.map(({url, name}) => (
                  <li>
                    <img src={url}/>
                    {name}
                  </li>
                ))
              }
            </ul>
          }
        </header>
      </div>
    );

  }
}

export default App;
