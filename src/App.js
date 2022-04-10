import MarvelServise from './services/MarvelServise'

import logo from './logo.svg';
import './App.css';



const marvelServise = new MarvelServise;

//marvelServise.getAllCharacters()
//    .then(res => console.log(res.data.results.forEach(item => console.log(item.name, item.id))))

marvelServise.getCharacter('1010338')
    .then(res => console.log(res))

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
