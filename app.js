/*

*/
import UICtrl from './UICtrl.js';
//import JSONCtrl from './JSONCtrl.js';
import PersonCtrl from './PersonCtrl.js';

const App = (function(UICtrl){


  // Event Listeners
  const loadEventListeners = function(){
    const selectors = UICtrl.getSelectors();  
    document.addEventListener('DOMContentLoaded', getJson);

    document.querySelector('.button-1').addEventListener('click', getChosenPerson);
    document.querySelector('.button-2').addEventListener('click', changeSkill1);
    document.querySelector('.local-storage-reset').addEventListener('click', resetGame);
  
  }

    ///////////-GAME INIT-//////////

  // Get from API from local file :)
  function getJson(){
    fetch('./api/db.json')
      .then(res => res.json())
      .then(data => {
        UICtrl.renderPeople(data);    // Put data from json onto UI
        setTimeout(() => {
          UICtrl.getItemClickEvents(); //animations and stuff apply to each block of person
          document.querySelectorAll('.person-block').forEach((button) => { button.addEventListener('click', personClick)}); //add listener to each block
        }, 350);
         // passing data to another function
      })
      .catch(err => console.log(err));
      
  }
  

  ///////////-GAME START-//////////

  const personClick = function(){   

    console.log(this);

    let id = parseInt(this.id); // convert ID to number

    let person = UICtrl.getPersonById(id);
    //console.log(person.skill1); //valid

    PersonCtrl.savePerson(person);  // save locally
    PersonCtrl.personFillUi(); // get from local
    PersonCtrl.setPersonToLocalStorage(person); // save to LS
    UICtrl.showPersonUi();
  }



 ///////////-GAME AFTER CHOOSING PERSON-//////////

 // Button-1 test - log into console chosen person
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


  ///////////-GAME RESET-//////////
  const resetGame = function(e){

    // empty local storage
    PersonCtrl.deletePersonFromLocalStorage();

    location.reload();
    e.preventDefault();
  }
  return {
    init: function(){

      

      loadEventListeners();
    }
  }
})(UICtrl);

App.init();

