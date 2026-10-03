document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

    form.querySelectorAll('[required]').forEach(field => {
      if (field.type === 'radio') {
        const checked = form.querySelector(`input[name="${field.name}"]:checked`);
        if (!checked) {
          field.closest('.form-group').classList.add('has-error');
          valid = false;
        }
      } else if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
        field.closest('.form-group')?.classList.add('has-error');
        valid = false;
      }
    });

    const email = form.querySelector('input[type="email"]');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.closest('.form-group').classList.add('has-error');
      valid = false;
    }

    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      if (response.ok) {
        window.location.href = 'gracias.html';
      } else {
        alert('Hubo un error. Intenta de nuevo.');
        btn.disabled = false;
        btn.textContent = 'AGENDAR MI CONSULTA GRATUITA';
      }
    } catch (err) {
      alert('Error de conexión.');
      btn.disabled = false;
      btn.textContent = 'AGENDAR MI CONSULTA GRATUITA';
    }
  });
});