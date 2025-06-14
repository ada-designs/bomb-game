import { useState } from "react";
import { useEffect } from "react";

const items = Array.from({ length: 30 }, (_, i) => i + 1);

const bombCountOptions = Array.from({ length: 7 }, (_, i) => i + 1);

export default function App() {
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // How many bombs we want to play with
  const [bombCount, setBombCount] = useState(3);

  // Array of (5) bombs with random numbers
  const [bombs, setBombs] = useState(() => generateBombs(bombCount));

  // Function for generating new bombs
  function generateBombs(bombCount) {
    return [...items].sort(() => 0.5 - Math.random()).slice(0, bombCount);
  }

  //

  // Count of remaining unopened boxes
  const [remainingCount, setRemainingCount] = useState(
    items.length - bombCount
  );

  useEffect(() => {
    setRemainingCount(items.length - bombCount);
  }, [bombCount]);

  // What happens on win
  useEffect(() => {
    if (remainingCount === 0) {
      setGameWon(true);
    }
  }, [remainingCount]);

  const [streak, setStreak] = useState(0);

  function restartGame(customCount = bombCount) {
    const newBombs = generateBombs(customCount);
    setBombs(newBombs);
    setGameOver(false);
    setGameWon(false);
    setRemainingCount(items.length - bombCount);
    setStreak(0);
  }

  return (
    <div
      className={`w-screen h-screen ${
        gameOver ? "bg-red-500" : gameWon ? "bg-green-500" : "bg-blue-200"
      } flex flex-col justify-start items-center gap-20 py-10`}
    >
      <div className="flex flex-col gap-10 items-center">
        {/* Title */}
        <h1
          className={`${
            gameOver || gameWon ? "text-white" : "text-black"
          } font-bold text-[5rem]`}
        >
          {gameOver
            ? "Game over!💥"
            : gameWon
            ? "Victory! What a glorious champion!🏆"
            : "Don't click on the bombs!🤯"}
        </h1>

        {/* All variables */}
        {!gameWon && (
          <div className="flex justify-between w-screen px-10">
            {/* Streak when game is on*/}
            {!gameOver && (
              <p className="text-xl text-black text-center  w-[500px] flex flex-col gap-5">
                <span className="flex justify-center items-center gap-2">
                  Current streak:
                  <span className="font-bold text-orange-500 text-3xl">
                    {streak}
                  </span>
                </span>
                <span className="text-[48px]">🔥</span>
              </p>
            )}

            {/* Streak when gameOver*/}
            {gameOver && (
              <p className="text-xl text-black text-center  w-[500px] flex flex-col gap-5">
                <span className="flex justify-center items-center gap-2 text-white">
                  Your streak was{" "}
                  <span className="font-bold text-yellow-400 text-3xl">
                    {streak}
                  </span>
                  !{" "}
                  {streak > 5
                    ? "Nice try! Try again!"
                    : "You can do better! Try again! "}
                </span>
                <span className="text-[48px]">{streak > 5 ? "😎" : "🤡"}</span>
              </p>
            )}

            <p className="text-xl text-black text-center  w-[500px] flex flex-col gap-5">
              <span
                className={`flex justify-center items-center gap-2 ${
                  gameOver ? "text-white" : "text-black"
                }`}
              >
                Bomb count:
                <span
                  className={`font-bold ${
                    gameOver ? "text-yellow-400" : "text-red-600"
                  } text-3xl`}
                >
                  {bombs.length}
                </span>
              </span>
              <span className="text-[48px]">💣</span>
            </p>

            {/* Boxes count when game is on*/}
            {!gameOver && (
              <p className="text-xl text-black text-center  w-[500px] flex flex-col gap-5">
                <span className="flex justify-center items-center gap-2">
                  {" "}
                  <span className="font-bold text-blue-600 text-3xl">
                    {remainingCount}
                  </span>{" "}
                  safe boxes remaining
                </span>
                <span className="text-[48px]">📦</span>
              </p>
            )}

            {/* Boxes count when gameOver*/}
            {gameOver && (
              <p className="text-xl text-black text-center  w-[500px] flex flex-col gap-5">
                <span className="flex justify-center items-center gap-2 text-white">
                  You had
                  <span className="font-bold text-yellow-300 text-3xl">
                    {remainingCount}
                  </span>{" "}
                  boxes remaining to win the game!
                </span>
                <span className="text-[48px]">😭</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Showing the boxes on game playing */}
      {!gameOver && !gameWon && (
        <ul className="grid grid-cols-10 gap-10">
          {items.map((item) => (
            <Boxes
              key={item}
              index={item}
              bombs={bombs}
              setGameOver={setGameOver}
              remainingCount={remainingCount}
              setRemainingCount={setRemainingCount}
              setStreak={setStreak}
            />
          ))}
        </ul>
      )}

      {/* Showing the button on game lost */}
      {gameOver && (
        <div className="flex flex-col  gap-10 items-center w-screen">
          <h2 className="text-[48px] font-bold ">You lost!</h2>
          <button
            className="w-[400px]"
            onClick={() => {
              setBombCount(bombCount);
              restartGame(bombCount);
            }}
          >
            Try again with {bombCount} bombs!💣
          </button>
          <p className="text-3xl text-center font-semibold italic">{`The bombs were in boxes: ${bombs.join(
            ", "
          )} 📦`}</p>

          <div className=" w-screen flex justify-center items-center gap-10 pt-10  border-t-2 border-white">
            <p className="text-3xl text-center">
              Try with different amount of bombs:
            </p>
            <ul className="flex gap-5">
              {bombCountOptions.map((value) => (
                <Option
                  value={value}
                  key={value}
                  setBombCount={setBombCount}
                  restartGame={restartGame}
                />
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Showing the button on game won */}
      {gameWon && (
        <div className="flex flex-col mt-20 gap-10 items-center">
          <h2 className="text-[48px] font-bold ">You won! What a beast!🦁</h2>
          <button
            className=""
            onClick={() => {
              setBombCount(bombCount);
              restartGame(bombCount);
            }}
          >
            Play again!
          </button>
          <p className="text-3xl text-center font-semibold italic">{`The bombs were in boxes ${bombs.join(
            ", "
          )} 📦`}</p>
        </div>
      )}
    </div>
  );
}

function Boxes({ index, bombs, setGameOver, setRemainingCount, setStreak }) {
  const [isClicked, setIsClicked] = useState(false);

  const isBomb = bombs.includes(index);

  return (
    <li
      className={`w-[100px] h-[100px] bg-blue-500
       flex justify-center items-center p-5 rounded-md cursor-pointer`}
      onClick={() => {
        setIsClicked(true);

        if (isBomb) {
          setGameOver(true);
        } else {
          setRemainingCount((count) => count - 1);
          setStreak((streak) => streak + 1);
        }
      }}
    >
      <p className="text-[2rem]">
        {isClicked ? (isBomb ? "💣" : index) : "❓"}{" "}
      </p>
    </li>
  );
}

function Option({ value, setBombCount, restartGame }) {
  return (
    <li
      className="w-[70px] h-[70px] bg-yellow-400
       flex justify-center items-center p-5 rounded-md cursor-pointer text-lg"
      onClick={() => {
        setBombCount(value);
        restartGame(value);
      }}
    >
      <p className="text-[2rem] flex gap-5 text-black">{`${value}💣`}</p>
    </li>
  );
}
