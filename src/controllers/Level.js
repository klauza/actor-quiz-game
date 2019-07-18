import QuestionsCtrl from './Questions.js';
import UICtrl from './UICtrl.js';
import LocalStorageCtrl from './LocalStorage.js';
import PersonCtrl from './PersonCtrl.js';


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
    getLevel: function(){
      return storage.level
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
          const actorName = PersonCtrl.getPerson().title;
          const actorMovie = QuestionsCtrl.getMovieCookie();

          document.querySelector('.welcome-text').textContent = `As whom did ${actorName} play in ${actorMovie}?`;
          QuestionsCtrl.showQuestion(2);  // show question
          console.log('level 2');
          break;

        case 3:
          const actorNameFromMovie = QuestionsCtrl.getActorCookie();
          const chosenMovie = QuestionsCtrl.getMovieCookie();

          document.querySelector('.welcome-text').textContent = `Who was ${actorNameFromMovie}'s companion in ${chosenMovie} movie?`;
          QuestionsCtrl.showQuestion(3);  // show question
          console.log('level 3');
          break;

        default:
          // clickable after level 3
          // may be put some string as an actor is completed
          // update score to localstorage?
          document.querySelector('.welcome-text').textContent = "Actor completed!"; // change text before level 2 start
          LocalStorageCtrl.addScore(3);
          console.log('score updated by 3 in LS');

          UICtrl.continueGame();
          console.log('error level - actor completed');
          break;
      }
    },


    initQuestion: function(){
      // get question from QuestionCtrl.js
    },
    
    updateScoreFromLS: function(data){
      storage.score = data;
    },

    IncreaseScoreByOne: function(){
      console.log('score has been increased');
      storage.score++;
      document.querySelector('.scoreValue').textContent = storage.score; 
    }

  }

})();

export default LevelCtrl;