import PersonCtrl from './PersonCtrl.js';

const ThreeCtrl = (function(){

  

  return{
    initThree: function(){
      document.querySelector('.welcome-text').textContent = `Correct answer! Go to next question. Click.`;
      document.querySelector('.welcome-text').classList.add('textHover');
      document.querySelector('.welcome-text').addEventListener('click', ThreeCtrl.textChange); // puts first question
    },

    textChange: function(){
      document.querySelector('.welcome-text').classList.remove('textHover');
      document.querySelector('.welcome-text').textContent = `Question 3: Just pick first option.`;

      document.querySelector('.welcome-text').removeEventListener("click", ThreeCtrl.textChange, false);      // Succeeds

      ThreeCtrl.ThreeAnswers();  
    },

    ThreeAnswers: function(){
      
      let allAnswers = document.querySelector('.answers');
      allAnswers.style.display = "block";
      let answers = Array.from(allAnswers.children);

      // const live = PersonCtrl.getPerson().body;

      let randomNumber = Math.random() * 3;  // 0 1 2
      let random = Math.floor(randomNumber); 

      let randomNameSet = ['I am winner', 'Wrong answer here', 'You still here?'];


      answers[0].textContent = randomNameSet[0];
      answers[1].textContent = randomNameSet[1];
      answers[2].textContent = randomNameSet[2];


      // guess the answer
      answers.forEach((button)=>{
        button.addEventListener('click', tryGuess);
      })

      function tryGuess(){
        let buttonID = this.dataset.num
        let answer = 1;
        if (answer == buttonID){
          console.log('correct!');
          allAnswers.style.display = "none";    // hide buttons
          document.querySelector('.tasksToCompleteValue').textContent = '0'; // decrement tasks to win a game

            // remove event listeners from buttons
          answers.forEach((button)=>{
            button.removeEventListener("click", tryGuess, false);
          })

          
          // YOU WIN THE GAME
          ThreeCtrl.winGame();
        } else {
          console.log('bad answer!');
        }

      }

    },

    winGame: function(){
      console.log('you won!');
      document.querySelector('.welcome-text').textContent = `you won!`;
      document.querySelector('.local-storage-reset').style.transform = 'translateY(-600px) translateX(-50%)';
      document.querySelector('.tasksToComplete').style.display = "none";
      document.querySelector('.statistics').style.display = "none";
      document.querySelector('.content').style.display = "none";
      document.querySelector('.button-container').style.display = "none";
    }

  }
})();

export default ThreeCtrl;