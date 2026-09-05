const user = JSON.parse(localStorage.getItem('user') || '{}');
const tasksContainer = document.getElementById('tasksContainer');
const userGreeting = document.getElementById('userGreeting');
const filterStatus = document.getElementById('filterStatus');
const filterCategory = document.getElementById('filterCategory');
const taskForm = document.getElementById('taskForm');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const submitTaskBtn = document.getElementById('submitTaskBtn');
const formTitle = document.getElementById('formTitle');
let editingTaskId = null;

if (!user.id) {
  window.location.href = 'login.html';
}

userGreeting.textContent = `Olá, ${user.name || 'Aluno'}`;

async function loadDashboard() {
  try {
    const response = await fetch(`http://localhost:8080/api/tasks?userId=${user.id}`);
    const tasks = await response.json();

    renderTasks(tasks);
    renderStats(tasks);
  } catch (error) {
    console.error(error);
    tasksContainer.innerHTML = '<p>Erro ao carregar tarefas.</p>';
  }
}

function renderStats(tasks) {
  const total = tasks.length;
  const pendentes = tasks.filter(task => !task.completed).length;
  const concluidas = tasks.filter(task => task.completed).length;
  const proximas = tasks.filter(task => !task.completed && task.dueDate).length;

  document.getElementById('totalTasks').textContent = total;
  document.getElementById('pendingTasks').textContent = pendentes;
  document.getElementById('completedTasks').textContent = concluidas;
  document.getElementById('nearDeadline').textContent = proximas;
}

function renderTasks(tasks) {
  const statusFilter = filterStatus.value;
  const categoryFilter = filterCategory.value;

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'pending' ? !task.completed : task.completed);
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  if (!filteredTasks.length) {
    tasksContainer.innerHTML = '<p class="empty-state">Nenhuma tarefa encontrada.</p>';
    return;
  }

  tasksContainer.innerHTML = filteredTasks.map(task => `
    <article class="task-item ${task.completed ? 'completed' : ''}">
      <div class="task-main">
        <h4>${task.title}</h4>
        <p>${task.description || 'Sem descrição'}</p>
        <div class="task-meta">
          <span class="tag">${task.category}</span>
          <span class="tag">${task.dueDate}</span>
          <span class="tag ${task.completed ? 'success' : 'warning'}">${task.completed ? 'Concluída' : 'Pendente'}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="action-btn complete-btn" data-id="${task.id}">
          ${task.completed ? 'Reabrir' : 'Concluir'}
        </button>
        <button class="action-btn edit-btn" data-id="${task.id}">Editar</button>
        <button class="action-btn delete-btn" data-id="${task.id}">Excluir</button>
      </div>
    </article>
  `).join('');
}

function clearEditMode() {
  editingTaskId = null;
  formTitle.textContent = 'Nova tarefa';
  submitTaskBtn.textContent = 'Adicionar';
  cancelEditBtn.classList.add('hidden');
  taskForm.reset();
  document.getElementById('taskCategory').value = 'TRABALHO';
}

async function populateEditForm(taskId) {
  const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`);
  const task = await response.json();

  editingTaskId = taskId;
  formTitle.textContent = 'Editar tarefa';
  submitTaskBtn.textContent = 'Salvar alterações';
  cancelEditBtn.classList.remove('hidden');

  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDescription').value = task.description || '';
  document.getElementById('taskCategory').value = task.category;
  document.getElementById('taskDueDate').value = task.dueDate;
}

filterStatus.addEventListener('change', () => loadDashboard());
filterCategory.addEventListener('change', () => loadDashboard());

cancelEditBtn.addEventListener('click', clearEditMode);

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const task = {
    title: document.getElementById('taskTitle').value.trim(),
    description: document.getElementById('taskDescription').value.trim(),
    category: document.getElementById('taskCategory').value,
    dueDate: document.getElementById('taskDueDate').value,
    completed: false
  };

  if (!task.title || !task.dueDate) {
    alert('Preencha o título e a data de entrega.');
    return;
  }

  try {
    if (editingTaskId) {
      await fetch(`http://localhost:8080/api/tasks/${editingTaskId}?userId=${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: false })
      });
    } else {
      await fetch(`http://localhost:8080/api/tasks?userId=${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    }

    clearEditMode();
    loadDashboard();
  } catch (error) {
    alert('Não foi possível salvar a tarefa.');
  }
});

tasksContainer.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const taskId = button.dataset.id;

  if (button.classList.contains('edit-btn')) {
    await populateEditForm(taskId);
    return;
  }

  if (button.classList.contains('delete-btn')) {
    await fetch(`http://localhost:8080/api/tasks/${taskId}?userId=${user.id}`, {
      method: 'DELETE'
    });
  }

  if (button.classList.contains('complete-btn')) {
    await fetch(`http://localhost:8080/api/tasks/${taskId}/complete?userId=${user.id}`, {
      method: 'PATCH'
    });
  }

  loadDashboard();
});

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
});

loadDashboard();
