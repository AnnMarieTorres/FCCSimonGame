// // sounds...
// https://s3.amazonaws.com/freecodecamp/simonSound1.mp3, 
// https://s3.amazonaws.com/freecodecamp/simonSound2.mp3, 
// https://s3.amazonaws.com/freecodecamp/simonSound3.mp3, 
// https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.


var switchCount=1;
var strict=false;
var turns=[];
var playerTurns=[];
var playerTurnCount=0;
var randomNumber;
var pushNumber;

$(document).ready(function(){

	function gamePlay(){
		console.log('line 19 turns array: '+turns.length);
		if(turns.length>0){
			playTurnsArray();
		}
		randomPlay();
		
		
		console.log('line 29 turns[] '+turns);
		
		
		yourPlay();

	}
	function randomPlay(){
		randomNumber=Math.floor(Math.random()*4);
		turns.push(randomNumber)
		$('.color'+randomNumber).removeClass('color'+randomNumber+'Off').addClass('color'+randomNumber+'On');
		setTimeout(function(){
			$('.color'+randomNumber).removeClass('color'+randomNumber+'On').addClass('color'+randomNumber+'Off');
		},500);
		//$('.color'+randomNumber).removeClass('color'+randomNumber+'Off').addClass('color'+randomNumber+'On');
		
	}
	function yourPlay(){
		if(playerTurns.length<=turns.length){
			colorsClickable();
		}else{
			colorsUnclickable();
			
		}
		 console.log('line 48 playerTurns[] '+playerTurns);
	}

	function colorsClickable(){
		$('.push').removeClass('unclickable').addClass('clickable');
		

	}
	function colorsUnclickable(){
		$('.push').removeClass('clickable').addClass('unclickable');
	}
	function gameError(){
		//handle game error
	}
	function playTurnsArray(){
		//plays the array
		colorsUnclickable();

		for (var i = 0; i<turns.length; i++){
			console.log('line 72 i: '+i+' turns.length: '+turns.length);
			$('.color'+randomNumber).removeClass('color'+randomNumber+'Off').addClass('color'+randomNumber+'On');
			setTimeout(function(){
				$('.color'+randomNumber).removeClass('color'+randomNumber+'On').addClass('color'+randomNumber+'Off');
			},500);
		}
		
		yourPlay();
	}

	

	$('.switchButton').click(function(){
		switchCount++;
		if(switchCount%2===0){
			$(".switchButton").removeClass('switchButtonOff').addClass('switchButtonOn');
			$('.switchBox').removeClass('switchBoxOff').addClass('switchBoxOn');
			$('.screen').text('--');

		}else{
			$(".switchButton").removeClass('switchButtonOn').addClass('switchButtonOff');
			$('.switchBox').removeClass('switchBoxOn').addClass('switchBoxOff');
			if($('.ledLight').hasClass('ledOn')){
				$('.ledLight').toggleClass('ledOn');
				strict = $('.ledLight').hasClass('ledOn');
			}
			$('.screen').text('');
		}
		
		// $('.switchButton').toggleClass('switchButtonOn');
		// $('.switchBox').toggleClass('switchBoxOn');
		
	});
	$('.startButton').click(function(){
		
		turns=[];
		playerTurnCount=0;
		playerTurns=[];
		if(switchCount%2===0){
			
			$('.screen').text(turns.length);
			
			gamePlay();
			//call game play
		}
		
		console.log('line 117 turns.length'+turns.length);
		console.log('line 118 turns.length'+playerTurns.length);
	});
	$('.strictButton').click(function(){
		if(switchCount%2===0){
			$('.ledLight').toggleClass('ledOn');
		
			strict = $('.ledLight').hasClass('ledOn');	
			console.log(strict);
		}
		
	});
	$('.push').mousedown(function(){
		//light change and sound
		pushNumber=$(this).attr("value");
		$('.color'+pushNumber).removeClass('color'+pushNumber+'Off').addClass('color'+pushNumber+'On');
		
	});
	$('.push').mouseup(function(){
		//turn off light and stop sound
		pushNumber=$(this).attr("value");
		$('.color'+pushNumber).removeClass('color'+pushNumber+'On').addClass('color'+pushNumber+'Off');
	
	});
	$('.push').click(function(){
		if($(this).attr("value")==turns[playerTurnCount]){
			playerTurnCount++;
			playerTurns.push($(this).attr("value"));
			yourPlay();
		}else{
			console.log('line 134 error wrong color pressed');
			//error
		}
		
	});

	// 		yourPlay();
	// 	}else{
	// 		//error
	// 	}
	// });

	
});