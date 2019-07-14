// imports
const LocalStorageCtrl = (function(){

  const localstorageprivate = {
    
  }

  return{
    setPersonIdToLS: function(data){  // receive the id of already 'won' actor
      let id = data;
      console.log('id stored');
      let LSId = [];  // init id in LS

      LSId.push(id)
      
      localStorage.setItem('actorIdToFilterOut', JSON.stringify(LSId));

    },

    deleteIdFromLS: function(){
      localStorage.removeItem('actorIdToFilterOut');
    },


  }

})();
 
export default LocalStorageCtrl;