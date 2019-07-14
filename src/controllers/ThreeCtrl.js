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
      document.querySelector('.welcome-text').textContent = `Question 3: Pick the movie the actor has shown in.`;

      document.querySelector('.welcome-text').removeEventListener("click", ThreeCtrl.textChange, false);      // Succeeds

      ThreeCtrl.ThreeAnswers();  
    },

    ThreeAnswers: function(){
      
      // put UI
      let allAnswers = document.querySelector('.answers');
      allAnswers.style.display = "flex";
      let answers = Array.from(allAnswers.children);
      // get data
      let actorId = PersonCtrl.getPerson().id;
      let actorMovie = PersonCtrl.getPerson().movie1;
     
      switch(actorId){
        case 1:   // Jon Snow
          answers[0].textContent = 'Batman';
          answers[1].textContent = actorMovie;
          answers[2].textContent = 'Warrior';
          break;
        case 2:   // Michael J. Fox
          answers[0].textContent = actorMovie;
          answers[1].textContent = 'Batman Forever';
          answers[2].textContent = 'Spiderman';
          break;
        case 3:   // Leonardo DiCaprio
          answers[0].textContent = 'Tomb Raider';
          answers[1].textContent = 'Avengers';
          answers[2].textContent = actorMovie;
          break;
        case 4:   // Ryan Gosling
          answers[0].textContent = 'Game of Thrones';
          answers[1].textContent = actorMovie;
          answers[2].textContent = 'The Shawshank Redemption';
          break;
        case 5:   // Zoe Saldana
          answers[0].textContent = 'Harry Potter';
          answers[1].textContent = 'Matrix';
          answers[2].textContent = actorMovie;
          break;
      }

      // guess the answer
      answers.forEach((button)=>{
        button.addEventListener('click', tryGuess);
      })

      function tryGuess(){
        let buttonText = this.textContent;
        let correctAnswer = actorMovie;
        if (correctAnswer == buttonText){
          console.log('correct!');
          allAnswers.style.display = "none";    // hide buttons
          document.querySelector('.scoreValue').textContent = '3'; // incement score 

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
      document.querySelector('.statistics').style.display = "none";
      document.querySelector('.content').style.display = "none";
      document.querySelector('.button-container').style.display = "none";
    }

  }
})();

export default ThreeCtrl;