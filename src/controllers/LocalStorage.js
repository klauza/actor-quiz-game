// imports
const LocalStorageCtrl = (function(){

  const localstorageprivate = {
    
  }

  return{
    // SCORE
    getScore: function(){

    },
    addScore: function(){

    },


    // ID
    getIdFromStorage: function(){
      let ids;

      if(localStorage.getItem('actorIdToFilterOut') === null){
        ids = [];

      } else {
        ids = JSON.parse(localStorage.getItem('actorIdToFilterOut'));
      }

      return ids;
    },

    setPersonIdToLS: function(data){  // receive the id of already 'won' actor
      let id = data;
      let existingIds;
      if(localStorage.getItem('actorIdToFilterOut') === null){  // if null set first item
        let existingIds = [];
        existingIds.push(id);
        localStorage.setItem('actorIdToFilterOut', JSON.stringify(existingIds));
        // first id stored

      } else {    // if not null, add more
        existingIds = JSON.parse(localStorage.getItem('actorIdToFilterOut'));
        existingIds.push(id);
        localStorage.setItem('actorIdToFilterOut', JSON.stringify(existingIds));
        // another id stored
      }
      
    },
    
    deleteIdFromLS: function(){
      localStorage.removeItem('actorIdToFilterOut');
    },


    // PERSON 
    setPersonToLocalStorage: function(data){  
      let person = data;
     // console.log('person has been set successfully in LocalStorage');
      let LSperson = [];  // init person in local storage

      LSperson.push(person)
      
      localStorage.setItem('LSperson', JSON.stringify(LSperson));

    },

    deletePersonFromLocalStorage: function(){
      localStorage.removeItem('LSperson');
    },

  


  }

})();
 
export default LocalStorageCtrl;