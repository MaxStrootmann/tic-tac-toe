import { useState } from "react";
import "./index.css";

export function App() {
  const board: Record<string, string> = {
    a1: "",
    b1: "",
    c1: "",
    a2: "",
    b2: "",
    c2: "",
    a3: "",
    b3: "",
    c3: "",
  };

  const lines: Record<string, Array<string>> = {
    a: [],
    b: [],
    c: [],
    1: [],
    2: [],
    3: [],
    d1: [],
    d2: [],
  };

  const [boardState, setBoardState] = useState(board);
  const [score, setScore] = useState(lines);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [moves, setMoves] = useState([{ boardState, lines }]);
  const [count, setCount] = useState(0);

  function checkWinner(setField: keyof typeof board) {
    const opponent = player === "X" ? "O" : "X";
    const colLine = score[setField[0]!]!;
    const rowLine = score[setField[1]!]!;
    const diagonalOne = score.d1!;
    const diagonalTwo = score.d2!;

    colLine.push(player);
    setScore(score);
    if (colLine.length === 3 && !colLine.includes(opponent)) setWinner(player);
    rowLine.push(player);
    setScore(score);
    if (rowLine.length === 3 && !rowLine.includes(opponent)) setWinner(player);

    const notInDiagonal = ["a2", "b1", "c2", "b3"].includes(setField);
    if (!notInDiagonal) {
      const diagonalOneFields = ["a1", "b2", "c3"];
      const diagonalTwoFields = ["c1", "b2", "a3"];

      if (diagonalOneFields.includes(setField)) diagonalOne.push(player);
      setScore(score);
      if (diagonalOne.length === 3 && !diagonalOne.includes(opponent))
        setWinner(player);

      if (diagonalTwoFields.includes(setField)) diagonalTwo.push(player);
      setScore(score);
      if (diagonalTwo.length === 3 && !diagonalTwo.includes(opponent))
        setWinner(player);
    }
    const currentMoves = moves.slice(0, count);
    currentMoves.push({ boardState, lines });
    setMoves(currentMoves);
    setCount(count + 1);
  }

  return (
    <div className="max-w-7xl flex mx-auto p-8 text-center relative z-10">
      <div>
        <h1 className="text-2xl pb-8">
          {winner === "" ? `Next player: ${player}` : `The winner is ${winner}`}
        </h1>
        <div className="w-max mx-auto grid grid-cols-3 border-2 border-white">
          {Object.entries(boardState).map((field) => (
            <button
              key={field[0]}
              className="cursor-pointer"
              onClick={() => {
                const newBoardState = { ...boardState, [field[0]]: player };
                setBoardState(newBoardState);
                checkWinner(field[0]);
                setPlayer(player === "X" ? "O" : "X");
              }}
            >
              <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
                {field[1]}
              </div>
            </button>
          ))}
        </div>
      </div>
      <ol className="pl-8 pt-16 grid border border-blue-200 h-54 w-auto auto-cols-max gap-2 list-inside">
        {moves.map((move, index) => (
          <button
            className="cursor-pointer p-2 rounded-lg h-min border w-max border-white"
            key={index}
            onClick={() => {
              setScore(move.lines);
              setBoardState(move.boardState);
              setCount(index + 1);
            }}
          >
            {index === 0 ? (
              <li className="list-decimal">Go to game start</li>
            ) : (
              <li className="list-decimal">go to move #{index}</li>
            )}
          </button>
        ))}
      </ol>
    </div>
  );
}

export default App;
