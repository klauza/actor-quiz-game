import PersonCtrl from './PersonCtrl.js';
import LevelCtrl from './Level.js';
import LocalStorageCtrl from './LocalStorage.js';



const QuestionsCtrl = (function(){
  
  const question = {
    cookie_1_movie: '',
    cookie_2_actor: '',
    cookie_3_friends: '',
    correctAnsw: ''
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
      
      // initialize the array to fill with answers
      let answerArray = new Array;


      switch(level){
        case 1:
          console.log('hello level 1');
          // sum of actor movies
          let actorMoviesAmount = actor.movies.length;  
          let randomActorMovieId = Math.floor(Math.random() * actorMoviesAmount); 
          let actorMovie = actor.movies[randomActorMovieId];
          let actorFriends = actor.companions[randomActorMovieId];


          var getRegexMovie = actorMovie;
          var currentMovie = getRegexMovie.replace(/\|.*$/i,'');
          var currentActorFromMovie = getRegexMovie.replace(/^.*\|/i,'');


          // set cookies
          question.cookie_1_movie = currentMovie;
          question.cookie_2_actor = currentActorFromMovie;
          question.cookie_3_friends = actorFriends;
          question.correctAnsw = currentMovie;

          // hardcoded wrong answers
          let randomMovie1 = ['Fight Club', 'The Green Mile', 'The Matrix', 'Intouchables', 'Pirates of the Caribbean', 'Cast Away', 'The Butterfly Effect'];
          let randomMovie2 = ['Léon', 'Gladiator', 'The Hangover', 'Se7en', 'Seven Pounds', 'A Beautiful Mind', 'The Da Vinci Code', 'Gran Torino'];
          let randomNumber1 = Math.random() * randomMovie1.length;  // 0 1 2 => length 3
          let random1 = Math.floor(randomNumber1); 
          let randomNumber2 = Math.random() * randomMovie2.length;  // 0 1 2
          let random2 = Math.floor(randomNumber2); 

          // put all, wrong and a correct answers in new array
          answerArray.push(currentMovie, randomMovie1[random1], randomMovie2[random2]);

          // FILLING BLOCKS WITH ANSWERS
          fillAnswers(getRandomAnswer, answerArray);

          break;


        case 2:
          console.log('hello level 2');

          // get the true answer
          let theTrueAnswer = QuestionsCtrl.getActorCookie();
          // set the true answer
          question.correctAnsw = theTrueAnswer;

          // get wrong answers
          let wrongAnswerArr_1 = ['Bob', 'Jack', 'Merlin'];
          let wrongAnswerArr_2 = ['Leon', 'Susan', 'Merry'];
          let randomNr1 = Math.floor( Math.random() * wrongAnswerArr_1.length );  // 0 1 2 => length 3
          let randomNr2 = Math.floor( Math.random() * wrongAnswerArr_2.length );  // 0 1 2

          answerArray = []; // emptying the array with answers
          answerArray.push(theTrueAnswer, wrongAnswerArr_1[randomNr1], wrongAnswerArr_2[randomNr2]);
          console.log(answerArray);

          // FILLING BLOCKS WITH ANSWERS
          fillAnswers(getRandomAnswer, answerArray);

          break;


        case 3:
          console.log('hello level 3');

          // get a correct answer
          let trueFriend = question.cookie_3_friends;

          //get the true random answer
          let randomFriendIndex = Math.floor( Math.random() * trueFriend.length );  // 0 1 2 => length 3
          // set randomized friend
          trueFriend = trueFriend[randomFriendIndex];
          // set a correct answer
          question.correctAnsw = trueFriend;

          // get wrong answers
          let randomFalseArr_1 = ['Sauron', 'R2D2', 'Shrek'];                              // put characters from other movies
          let randomFalseArr_2 = ['Julian from Madagaskar', 'Michael Jordan', 'Saruman'];  // put characters from other movies
          let randomIndex_1 = Math.floor( Math.random() * randomFalseArr_1.length );  // 0 1 2 => length 3
          let randomIndex_2 = Math.floor( Math.random() * randomFalseArr_2.length );  // 0 1 2

          answerArray = []; // emptying the array with answers
          answerArray.push(trueFriend, randomFalseArr_1[randomIndex_1], randomFalseArr_2[randomIndex_2]);

          // FILLING BLOCKS WITH ANSWERS
          fillAnswers(getRandomAnswer, answerArray);

          break
        
      }

      function getRandomAnswer(){
        let randomNum = Math.random() * answerArray.length;  // if length==3, will be [0 1 2]
        let random = Math.floor(randomNum);
        return random;
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
      let correctAnswer = question.correctAnsw;   // string of correct answer

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