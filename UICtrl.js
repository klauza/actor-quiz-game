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
      //document.querySelector(UISelectors.createInput).style.display = "block";
      // else if key in localstorage == true
      // hide the button
    },

    getItemClickEvents: function(){
      const persons = document.querySelectorAll(".person-block");
      persons.forEach((person)=>{
        person.addEventListener('click', function(){

          let clickedPerson = this;
          let clickedPersonCoords = this.getBoundingClientRect();
          let marginLeft = (clickedPersonCoords.x)+'px';
          let marginTop = (clickedPersonCoords.y);
          marginTop = marginTop-200+'px';
          
          console.log(marginLeft);
          // move the item to the corner
          let content = Array.from(document.querySelector('.content').children);
          content.map((item) => item.style.display ='none' ); // hide all blocks

          
          // set CSS of clicked element
          let personCssSetBeforeAnimation = `display: block; transform: translate(${marginLeft}, ${marginTop});`;
          //clickedPerson.style.cssText = personCssSetBeforeAnimation;
          clickedPerson.style.cssText = personCssSetBeforeAnimation;
          
          // animate chosen block to the top left corner
          personAnimationToTop(clickedPerson);

          function personAnimationToTop(person){
            setTimeout(function(){
              person.style.transition = 'transform 2s';
              person.style.transform = `translate(0, -200px)`;
              
       
            }, 550);
            
          }
          person.style.pointerEvents = "none";    // prevent from clicking multiple times

        
          
        });
       });
       
    },

    
    
    getSelectors: function(){
      return UISelectors;
    }
  }
})();

export default UICtrl;