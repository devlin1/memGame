$(document).ready(function(){
// initiating blocks with initBlocks(12);
    initBlocks(12);
    setPairs();
    setImgsource("animals");
    $(".inGame.block").on( "click", updateSelected);
});

//shuffle around pairs
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//function for creating pairs 
function setPairs(){
    var aPairs=["A", "A", "B","B","C","C","D","D","E","E","F","F"];
    var rPairs = shuffleArray(aPairs);
    var blocks = document.getElementsByClassName("block");
    //add img of pairs
    for(i=0;i<blocks.length;i++){
        blocks[i].pair = aPairs[i];
	blocks[i].innerHTML = rPairs[i];
    }
}

//setting the blocks matching sourceimage of the game chosen
function setImgsource(game){
    if(game=="animals"){
	imgSrc = {
	    'A': "animal1",
	    'B': "animal2",
	    'C': "animal3",
	    'D': "animal4",
	    'E': "animal5",
	    'F': "animal6"
	};
	var blocks = document.getElementsByClassName("block");
	for(i=0;i<blocks.length;i++){
	    blocks[i].imgSrc = imgSrc[blocks[i].pair];
	}
    }
    if(game=="summer"){
	imgSrc = {
	    'A': "summer1",
	    'B': "summer2",
	    'C': "summer3",
	    'D': "summer4",
	    'E': "summer5",
	    'F': "summer6"
	};
	var blocks = document.getElementsByClassName("block");
	for(i=0;i<blocks.length;i++){
	    blocks[i].imgSrc = imgSrc[blocks[i].pair];
	}
    }
 }

//getting gamepictures , will set css content to .imgSrc of block thats sent in. from setPairs and returning imgsrc for matching  be replaces later by sqldb or something

// function for changing picture when clicked to imgSrc of the block 
function swapImgsource(blockId){
    block = document.getElementById(blockId);
    urlStr = "url(" + block.imgSrc +".png)";
    //changing to log to console 
      //alert(block +" " +urlStr);
    console.log("swapImgsource for block: "+block +" " +urlStr);
    block.style.content = urlStr;
}   
// function for restoring img to bg.jpg 
function restoreImgsource(blockId){
    block = document.getElementById(blockId);
    urlStr = 'url("bg.jpg")';
    //changing to log to console: 
      // alert("..restoreImgsource for block: " +blockId);
    console.log("restoreImgsource for block: " +blockId);
    block.style.content = urlStr;
}    

//compairing 2 selected blocks , returning boolean value, and adding to gTurns
function compareSelected(blockA, blockB){
    blockElementA = document.getElementById(blockA);
    blockElementB = document.getElementById(blockB);
    console.log("compareSelected( a b ) " + blockElementA.pair +" and "+blockElementB.pair);
if(blockElementA.pair == blockElementB.pair){
        console.log(blockElementA.imgSrc);
        console.log(blockElementB.imgSrc);
        console.log("correct! wehoo");
        return(true);
    }
    else {
        console.log(blockElementA.imgSrc);
	console.log(blockElementB.imgSrc);
	console.log("try again please. timer 2 secs");
	setTimeout(function(){
	    restoreImgsource(blockA);
	    restoreImgsource(blockB);
		   },2000);
	return(false);
    }
}

//updating selected block and checking if 2 blocks is selected, then do compare
function updateSelected()
{
    blockId = this.id;
    if($(this).hasClass("inGame")){
	console.log("UpdateSelected() is inGame: doing swap of img for "+blockId);
	$(this).toggleClass("selected imgBg");
	swapImgsource(blockId); 
    }
    var countOfSelected = document.getElementsByClassName("inGame selected");
    console.log("UpdateSelected() length of countOfSelected: " +countOfSelected.length);
    if (countOfSelected.length > 2)
    {
	console.log("Count is > 2");
	$(".inGame.selected").removeClass("selected");
	console.log("removing class selected for selected inGame elements");
	$(this).toggleClass("selected");
    }
    if (countOfSelected.length == 2)
    {
        console.log("Count is "+countOfSelected.length +" .. compare the 2 id´s of : "+countOfSelected[0].id + " and "+countOfSelected[1].id);
	if(compareSelected(countOfSelected[0].id, countOfSelected[1].id)==false)
        {
	    $(".inGame.selected").toggleClass("selected");
	    console.log("toggle class selected when not the same..");

        }
        else
        {
            $(".inGame.selected").removeClass("inGame selected");
	    console.log("the same.. removing inGame and selected");
	}	    
    };
};

function initBlocks(numOfBlocks){
    var board = document.getElementById("board");
    var rNum = new Array();	
   for (var i=0; i < numOfBlocks;i++)
    {
		var div = document.createElement('div');
		board.appendChild(div);
	    	rNum[i] = Math.floor((Math.random()*10)+1);
		div.className = 'block';
        	div.id = i;
		$("board.div").addClass("block");
	    	$(".block").addClass("inGame imgBg");
    }
};
