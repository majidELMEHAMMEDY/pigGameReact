import React, { Component } from 'react';

import './App.css';
import Player from './components/Player';

const MAX_SCORE = 10;
const initState = {
  players: [
    {
      nome: 'Player 1',
      score: 0,
      current: 0,
      active: true,
      winner: false
    },
    {
      nome: 'Player 2',
      score: 0,
      current: 0,
      active: false,
      winner: false
    },
  ],
  dice: 0,
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initState;

    this.rollDice = this.rollDice.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    this.holdDice = this.holdDice.bind(this);
    this.newGame = this.newGame.bind(this);

   
  }

  rollDice() {
    if (this.state.players.find(player => player.winner)) return;

    let dice = Math.floor(Math.random() * 6) + 1;
    this.setState({dice})

    if (dice !== 1) {
      let players = this.state.players.map(player => {
        if (player.active) {
          return {
            ...player,
            current: player.current + dice
          }
        }
        return player
      });
      this.setState({players})
      
    } else {
      this.nextPlayer();
    }
  }

  nextPlayer() {
    let players = this.state.players.map(player => {
      if (player.active) {
        return {
          ...player,
          active: !player.active,
          current: 0
        }
      }
      return {
        ...player,
        current: 0,
        active: !player.active
      }
    });
    this.setState({players, dice: 0})
  }

  holdDice() {
    if (this.state.players.find(player => player.winner)) return;
    
    let players = this.state.players.map(player => {
      if (player.active) {
        return {
          ...player,
          score: player.score + player.current
        }
      }
      return player;
    });
    this.setState({players}, () => {
      let hasWinner = this.state.players.find(player => player.score >= MAX_SCORE);
      if (hasWinner) {
        let players = this.state.players.map(player => {
          if (player.active) {
            return {
              ...player,
              nome: 'WINNER',
              winner: true
            }
          }
          return player
        })
        this.setState({players, dice: 0});
      } else {
        this.nextPlayer()
      }
    });
  }
  newGame() {
    this.setState(initState);
  }
    render(){
      let {players, dice} = this.state;
      return (
        <body>
        <main>
           {
          players.map(player => {
            return (
              <Player
                key={player.nome}
                score={player.score}
                current={player.current}
                active={player.active}
                nome={player.nome}
                winner={player.winner}
              />
            )
          })
        }
    
    {
          dice !== 0 && <img src={require(`./img/dice-${dice}.png`)} alt="Dice" className="dice" /> 
        }
          <button onClick={this.newGame} class="btn btn--new">🔄 New game</button>
          <button onClick={this.rollDice} class="btn btn--roll">🎲 Roll dice</button>
          <button onClick={this.holdDice} class="btn btn--hold">📥 Hold</button>
        </main>
        
      </body>
      );
    }

 
  
}

export default App;
