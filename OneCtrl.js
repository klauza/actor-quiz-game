import PersonCtrl from './PersonCtrl.js';
import TwoCtrl from './TwoCtrl.js';

const OneCtrl = (function(){
  const stage = {
    number: ''
  }


  return{

    initOne: function(){
      console.log('First task initialized');

      document.querySelector('.welcome-text').classList.add('textHover');
      document.querySelector('.welcome-text').addEventListener('click', OneCtrl.textChange); // puts first question
    },

    textChange: function(){
      document.querySelector('.welcome-text').classList.remove('textHover');
      document.querySelector('.welcome-text').textContent = `Question 1: What's your actor's name?`;

      document.querySelector('.welcome-text').removeEventListener("click", OneCtrl.textChange, false);      // Succeeds

      OneCtrl.OneAnswers();  
    },


    OneAnswers: function(){
      let allAnswers = document.querySelector('.answers');
      allAnswers.style.display = "block";

      let answers = Array.from(allAnswers.children);

        // put actor's name into button1 textNode
      const name = PersonCtrl.getPerson().title;  // get name
      const newName = name.replace(/\s.*/, '');  // split name from surname
      answers[0].textContent = newName;   


      answers.forEach((button)=>{
        button.addEventListener('click', tryGuess);
        
      })

      function tryGuess(){
        let but = this.dataset.num
        let answer = 1;
        if (answer == but){
          console.log('correct!');
          allAnswers.style.display = "none";    // hide buttons
          document.querySelector('.tasksToCompleteValue').textContent = '2'; // decrement tasks to win a game

            // remove event listeners from buttons
          answers.forEach((button)=>{
            button.removeEventListener("click", tryGuess, false);
          })
          
          TwoCtrl.initTwo();// init TwoCtrl

        } else {
          console.log('bad answer!');
        }
        
      }
    }

  }
})();

export default OneCtrl;