$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1',
    dataType: 'json',
    success: function (response, textStatus) {
      response.tasks.forEach(function (task) {
        $('#todo-list').append('<h5>' + task.content + '</h5>');
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
});
