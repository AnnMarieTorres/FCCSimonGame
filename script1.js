var baseUrl ='https://s3.amazonaws.com/freecodecamp/'; 
var audio =['simonSound1.mp3','simonSound2.mp3','simonSound3.mp3','simonSound4.mp3'];
var switchCount=1;
var strict=false;
var turns=[];
var playerTurns=[];
var playerTurnCount=0;
var pushNumber;

$(document).ready(function(){

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
		
		
	});
	$('.strictButton').click(function(){
		if(switchCount%2===0){
			$('.ledLight').toggleClass('ledOn');
		
			strict = $('.ledLight').hasClass('ledOn');	
			
		}
		
	});
	function gamePlay(){
		if(turns.length>0){
			console.log('playTurnsArry() '+turns);
			playTurnsArray();
			setTimeout(function(){
				randomPlay();
			},1000);
			
		}else{
			randomPlay();
			
		}
		yourPlay();	
	}
	function yourPlay(){
		
		playerTurnCount=0;

		if(playerTurns.length<turns.length){
			colorsClickable();
		}else{
			colorsUnclickable();
			playerTurns=[];
			
		}
		
	}
	function randomPlay(){
		var randomNumber=Math.floor(Math.random()*4);
		turns.push(randomNumber)
		$('.color'+randomNumber).removeClass('color'+randomNumber+'Off').addClass('color'+randomNumber+'On');
		console.log('line 87 randomNumber '+randomNumber);
		new Audio(baseUrl+audio[randomNumber]).play();
		setTimeout(function(){
			$('.color'+randomNumber).removeClass('color'+randomNumber+'On').addClass('color'+randomNumber+'Off');
		},500);
		//$('.color'+randomNumber).removeClass('color'+randomNumber+'Off').addClass('color'+randomNumber+'On');
		
	}
	function playTurnsArray(){
		//plays the array
		
		colorsUnclickable();

		for (var i = 0; i<turns.length-1; i++){
			setTimeout(function(){
				$('.color'+turns[i]).removeClass('color'+turns[i]+'Off').addClass('color'+turns[i]+'On');
				console.log('line 103 turns[i] '+turns[i]);
				new Audio(baseUrl+audio[turns[i]]).play();
				setTimeout(function(){
					$('.color'+turns[i]).removeClass('color'+turns[i]+'On').addClass('color'+turns[i]+'Off');
					},500);
			},500);
			
		}
		
		
	}

	function colorsClickable(){
		$('.push').removeClass('unclickable').addClass('clickable');	
	}

	function colorsUnclickable(){
		$('.push').removeClass('clickable').addClass('unclickable');
	}

	$('.push').mousedown(function(){
		//light change and sound
		pushNumber=$(this).attr("value");
		$('.color'+pushNumber).removeClass('color'+pushNumber+'Off').addClass('color'+pushNumber+'On');
		console.log('line 125 pushNumber '+pushNumber);
		new Audio(baseUrl+audio[pushNumber]).play();
	});
	$('.push').mouseup(function(){
		//turn off light and stop sound
		pushNumber=$(this).attr("value");
		$('.color'+pushNumber).removeClass('color'+pushNumber+'On').addClass('color'+pushNumber+'Off');
	
	});
	$('.push').click(function(){
		if($(this).attr("value")==turns[playerTurnCount] && playerTurnCount<turns.length-1){
			playerTurnCount++;
			playerTurns.push($(this).attr("value"));
			
			console.log('if');
		}else if($(this).attr("value")==turns[playerTurnCount] && playerTurnCount==turns.length-1){
			playerTurnCount++;
			playerTurns.push($(this).attr("value"));
			console.log('else if '+playerTurns);
			yourPlay();
			gamePlay();
			
		}else{
			//light and play bad go sound
			console.log('line 134 error wrong color pressed');
			//error
			console.log('else');
		}
		
	});

});