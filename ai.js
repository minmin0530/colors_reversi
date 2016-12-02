class AI {
  constructor() {
  }
  setPiece() {
    var setPieceArrayX = new Array();
    var setPieceArrayY = new Array();
    for (var x = 0; x < fieldCellMax; ++x) {
    for (var y = 0; y < fieldCellMax; ++y) {
      if (piece.check2(x, y)) {
        setPieceArrayX.push(x);
        setPieceArrayY.push(y);
      }        
    }
    }
    var rand = Math.floor( Math.random() * setPieceArrayX.length);
    piece.setPieceXY(setPieceArrayX[rand], setPieceArrayY[rand]);
      
  }
}