
var game = document.getElementById("game");

var lives = 3;
var score = 0;
var level = 1;
var questionIndex = 0;
var selectedAnswers = [];
var answered = false;

var questions = [
    {
        type: "multiple",
        question: "What should you do when an earthquake begins indoors?",
        answers: [
            "Run toward the windows",
            "Drop, cover, and hold on",
            "Use the elevator",
            "Stand near a glass door"
        ],
        correct: 1,
        explanation: "Drop, cover, and hold on. Protect your head and neck."
    },
    {
        type: "supplies",
        question: "Choose ALL the essential items for an emergency go-bag.",
        answers: [
            "Drinking water",
            "First-aid kit",
            "Flashlight",
            "Emergency radio",
            "Video game console",
            "Decorative pillow"
        ],
        correct: [0, 1, 2, 3],
        explanation: "Water, first aid, a flashlight, and a radio are useful emergency supplies."
    },
    {
        type: "multiple",
        question: "A flood warning is issued for your area. What should you do?",
        answers: [
            "Walk through floodwater",
            "Move to higher ground when advised",
            "Drive through a flooded road",
            "Stay in a low-lying area"
        ],
        correct: 1,
        explanation: "Follow official evacuation instructions and avoid floodwater."
    },
    {
        type: "problem",
        question: "Your family needs 3 liters of drinking water per person each day. There are 4 people in your family. How much water is needed for 2 days?",
        answers: [
            "12 liters",
            "18 liters",
            "24 liters",
            "30 liters"
        ],
        correct: 2,
        explanation: "3 × 4 × 2 = 24 liters."
    },
    {
        type: "multiple",
        question: "What is a safer action during extreme heat?",
        answers: [
            "Avoid drinking water",
            "Stay in direct sunlight",
            "Rest in a cool place and drink water",
            "Exercise intensely at midday"
        ],
        correct: 2,
        explanation: "Rest in a cool place, drink water, and follow health advisories."
    },
    {
        type: "supplies",
        question: "A power outage may last for hours. Choose ALL useful items.",
        answers: [
            "Flashlight with spare batteries",
            "Battery-powered radio",
            "Charged power bank",
            "Lit candles near curtains",
            "Essential medicines"
        ],
        correct: [0, 1, 2, 4],
        explanation: "Use safe lighting, keep communication devices charged, and prepare necessary medicines."
    },
    {
        type: "problem",
        question: "You have 6 battery packs. Each flashlight needs 2 battery packs. How many flashlights can you supply?",
        answers: [
            "2 flashlights",
            "3 flashlights",
            "4 flashlights",
            "6 flashlights"
        ],
        correct: 1,
        explanation: "6 ÷ 2 = 3 flashlights."
    },
    {
        type: "multiple",
        question: "What is the safest choice when a typhoon evacuation order is issued?",
        answers: [
            "Ignore the warning",
            "Go outside to watch the storm",
            "Follow official evacuation instructions",
            "Wait until floodwater rises"
        ],
        correct: 2,
        explanation: "Follow official instructions and evacuate promptly when directed."
    },
    {
        type: "supplies",
        question: "Choose ALL useful items for emergency communication and first aid.",
        answers: [
            "Emergency contact list",
            "First-aid supplies",
            "Fully charged phone",
            "Emergency radio",
            "Unlabeled chemicals"
        ],
        correct: [0, 1, 2, 3],
        explanation: "Prepare contact information, first-aid supplies, and communication tools."
    },
    {
        type: "problem",
        question: "You have 12 food packs for 4 family members. If everyone gets the same number, how many packs does each person get?",
        answers: [
            "2 packs",
            "3 packs",
            "4 packs",
            "6 packs"
        ],
        correct: 1,
        explanation: "12 ÷ 4 = 3 food packs per person."
    },

    // FUNNY PET BONUS ROUND

    {
        type: "multiple",
        bonus: true,
        question: "Your cat has claimed your emergency go-bag as its royal throne. What should you do?",
        answers: [
            "Declare the cat the emergency manager",
            "Prepare a safe carrier and a pet emergency kit",
            "Leave the cat sitting on the bag",
            "Cancel the evacuation"
        ],
        correct: 1,
        explanation: "Your cat can keep its royal title, but it needs safe transport and its own supplies!"
    },
    {
        type: "multiple",
        bonus: true,
        question: "Your dog steals a snack from your emergency supplies. What is the smartest move?",
        answers: [
            "Let the dog eat every supply",
            "Give the dog chocolate",
            "Store human and pet food safely",
            "Ask the dog to pack everything"
        ],
        correct: 2,
        explanation: "Store supplies securely and pack food that is safe for your pet."
    },
    {
        type: "multiple",
        bonus: true,
        question: "Your pet hides under the bed when it's time to evacuate. What should you do?",
        answers: [
            "Leave without checking",
            "Use a calm approach and a carrier or leash",
            "Wait until the danger arrives",
            "Promise unlimited treats"
        ],
        correct: 1,
        explanation: "Plan ahead to safely secure and transport your pet."
    },
    {
        type: "multiple",
        bonus: true,
        question: "Your parrot screams 'WE'RE DOOMED!' during an emergency drill. What should you do?",
        answers: [
            "Give up because the parrot said so",
            "Follow official alerts and your family plan",
            "Let the parrot choose the route",
            "Ask the parrot to carry your bag"
        ],
        correct: 1,
        explanation: "Funny bird, serious plan! Follow reliable emergency information."
    },
    {
        type: "multiple",
        bonus: true,
        question: "Your pet sits on your packed emergency kit. What important thing should you check?",
        answers: [
            "A pet carrier, food, water, and needed medicines",
            "A tiny television for your cat",
            "A dog-sized gaming chair",
            "A royal crown for every pet"
        ],
        correct: 0,
        explanation: "Include pet essentials, identification, and safe transport arrangements."
    }
];

function startGame() {
    lives = 3;
    score = 0;
    level = 1;
    questionIndex = 0;
    selectedAnswers = [];
    answered = false;

    updateInfo();
    showQuestion();
}

function updateInfo() {
    document.getElementById("lives").textContent = lives;
    document.getElementById("score").textContent = score;
    document.getElementById("level").textContent = level;
}

function showQuestion() {
    if (lives <= 0) {
        showGameOver();
        return;
    }

    if (questionIndex >= questions.length) {
        showVictory();
        return;
    }

    selectedAnswers = [];
    answered = false;

    var q = questions[questionIndex];

    var title = q.bonus
        ? "🐾 Funny Pet Bonus Round"
        : q.type === "problem"
        ? "Problem Solving"
        : q.type === "supplies"
        ? "Emergency Supplies"
        : "Knowledge Challenge";

    var html = `
        <p class="progress-text">
            Question ${questionIndex + 1} of ${questions.length}
        </p>

        <h2>${title}</h2>

        <div class="question">
            <p>${q.question}</p>
            <div class="answers">
    `;

    for (var i = 0; i < q.answers.length; i++) {
        html += `
            <button class="answer-button" data-index="${i}">
                ${q.answers[i]}
            </button>
        `;
    }

    html += `
            </div>
        </div>

        <p id="feedback" class="feedback" style="display:none"></p>

        <button id="submit-button" class="main-button">
            ${q.type === "supplies" ? "Check Supplies" : "Submit Answer"}
        </button>
    `;

    game.innerHTML = html;

    var answerButtons = document.querySelectorAll(".answer-button");

    answerButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            if (answered) {
                return;
            }

            var index = Number(button.dataset.index);

            if (q.type === "supplies") {
                if (selectedAnswers.includes(index)) {
                    selectedAnswers = selectedAnswers.filter(function(item) {
                        return item !== index;
                    });

                    button.classList.remove("selected");
                } else {
                    selectedAnswers.push(index);
                    button.classList.add("selected");
                }
            } else {
                selectedAnswers = [index];

                answerButtons.forEach(function(item) {
                    item.classList.remove("selected");
                });

                button.classList.add("selected");
            }
        });
    });

    document.getElementById("submit-button").addEventListener("click", checkAnswer);
}

function checkAnswer() {
    if (answered) {
        return;
    }

    if (selectedAnswers.length === 0) {
        var feedback = document.getElementById("feedback");
        feedback.style.display = "block";
        feedback.textContent = "Please select your answer first.";
        return;
    }

    answered = true;

    var q = questions[questionIndex];
    var correct;

    if (q.type === "supplies") {
        correct =
            selectedAnswers.length === q.correct.length &&
            q.correct.every(function(item) {
                return selectedAnswers.includes(item);
            });
    } else {
        correct = selectedAnswers[0] === q.correct;
    }

    var feedback = document.getElementById("feedback");
    feedback.style.display = "block";

    if (correct) {
        score += q.bonus ? 20 : 10;
        feedback.textContent = "Correct! " + q.explanation;
    } else {
        lives -= 1;

        var answerText;

        if (q.type === "supplies") {
            answerText = q.correct.map(function(index) {
                return q.answers[index];
            }).join(", ");
        } else {
            answerText = q.answers[q.correct];
        }

        feedback.textContent =
            "Incorrect. Correct answer: " + answerText +
            ". " + q.explanation;
    }

    level = Math.floor(questionIndex / 3) + 1;
    updateInfo();

    document.querySelectorAll(".answer-button").forEach(function(button) {
        button.disabled = true;
    });

    var submitButton = document.getElementById("submit-button");

    if (lives <= 0) {
        submitButton.textContent = "See Results";
        submitButton.onclick = showGameOver;
    } else {
        submitButton.textContent = "Next Question";

        submitButton.onclick = function() {
            questionIndex++;
            showQuestion();
        };
    }
}

function showGameOver() {
    game.innerHTML = `
        <h2>Game Over!</h2>
        <p>You have used all your lives.</p>
        <p>Your final score: ${score}</p>
        <p>Keep learning about emergency preparedness and try again!</p>
        <button class="main-button" id="restart-button">Play Again</button>
    `;

    document.getElementById("restart-button").addEventListener("click", startGame);
}

function showVictory() {
    game.innerHTML = `
        <h2>Well Prepared!</h2>
        <p>You completed all the challenges, including the funny pet bonus round!</p>
        <p>Your final score: ${score}</p>
        <p>Keep your emergency supplies ready and include your pets in your emergency plan.</p>
        <button class="main-button" id="restart-button">Play Again</button>
    `;

    document.getElementById("restart-button").addEventListener("click", startGame);
}

document.getElementById("start-button").addEventListener("click", startGame);
