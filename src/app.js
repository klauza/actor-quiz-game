/*

*/
import LocalStorageCtrl from './controllers/LocalStorage.js';
import UICtrl from './controllers/UICtrl.js';

import PersonCtrl from './controllers/PersonCtrl.js';
import LevelCtrl from './controllers/Level.js';
// import questions

const App = (function(UICtrl, PersonCtrl){

  
  // Event Listeners
  const loadEventListeners = function(){
    // const selectors = UICtrl.getSelectors();  
    document.addEventListener('DOMContentLoaded', displayDataFromAPI);

    // document.querySelector('.button-1').addEventListener('click', getChosenPerson);
    // document.querySelector('.button-2').addEventListener('click', changeSkill1);
    document.querySelector('.local-storage-reset').addEventListener('click', UICtrl.resetGame);

    document.querySelector('.nextActor').addEventListener('click', function(){location.reload(true)}); // continue to next actor

  }

    ///////////-GAME INIT-//////////

  // Get from API from local file :)
  function displayDataFromAPI(){
    fetch('./api/db.json')
      .then(res => res.json())
      .then(data => {
        UICtrl.showScore();
        UICtrl.renderPeople(data);    // rendering people. Putting data from json onto UI.
        
      })
      .then(()=>{
      
        //UICtrl.getItemClickEvents(); //animations and stuff apply to each block of person
        /*setting click events on blocks*/
        document.querySelectorAll('.person-block').forEach((button) => { button.addEventListener('click', personClick)}); //add listener to each block
 
      })
      .then(()=>{
        setTimeout(()=>{
          document.querySelectorAll('.person-block').forEach((button) => { button.addEventListener('mouseenter', UICtrl.onHoverPushSiblings)}); //adds hover listenrs
          document.querySelectorAll('.person-block').forEach((button) => { button.addEventListener('mouseleave', UICtrl.onLeaveDragSiblings)}); 
          document.querySelector('.random-block').addEventListener('click', randomPerson);
        }, 1000)
      
        
        console.log(document.querySelectorAll('person-block'));
      })
      .catch(err => console.log(err));
  }
  

  ///////////-GAME START-//////////

  const personClick = function(){   

    let id = parseInt(this.id); // get the ID of chosen actor

    let person = UICtrl.getPersonById(id);  // store a person
    //console.log(person);

    PersonCtrl.savePerson(person);  // save locally
    PersonCtrl.personFillUi(); // get from local
    LocalStorageCtrl.setPersonToLocalStorage(person); // save to LS
    //UICtrl.showPersonUi();
    
   
    UICtrl.updateStage();
    
    // initialization of game start           /* GAME STARTS HERE */
    LevelCtrl.updateLevel();
    LevelCtrl.initText();
  }

  const randomPerson = function(){
    // Randomize the person's ID
    let allActors = Array.from(document.querySelectorAll('.person-block'));

    let actorCount = allActors.length;  // 5
    let id = Math.random() * actorCount;  // from 0 to 4
    id = Math.floor(id);
    
    let pickActor = allActors[id];  //target actor with randomized id

    pickActor.click();  // click on actor with random id
  }


 ///////////-GAME AFTER CHOOSING PERSON-//////////

 // Button-1 test - log into console chosen person
 /*
  const getChosenPerson = function(e){

  const person = PersonCtrl.getPerson();

  console.log('Chosen person is: ',person);
  e.preventDefault();
}

  const changeSkill1 = function(e){
    let person = PersonCtrl.getPerson();
    // console.log(person.skill1); // -valid
    let newValue = "Has skateboard";

    PersonCtrl.changeSkill(newValue);   // change skill with newValue
    PersonCtrl.personFillUi();        // repaint the UI
    e.preventDefault();
  }
*/



  return {
    init: function(){
      
      document.querySelector('.button-container').style.display = "none";
      loadEventListeners();
    }
  }
})(UICtrl, PersonCtrl);

App.init();

