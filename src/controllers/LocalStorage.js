// imports
const LocalStorageCtrl = (function(){

  const localstorageprivate = {
    
  }

  return{
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
        console.log('first id stored');

      } else {    // if not null, add more
        existingIds = JSON.parse(localStorage.getItem('actorIdToFilterOut'));
        existingIds.push(id);
        localStorage.setItem('actorIdToFilterOut', JSON.stringify(existingIds));
        console.log('another id stored');
      }
      
    },


    deleteIdFromLS: function(){
      localStorage.removeItem('actorIdToFilterOut');
    },

  


  }

})();
 
export default LocalStorageCtrl;