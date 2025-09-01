document.addEventListener('DOMContentLoaded', () => {
  const chatbox = document.getElementById('chatbox');
  if (chatbox) {
    chatbox.setAttribute('aria-hidden', 'true');
    chatbox.style.display = 'none';
  }
});

function toggleChatbox() {
  const chatbox = document.getElementById('chatbox');
  if (!chatbox) return;
  const hidden = chatbox.getAttribute('aria-hidden') === 'true';
  chatbox.setAttribute('aria-hidden', hidden ? 'false' : 'true');
  chatbox.style.display = hidden ? 'block' : 'none';
  if (hidden) {
    chatbox.focus();
  }
}

