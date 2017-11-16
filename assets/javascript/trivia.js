//game object
var game = {
    //question array
    questions: [
        {
            question: 'What is the html element that represents an image?',
            answers: ['&lt;img&gt;', '&lt;image&gt;', '&lt;jpg&gt;', '&lt;png&gt;'],
            correctAnswer: '1',
            userAnswer: null
        },
        {
            question: 'What array method would you call in Javascript to determine how many items it contains?',
            answers: ['.indices', '.length', '.itemsInArray', '.howMany'],
            correctAnswer: '2',
            userAnswer: null
        },
        {
            question: 'What is the git command to stage files?',
            answers: ['push', 'commit', 'add', 'clone'],
            correctAnswer: '3',
            userAnswer: null
        },
        {
            question: 'What CSS selector would choose all p elements with a parent div element?',
            answers: ['.div:p', 'p>div', 'div p', 'div>p'],
            correctAnswer: '4',
            userAnswer: null
        },
        {
            question: 'What jQuery method would you use to add content as the first child of an element?',
            answers: ['.before()', '.append()', '.hmtl()', '.prepend()'],
            correctAnswer: '4',
            userAnswer: null
        },
        {
            question: 'How long does setTimeout(func,180000) wait before it runs func?',
            answers: ['18 minutes', '18 seconds', '3 minutes', '30 minutes'],
            correctAnswer: '3',
            userAnswer: null
        },
        {
            question: 'What does [ 1 , 1 , 2 , 3 , 5 , 8 ].pop() return?',
            answers: ['1', '2', '3', '8'],
            correctAnswer: '4',
            userAnswer: null
        },
        {
            question: "What does typeof( [ 'a' , 'b' , 'c' , 'd' , 'e' ] ) return?",
            answers: ["'array'", "'string'", "'function'", "'object'"],
            correctAnswer: '4',
            userAnswer: null
        }],
        //variables to hold score, question time left, what question num, the interval & timeout
    score: 0,
    time: 31,
    num: 0,
    timer: null,
    timeout: null,
    //removes the old question and timer, displays the current question and starts the timer
    displayQuestion: function () {
        $('#time').show();
        $('#clock').empty();
        $('#trivia').empty();
        $('#trivia').append($(`<h3>${game.questions[game.num].question}</h3>`));
        //displays the answer possibilities as radio buttons
        for (i in game.questions[game.num].answers) {
            $('#trivia').append($(`<label><input type="radio" name="question" value="${parseInt(i) + 1}">${game.questions[game.num].answers[i]}</label>`));
        }
        $('#trivia').append($('<button id="submit" onclick="game.scoreQuestion()">Submit</button>'));
        game.startTimer();
    },
    // starts the game timer and the countdown interval
    startTimer: function () {
        game.delayTimer(game.scoreQuestion,1000*32);
        game.time = 31;
        game.timer = setInterval(function(){
            game.countDown();}, 1000);
    },
    //sets a delay after a user answer
    delayTimer : function(func,time){
        game.timeout = setTimeout(func,time);
    },
    //updates the clock
    countDown: function () {
        game.time--;
        $('#clock').text(` ${game.time} seconds`);
    },
    //clears the interval and timeout after a question
    stopTimers: function () {
        clearInterval(game.timer);
        clearTimeout(game.timeout);
    },
    //scores an answer, removes the submit button to prevent multiple answers, calls the stoptimer, increments the question number and calls gameOver or displayQuestion depending on the game state
    scoreQuestion: function () {
        game.stopTimers();
        $('#submit').remove();
        if ($('input:checked').val() === game.questions[game.num].correctAnswer) {
            game.score++;
            game.questions[game.num].userAnswer = 'correct';
        }
        else if ($('input:checked').val()) {
            game.questions[game.num].userAnswer = 'incorrect';
        }
        if (game.questions[game.num].userAnswer) {
            $('#trivia').append(`<p>You got question ${game.num + 1} ${game.questions[game.num].userAnswer}</p>`);
        }
        else {
            $('#trivia').append(`<p>You didn't answer question ${game.num + 1}</p>`);
        }
        $('#trivia').append(`The correct answer was  ${game.questions[game.num].answers[parseInt(game.questions[game.num].correctAnswer)-1]}</p>`);
        game.num++;
        if (game.num === game.questions.length) {
            game.delayTimer(game.gameOver,5000);
        }
        else {
            game.delayTimer(game.displayQuestion,5000);
        }
    },
    //removes the game elements and displays the questions and answers along with the user answers
    gameOver: function () {
        $('.gameElement').empty();
        $('#trivia').append($(`<p><strong>You got ${game.score} out of ${game.questions.length}!<strong></p>`));
        for (i in game.questions) {
            if (game.questions[i].userAnswer) {
                $('#trivia').append(`<p>You got question ${parseInt(i) + 1} ${game.questions[i].userAnswer}</p>`);
            }
            else {
                $('#trivia').append(`<p>You didn't answer question ${parseInt(i) + 1}</p>`);
            }
            $('#trivia').append(`<p><strong>${game.questions[i].question}<strong></p>`);
            $('#trivia').append(`The correct answer was  ${game.questions[i].answers[parseInt(game.questions[i].correctAnswer)-1]}</p>`);
            $('#trivia').append($('<hr>'));
        }
    }
};