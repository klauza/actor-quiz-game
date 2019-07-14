import QuestionsCtrl from './Questions.js';
import UICtrl from './UICtrl.js';

const LevelCtrl = (function(){
  
  const storage = {
    number: '',
    score: 0,
    level: 0
  }


  return{
    updateLevel: function(){
      // increment level by 1
      storage.level++;
    },

    initText: function(){
      document.querySelector('.welcome-text').classList.add('textHover'); // add hover
      document.querySelector('.welcome-text').addEventListener('click', LevelCtrl.showLevel); // puts first question
    },

    // show level
    showLevel: function(){
      document.querySelector('.welcome-text').classList.remove('textHover'); // remove hover

      document.querySelector('.welcome-text').removeEventListener("click", LevelCtrl.showLevel, false);      // remove element from being clickable

      let level = storage.level;
      switch(level){
        case 1: 
          document.querySelector('.welcome-text').textContent = "In which movie has this actor been playing?";
          QuestionsCtrl.showQuestion(1);  // show question
          console.log('level 1');
          break;

        case 2:
          document.querySelector('.welcome-text').textContent = "LEVEL 2";
          QuestionsCtrl.showQuestion(2);  // show question
          console.log('level 2');
          break;

        case 3:
          document.querySelector('.welcome-text').textContent = "LEVEL 3";
          QuestionsCtrl.showQuestion(3);  // show question
          console.log('level 3');
          break;

        default:
          // clickable after level 3
          // may be put some string as an actor is completed
          // update score to localstorage?
          UICtrl.continueGame();
          console.log('error level - actor completed');
          break;
      }
    },


    initQuestion: function(){
      // get question from QuestionCtrl.js
    },

    IncreaseScoreByOne: function(){
      console.log('score has been increased');
      storage.score++;
      document.querySelector('.scoreValue').textContent = storage.score; 
    }

  }

})();

export default LevelCtrl;