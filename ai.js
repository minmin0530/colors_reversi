    var setPieceArrayX = new Array();
    var setPieceArrayY = new Array();

class AI {
  constructor() {
  }

  displayPoint(newPoint) {
    for (var v  = 0; v  < playerNumber; v++ ) { point[v] = 0;
    for (var yy = 0; yy < fieldCellMax; yy++) {
    for (var xx = 0; xx < fieldCellMax; xx++) {
      if (aiFieldArrayArray[yy][xx] == v) {
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
    if (point[order % playerNumber] == 0) {
      this.displayPoint(1);
      return true;
    }
    var newPoint = 0;    
    for (var yy = 0; yy < fieldCellMax; yy++) {
    for (var xx = 0; xx < fieldCellMax; xx++) {
      if (aiFieldArrayArray[yy][xx] == order % playerNumber) {
        ++newPoint;
      }
    }
    }
    if (newPoint == (point[order % playerNumber] + 1) ) {
      for (var yy = 0; yy < fieldCellMax; yy++) {
      for (var xx = 0; xx < fieldCellMax; xx++) {
        aiFieldArrayArray[yy][xx] = aiFieldArrayArraySave[yy][xx];
      }
      }
      return false;
    } else {
      this.displayPoint(newPoint);
      return true;
    }
  }
  check2(x, y) {      
    if (aiFieldArrayArray[y][x] != -1) {
      return false;
    }

    if ( (y < fieldCellMax - 1 && aiFieldArrayArray[y + 1][x] != -1) ||
         (y > 0                && aiFieldArrayArray[y - 1][x] != -1) ||
         (x < fieldCellMax - 1 && aiFieldArrayArray[y][x + 1] != -1) ||
         (x > 0                && aiFieldArrayArray[y][x - 1] != -1) ||
         (x < fieldCellMax - 1 && y < fieldCellMax - 1 && aiFieldArrayArray[y + 1][x + 1] != -1) ||
         (x < fieldCellMax - 1 && y > 0                && aiFieldArrayArray[y - 1][x + 1] != -1) ||
         (x > 0                && y < fieldCellMax - 1 && aiFieldArrayArray[y + 1][x - 1] != -1) ||
         (x > 0                && y > 0                && aiFieldArrayArray[y - 1][x - 1] != -1) 
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
      aiFieldArrayArraySave[yy][xx] = aiFieldArrayArray[yy][xx];
      if (aiFieldArrayArray[yy][xx] == order % playerNumber) {
        //++point[order % playerNumber];
        ++p;
      }
    }
    }
    point[order % playerNumber] = p;
    if (order == 0) {
      return true;
    }

    //各２コマずつ置くまでひっくり返らない
    if (this.check2(x, y)){
      if (order < playerNumber * 2) {
        aiFieldArrayArray[y][x] = order % playerNumber;
//        globalXArray[order].push(x);
//        globalYArray[order].push(y);

//        for (var i = 0; i < fieldCellMax; ++i) {
//        for (var j = 0; j < fieldCellMax; ++j) {
//          ctx.beginPath();
//          if (aiFieldArrayArray[i][j] == -1) {
//            ctx.fillStyle = 'rgb(0,128,0)';        
//          } else {
//            ctx.fillStyle = colorArray[aiFieldArrayArray[i][j]];
//          }
//          ctx.arc(j * cellSize + fieldX + cellSize / 2, i * cellSize + fieldY + cellSize / 2, 30, 0, Math.PI / 180 * 2, true);
//          ctx.fill();                                             
//        }
//        }        
        
        var newPoint = 0;    
        for (var yy = 0; yy < fieldCellMax; yy++) {
        for (var xx = 0; xx < fieldCellMax; xx++) {
          if (aiFieldArrayArray[yy][xx] == order % playerNumber) {
            ++newPoint;
          }
        }
        }
        this.displayPoint(newPoint);
        //++order;
        return false;
      } else {
        return true;
      }

    }
    return false;    
  }

pass() {
    for (var y = 0; y < fieldCellMax; y++) {
    for (var x = 0; x < fieldCellMax; x++) {
      if (this.check2(x, y)) {

        for (var yy = 0; yy < fieldCellMax; yy++) {
        for (var xx = 0; xx < fieldCellMax; xx++) {
          aiFieldArrayArraySave[yy][xx] = aiFieldArrayArray[yy][xx];
        }
        }
        aiFieldArrayArraySave[y][x] = order % playerNumber;

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
            if (aiFieldArrayArraySave[yy][xx] == aiFieldArrayArraySave[y][x]) {//同色の場合
              for (var none = xx, noney = yy; (none != x || addx == 0) && (noney != y || addy == 0); none += addx, noney += addy) {//同色の箇所から数えていく
                if (aiFieldArrayArraySave[noney][none] == -1) {//コマなしの場合
                  break_flag = true;//ブレークする
                  break;
                }
              }
              if (break_flag == true) {
                break;
              }
              break_flag = false;
              for (var xxx = x, yyy = y; (xxx != xx || addx == 0) && (yyy != yy || addy == 0); xxx -= addx, yyy -= addy) {//置いた場所から数えていく
                aiFieldArrayArraySave[yyy][xxx] = aiFieldArrayArraySave[y][x];//同色の箇所まで塗っていく
                break_flag = true;//ブレークする
              }
              if (break_flag == true) {//同色の箇所まで塗れたらブレーク
                break;
              }
            }
          }      
        }

        if (order < playerNumber * 2) {
          return false;
        }
        if (point[order % playerNumber] == 0) {
          return false;
        }
        var newPoint = 0;    
        for (var yy = 0; yy < fieldCellMax; yy++) {
        for (var xx = 0; xx < fieldCellMax; xx++) {
          if (aiFieldArrayArraySave[yy][xx] == order % playerNumber) {
            ++newPoint;
          }
        }
        }
        if (newPoint == (point[order % playerNumber] + 1) ) {
/*      for (var yy = 0; yy < fieldCellMax; yy++) {
      for (var xx = 0; xx < fieldCellMax; xx++) {
        aiFieldArrayArraySave[yy][xx] = aiFieldArrayArraySave[yy][xx];
      }
      }*/
//      return false;
        } else {
          return false;
        }

      }
    }
    }
    return true;
  }    
    
  tipOver(x, y) {
    aiFieldArrayArray[y][x] = order % playerNumber;

    for (var v = 0; v < 8; v++) {//８方向
      var addx, addy;
      var rangex, rangey;
      if      (v == 0) {addx =  1; addy =  1; rangex = -1;           rangey = -1; }
      else if (v == 1) {addx = -1; addy =  1; rangex = fieldCellMax; rangey = -1; }
      else if (v == 2) {addx =  1; addy = -1; rangex = -1;           rangey = fieldCellMax; }
      else if (v == 3) {addx = -1; addy = -1; rangex = fieldCellMax; rangey = fieldCellMax; }
      else if (v == 4) {addx =  1; addy =  0; rangex = -1;           rangey = -1; }
      else if (v == 5) {addx = -1; addy =  0; rangex = fieldCellMax; rangey = fieldCellMax; }
      else if (v == 6) {addx =  0; addy =  1; rangex = -1;           rangey = -1; }
      else if (v == 7) {addx =  0; addy = -1; rangex = fieldCellMax; rangey = fieldCellMax; }
      for (var xx = x, yy = y; xx != rangex && yy != rangey; xx -= addx, yy -= addy) {//置いた箇所から数えていく
        var break_flag = false;
        if (aiFieldArrayArray[yy][xx] == aiFieldArrayArray[y][x]) {//同色の場合
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
            aiFieldArrayArray[yyy][xxx] = aiFieldArrayArray[y][x];//同色の箇所まで塗っていく
//            globalXArray[order].push(xxx);
//            globalYArray[order].push(yyy);
            break_flag = true;//ブレークする
          }
          if (break_flag == true) {//同色の箇所まで塗れたらブレーク
            break;
          }
        }
      }      
    }
  }

  setPieceXY(xx, yy) {
    var done = false;
    if (this.check(xx, yy)) {
      this.tipOver(xx, yy);

      if (this.check3()) {
//        for (var i = 0; i < fieldCellMax; ++i) {
//          for (var j = 0; j < fieldCellMax; ++j) {
//        
//            ctx.beginPath();
//            if (fieldArrayArray[i][j] == -1) {
//              ctx.fillStyle = 'rgb(0,128,0)';        
//            } else {
//              ctx.fillStyle = colorArray[fieldArrayArray[i][j]];
//            }
//            ctx.arc(j * cellSize + fieldX + cellSize / 2, i * cellSize + fieldY + cellSize / 2, 30, 0, Math.PI / 180 * 2, true);
//            ctx.fill();                                             
//          
//          }
//        }
        //order++;
        if (this.pass()) {
            //aiPass = true;
          var display_message = document.getElementById("message");
          display_message.innerHTML = "";
            display_message.innerHTML +=
              "<span style='font-size:32px;background-color:#888;color:" +
              colorArrayPoint[order % playerNumber] + ";padding:8px;'>" +
              "AIがパスです<button style='width:64px; height:42px; font-size:32px;' onClick='click_ok_button();'>OK</button>" +
              "</span>";
        } else {
          done = true;
        }
      }
    }
    return done;
    //aiFlag = true;
//    if (order < fieldCellMax * fieldCellMax) {
//      if (order % playerNumber != 0) {
//        ai.setPiece();
//      }
//    }
    
  }

  setPiece() {
    for (var yyy = 0; yyy < fieldCellMax; yyy++) {
    for (var xxx = 0; xxx < fieldCellMax; xxx++) {
        aiFieldArrayArray[yyy][xxx] = fieldArrayArray[yyy][xxx];
        aiFieldArrayArraySave[yyy][xxx] = fieldArrayArray[yyy][xxx];
    }
    }
    setPieceArrayX.length = 0;
    setPieceArrayY.length = 0;
    for (var x = 0; x < fieldCellMax; ++x) {
    for (var y = 0; y < fieldCellMax; ++y) {
      if (order < playerNumber * 2) {
          setPieceArrayX.push(x);
          setPieceArrayY.push(y);              
      } else {
        for (var yyy = 0; yyy < fieldCellMax; yyy++) {
        for (var xxx = 0; xxx < fieldCellMax; xxx++) {
          aiFieldArrayArray[yyy][xxx] = fieldArrayArray[yyy][xxx];
          aiFieldArrayArraySave[yyy][xxx] = fieldArrayArray[yyy][xxx];
        }
        }          
        if (this.setPieceXY(x,y)) {
          setPieceArrayX.push(x);
          setPieceArrayY.push(y);              
        }
      }
    }
    }
    if (order >= playerNumber * 2 && setPieceArrayX.length >= 1) {
//      this.setPiece();
//    }
      var rand = Math.floor( Math.random() * setPieceArrayX.length);
      piece.setPieceXY(setPieceArrayX[rand], setPieceArrayY[rand]);
    }
      if (order >= playerNumber * 2 && setPieceArrayX.length == 0) {
        aiPass = true;
      }
      
  }
}