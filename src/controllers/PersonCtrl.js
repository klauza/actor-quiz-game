const PersonCtrl = (function(){

  const chosenPerson = {
    data: {}
  }

  return {

    personFillUi: function(){
      let person = chosenPerson.data;

      document.querySelector('#skill-1').textContent = person.skill1;
      document.querySelector('#skill-2').textContent = person.skill2;
      document.querySelector('#skill-3').textContent = person.skill3;
      document.querySelector('#attribute1').value = 5;
      document.querySelector('#attribute2').value = 10;
      document.querySelector('#personName').textContent = person.title;
      document.querySelector('#personFrom').textContent = person.body;
    },

    savePerson: function(data){
      chosenPerson.data = data;
    },

    getPerson: function(){
      return chosenPerson.data;
    },



    changeSkill: function(newSkill){
      chosenPerson.data.skill1 = newSkill;
    }


  }
})();

export default PersonCtrl;