const PersonCtrl = (function(){

  const singlePerson = {
    person: []

  }

  return {

    personFillUi: function(data){
      let person = data;
      // console.log('from personctrl: ', data);
      document.querySelector('#skill-1').textContent = person.skill1;
      document.querySelector('#skill-2').textContent = person.skill2;
      document.querySelector('#skill-3').textContent = person.skill3;
      document.querySelector('#attribute1').value = 5;
      document.querySelector('#attribute2').value = 10;
      document.querySelector('#personName').textContent = person.title;
      document.querySelector('#personFrom').textContent = person.body;
    }
   


  }
})();

export default PersonCtrl;