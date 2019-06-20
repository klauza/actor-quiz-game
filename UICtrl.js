const UICtrl = (function(){
  const UISelectors = {
    formSubmit: '#start-button',
    startingInput: '#start-input',
    createInput: '#create-input'
  }


  return {

    showHideCreateInput: function(){
      console.log('hi');

      // if key in localstorage == "" // null
      document.querySelector(UISelectors.createInput).style.display = "block";
      // else if key in localstorage == true
      // hide the button
    },
    
    getSelectors: function(){
      return UISelectors;
    }
  }
})();

export default UICtrl;