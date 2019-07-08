import PersonCtrl from './PersonCtrl.js';
import ThreeCtrl from './ThreeCtrl.js';

const TwoCtrl = (function(){



  return{
    initTwo: function(){
      document.querySelector('.welcome-text').textContent = `Correct answer! Go to next question. Click.`;
      document.querySelector('.welcome-text').classList.add('textHover');
      document.querySelector('.welcome-text').addEventListener('click', TwoCtrl.textChange); // puts first question
    },

    textChange: function(){
      document.querySelector('.welcome-text').classList.remove('textHover');
      document.querySelector('.welcome-text').textContent = `Question 2: Where is the actor from?`;

      document.querySelector('.welcome-text').removeEventListener("click", TwoCtrl.textChange, false);      // Succeeds

      TwoCtrl.TwoAnswers();  
    },

    TwoAnswers: function(){
      
      // put UI
      let allAnswers = document.querySelector('.answers');
      allAnswers.style.display = "flex";
      let answers = Array.from(allAnswers.children);
      // get data
      const Actorlives = PersonCtrl.getPerson().body;
      let actorId = PersonCtrl.getPerson().id;

      let randomNumber = Math.random() * 3;  // 0 1 2
      let random = Math.floor(randomNumber); 
      let randomNameSet1 = ['Bangladesh', 'Moscow', 'Tokyo'];
      let randomNameSet2 = ['Mountains', 'Cave', 'Forest'];


      switch(actorId){
        case 1:   // Jon Snow
          answers[0].textContent = randomNameSet1[random];
          answers[1].textContent = Actorlives;
          answers[2].textContent = randomNameSet2[random];
          break;
        case 2:   // Michael J. Fox
          answers[0].textContent = randomNameSet1[random];
          answers[1].textContent = randomNameSet2[random];
          answers[2].textContent = Actorlives;
          break;
        case 3:   // Leonardo DiCaprio
        answers[0].textContent = Actorlives;
        answers[1].textContent = randomNameSet2[random];
        answers[2].textContent = randomNameSet1[random];
          break;
        case 4:   // Ryan Gosling
        answers[0].textContent = Actorlives;
        answers[1].textContent = randomNameSet2[random];
        answers[2].textContent = randomNameSet1[random];
          break;
        case 5:   // Zoe Saldana
        answers[0].textContent = randomNameSet1[random];
        answers[1].textContent = randomNameSet2[random];
        answers[2].textContent = Actorlives;
          break;
      }
      // answers[0].textContent = randomNameSet1[random];
      // answers[1].textContent = live;
      // answers[2].textContent = randomNameSet2[random];


      // guess the answer
      answers.forEach((button)=>{
        button.addEventListener('click', tryGuess);
      })

      function tryGuess(){
        let buttonText = this.textContent;
        let correctAnswer = Actorlives;
        if (correctAnswer == buttonText){
          console.log('correct!');
          allAnswers.style.display = "none";    // hide buttons
          document.querySelector('.tasksToCompleteValue').textContent = '1'; // decrement tasks to win a game

            // remove event listeners from buttons
          answers.forEach((button)=>{
            button.removeEventListener("click", tryGuess, false);
          })
          
          ThreeCtrl.initThree();// init TwoCtrl

        } else {
          console.log('bad answer!');
        }

      }

    }

  }
})();

export default TwoCtrl;