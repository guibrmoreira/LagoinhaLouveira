document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active dos botões
      tabs.forEach(t => t.classList.remove('active'));
      // Adiciona active ao botão clicado
      tab.classList.add('active');

      const target = tab.getAttribute('data-tab');

      // Alterna visibilidade das abas
      tabContents.forEach(content => {
        if (content.id === target) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Aqui você pode adicionar a lógica de envio dos formulários,
  // por enquanto vou só prevenir envio real para demonstração:

  const pedidoForm = document.getElementById('pedidoForm');
  pedidoForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Pedido de oração enviado! (funcionalidade back-end ainda não implementada)');
    pedidoForm.reset();
  });

  const solicitacaoForm = document.getElementById('solicitacaoForm');
  solicitacaoForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Solicitação enviada! (funcionalidade back-end ainda não implementada)');
    solicitacaoForm.reset();
  });
});
