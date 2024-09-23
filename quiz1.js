let container = document.querySelector('#container');
let front = document.querySelector('#container1');
let timecontainer = document.getElementById('display');
let btn = document.getElementById('start');
let current = 0;
console.log("current index",current);
let score = 0;
let time = 10;
let timer;
let arr = [
    {
        question:"1. HTML stands for?",
        option:[{text:"a) Hyper Text Markup Language", correct:true},
            {text:"b) Hyperlink Text Markup Language", correct:false},
            {text:"c) Hyper Tool Marking  Language", correct:false},
            {text:"d) Home Tool Markup Language", correct:false}
        ]
    },
    {
        question:"2. How many types lists are there in HTML?",
        option:[{text:"a) 4", correct:false},
            {text:"b) 5", correct:false},
            {text:"c) 3", correct:true},
            {text:"d) 2", correct:false},
           
        ]
    },
    {
        question:"3. Which HTML tag is used for adding a table row?",
        option:[{text:"a) td", correct:false},
            {text:"b) tr", correct:true},
            {text:"c) table", correct:false},
            {text:"d) trow", correct:false},
           
        ]
    },
    {
        question:"4. CSS stands for?",
        option:[{text:"a) Computer Style Sheet", correct:false},
            {text:"b) Creative Style Sheet", correct:false},
            {text:"c) Colorful Style Sheet", correct:false},
            {text:"d) Cascading Style Sheet", correct:true},
           
        ]
    },
    {
        question:"5. Which CSS property controls the text size?",
        option:[{text:"a) text-fize", correct:false},
            {text:"b) text-style", correct:false},
            {text:"c) font-size", correct:true},
            {text:"d) font-width", correct:false},
           
        ]
    }

];

let disScore = document.createElement('span');
disScore.className = 'score';
disScore.innerHTML = `score: ${score}`;
timecontainer.appendChild(disScore); // score
let distime = document.createElement('span');
distime.className = 'time';
distime.innerHTML = `TIME LEFT: ${time}`;
timecontainer.appendChild(distime); // timer
distime.style.display = 'none';
disScore.style.display = 'none';

btn.addEventListener('click', () => {
    front.style.display = 'none';
    distime.style.display = 'inline-block';
    loadQuestion();
    start();
});

function loadQuestion() {
    let main = document.createElement('div');
    container.appendChild(main);
    main.className = "main";
    let quiz = document.createElement('h1');
    quiz.innerHTML = arr[current].question;
    main.appendChild(quiz);
    
    arr[current].option.forEach((ans) => {
        let answer = document.createElement('button');
        main.appendChild(answer);
        answer.className = "butn";
        answer.innerHTML = ans.text;
        answer.addEventListener('click', () => {
            handleAnswer(ans, answer);
        });
      
    });
    
    let next = document.createElement('button');
    main.appendChild(next);
    next.innerHTML = "sumbit";
    next.className = "next";
    next.addEventListener('click', nextQuestion);
   
}

function handleAnswer(ans, button) {
    clearInterval(timer);
    if (ans.correct) {
        button.style.backgroundColor = "green";
        button.style.color = "white";
        score++;
    } else {
        button.style.backgroundColor = "red";
        button.style.color = "white";
    }
    // Disable all buttons after answering
    const buttons = document.querySelectorAll('.butn');
    buttons.forEach(option => option.disabled = true);
    //  nextQuestion();
    // Automatically move to next question after a short delay
    setTimeout(nextQuestion, 1000);
}

function start() {
    time=10;
    timer = setInterval(() => {
        distime.innerHTML = `TIME LEFT: ${time}`;
        if (time <= 0) {
            clearInterval(timer);
            nextQuestion();
        } 
        else {
            console.log(`TIME LEFT:${time}`);
            time--;
            
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    if (current < arr.length - 1) {
        current++;
        console.log("current index",current)
        container.innerHTML = "";
        loadQuestion();
        start();
    } else {
        console.log("completed");
        // clearInterval(timer);
        container.innerHTML = "";
        disScore.style.display = 'inline-block';
        disScore.innerHTML = `Your score is ${score}. <br> <br> Completed`;   
        distime.remove();
    }
};
