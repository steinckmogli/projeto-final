document.addEventListener('DOMContentLoaded', ()=>{
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', ()=>{
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks.style.display = expanded ? 'none' : 'flex';
  });

  // create modal
  function createModal(){
    const modal = document.createElement('div');
    modal.className = 'modal hidden';
    modal.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="Visualização da redação">
        <div class="modal-content"></div>
        <div class="modal-actions">
          <button class="btn" id="close-modal">Fechar</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('#close-modal').addEventListener('click', ()=>{ modal.classList.add('hidden'); });
    modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.classList.add('hidden'); });
    return modal;
  }
  const modal = createModal();

  document.querySelectorAll('.view-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = btn.getAttribute('data-open');
      const full = document.getElementById('text-'+idx);
      if(!full) return;
      modal.querySelector('.modal-content').innerHTML = full.innerHTML;
      modal.classList.remove('hidden');
      modal.scrollTop = 0;
      // set focus for accessibility
      const dialog = modal.querySelector('.modal-card');
      dialog.setAttribute('tabindex','-1');
      dialog.focus();
    });
  });

  // form submit simulated
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const msg = form.message.value.trim();
    if(!name || !msg){ alert('Preencha nome e mensagem'); return; }
    alert('Mensagem enviada (simulada). Obrigado, ' + name + '!');
    form.reset();
  });
});
