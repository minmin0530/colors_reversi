
class Piece {
  constructor() {
  }

  displayPoint(newPoint) {
    for (var v  = 0; v  < playerNumber; v++ ) { point[v] = 0;
    for (var yy = 0; yy < fieldCellMax; yy++) {
    for (var xx = 0; xx < fieldCellMax; xx++) {
      if (fieldArrayArray[yy][xx] == v) {
        ++point[v];
      }
    }
    }
    }
     
    var display_point = document.getElementById("point");
    display_point.innerHTML = "";
    for (var v = 0; v < playerNumber; v++) {
      if (v == order % playerNumber) {
        display_point.innerHTML += "<span style='font-size:32px;background-color:#888;color:" + colorArrayPoint[v] + ";padding:8px;'>" + newPoint + "</span>";
      } else {
        display_point.innerHTML += "<span style='font-size:32px;background-color:#888;color:" + colorArrayPoint[v] + ";padding:8px;'>" + point[v] + "</span>";
      }
    }   
  }
    
  check3() {
    if (order < playerNumber) {
      this.displayPoint(1);
      return true;
    }
    if (point[order % playerNumber] == 0) {
      this.displayPoint(1);
      return true;
    }
    var newPoint = 0;    
    for (var yy = 0; yy < fieldCellMax; yy++) {
    for (var xx = 0; xx < fieldCellMax; xx++) {
      if (fieldArrayArray[yy][xx] == order % playerNumber) {
        ++newPoint;
      }
    }
    }
    if (newPoint == (point[order % playerNumber] + 1) ) {
      for (var yy = 0; yy < fieldCellMax; yy++) {
      for (var xx = 0; xx < fieldCellMax; xx++) {
        fieldArrayArray[yy][xx] = fieldArrayArraySave[yy][xx];
      }
      }
      return false;
    } else {
      this.displayPoint(newPoint);
      return true;
    }
  }
  check2(x, y) {
    if (fieldArrayArray[y][x] != -1) {
      return false;
    }

    if ( (y < fieldCellMax - 1 && fieldArrayArray[y + 1][x] != -1) ||
         (y > 0                && fieldArrayArray[y - 1][x] != -1) ||
         (x < fieldCellMax - 1 && fieldArrayArray[y][x + 1] != -1) ||
         (x > 0                && fieldArrayArray[y][x - 1] != -1) ||
         (x < fieldCellMax - 1 && y < fieldCellMax - 1 && fieldArrayArray[y + 1][x + 1] != -1) ||
         (x < fieldCellMax - 1 && y > 0                && fieldArrayArray[y - 1][x + 1] != -1) ||
         (x > 0                && y < fieldCellMax - 1 && fieldArrayArray[y + 1][x - 1] != -1) ||
         (x > 0                && y > 0                && fieldArrayArray[y - 1][x - 1] != -1) 
       ) {
      return true;
    }
    return false;
  }
  check(x, y) {
    //point[order % playerNumber] = 0;
    var p = 0;
    for (var yy = 0; yy < fieldCellMax; yy++) {
    for (var xx = 0; xx < fieldCellMax; xx++) {
      fieldArrayArraySave[yy][xx] = fieldArrayArray[yy][xx];
      if (fieldArrayArray[yy][xx] == order % playerNumber) {
        //++point[order % playerNumber];
        ++p;
      }
    }
    }
    point[order % playerNumber] = p;
    if (order == 0) {
      return true;
    }
    return this.check2(x, y);
  }
  tipOver(x, y) {
    fieldArrayArray[y][x] = order % playerNumber;

    for (var v = 0; v < 8; v++) {//８方向
      var addx, addy;
      var rangex, rangey;
      if      (v == 0) {addx =  1; addy =  1; rangex = 0;            rangey = 0; }
      else if (v == 1) {addx = -1; addy =  1; rangex = fieldCellMax; rangey = 0; }
      else if (v == 2) {addx =  1; addy = -1; rangex = 0;            rangey = fieldCellMax; }
      else if (v == 3) {addx = -1; addy = -1; rangex = fieldCellMax; rangey = fieldCellMax; }
      else if (v == 4) {addx =  1; addy =  0; rangex = 0;            rangey = 0; }
      else if (v == 5) {addx = -1; addy =  0; rangex = fieldCellMax; rangey = fieldCellMax; }
      else if (v == 6) {addx =  0; addy =  1; rangex = 0;            rangey = 0; }
      else if (v == 7) {addx =  0; addy = -1; rangex = fieldCellMax; rangey = fieldCellMax; }
      for (var xx = x, yy = y; xx != rangex && yy != rangey; xx -= addx, yy -= addy) {//置いた箇所から数えていく
        var break_flag = false;
        if (fieldArrayArray[yy][xx] == fieldArrayArray[y][x]) {//同色の場合
          for (var none = xx, noney = yy; (none != x || addx == 0) && (noney != y || addy == 0); none += addx, noney += addy) {//同色の箇所から数えていく
            if (fieldArrayArray[noney][none] == -1) {//コマなしの場合
              break_flag = true;//ブレークする
              break;
            }
          }
          if (break_flag == true) {
            break;
          }
          break_flag = false;
          for (var xxx = x, yyy = y; (xxx != xx || addx == 0) && (yyy != yy || addy == 0); xxx -= addx, yyy -= addy) {//置いた場所から数えていく
            fieldArrayArray[yyy][xxx] = fieldArrayArray[y][x];//同色の箇所まで塗っていく
            break_flag = true;//ブレークする
          }
          if (break_flag == true) {//同色の箇所まで塗れたらブレーク
            break;
          }
        }
      }      
    }
  }

  setPiece(e) {
    var rect = e.target.getBoundingClientRect();                              
    var x = e.clientX - rect.left;                                                
    var y = e.clientY - rect.top;                                                 
    if (x < fieldX || x > fieldX + fieldSize ||                               
        y < fieldY || y > fieldY + fieldSize) {                               
      return;                                                                 
    }
    var xx = ~~((x - fieldX) / cellSize);
    var yy = ~~((y - fieldY) / cellSize);

    if (this.check(xx, yy)) {
      this.tipOver(xx, yy);

      if (this.check3()) {
        for (var i = 0; i < fieldCellMax; ++i) {
          for (var j = 0; j < fieldCellMax; ++j) {
        
            ctx.beginPath();
            if (fieldArrayArray[i][j] == -1) {
              ctx.fillStyle = 'rgb(0,128,0)';        
            } else {
              ctx.fillStyle = colorArray[fieldArrayArray[i][j]];
            }
            ctx.arc(j * cellSize + fieldX + cellSize / 2, i * cellSize + fieldY + cellSize / 2, 30, 0, Math.PI / 180 * 2, true);
            ctx.fill();                                             
          
          }
        }
        order++;
            
      }
    }
  }
}