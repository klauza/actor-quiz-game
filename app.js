/*

*/
import UICtrl from './UICtrl.js';
import JSONCtrl from './JSONCtrl.js';

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


  }
  // const UICtrl.getButtons();




  return {
    init: function(){
      UICtrl.showHideCreateInput();

      //JSONCtrl.getJson(); // Load Json into UI

      const http = new HTTP();
      
      const getJson = function(){

        return new Promise((resolve, reject) => {
          setTimeout(() => {

            http.get('./api/db.json') 
            .then(data => UICtrl.renderPeople(data))
            .catch(err => console.log(err));
            
            const error = false;
            if(!error){
              resolve();
            } else {
              reject('Error');
            }
          }, 250)
        })
       
      }
 
      //getJson();
    

      


      const putLayout = function(){ 

        setTimeout(() => {
          UICtrl.getItemClickEvents();
        }, 350);
      
      }

  
      
      getJson()
        .then(putLayout())
        .catch(err => console.log(err));
      



      loadEventListeners();
    }
  }
})(UICtrl);

App.init();

