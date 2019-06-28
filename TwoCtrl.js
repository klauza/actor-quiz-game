const TwoCtrl = (function(){



  return{
    initTwo: function(){
      document.querySelector('.welcome-text').textContent = `Correct answer! Go to next question. Click.`;
      document.querySelector('.welcome-text').classList.add('textHover');
      document.querySelector('.welcome-text').addEventListener('click', TwoCtrl.textChange); // puts first question
    },

    textChange: function(){
      document.querySelector('.welcome-text').classList.remove('textHover');
      document.querySelector('.welcome-text').textContent = `Question 2: something`;

      document.querySelector('.welcome-text').removeEventListener("click", TwoCtrl.textChange, false);      // Succeeds

      TwoCtrl.TwoAnswers();  
    },

    TwoAnswers: function(){
      
      let allAnswers = document.querySelector('.answers');
      allAnswers.style.display = "block";
      let answers = Array.from(allAnswers.children);
      
      answers[0].textContent = 'a';
      answers[1].textContent = 'b';
      answers[2].textContent = 'c';

    }

  }
})();

export default TwoCtrl;