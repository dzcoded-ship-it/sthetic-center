 document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  // Philosophy tabs
  (function(){
    const tabs = document.querySelectorAll('#tab-avaliacao, #tab-natural, #tab-acompanhamento');
    const panels = {
      'tab-avaliacao': document.getElementById('panel-avaliacao'),
      'tab-natural': document.getElementById('panel-natural'),
      'tab-acompanhamento': document.getElementById('panel-acompanhamento'),
    };
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected','false'));
      Object.values(panels).forEach(p => { p.hidden = true; p.classList.remove('active'); });
      tab.setAttribute('aria-selected','true');
      panels[tab.id].hidden = false;
      panels[tab.id].classList.add('active');
    }));
  })();

  // Procedure category tabs
  (function(){
    const tabs = document.querySelectorAll('#ptab-facial, #ptab-corporal, #ptab-design');
    const panels = {
      'ptab-facial': document.getElementById('proc-facial'),
      'ptab-corporal': document.getElementById('proc-corporal'),
      'ptab-design': document.getElementById('proc-design'),
    };
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected','false'));
      Object.values(panels).forEach(p => { p.hidden = true; });
      tab.setAttribute('aria-selected','true');
      panels[tab.id].hidden = false;
    }));
  })();

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      document.querySelectorAll('.faq-item').forEach(other => {
        other.setAttribute('data-open','false');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.setAttribute('data-open','true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Orçamento form -> WhatsApp
  const WHATSAPP_NUMBER = '5561996113976';
  const form = document.getElementById('orcamentoForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const procedimento = form.procedimento.value;
    const mensagem = form.mensagem.value.trim();

    let texto = `Olá! Gostaria de solicitar um orçamento na Sthetic Center.%0A%0A`;
    texto += `Nome: ${encodeURIComponent(nome)}%0A`;
    texto += `Telefone: ${encodeURIComponent(telefone)}%0A`;
    texto += `Procedimento de interesse: ${encodeURIComponent(procedimento)}%0A`;
    if (mensagem) texto += `Mensagem: ${encodeURIComponent(mensagem)}%0A`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
    status.textContent = 'Abrindo o WhatsApp...';
    window.open(url, '_blank', 'noopener');
  });