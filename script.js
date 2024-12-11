// Función para abrir el modal
function openModal(dayId) {
    document.getElementById('taskModal').style.display = 'block';
    document.getElementById('taskForm').dataset.day = dayId;
  }
  
  // Función para cerrar el modal
  function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
  }
  
  // Función para agregar una tarea
  document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var dayId = this.dataset.day;
    var taskName = document.getElementById('taskName').value.trim();
    var taskType = document.getElementById('modal-task-type').value;
  
    if (taskName === "") {
      alert("Por favor, escribe una tarea.");
      return;
    }
  
    const day = document.getElementById(dayId);
    const taskList = day.querySelector('.tasks');
  
    const taskItem = document.createElement('li');
    taskItem.className = taskType; // Asignar la clase según el tipo de tarea
    taskItem.innerHTML = `
      ${taskName}
      <button onclick="editTask(this)">Editar</button>
      <button onclick="deleteTask(this)">Eliminar</button>
    `;
    taskList.appendChild(taskItem);
  
    closeModal();
  });
  
  // Función para editar una tarea
  function editTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.firstChild.nodeValue.trim();
    const taskType = taskItem.className; // Obtener el tipo de tarea
  
    // Llenar el formulario con la tarea existente
    document.getElementById('taskName').value = taskText;
    document.getElementById('modal-task-type').value = taskType;
    openModal(taskItem.closest('.day').id);
  }
  
  // Función para eliminar una tarea
  function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
  }
  