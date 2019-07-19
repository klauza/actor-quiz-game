import LocalStorageCtrl from './controllers/LocalStorage.js';
import UICtrl from './controllers/UICtrl.js';
import PersonCtrl from './controllers/PersonCtrl.js';
import LevelCtrl from './controllers/Level.js';

const App = (function(UICtrl, PersonCtrl){

  // Event Listeners
  const loadEventListeners = function(){
    
    document.addEventListener('DOMContentLoaded', displayDataFromAPI);
    document.querySelector('.local-storage-reset').addEventListener('click', UICtrl.resetGame); // reset the whole game
  }

    ///////////-GAME INIT-//////////

  // get API from local file
  function displayDataFromAPI(){
    fetch('./api/db.json')
      .then(res => res.json())
      .then(data => {
        UICtrl.showScore();
        UICtrl.renderPeople(data);    // render actors on screen
      })
      .then(()=>{
        UICtrl.getItemClickEvents(); //animations and stuff apply to each block of person
        document.querySelectorAll('.person-block').forEach((button) => { button.addEventListener('click', personClick)}); //add listener to each block
        document.querySelector('.random-block').addEventListener('click', randomPerson);
      })
      .catch(err => console.log(err));
  }
  

  ///////////-GAME START-//////////

  const personClick = function(){   
    let id = parseInt(this.id); // get the ID of chosen actor
    let person = UICtrl.getPersonById(id);  // get json person

    PersonCtrl.savePerson(person);                    // save locally
    PersonCtrl.personFillUi();                        // get from local
    LocalStorageCtrl.setPersonToLocalStorage(person); // save to LS
    
    LevelCtrl.initText();   // initialization of game start           /* GAME STARTS HERE */
  }

  const randomPerson = function(){
    let allActors = Array.from(document.querySelectorAll('.person-block'));

    let actorCount = allActors.length;  // 7
    let id = Math.random() * actorCount;  // from 0 to 6
    id = Math.floor(id);
    
    let pickActor = allActors[id];  //target actor with randomized id

    pickActor.click();  // auto-click on actor with random id
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

