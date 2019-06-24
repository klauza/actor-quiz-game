const UICtrl = (function(){
  const UISelectors = {
    formSubmit: '#start-button',
    startingInput: '#start-input',
    createInput: '#create-input',
    buttonAfterLayoutLoad: '.button-with-class'
  }

  
  const person = {
    items: [] // all characters from renderPeople
  }

  return {

    
    // NEW NEW NEW
    getPersonById: function(id){
      // loop through the items and match the id

      let found = null;
      person.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });

      return found;
    },

  

    // Starting animation, display ="block" all UI
    showPersonUi: function(){
      setTimeout(() =>{
        const buttons = document.querySelectorAll(UISelectors.buttonAfterLayoutLoad);
        // console.log(buttons);
        buttons.forEach((button) => {
          button.style.display = "block";
          setTimeout(()=> {
            button.style.opacity = "1";
          }, 50)
        });
        document.querySelector('.statistics').style.display = "block";
        setTimeout(()=> {
          document.querySelector('.statistics').style.opacity = "1";
        }, 50)

      }, 2500)
    },

 

    renderPeople: function(data){
      //console.log(data);
     
   
      let output = '';
        data.forEach(function(post){

          person.items.push(post);  // put all json into person.items

          output += 
          `
          <div id="${post.id}" class="person-block">
            <div class="img-container">
              <img src="${post.image}">
            </div>
            <p>${post.title}</p>
            <p>${post.body}</p>
          </div>
          `;
        });
  
      document.querySelector('.content').innerHTML = output;
      return data
    },

   
    // Animation on clicked person [ starting phase ]
    getItemClickEvents: function(){
      const persons = document.querySelectorAll(".person-block");
      persons.forEach((person)=>{
        person.addEventListener('click', function(){

          setTimeout(()=>{
            document.querySelector('.fill-background-top > .welcome-text').style.opacity ="0";
          }, 150);
          
          setTimeout(()=>{
            let textNode = document.querySelector('.welcome-text');
            let parent = document.querySelector('.fill-background-top');
            
            textNode.style.animation = "animationText forwards 2.5s";
            textNode.textContent = "Okay, let's start!";
           
          }, 625)



          let clickedPerson = this;
          let clickedPersonCoords = this.getBoundingClientRect();
          let positionLeft = (clickedPersonCoords.x)+'px';    // distance from left edge
          let positionTop = (clickedPersonCoords.y);          // distance from top edge
          positionTop = positionTop-200+'px';
          
          console.log(positionLeft);
          // move the item to the corner
          let content = Array.from(document.querySelector('.content').children);
          content.map((item) => item.style.display ='none' ); // hide all blocks

          
          // set CSS of clicked element
          let personCssSetBeforeAnimation = `display: block; transform: translate(${positionLeft}, ${positionTop});`;
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