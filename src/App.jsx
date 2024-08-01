import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Carte image

function App() {
  const [searchText, setSearchText] = useState("");
  const nom = [{ name: "Cartes Manga" }];
  const users = [
    { imageUrl: "src/img/naruto.png", name: "Naruto" },
    { imageUrl: "src/img/one-piece.png", name: "One piece" },
    { imageUrl: "src/img/snk.png", name: "SNK" },
    { imageUrl: "src/img/fire-force.jpg", name: "Fire force" },
    { imageUrl: "src/img/bluelock.jpg", name: "Bluelock" },
    { imageUrl: "src/img/mha.png", name: "My Hero Academia" },
    { imageUrl: "src/img/assassin.png", name: "Assassination Classroom" },
    { imageUrl: "src/img/fairy-tail.jpg", name: "Fairy Tail" },
    { imageUrl: "src/img/demon.jpg", name: "Demon slayer" },
    { imageUrl: "src/img/hunter.jpg", name: "Hunter x Hunter" },
    { imageUrl: "src/img/wind.jpg", name: "Wind breaker" },
    { imageUrl: "src/img/dragon.png", name: "Dragon ball Z" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  function getRandomImages(users) {
    const shuffled = users.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

  const selectedImages = getRandomImages(users);

  return (
    <>
      <h1>{nom.map((nomItem) => nomItem.name).join(", ")}</h1>
      <input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="cards-container">
        {filteredUsers.map((user, index) => (
          <div className="card" key={index}>
            <img
              className="card-image"
              src={user.imageUrl}
              alt={"Photo " + user.name}
            />
            <div className="card-name">{user.name}</div>
          </div>
        ))}
      </div>
      <Game selectedImages={selectedImages} />
    </>
  );
}

// Jeu morpion carte

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value && <img src={value} alt="User icon" className="square-image" />}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, users }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    let imageUrl = xIsNext ? users[0].imageUrl : users[1].imageUrl;
    nextSquares[i] = imageUrl;

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Game({ selectedImages }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          users={selectedImages}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Barre de recherche et checkbox

function SearchBar({ filterText, onFilterTextChange }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </form>
  );
}

export default App;
