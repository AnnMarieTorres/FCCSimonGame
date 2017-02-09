// // sounds...
// https://s3.amazonaws.com/freecodecamp/simonSound1.mp3, 
// https://s3.amazonaws.com/freecodecamp/simonSound2.mp3, 
// https://s3.amazonaws.com/freecodecamp/simonSound3.mp3, 
// https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.


var switchCount=1;
var strict=false;
$(document).ready(function(){

	function gamePlay(){
		//playGame
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
		
		console.log($(this).attr('class'));
	});
	$('.startButton').click(function(){
		if(switchCount%2===0){
			$('.screen').text('00');
		}
		
		console.log($(this).attr('class'));
	});
	$('.strictButton').click(function(){
		if(switchCount%2===0){
			$('.ledLight').toggleClass('ledOn');
			console.log($(this).attr('class'));
			strict = $('.ledLight').hasClass('ledOn');	
			console.log(strict);
		}
		
	});
	
});