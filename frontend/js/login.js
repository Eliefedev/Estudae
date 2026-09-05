const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Erro ao fazer login');
      return;
    }

    localStorage.setItem('user', JSON.stringify(data));
    window.location.href = 'dashboard.html';
  } catch (error) {
    alert('Não foi possível conectar ao backend.');
  }
});
