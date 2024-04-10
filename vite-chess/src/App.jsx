import LineChart from "./LineChart";
import conversions from "./Datasets/conversions.json";
import gold_coin from "./Datasets/gold_coin.json";

function App() {
  const keysArray = Object.keys(gold_coin);
  const positionsArray = keysArray.map((key, index) => [key, index]);
  const categorizedPieces = {
    white: [],
    black: [],
  };

  for (const key in gold_coin) {
    const position = key.substring(0, 2);
    const moves = gold_coin[key];
    const color = /[a-h][1-2]/.test(position) ? "white" : "black";
    const pieceName = key.substring(2); // Extract piece name
    categorizedPieces[color].push({ name: key, moves });
  }

  var letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  var numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
  var positions = [];
  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
      positions.push(letters[i] + numbers[j]);
    }
  }

  const pairedPieces = [];

  // Define the positions for pairing
  const whitePositions = [
    "a2",
    "b2",
    "c2",
    "d2",
    "e2",
    "f2",
    "g2",
    "h2",
    "a1",
    "b1",
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "h1",
  ];
  const blackPositions = [
    "a7",
    "b7",
    "c7",
    "d7",
    "e7",
    "f7",
    "g7",
    "h7",
    "a8",
    "b8",
    "c8",
    "d8",
    "e8",
    "f8",
    "g8",
    "h8",
  ];

  // Pair the pieces based on positions
  whitePositions.forEach((position, index) => {
    const whitePiece = categorizedPieces.white.find((piece) =>
      piece.name.startsWith(position)
    );
    const blackPiece = categorizedPieces.black.find((piece) =>
      piece.name.startsWith(blackPositions[index])
    );
    if (whitePiece && blackPiece) {
      pairedPieces.push({
        pieceName: whitePiece.name.substring(2),
        whitemove: whitePiece.moves,
        blackmove: blackPiece.moves,
      });
    }
  });
  let maxWhiteMoves = 0;
  let maxBlackMoves = 0;

  pairedPieces.forEach((pair) => {
    maxWhiteMoves = Math.max(maxWhiteMoves, pair.whitemove.length);
    maxBlackMoves = Math.max(maxBlackMoves, pair.blackmove.length);
  });

  var result = 0;
  result = Math.max(maxWhiteMoves, maxBlackMoves);


  return (
    <div className="grid grid-rows-2 grid-cols-8 justify-items-center h-[90vh] w-[100vw]">
      {pairedPieces.map((pair, index) => (
        <LineChart
          // key={index}
          pieceName={pair.pieceName}
          movesWhite={pair.whitemove}
          movesBlack={pair.blackmove}
          positions={positions}
          noOfMoves={result}
        />
      ))}
    </div>
  );
}

export default App;
