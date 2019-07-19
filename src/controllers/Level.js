import QuestionsCtrl from './Questions.js';
import UICtrl from './UICtrl.js';
import LocalStorageCtrl from './LocalStorage.js';
import PersonCtrl from './PersonCtrl.js';


const LevelCtrl = (function(){
  
  const storage = {
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
      //update level
      LevelCtrl.updateLevel();

      document.querySelector('.welcome-text').classList.remove('textHover'); // remove hover

      document.querySelector('.welcome-text').removeEventListener("click", LevelCtrl.showLevel, false);      // remove element from being clickable

      let level = storage.level;
      switch(level){
        case 1: 
          document.querySelector('.welcome-text').textContent = "What's the actor's name?";
          QuestionsCtrl.showQuestion(1);  // show question
          UICtrl.setIndicator(level, 'orange'); // set orange bg indicator
          console.log('level 1');
          break;

        case 2:
          document.querySelector('.welcome-text').textContent = "In which movie has this actor been playing?";
          QuestionsCtrl.showQuestion(2);  // show question
          UICtrl.setIndicator(level, 'orange'); // set orange bg indicator
          console.log('level 2');
          break;

        case 3:
          const actorName = PersonCtrl.getPerson().title;
          const actorMovie = QuestionsCtrl.getMovieCookie();

          document.querySelector('.welcome-text').textContent = `As whom did ${actorName} play in ${actorMovie}?`;
          QuestionsCtrl.showQuestion(3);  // show question
          UICtrl.setIndicator(level, 'orange'); // set orange bg indicator
          console.log('level 3');
          break;

        case 4:
          const actorNameFromMovie = QuestionsCtrl.getActorCookie();
          const chosenMovie = QuestionsCtrl.getMovieCookie();

          document.querySelector('.welcome-text').textContent = `Who was ${actorNameFromMovie}'s companion in ${chosenMovie} movie?`;
          QuestionsCtrl.showQuestion(4);  // show question
          UICtrl.setIndicator(level, 'orange'); // set orange bg indicator
          console.log('level 4');
          break;
          
        default:
         
          console.log('default from LevelCtrl - actor completed');
          break;
      }
    },
    
    updateScoreFromLS: function(data){
      storage.score = data;
    },

    IncreaseScoreByOne: function(){
      storage.score++;
      document.querySelector('.scoreValue').textContent = storage.score; 
      document.querySelector('.add-score').style.animation = "add-score-animation 500ms forwards";
      setTimeout(()=>{
        document.querySelector('.add-score').style.animation = '';
      }, 550)
    },

    getScore: function(){
      return storage.score;
    }

  }

})();

export default LevelCtrl;