const emergencyTextEl = document.querySelector('#text');
if (emergencyTextEl) {
	emergencyTextEl.addEventListener('click', () => {
		emergencyTextEl.classList.toggle('body__open');
	});
}
