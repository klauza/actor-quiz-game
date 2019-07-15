import LocalStorageCtrl from './LocalStorage.js';
import LevelCtrl from './Level.js';


const UICtrl = (function(){
  const UISelectors = {
    formSubmit: '#start-button',
    startingInput: '#start-input',
    createInput: '#create-input',
    buttonAfterLayoutLoad: '.button-with-class',
    prevPerson: '',
    nextPerson: ''
  }

  
  const person = {
    items: [], // stores characters from renderPeople
    stage: 0
  }

  return {
    getSelectors: function(){
      return UISelectors;
    },
    getStage: function(){
      return person.stage;
    },
    updateStage: function(){
      person.stage++;
      //console.log('stage updated, now stage: ', person.stage);
    },
    
    showScore: function(){
      let score = LocalStorageCtrl.getScore(); // get score
      LevelCtrl.updateScoreFromLS(score);
      if( score.length === 0 ){ score=Number(score); }  // sets score to 0 if the LS does not exist yet

      //console.log('score is: ',score);
      
      document.querySelector('.scoreValue').textContent = score; 
    },

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

    onHoverPushSiblings: function(){
      // get siblings
      const hoverPerson = this;
      const prevPerson = this.previousElementSibling;
      const nextPerson = this.nextElementSibling;
      // animate hovering person
      //hoverPerson.style.transform = "translateY(-20px)";

      // animate left for prevPerson except '0' block which does not exist
      if(hoverPerson.id != 1){
        prevPerson.style.transform = "translateX(-50px)";
      }

      // animate right for nextPerson
      nextPerson.style.transform = "translateX(50px)";
      
       // add event listener to the person being hovered
      UICtrl.getItemClickEvents(hoverPerson);
    },

    onLeaveDragSiblings: function(){
      // get siblings
      const hoverPerson = this;
      const allPersonsCount = document.querySelectorAll('.person-block').length;
      
      const prevPerson = this.previousElementSibling;
      const nextPerson = this.nextElementSibling;

      // animate hovering person
      // hoverPerson.style.transform = "translateY(0px)";

      // animate back left person block
      if(hoverPerson.id != 1){
        prevPerson.style.transform = "translateX(0px)";
      }

      // animate right for nextPerson
      nextPerson.style.transform = "translateX(0px)";

      UICtrl.removeItemClickEvents(hoverPerson);
      
    },
    removeItemClickEvents: function(person){

      //person.removeEventListener("click", UICtrl.getItemClickEvents.runFunction, false);
     // console.log('removed');
    },
   
    // Add Animation on clicked person [ initializing phase ]
    getItemClickEvents: function(person){
      person.style.opacity = "1";
      person.addEventListener('click', runFunction);


      function runFunction(){
        // remove transition animation
        this.style.opacity = "1";
        // get hover
        // this.querySelector(':hover').style.transition = "0ms all ease";
        console.log(this, 'clicked');
     

        setTimeout(()=>{
          document.querySelector('.fill-background-top > .welcome-text').style.opacity ="0";
        }, 150);

        setTimeout(()=>{
          let textNode = document.querySelector('.welcome-text');
          // let parent = document.querySelector('.fill-background-top');
          
          textNode.style.animation = "animationText forwards 2.5s";
          textNode.textContent = "Okay, let's start! - click me to begin.";
          
         
        }, 625)

        // css margin-left
        const personMargin = document.querySelector('.person-block');
        const personMarginStyle = window.getComputedStyle(personMargin);  // example: margin = -25px
        let margin = personMarginStyle.marginLeft;                        
        margin = margin.split("px",1);                                    // margin = -25
        let marginLeftCSS = -(margin/2);                                  // margin = 12.5
       
        // Setting the coords of person
        let clickedPerson = this;
        let clickedPersonCoords = this.getBoundingClientRect();
        //console.log(clickedPersonCoords);
        let positionLeft = (clickedPersonCoords.x);    // distance from left edge
        let positionTop = (clickedPersonCoords.y);          // distance from top edge

        let contentWidth = document.querySelector('.content').getBoundingClientRect().width;
        let personBlockWidth = this.getBoundingClientRect().width;
        personBlockWidth = marginLeftCSS+personBlockWidth/2;              // apply margin 
        
        positionLeft = positionLeft-contentWidth/2;
        positionLeft = positionLeft+personBlockWidth;
        
        positionTop = positionTop-200;

        // hide siblings of chosen actor
        let content = Array.from(document.querySelector('.content').children);
        let personCssSetBeforeAnimation = `display: block; transform: translate(${positionLeft}px, ${positionTop}px);`;

        content.map((item) => {
          if(item.id !== clickedPerson.id){
            console.log(item, 'hidden');
            item.style.display ='none';
          } 
        } ); // hide all blocks

         
        // set CSS of clicked element
        // clickedPerson.style.cssText = personCssSetBeforeAnimation;
        // clickedPerson.style.display = "block";
        clickedPerson.style.cssText = `display: block; transform: translate(${positionLeft}px, ${positionTop}px);`;

        // animate chosen block to the top left corner
        personAnimationToTop(clickedPerson);

        // move the item to the top center
        function personAnimationToTop(person){
          setTimeout(function(){
            person.style.transition = 'transform 2s';
            person.style.transform = `translate(0, -200px)`;
            
     
          }, 550);
          
        }
        person.style.pointerEvents = "none";    // prevent from clicking multiple times

      
        
      };

      
       
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
      document.querySelector('.welcome-text').style.display = "block";  // show text
    
      // get actor ids data from ls to be filtered
      let idsFromLS = LocalStorageCtrl.getIdFromStorage();
      
      // filter out completed actors and create new array 'filtered'
      var filtered = data.filter(function(e){
          return this.indexOf(e.id) < 0;
        }, idsFromLS
      );

      let output = '';

      // check if game is completed     ------------------------------ GAME COMPLETED ---------------------------------
      if(filtered == ''){
        alert("Congratulations, you have completed all tasks, click reset button to start over xD");

      } else {

        filtered.forEach(function(post, index){

          person.items.push(post);  // put each json unit into person.items
          let delay = index*150;
          output += 
          `
          <div class="dodatek'>
          <div id="${post.id}" class="person-block" style="animation-delay: ${delay}ms;">
            <div class="person-block_img">
              <img src="${post.image}">
            </div>
            <p>${post.title}</p>
            <p>${post.body}</p>
          </div>
          </div>
          `;
          
        });

        /* "?" Random Block "?" */
        let actorLength = filtered.length;  // get number of actors
        let delay = actorLength*150;
        output += 
        `
        <div class="random-block" style="animation-delay: ${delay}ms">
            <div class="random-block_img">
              <img src="./img/random.jpg">
            </div>
            <p>Random</p>
            <p>Actor</p>
          </div>
        `;
        
        document.querySelector('.content').innerHTML = output;
        return data
      }
    },
    continueGame: function(){
      console.log('Actor questions complete!');
      document.querySelector('.welcome-text').textContent = "Actor questions complete!";
      document.querySelector('.nextActor').style.opacity = "1";
      document.querySelector('.nextActor').style.transform = 'translateY(-600px) translateX(-50%)';
      document.querySelector('.nextActor').style.transition = '250ms all ease';

    },

    winGame: function(){
      console.log('Game completed');
      document.querySelector('.local-storage-reset').style.transform = 'translateY(-600px) translateX(-50%)';
      document.querySelector('.statistics').style.display = "none";
      document.querySelector('.content').style.display = "none";
      document.querySelector('.button-container').style.display = "none";
    },

    resetGame: function(e){
      e.preventDefault();
      // empty local storage
      LocalStorageCtrl.deletePersonFromLocalStorage();
      LocalStorageCtrl.deleteIdFromLS();
      LocalStorageCtrl.deleteScore();
  
      location.reload(true);
    }
    
    
   

   
  }
})();

export default UICtrl;