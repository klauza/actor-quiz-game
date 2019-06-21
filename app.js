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





  return {
    init: function(){
      UICtrl.showHideCreateInput();

      //JSONCtrl.getJson(); // Load Json into UI

      const http = new HTTP();
      
      const getJson = function(){
        http.get('./api/db.json') 
          .then(data => UICtrl.renderPeople(data))
          .catch(err => console.log(err));
      }
 
      getJson();
    

      

 
      

      

     
      setTimeout(() => {  // get click Events, has to wait on JSON thus setTimeout
        UICtrl.getItemClickEvents();
        
      }, 250)
   
    


      loadEventListeners();
    }
  }
})(UICtrl);

App.init();

