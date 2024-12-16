$(document).ready(function () {
  function openModal(dayId, taskName = '', description = '') {
    $('#taskModal').show();
    $('#taskForm').data('day', dayId);
    $('#taskName').val(taskName); // Llenar el campo de nombre en el modal
    $('#description').val(description); // Llenar el campo de descripción en el modal
  }

  function closeModal() {
    $('#taskModal').hide();
    $('#taskName').val('');
    $('#description').val('');
  }

  $('.calendar .day button').on('click', function () {
    const dayId = $(this).closest('.day').attr('id');
    openModal(dayId); // Abrir el modal sin tarea seleccionada
  });

  $('#taskForm').on('submit', function (event) {
    event.preventDefault();
    const dayId = $(this).data('day');
    const taskName = $('#taskName').val().trim();
    const taskType = $('#modal-task-type').val();
    const description = $('#description').val().trim();

    if (taskName === "") {
      alert("Por favor, escribe una tarea.");
      return;
    }

    const $taskList = $(`#${dayId} .tasks`);
    const $taskItem = $(`<button id="${dayId}" class="${taskType}" data-description="${description}">
      ${taskName}
    </button>`);

    $taskList.append($taskItem);
    closeModal();
  });

  $(document).on('click', '#editar', function () {
    const $taskItem = $('#detailModalTitle').closest('button');
    const taskText = $('#detailModalTitle').text().trim();
    const description = $('#detailModalDescription').text().trim();
    
    $('#taskName').val(taskText);
    $('#description').val(description);
    const dayId = $taskItem.closest('.day').attr('id');
    openModal(dayId);
    $taskItem.remove();
    $('#detailModal').hide();
  });

  $(document).on('click', '#eliminar', function () {
    const $taskItem = $('#detailModalTitle').closest('button');
    $taskItem.remove();
    $('#detailModal').hide();
  });

  $(document).on('click', '.delete', function () {
    $(this).closest('button').remove();
  });

  $('.close').on('click', function () {
    closeModal();
  });

  $(document).on('click', '.tasks button', function () {
    const taskName = $(this).text().trim();
    const description = $(this).attr('data-description');
    $('#detailModalTitle').text(taskName);
    $('#detailModalDescription').text(description);
    $('#detailModal').show();
  });

  $('.close-detail').on('click', function () {
    $('#detailModal').hide();
  });
});
