/*

*/
import UICtrl from './UICtrl.js';
import JSONCtrl from './JSONCtrl.js';

const App = (function(UICtrl){

  

  const loadEventListeners = function(){
   
    const selectors = UICtrl.getSelectors();  

    // document.querySelector(selectors.formSubmit).addEventListener('click', submitTest);

   


  }

  const submitTest = function(e){
    console.log('form submitted!');
    const nameInputValue = document.querySelector('#start-input').value;
    console.log('Value was: ', nameInputValue);

    //JSONCtrl.postJson("Title stolec", "body kloc");
    e.preventDefault();
  }




  return {
    init: function(){
      UICtrl.showHideCreateInput();

      JSONCtrl.getJson(); // Load Json into UI
      
      setTimeout(() => {  // get click Events, has to wait on JSON thus setTimeout
        UICtrl.getItemClickEvents();
        
      }, 250)
   
    


      loadEventListeners();
    }
  }
})(UICtrl);

App.init();

