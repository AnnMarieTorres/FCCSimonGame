var baseUrl ='https://s3.amazonaws.com/freecodecamp/'; 
var audio =['simonSound1.mp3','simonSound2.mp3','simonSound3.mp3','simonSound4.mp3'];
var switchCount=1;
var strict=false;
var turns=[];
var playerTurns=[];
var playerTurnCount=0;
var pushNumber;
var count=0;
var x=0;
var colorMissed=false;
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
		
		reset();
		if(switchCount%2===0){
			
			$('.screen').text(turns.length);
			
			gamePlay();
			//call game play
		}
		
		
	});

	function reset(){
		turns=[];
		playerTurnCount=0;
		playerTurns=[];
		strict=false;
		pushNumber;
		count=0;
		x=0;
		colorMissed=false;
	}

	$('.strictButton').click(function(){
		if(switchCount%2===0){
			$('.ledLight').toggleClass('ledOn');
		
				
			
		}
		strict = $('.ledLight').hasClass('ledOn');
		
	});
	function gamePlay(){
		if(colorMissed===true){
			colorMissed=false;
			playerTurnCount=0;
			x=0;
			initTimeOut(x);
		}
		else if(turns.length>0){
			console.log('line 59 gamePlay() turns.length>0');
			console.log('playTurnsArry() '+turns);
			playerTurnCount=0;
			x=0;
			$('.screen').text(turns.length+1);
			randomPlay();
			initTimeOut(x);
			
			
		}else{
			console.log('line 67 gamePlay() else');
			
			randomPlay();
			initTimeOut(x);
			
		}
		yourPlay();	
	}
	function yourPlay(){
		
		

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
		
		//$('.color'+randomNumber).removeClass('color'+randomNumber+'Off').addClass('color'+randomNumber+'On');
		
	}


 //    function initiateTimeOut(i) {
 //    setTimeout(function() { doStuff(i) }, 3000);
	// }
	// function doStuff() {
	//     console.log(i);
	//     i++;
	//     if (i <= 10) {
	//         initiateTimeOut(i); 
	//     }
	// }

	// var i = 0;

	// initiateTimeOut(i);


	function initTimeOut(x){
		var playThis= setInterval(function()
			{
				playTurnsArray(x)
				x++;
				console.log('count update '+x+' '+turns.length);
				//$('.screen').text(x);
				if(x==turns.length){
					clearInterval(playThis);
				}


			},1200);

				
	}


	function playTurnsArray(x){
		//plays the array
		//colorsUnclickable();
			
			$('.color'+turns[x]).removeClass('color'+turns[x]+'Off').addClass('color'+turns[x]+'On');			
			setTimeout(function(){
				$('.color'+turns[x]).removeClass('color'+turns[x]+'On').addClass('color'+turns[x]+'Off');
				},900);
				new Audio(baseUrl+audio[turns[x]]).play();
			
		// for(var i = 0; i<turns.length; i++){
		// 	console.log('for loop in playTurnsArray line 105 i = '+i);
		// 	setTimeout(function(){
		// 		console.log('line 107 play turn i= '+i);
		// 		$('.color'+turns[i-1]).removeClass('color'+turns[i-1]+'Off').addClass('color'+turns[i-1]+'On');
		// 		console.log('line 109 turns[i] '+turns);
		// 		new Audio(baseUrl+audio[turns[i-1]]).play();
		// 		setTimeout(function(){
		// 			$('.color'+turns[i-1]).removeClass('color'+turns[i-1]+'On').addClass('color'+turns[i-1]+'Off');
		// 			},500);
		// 	},500);
			
		// }
		
		
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
			if (playerTurnCount===20){
				new Audio('winningSound.mp3').play();
				alert('You Win');
			}else{
				playerTurns.push($(this).attr("value"));
				console.log('else if '+playerTurns);
				yourPlay();
				gamePlay();
			}
			
			
		}else{
			console.log(turns[playerTurnCount]);
			if(strict===true){
				new Audio('buzzerSound.mp3').play();
				alert('You lost');
				//reset()
			}
			else{
				colorMissed=true;
				new Audio('buzzerSound.mp3').play();
				alert('Wrong Color try again');
				gamePlay();
			}
			
			
			//light and play bad go sound
			
			//error
			
		}
		
		
	});

});