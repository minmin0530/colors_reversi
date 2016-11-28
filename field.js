class Field {
  constructor() {

      //bodyタグの中のcanvasタグを呼んでいる
      var canvas = document.getElementById("screen");

      //canvasが不正だった場合にここで処理を終わる
      if ( !canvas | !canvas.getContext ) { return false; }

      //2D描画の準備をするe
      ctx = canvas.getContext("2d");

      //図形描画を開始
      ctx.beginPath();

      //色を指定、少し暗い緑色を指定                                                         
      ctx.fillStyle = 'rgb(0,128,0)';

      //四角を描画                                           
      ctx.fillRect(fieldX,fieldY,fieldSize,fieldSize);                          
                                                                                
      //線の幅を指定、幅2を指定                                                        
      ctx.lineWidth = 2;

      //図形描画を開始                                                        
      ctx.beginPath();

      //色を指定、黒色を指定                                                          
      ctx.fillStyle = 'rgb(0,0,0)';

      //繰り返しをする、繰り返しの間にxが0から9までカウントアップ                                             
      for (var x = 0; x < fieldCellMax + 1; ++x) {

        //線を引く開始点を指定、fieldX + x * cellSizeの位置とfieldYの位置を指定                                             
        ctx.moveTo(fieldX + x * cellSize, fieldY);

        //この指定位置まで線を引く、fieldX + x * cellSizeの位置とfieldY + fieldSizeの位置を指定                              
        ctx.lineTo(fieldX + x * cellSize, fieldY + fieldSize);
      }

      //上記の横線と同様に縦線も9本引く                                                                         
      for (var y = 0; y < fieldCellMax + 1; ++y) {                                             
        ctx.moveTo(fieldX,             fieldY + y * cellSize);                  
        ctx.lineTo(fieldX + fieldSize, fieldY + y * cellSize);                  
      }

      //現在のパスを描画                                                                         
      ctx.stroke();

      canvas.addEventListener('click', onClick, false);
    }
}