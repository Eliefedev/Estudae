const form = document.getElementById('cadastroForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Erro ao cadastrar usuário');
      return;
    }

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
  } catch (error) {
    alert('Não foi possível conectar ao backend.');
  }
});
