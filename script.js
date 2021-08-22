//end game function


//start game & timer
var startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startGame);

function startGame() {
    // Make it so you cannot re-click the start button once game has begun
    startButton.removeEventListener('click', startGame);
    const startTime = 2;
    let time = startTime * 60;

    const countdownEl = document.getElementById('countdown');

    setInterval(updateCountdown, 1000);
    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdownEl.innerHTML = `${minutes}:${seconds}`;
        time--;
        time = time < 0 ? 0 : time;

        if (time <= 0 || currentQuiz > quizData.length) {
            localStorage.setItem('mostRecentScore', score);
            // End function takes you to new html
            endGame(window.location.assign("end.html"))


        };

    };
    // end game function 
    function endGame() {
        clearInterval(updateCountdown);

    }

    // Quiz questions 
    const quizData = [
        {
            question: "What that smell like?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "a",
        },
        {
            question: "Who that smell like?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "b",
        },
        {
            question: "how that smell like?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "c",
        },
        {
            question: "why that smell like?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "d",
        },
        {
            question: "When that smell like?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "a",
        },
        {
            question: "Where that smell like?",
            a: "Java",
            b: "C",
            c: "Python",
            d: "JavaScript",
            correct: "b",
        },
    ];





    // get quiz element
    const quiz = document.getElementById('quiz');
    // get the answer element
    const answerEls = document.querySelectorAll('.answer');
    // get the question element
    const questionEl = document.getElementById('question');
    // get a-d
    const a_text = document.getElementById('a_text');
    const b_text = document.getElementById('b_text');
    const c_text = document.getElementById('c_text');
    const d_text = document.getElementById('d_text');
    // selecting the submit button
    const submitBtn = document.getElementById('submit')
    // making the quiz start at question 1 = array of 0
    let currentQuiz = 0
    // starting score 
    let score = 0

    loadQuiz()

    // function to load question from the array
    function loadQuiz() {
        deselectAnswers()
        const currentQuizData = quizData[currentQuiz]
        questionEl.innerText = currentQuizData.question

        a_text.innerText = currentQuizData.a
        b_text.innerText = currentQuizData.b
        c_text.innerText = currentQuizData.c
        d_text.innerText = currentQuizData.d
    };
    // keeps all answers deselected when question is loaded 
    function deselectAnswers() {
        answerEls.forEach(answerEl => answerEl.checked = false)
    }

    function getSelected() {
        let answer

        answerEls.forEach(answerEl => {
            if (answerEl.checked) {
                answer = answerEl.id
            }
        })
        return answer
    };
    // event listener for clicking the submit button 
    submitBtn.addEventListener('click', () => {
        const answer = getSelected()


        if (answer) {
            if (answer === quizData[currentQuiz].correct) {
                score++
            } // minus 30 seconds when question is answered incorrectly
            else {
                time = time - 30;
            }
            currentQuiz++
            // Loading their score at the end of the quiz
            if (currentQuiz < quizData.length) {
                loadQuiz()
                localStorage.setItem('mostRecentScore', score);
            } else {
                endGame(window.location.assign("end.html"))
                localStorage.setItem('mostRecentScore', score);
                //quiz.innerHTML = `
                //<h2>You answered ${score}/${quizData.length} questions correctly</h2>

                //<button onclick ="location.reload()"
                //>Reload</button>
                //`
            }
        }

    });
}