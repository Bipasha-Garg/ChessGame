import LineChart from "./LineChart";
import conversions from "./Datasets/conversions.json";
import gold_coin from "./Datasets/gold_coin.json";
import hikaru from "./Datasets/hikaru.json";
import magnus_resign from "./Datasets/magnus_resign.json";

function App() {
  //create array to store the white and black pieces' moves separately
  const categorizedPieces = {
    white: [],
    black: [],
  };
  var data = hikaru;
  //logic to separate the white and blacks
  for (const key in data) {
    const position = key.substring(0, 2);
    const moves = data[key];
    const color = /[a-h][1-2]/.test(position) ? "white" : "black";
    const pieceName = key.substring(2);
    categorizedPieces[color].push({ name: key, moves });
  }

// array to store the piecename white moves and black moves for the corresponding pair
  const pairedPieces = [];
  //white positions
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
  //black positions corresponding to the white positions
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
    // to store piece name , white and black move
    if (whitePiece && blackPiece) {
      let pieceName = whitePiece.name.substring(2);
      // differentiating between the pairs of pawn
      if (pieceName !== "king" && pieceName !=="queen") {
        pieceName = whitePiece.name[0] + " " + pieceName;
      }
      pairedPieces.push({
        pieceName: pieceName,
        whitemove: whitePiece.moves,
        blackmove: blackPiece.moves,
      });
    }
  });
//to count max moves
  let maxWhiteMoves = 0;
  let maxBlackMoves = 0;

  pairedPieces.forEach((pair) => {
    maxWhiteMoves = Math.max(maxWhiteMoves, pair.whitemove.length);
    maxBlackMoves = Math.max(maxBlackMoves, pair.blackmove.length);
  });
  console.log(pairedPieces);
//max moves in the whole game by a certain piece
  var result = 0;
  result = Math.max(maxWhiteMoves, maxBlackMoves);
 // storing positions
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
    {/* calling line chart for each pair */}
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
