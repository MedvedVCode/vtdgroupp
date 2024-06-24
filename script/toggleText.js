const emergencyTextEl = document.querySelector('#text');
emergencyTextEl.addEventListener('click', () => {
	emergencyTextEl.classList.toggle('emergency__open');
})