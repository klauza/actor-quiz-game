import QuestionsCtrl from './Questions.js';

const LevelCtrl = (function(){
  
  const storage = {
    number: '',
    score: 0
  }


  return{
    initText: function(){
      document.querySelector('.welcome-text').classList.add('textHover'); // add hover
      document.querySelector('.welcome-text').addEventListener('click', LevelCtrl.showQuestionText); // puts first question
    },
    // change text to question
    showQuestionText: function(){
      document.querySelector('.welcome-text').classList.remove('textHover'); // remove hover
      document.querySelector('.welcome-text').textContent = "In which movie has this actor been playing?";

      document.querySelector('.welcome-text').removeEventListener("click", LevelCtrl.showQuestionText, false);      // Succeeds

      QuestionsCtrl.showQuestion();  // show question
    },

    showLevel: function(){
      // check if all levels for current actor are completed

      // if no, show next level (question)

      // if yes, run function to filter out the current actor and initialize new game without 
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