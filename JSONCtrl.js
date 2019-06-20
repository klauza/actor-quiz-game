const JSONCtrl = (function(){



 

  return {
    
    getJson: function(){
      //get json local data
    fetch('./api/db.json')
      .then(res => res.json())
      .then(data =>{
        console.log(data);
        let output = '';
        data.forEach(function(post){
          output += `<li>${post.title}</li>`;
        });
        document.querySelector('.content').innerHTML = output;
      })
      .catch(err => console.log(err));
    }
  


    

  }
})();

export default JSONCtrl;