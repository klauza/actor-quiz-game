import PersonCtrl from './PersonCtrl.js';
import LevelCtrl from './Level.js';
import LocalStorageCtrl from './LocalStorage.js';



const QuestionsCtrl = (function(){
  
  const question = {
    cookie_1_movie: ''
  }


  return{
    getCookie: function(){
      // get cookie
      // return question
      // return question.cookie_1_movie
    },

    showQuestion: function(){

      // display block with questions
      let allAnswers = document.querySelector('.answers');
      allAnswers.style.display = "flex";
      let answers = Array.from(allAnswers.children);


      // get chosen actor's data
      // let actorMovie = PersonCtrl.getPerson().movies[1];  // get a random movie
      let actor = PersonCtrl.getPerson();
      let actorMoviesAmount = actor.movies.length;   // sum of actor movies

      let randomActorMovieId = Math.floor(Math.random() * actorMoviesAmount); 
      let actorMovie = actor.movies[randomActorMovieId];
      question.cookie_1_movie = actorMovie;

     
      // hardcoded wrong answers
      let randomMovie1 = ['Fight Club', 'The Green Mile', 'The Matrix', 'Intouchables', 'Pirates of the Caribbean', 'Cast Away', 'The Butterfly Effect'];
      let randomMovie2 = ['Léon', 'Gladiator', 'The Hangover', 'Se7en', 'Seven Pounds', 'A Beautiful Mind', 'The Da Vinci Code', 'Gran Torino'];

      let randomNumber1 = Math.random() * randomMovie1.length;  // 0 1 2 => length 3
      let random1 = Math.floor(randomNumber1); 
      let randomNumber2 = Math.random() * randomMovie2.length;  // 0 1 2
      let random2 = Math.floor(randomNumber2); 

      // put all answers in new array
      let answerArray = new Array; // init new array with answers to be outputted later
      answerArray.push(actorMovie, randomMovie1[random1], randomMovie2[random2]);

      // put random answer into random place
      function getRandomAnswer(){
        let randomNum = Math.random() * answerArray.length;  // if length==3, will be [0 1 2]
        let random = Math.floor(randomNum);
        return random;
      }

      // FILLING BLOCKS WITH ANSWERS
      fillAnswers();
      function fillAnswers(){
        if(answers[0].textContent==''){
        
          const randomAnswerId = getRandomAnswer();   // variable for id of randomized answer

          // put random answer into first block
          answers[0].textContent=answerArray[randomAnswerId];

          // delete answer with this id from answerArray
          answerArray.splice(randomAnswerId, 1);   
          //console.log('the new array is:', answerArray);
          

          fillAnswers();   // run the whole function again!

        } else if(answers[1].textContent==''){
          const randomAnswerId = getRandomAnswer();
          answers[1].textContent=answerArray[randomAnswerId];
          answerArray.splice(randomAnswerId, 1);  
          fillAnswers();

        } else if(answers[2].textContent==''){
          const randomAnswerId = getRandomAnswer();
          answers[2].textContent=answerArray[randomAnswerId];
          answerArray.splice(randomAnswerId, 1);  
          fillAnswers();

        } else {
          return
        }
      }
      

      // GUESSING THE ANSWER
      answers.forEach((button)=>{
        button.addEventListener('click', tryGuess);
      })

      function tryGuess(){
        let guess = this.textContent;   // string of clicked answer
        let correctAnswer = actorMovie;   // string of correct answer

        if (correctAnswer == guess){ 
          console.log('correct!');

          QuestionsCtrl.clearAnswers();  // empty string of answers
          QuestionsCtrl.hideAnswers();   // hide block 'answers'

          LevelCtrl.IncreaseScoreByOne(); // incement score 

          // remove event listeners from buttons
          answers.forEach((button)=>{
            button.removeEventListener("click", tryGuess, false);
          })

          let actorId = actor.id;
          // store actor's id into LS
          LocalStorageCtrl.setPersonIdToLS(actorId);  // init next level

          setTimeout(()=>{
            location.reload(true);
          }, 1000);

        } else {
          console.log('bad answer! Game over!');
          //game over
        }

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