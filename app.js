
import UICtrl from './UICtrl.js';

const App = (function(UICtrl){

  

  const loadEventListeners = function(){
   
    const selectors = UICtrl.getSelectors();
    console.log(selectors);

    document.querySelector(selectors.formSubmit).addEventListener('click', submitTest);
  }

  const submitTest = function(e){
    e.preventDefault();

    console.log('form submitted!');
    const startingInputValue = document.querySelector('#start-input');
    console.log(startingInputValue.value);

    
  }


  return {
    init: function(){
     

      loadEventListeners();
    }
  }
})(UICtrl);

App.init();

