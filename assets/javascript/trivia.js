var game = {
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
    score: 0,
    time: 30,
    num: 0,
    timer: null,
    timeout: null,
    displayQuestion: function () {
        $('#time').show();
        $('#clock').empty();
        $('#trivia').empty();
        $('#trivia').append($(`<h3>${game.questions[game.num].question}</h3>`));
        for (i in game.questions[game.num].answers) {
            $('#trivia').append($(`<label><input type="radio" name="question" value="${parseInt(i) + 1}">${game.questions[game.num].answers[i]}</label>`));
        }
        $('#trivia').append($('<button id="submit" onclick="game.scoreQuestion()">Submit</button>'));
        game.startTimer();
    },
    startTimer: function () {
        game.timeout = setTimeout(function(){
            game.scoreQuestion();}, 1000 * 31);
        game.time = 30;
        game.timer = setInterval(function(){
            game.countDown();}, 1000);
    },
    delayTimer : function(func){
        game.timeout = setTimeout(func,5000);
    },
    countDown: function () {
        game.time--;
        $('#clock').text(` ${game.time} seconds`);
    },
    stopTimers: function () {
        clearInterval(game.timer);
        clearTimeout(game.timeout);
    },
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
            game.delayTimer(game.gameOver);
        }
        else {
            game.delayTimer(game.displayQuestion);
        }
    },
    gameOver: function () {
        $('.gameElement').empty();
        $('#trivia').append($(`<p>You got ${game.score} out of ${game.questions.length}!</p>`));
        for (i in game.questions) {
            if (game.questions[i].userAnswer) {
                $('#trivia').append(`<p>You got question ${parseInt(i) + 1} ${game.questions[i].userAnswer}</p>`);
            }
            else {
                $('#trivia').append(`<p>You didn't answer question ${parseInt(i) + 1}</p>`);
            }
            $('#trivia').append(`<p>${game.questions[i].question}</p>`);
            $('#trivia').append(`The correct answer was  ${game.questions[i].answers[parseInt(game.questions[i].correctAnswer)-1]}</p>`);
            $('#trivia').append($('<hr>'));
        }
    }
};