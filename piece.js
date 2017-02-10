class Piece {
  constructor() {
    for (var v = 0; v < fieldCellMax * fieldCellMax; ++v) {
      globalXArray[v] = new Array();
      globalYArray[v] = new Array();
    }
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
    
  isTipOvered() {//ひっくり返ったコマがあるかの判定
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
  isExistNextTo(x, y) {//コマを置く隣にコマがあるかの判定
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
  isPutThePiece(x, y) {//コマを置いてもいいかの判定
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

    if (this.isExistNextTo(x, y)){    //コマを置く隣にコマがあるかの判定
      if (order < playerNumber * 2) { //各２コマずつ置くまでひっくり返らない
        fieldArrayArray[y][x] = order % playerNumber;
        globalXArray[order].push(x);
        globalYArray[order].push(y);
        
        var newPoint = 0;    
        for (var yy = 0; yy < fieldCellMax; yy++) {
        for (var xx = 0; xx < fieldCellMax; xx++) {
          if (fieldArrayArray[yy][xx] == order % playerNumber) {
            ++newPoint;
          }
        }
        }
        this.displayPoint(newPoint);
        ++order;
        return false;
      } else {
        return true;
      }

    }
        
  }
  pass() {
    for (var y = 0; y < fieldCellMax; y++) {
    for (var x = 0; x < fieldCellMax; x++) {
      if (this.isExistNextTo(x, y)) {

        for (var yy = 0; yy < fieldCellMax; yy++) {
        for (var xx = 0; xx < fieldCellMax; xx++) {
          fieldArrayArraySave[yy][xx] = fieldArrayArray[yy][xx];
        }
        }
        fieldArrayArraySave[y][x] = order % playerNumber;

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
            if (fieldArrayArraySave[yy][xx] == fieldArrayArraySave[y][x]) {//同色の場合
              for (var none = xx, noney = yy; (none != x || addx == 0) && (noney != y || addy == 0); none += addx, noney += addy) {//同色の箇所から数えていく
                if (fieldArrayArraySave[noney][none] == -1) {//コマなしの場合
                  break_flag = true;//ブレークする
                  break;
                }
              }
              if (break_flag == true) {
                break;
              }
              break_flag = false;
              for (var xxx = x, yyy = y; (xxx != xx || addx == 0) && (yyy != yy || addy == 0); xxx -= addx, yyy -= addy) {//置いた場所から数えていく
                fieldArrayArraySave[yyy][xxx] = fieldArrayArraySave[y][x];//同色の箇所まで塗っていく
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
          if (fieldArrayArraySave[yy][xx] == order % playerNumber) {
            ++newPoint;
          }
        }
        }
        if (newPoint == (point[order % playerNumber] + 1) ) {
        } else {
          return false;
        }

      }
    }
    }
    return true;
  }
  tipOver(x, y) {
    fieldArrayArray[y][x] = order % playerNumber;
    console.log("tipOver" + fieldArrayArray[y][x]);
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
            globalXArray[order].push(xxx);
            globalYArray[order].push(yyy);
              console.log("paint" + globalYArray[order].length);
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
    if (this.isPutThePiece(xx, yy)) {//コマを置いても良い
      this.tipOver(xx, yy);//コマをひっくり返す

      if (this.isTipOvered()) {//ひっくり返ったコマがあるか
        order++;
        if (this.pass()) {
          var display_message = document.getElementById("message");
          display_message.innerHTML = "";
            display_message.innerHTML +=
              "<span style='font-size:32px;background-color:#888;color:" +
              colorArrayPoint[order % playerNumber] + ";padding:8px;'>" +
              "パスです<button style='width:64px; height:42px; font-size:32px;' onClick='click_ok_button();'>OK</button>" +
              "</span>";
          passFlag = true;
        }
        done = true;
      } else {
        for (var yyy = 0; yyy < fieldCellMax; yyy++) {
        for (var xxx = 0; xxx < fieldCellMax; xxx++) {
          fieldArrayArray[yyy][xxx] = fieldArrayArraySave[yyy][xxx];
        }
        }
        globalXArray[order].length = 0;
        globalYArray[order].length = 0;
      }
    }
    aiFlag = true;
    
  }
  setPiece(e) {
      if (order > 0 && aiPass) {
        order++;
        vvv++;
        console.log("aiPass");
        aiPass = false;
      }
    if ((passFlag == false && order % 2 == 0) || order < 4) {
      var rect = e.target.getBoundingClientRect();                              
      var x = e.clientX - rect.left;                                                
      var y = e.clientY - rect.top;                                                 
      if (x < fieldX || x > fieldX + fieldSize ||                               
          y < fieldY || y > fieldY + fieldSize) {                               
        return;                                                                 
      }
      var xx = ~~((x - fieldX) / cellSize);
      var yy = ~~((y - fieldY) / cellSize);

      //コマが０の場合をチェック
      var p = 0;
      for (var yyy = 0; yyy < fieldCellMax; yyy++) {
      for (var xxx = 0; xxx < fieldCellMax; xxx++) {
        fieldArrayArraySave[yyy][xxx] = fieldArrayArray[yyy][xxx];
        if (fieldArrayArray[yyy][xxx] == order % playerNumber) {
          ++p;
        }
      }
      }
        
      if (order == 0 || (p == 0 && this.isPutThePiece(xx, yy))) {//コマが０なら
//      aiPass = false;
        globalXArray[order].push(xx);
        globalYArray[order].push(yy);
      }
  
      this.setPieceXY(xx, yy);
    }
  }
}

function click_ok_button() {
  var display_message = document.getElementById("message");
  display_message.innerHTML = "";
  if (order % playerNumber == 0) {
    aiFlag = true;
  ++order;
    ++vvv;
  }
  passFlag = false;
}

var aiFlag = false;
var vv = 0;
var vvv = 0;
class PlayGame {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.animation = 0;
  }
  move () {
      
    if (aiFlag) {
      this.animation++;
      if (this.animation > 50) {
        this.animation = 0;
        aiFlag = false;
        if (order <= fieldCellMax * fieldCellMax) {
          if (order % playerNumber != 0) {
            ai.setPiece();
          }
        }

      }
    
    }
  }
  draw () {
    if (order <= fieldCellMax * fieldCellMax && globalYArray[vvv].length > 0) {
      ctx.beginPath();
      ctx.fillStyle = colorArray[fieldArrayArray[globalYArray[vvv][vv]][globalXArray[vvv][vv]]];
      ctx.arc(globalXArray[vvv][vv] * cellSize + fieldX + cellSize / 2, globalYArray[vvv][vv] * cellSize + fieldY + cellSize / 2, 30, 0, Math.PI / 180 * 2, true);
      ctx.fill();

      console.log(globalXArray[vvv][vv] + ":" + globalYArray[vvv][vv] + ":" + fieldArrayArray[globalYArray[vvv][vv]][globalXArray[vvv][vv]]);
      if (vv < globalXArray[vvv].length - 1) {
        ++vv;
      } else {
        if (order > vvv){//vvv < globalXArray[vvv].length != 0) {
          ++vvv;
          vv = 0;
        }
      }
        
    }
      
  }
}


function mainLoop() {
  playGame.draw();
  playGame.move();
}