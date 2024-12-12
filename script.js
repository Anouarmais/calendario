$(document).ready(function () {
  function openModal(dayId) {
    $('#taskModal').show();
    $('#taskForm').data('day', dayId);
  }

  function closeModal() {
    $('#taskModal').hide();
    $('#taskName').val('');
  }

  $('.calendar .day button').on('click', function () {
    const dayId = $(this).closest('.day').attr('id');
    openModal(dayId);
  });

  $('#taskForm').on('submit', function (event) {
    event.preventDefault();
    const dayId = $(this).data('day');
    const taskName = $('#taskName').val().trim();
    const taskType = $('#modal-task-type').val();

    if (taskName === "") {
      alert("Por favor, escribe una tarea.");
      return;
    }

    const $taskList = $(`#${dayId} .tasks`);
    const $taskItem = $(`
  
        
        <button id = "${dayId}" class=" ${taskType}"> ${taskName}</button>
       
     
    `);

    $taskList.append($taskItem);
    closeModal();
  });

  $(document).on('click', '.edit', function () {
    const $taskItem = $(this).closest('button');
    const taskText = $taskItem.contents().get(0).nodeValue.trim();
    const taskType = $taskItem.attr('class');

    $('#taskName').val(taskText);
    $('#modal-task-type').val(taskType);
    const dayId = $taskItem.closest('.day').attr('id');
    openModal(dayId);
    $taskItem.remove();
  });

  $(document).on('click', '.delete', function () {
    $(this).closest('li').remove();
  });

  $('.close').on('click', function () {
    closeModal();
  });
});
