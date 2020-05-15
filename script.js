$(document).ready(function () {
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=157',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();
        response.tasks.forEach(function (task) {
          $('#todo-list').append(
            '<div class="row ml-3"><h5 class="col-xs-8">' +
              task.content +
              '</h5><button class="delete btn btn-sm btn-danger mb-3 ml-3" data-id="' +
              task.id +
              '">Delete</button>'
          );
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=157',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val(),
        },
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  getAndDisplayAllTasks();

  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url:
        'https://altcademy-to-do-list-api.herokuapp.com/tasks/' +
        id +
        '?api_key=157',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });
});
