import PersonCtrl from './PersonCtrl.js';
import LevelCtrl from './Level.js';
import LocalStorageCtrl from './LocalStorage.js';



const QuestionsCtrl = (function(){
  
  const question = {
    cookie_1_movie: '',
    cookie_2_actor: ''
  }


  return{
    
    getMovieCookie: function(){
      // get cookie
      // return question
       return question.cookie_1_movie
    },
    getActorCookie: function(){
      // get cookie
      // return question
       return question.cookie_2_actor
    },

    showQuestion: function(level){
      
      // display block with questions
      let allAnswers = document.querySelector('.answers');
      allAnswers.style.display = "flex";
      let answers = Array.from(allAnswers.children);

      // get chosen actor's data
      let actor = PersonCtrl.getPerson();
      
    


      switch(level){
        case 1:
          console.log('hello level 1');
          // sum of actor movies
          let actorMoviesAmount = actor.movies.length;  
          let randomActorMovieId = Math.floor(Math.random() * actorMoviesAmount); 
          let actorMovie = actor.movies[randomActorMovieId];

          var getRegexMovie = actorMovie;
          var currentMovie = getRegexMovie.replace(/\|.*$/i,'');
          var currentActorFromMovie = getRegexMovie.replace(/^.*\|/i,'');

          console.log('MOVIE: ', currentMovie);
          console.log('ACTOR: ', currentActorFromMovie);

          question.cookie_1_movie = currentMovie;
          question.cookie_2_actor = currentActorFromMovie;

          // hardcoded wrong answers
          let randomMovie1 = ['Fight Club', 'The Green Mile', 'The Matrix', 'Intouchables', 'Pirates of the Caribbean', 'Cast Away', 'The Butterfly Effect'];
          let randomMovie2 = ['Léon', 'Gladiator', 'The Hangover', 'Se7en', 'Seven Pounds', 'A Beautiful Mind', 'The Da Vinci Code', 'Gran Torino'];
          let randomNumber1 = Math.random() * randomMovie1.length;  // 0 1 2 => length 3
          let random1 = Math.floor(randomNumber1); 
          let randomNumber2 = Math.random() * randomMovie2.length;  // 0 1 2
          let random2 = Math.floor(randomNumber2); 
          
          // put all, wrong and a correct answers in new array
          let answerArray = new Array; // init new array with answers to be outputted later
          answerArray.push(currentMovie, randomMovie1[random1], randomMovie2[random2]);

          function getRandomAnswer(){
            let randomNum = Math.random() * answerArray.length;  // if length==3, will be [0 1 2]
            let random = Math.floor(randomNum);
            return random;
          }
    
          // FILLING BLOCKS WITH ANSWERS
          fillAnswers(getRandomAnswer, answerArray);

          break;


        case 2:
          console.log('hello level 2');
          
          break;
          

        case 3:
          console.log('hello level 3');
          break
        
      }


      function fillAnswers(getRandomAnswer, answerArray){
        if(answers[0].textContent==''){
        
          const randomAnswerId = getRandomAnswer();   // variable for id of randomized answer
          
          // put random answer into first block
          answers[0].textContent=answerArray[randomAnswerId];

          // delete answer with this id from answerArray
          answerArray.splice(randomAnswerId, 1);   
          
          fillAnswers(getRandomAnswer, answerArray);   // run the whole function again!

        } else if(answers[1].textContent==''){
          const randomAnswerId = getRandomAnswer();
          answers[1].textContent=answerArray[randomAnswerId];
          answerArray.splice(randomAnswerId, 1);  
          
          fillAnswers(getRandomAnswer, answerArray);  // run the whole function again!

        } else if(answers[2].textContent==''){
          const randomAnswerId = getRandomAnswer();
          answers[2].textContent=answerArray[randomAnswerId];
          answerArray.splice(randomAnswerId, 1);  
          
          fillAnswers(getRandomAnswer, answerArray);  // run the whole function again!

        } else {
          return
        }
      }
      
      // GUESSING THE ANSWER
      answers.forEach((button)=>{
        button.addEventListener('click', QuestionsCtrl.tryGuess);
      })
      


    },

    tryGuess: function(){
      let guess = this.textContent;   // string of clicked answer
      let correctAnswer = question.cookie_1_movie;   // string of correct answer

      if (correctAnswer == guess){ 
        console.log('correct!');

        QuestionsCtrl.clearAnswers();  // empty string of answers
        QuestionsCtrl.hideAnswers();   // hide block 'answers'

        LevelCtrl.IncreaseScoreByOne(); // incement score 

        // remove event listeners from buttons
        // answers.forEach((button)=>{
        //   button.removeEventListener("click", tryGuess, false);
        // })
        let actor = PersonCtrl.getPerson();
        let actorId = actor.id;
        // store actor's id into LS
        LocalStorageCtrl.setPersonIdToLS(actorId);  // mark an actor as completed, put his/her id to local storage to filter it out at new game

        document.querySelector('.welcome-text').textContent = "Proceed to next question"; // change text before level 2 start

        LevelCtrl.updateLevel();  // update level by 1

        LevelCtrl.initText();     // go to next level

      } else {
        console.log('bad answer! Game over!');
        //game over
      }

    },

    clearAnswers: function(){ 
      let allAnswers = document.querySelector('.answers');
      let answers = Array.from(allAnswers.children);
      answers.forEach((answer)=> {answer.textContent=''}); // loop
      
    },
    hideAnswers: function(){
      document.querySelector('.answers').style.display = "none";    // hide buttons
    }


  }

})();

export default QuestionsCtrl;