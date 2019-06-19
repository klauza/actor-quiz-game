const UICtrl = (function(){
  const UISelectors = {
    formSubmit: '#start-button',
    startingInput: '#start-input'
  }


  return {
    
    getSelectors: function(){
      return UISelectors;
    }
  }
})();

export default UICtrl;