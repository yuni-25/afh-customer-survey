fetch("survey.json")
  .then(res => res.json())
  .then(json => {

      const survey = new Survey.Model(json);

      survey.onComplete.add(function(sender){

          fetch(GOOGLE_SCRIPT_URL,{
              method:"POST",
              mode:"no-cors",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify(sender.data)
          });

      });

      survey.render("surveyContainer");

  });
