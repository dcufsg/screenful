Screenful.Progress={
  start: function(){
    Screenful.createEnvelope(true);
    $("#envelope").html("<div id='middlebox'></div>");
    $("#middlebox").append("<div class='message'>"+Screenful.Progress.message+"</div>");
    $("#middlebox").append("<div class='labels'><div class='left'>&nbsp;</div><div class='right'>&nbsp;</div></div>");
    $("#middlebox").append("<div class='meter'><div class='done'></div></div>");
    $("#middlebox").append("<div class='buttons'><button class='button'>"+Screenful.Loc.cancel+"</button></div>");
    $("#middlebox .buttons button").on("click", function(e){ window.location=Screenful.Progress.awayUrl; });
    Screenful.Progress.batch();
  },

  batch: function(){
    $.ajax({url: Screenful.Progress.resaveUrl, dataType: "json", method: "POST", data: {}}).done(function(data){
      if(!Screenful.Progress.totalTodo) Screenful.Progress.totalTodo=data.todo;
      if(Screenful.Progress.totalTodo<data.todo) Screenful.Progress.totalTodo=data.todo;

      var todo=Screenful.Progress.totalTodo;
      var done=Screenful.Progress.totalTodo-data.todo;
      var percentage=0; if(todo>0) percentage=Math.round(done/todo*100);
      $("#middlebox .labels .right").html(done+"/"+todo);
      $("#middlebox .labels .left").html(percentage+"%");
      $("#middlebox .meter .done").css("width", percentage+"%");

      if(!data.todo) {
        $("#middlebox .buttons button").addClass("finished").html(Screenful.Loc.finished);
      } else {
        window.setTimeout(Screenful.Progress.batch, 1000);
      }
    });
  },


};
$(window).ready(Screenful.Progress.start);
