import LineChart from "./LineChart";

function App() {
  var letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  var numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
  var positions = [];
  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
      positions.push(letters[i] + numbers[j]);
    }
  }
  return (
    <div className="grid grid-rows-2 grid-cols-8 justify-items-center h-[90vh] w-[100vw]">
      <LineChart
        pieceName="Pawn"
        movesWhite={["e2", "e4", "e4", "e4", "f5"]}
        movesBlack={["e7", "e5", "e5", "d4", "c3"]}
        positions={positions}
      ></LineChart>
      <LineChart
        pieceName="Pawn"
        movesWhite={["e2", "e4", "e4", "e4", "f5"]}
        movesBlack={["e7", "e5", "e5", "d4", "c3"]}
        positions={positions}
      ></LineChart>
      <LineChart
        pieceName="Pawn"
        movesWhite={["e2", "e4", "e4", "e4", "f5"]}
        movesBlack={["e7", "e5", "e5", "d4", "c3"]}
        positions={positions}
      ></LineChart>
      <LineChart
        pieceName="Pawn"
        movesWhite={["e2", "e4", "e4", "e4", "f5"]}
        movesBlack={["e7", "e5", "e5", "d4", "c3"]}
        positions={positions}
      ></LineChart>
    </div>
  );
}

export default App;
