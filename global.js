var piece;
var ctx;
var fieldX = 64;     //オセロ盤の位置Xに64を指定                                                          
var fieldY = 64;     //オセロ盤の位置Yに64を指定                                                     
var fieldSize = 512; //オセロ盤の大きさに512を指定
var cellSize = 64;   //オセロ盤の1マスの大きさに64を指定
var order = 0;
var colorArray = ['rgb(255,255,255)','rgb(0,0,0)','rgb(255,0,0)','rgb(0,0,255)','rgb(0,255,0)','rgb(255,255,0)','rgb(0,255,255)','rgb(255,0,255)'];
var fieldArrayArray = [
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1]
];