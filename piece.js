
class Piece {
  constructor() {
  }
  tipOver(x, y) {
    fieldArrayArray[y][x] = order % 8;
    for (var xx = x; xx >= 0; xx--) {//置いた箇所から数えていく
      var break_flag = false;
      if (fieldArrayArray[y][xx] == fieldArrayArray[y][x]) {//同色の場合
        for (var none = xx; none < x; none++) {//同色の箇所から数えていく
          if (fieldArrayArray[y][none] == -1) {//コマなしの場合
            break_flag = true;//ブレークする
            break;
          }
        }
        if (break_flag == true) {
          break;
        }
        break_flag = false;
        for (var xxx = x; xxx > xx; xxx--) {//置いた場所から数えていく
          fieldArrayArray[y][xxx] = fieldArrayArray[y][x];//同色の箇所まで塗っていく
          break_flag = true;//ブレークする
        }
        if (break_flag == true) {//同色の箇所まで塗れたらブレーク
          break;
        }
      }
    }

    for (var xx = x, yy = y; xx >= 0 && yy >= 0; xx--, yy--) {//置いた箇所から数えていく
      var break_flag = false;
      if (fieldArrayArray[yy][xx] == fieldArrayArray[y][x]) {//同色の場合
        for (var none = xx, noney = yy; none < x && noney < y; none++, noney++) {//同色の箇所から数えていく
          if (fieldArrayArray[noney][none] == -1) {//コマなしの場合
            break_flag = true;//ブレークする
            break;
          }
        }
        if (break_flag == true) {
          break;
        }
        break_flag = false;
        for (var xxx = x, yyy = y; xxx > xx && yyy > yy; xxx--, yyy--) {//置いた場所から数えていく
          fieldArrayArray[yyy][xxx] = fieldArrayArray[y][x];//同色の箇所まで塗っていく
          break_flag = true;//ブレークする
        }
        if (break_flag == true) {//同色の箇所まで塗れたらブレーク
          break;
        }
      }
    }      
      
    for (var xx = x; xx <= 8; xx++) {//置いた箇所から数えていく
      var break_flag = false;
      if (fieldArrayArray[y][xx] == fieldArrayArray[y][x]) {//同色の場合
        for (var none = xx; none > x; none--) {//同色の箇所から数えていく
          if (fieldArrayArray[y][none] == -1) {//コマなしの場合
            break_flag = true;//ブレークする
            break;
          }
        }
        if (break_flag == true) {
          break;
        }
        break_flag = false;
        for (var xxx = x; xxx < xx; xxx++) {//置いた場所から数えていく
          fieldArrayArray[y][xxx] = fieldArrayArray[y][x];//同色の箇所まで塗っていく
          break_flag = true;//ブレークする
        }
        if (break_flag == true) {//同色の箇所まで塗れたらブレーク
          break;
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

    this.tipOver(xx, yy);
      
    
    for (var i = 0; i < 8; ++i) {
      for (var j = 0; j < 8; ++j) {
        
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