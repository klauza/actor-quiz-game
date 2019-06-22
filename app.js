/*

*/
import UICtrl from './UICtrl.js';
//import JSONCtrl from './JSONCtrl.js';
import PersonCtrl from './PersonCtrl.js';

const App = (function(UICtrl){

  class HTTP{
    // Make an HTTP GET Request
    async get(url){
      const response = await fetch(url);

      const resData = await response.json();

      return resData;
    }
  }


  // Event Listeners
  const loadEventListeners = function(){
  const selectors = UICtrl.getSelectors();  
  document.addEventListener('DOMContentLoaded', getDataFromJson);
  
  }


  const http = new HTTP();
  const getJson = function(){

    return new Promise((resolve, reject) => {
    
        http.get('./api/db.json') 
        .then(data => UICtrl.renderPeople(data))
        .catch(err => console.log(err));
        
        const error = false;
        if(!error){
          resolve();
        } else {
          reject('Error');
        }
    })
   
  }

  const putLayout = function(){ 

    setTimeout(() => {
      UICtrl.getItemClickEvents()
      // apply event to each block
      document.querySelectorAll('.person-block').forEach((button) => { button.addEventListener('click', personClick)});
    }, 350);
  }

  const getDataFromJson = function(){
  getJson()
    .then(putLayout())
    .catch(err => console.log(err));
  }

  const personClick = function(){
   
    
    let id = parseInt(this.id); // MAKE SURE IT'S A NUMBER
    let person = UICtrl.getItemById(id);
    
    PersonCtrl.personFillUi(person);
    //console.log(person.skill1); //valid

    
    // Display Statistics of a person
    UICtrl.displayPersonStatistics();
   
    
  }




  return {
    init: function(){

      
      
      
      

      




      loadEventListeners();
    }
  }
})(UICtrl);

App.init();

