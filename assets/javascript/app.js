var triviaQuestions = [{
    question: "What was the first national park in America?",
    answerOptions: ["Death Valley National Park", "Yosemite National Park", "Acadia National Park", "Yellowstone National Park"],
    answer: 3
},{
    question: "What national park is home to the world's largest tree by volume?",
    answerOptions: ["Redwood National Park", "Sequoia National Park", "Everglades National Park", "Joshua Tree National Park"],
    answer: 1 
},{
    question: "What national park is home to the longest cave system in the world?",
    answerOptions: ["Mammoth Cave National Park", "Canyonlands National Park", "Carlsbad Caverns National Park", "Great Basin National Park"],
    answer: 0 
},{
    question: "What state contains the most national parks?",
    answerOptions: ["Colorado", "Utah", "Alaska", "California"],
    answer: 3 
},{
    question: "What is the most visited national park?",
    answerOptions: ["Yosemite National Park", "Grand Canyon National Park", "Great Smoky Mountains National Park", "Rocky Mountain National Park"],
    answer: 2 
},{
    question: "What is the least visited national park?",
    answerOptions: ["Isle Royale NationaL Park", "Dry Tortugas National Park", "North Cascades National Park", "Black Canyon of the Gunnison National Park"],
    answer: 0 
},{
    question: "Through how many states does the Appalachian National Scenic Trail pass?",
    answerOptions: ["10", "14", "9", "12"],
    answer: 1 
},{
    question: "Which of the following is not one of Utah's Mighty 5 National Parks?",
    answerOptions: ["Arches", "Capitol Reef", "Bryce Canyon", "Badlands"],
    answer: 3 
},{
    question: "This man is considered The Father of the National Parks?",
    answerOptions: ["John Muir", "Theodore Roosevelt", "Joseph Le Conte", "Ralph Waldo Emerson"],
    answer: 0 
},{
    question: "What national park is home to the deepest lake in the U.S.?",
    answerOptions: ["Lake Clark National Park", "Kenai Fjords National Park", "Crater Lake National Park", "Great Basin National Park"],
    answer: 2 
},{
    question: "What is the smallest national park?",
    answerOptions: ["Virgin Islands National Park", "Hot Springs National Park", "Cuyahoga Valley National Park", "Mesa Verde National Park"],
    answer: 1 
},{
    question: "Who was the only U.S. President to work as a park ranger?",
    answerOptions: ["Gerald R. Ford", "Theodore Roosevelt", "Jimmy Carter", "Harry S. Truman"],
    answer: 0 
},{
    question: "What National Park contains the highest peak in North America?",
    answerOptions: ["Grand Teton National Park", "Hawaii Volcanoes National Park", "Mount Rainier National Park", "Denali National Park"],
    answer: 3 
},{
    question: "Psychics claim that there is a portal to a parallel universe near what national park?",
    answerOptions: ["Acadia National Park", "Great Sand Dunes National Park", "Zion National Park", "Death Valley National Park"],
    answer: 1 
},{
    question: "Which of these iconic landmarks is NOT part of the National Park System?",
    answerOptions: ["Plymouth Rock", "The White House", "Mount Rushmore", "Alcatraz Island"],
    answer: 0 
}];

var currentQuestion;
var rightAnswer;
var wrongAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "That's correct!",
    incorrect: "That's wrong!",
    timeUp: "Time's up!",
    finished: "You're done!"
}

$('#startBtn').on('click', function(){
    $(this).hide();
    newGame();
});


$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#rightAnswers').empty();
	$('#wrongAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	rightAnswer = 0;
	wrongAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
    
    
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html(triviaQuestions[currentQuestion].question);
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerOptions[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
    countdown();
    
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('Time Remaining: ' + seconds);
    answered = true;
    
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('Time Remaining: ' + seconds);
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

    var rightanswerText = triviaQuestions[currentQuestion].answerOptions[triviaQuestions[currentQuestion].answer];
    var rightanswerIndex = triviaQuestions[currentQuestion].answer;
    

	if((userSelect == rightanswerIndex) && (answered == true)){
		rightAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightanswerIndex) && (answered == true)){
		wrongAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightanswerText);
	} else{
		unanswered++;
		$('#message').html(messages.timeUp);
		$('#correctedAnswer').html('The correct answer was: ' + rightanswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();

	$('#finalMessage').html(messages.finished);
	$('#rightAnswers').html("Correct answers: " + rightAnswer);
	$('#wrongAnswers').html("Incorrect answers: " + wrongAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
