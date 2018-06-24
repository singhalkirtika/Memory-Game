var cards = [
  {
    name: 'tweety',
    id : 1,
    img: 'images//tweety.jpg'
  },
  {
    name: 'doraemon',
    id : 2,
    img: 'images//doraemon.jpg'
  },
  {
    name: 'popeye',
    id : 3,
    img: 'images//popeye.jpg'
  },
  {
    name: 'pooh',
    id : 4,
    img: 'images//pooh.jpg'
  },
  {
    name: 'noody',
    id : 5,
    img: 'images//noody.jpg'
  },
  {
    name: 'micky',
    id : 6,
    img: 'images//micky.jpg'
  },
  {
    name: 'donald',
    id : 7,
    img: 'images//donald.jpg'
  },
  {
    name: 'tom',
    id : 8,
    img: 'images//tom.jpg'
  }
];

var memory_values = [];
var memory_tile_ids = [];
var count = 0;
var newArray = cards.concat(cards);
var tiles_flipped = 0;

Array.prototype.tile_shuffle = function(){
   var i = newArray.length, j, temp;
   while(--i>0){
     j = Math.floor(Math.random()*(i+1));
     temp = newArray[j];
     newArray[j] = newArray[i];
     newArray[i] = temp;
   }
}

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
var h = 0;
window.onload = newBoard;

function newBoard(){
    tiles_flipped = 0;
    var output = '';
    second = 0;
    minute = 0;
    hour = 0;
    count = 0;
    h = 0;
    newArray.tile_shuffle();
    for(var i = 0;i<newArray.length;i++){
      output += '<button id="tile_'+i+'" onclick = "memoryFlipTile(this,\''+newArray[i].name+'\',\''+newArray[i].id+'\',\''+newArray[i].img+'\')"></button>' ;
    }
    document.getElementsByClassName('moves')[0].innerHTML = "0 Move(s)";
    document.getElementsByClassName('timer')[0].innerHTML = '0hrs 0mins 0secs';
    document.getElementsByClassName('memory_board')[0].innerHTML = output;
    document.getElementsByClassName('congrats')[0].style.visibility = "hidden";
    document.getElementsByClassName('test')[0].style.opacity = "1";
};

function time(){
  interval = setInterval(function(){
      document.getElementsByClassName('timer')[0].innerHTML = hour+"hrs "+minute+"mins "+second+"secs";
      second++;
      if(second == 60){
          minute++;
          second=0;
      }
      if(minute == 60){
          hour++;
          minute = 0;
      }
  },1000);
}

function memoryFlipTile(tile, name, id, image){
  if(h===0){
     time();
  }
  h +=1;
  if(tile.innerHTML == "" && memory_values.length<2){
    document.getElementById(tile.id).className = 'clN';
    function hold(){
    tile.style.backgroundImage = 'url(\"'+image+'\")';
  }
  setTimeout(hold,200);
    if(memory_values.length===0){
      memory_values.push(name);
      memory_tile_ids.push(tile.id);
    }
    else if (memory_values.length===1 && memory_tile_ids[0]!=tile.id) {
      memory_values.push(name);
      memory_tile_ids.push(tile.id);
      if(document.getElementById(memory_tile_ids[0]).disabled != true){
        count +=1;
        document.getElementsByClassName('moves')[0].innerText = count+" Move(s)";
      }
      if(memory_values[0]===memory_values[1]){
        tiles_flipped +=2;
        document.getElementById(memory_tile_ids[0]).disabled = true;
        document.getElementById(memory_tile_ids[1]).disabled = true;
        memory_values = [];
        memory_tile_ids = [];
        if(tiles_flipped === newArray.length){
          function generate(){
              // alert("Board cleared....generating new Board");
              document.getElementsByClassName('memory_board').innerHTML='';
              document.getElementsByClassName('congrats')[0].style.visibility = "visible";
              document.getElementsByClassName('test')[0].style.opacity = "0.5";
              var output= "<div><i>Congratulation</i><div>";
              output += "<div>You have made "+count+" moves</div>";
              output += "<div>Time Taken "+minute+"mins:" +second+"secs</div>";
              output+= '<button onclick="newBoard()">Play Again</button>';
              document.getElementsByClassName('congrats')[0].innerHTML = output;
              clearInterval(interval);
        }
        setTimeout(generate,700);
        }
      }

    else{
      function flipBack(){
        document.getElementById(memory_tile_ids[0]).style.backgroundImage =  'url("images//black2.jpg")' ;
        document.getElementById(memory_tile_ids[1]).style.backgroundImage =  'url("images//black2.jpg")' ;
        document.getElementById(memory_tile_ids[0]).className = 'another';
        document.getElementById(memory_tile_ids[1]).className = 'another';
        memory_values = [];
        memory_tile_ids = [];
      }

      setTimeout(flipBack,700);
    }
    }
  }
}
