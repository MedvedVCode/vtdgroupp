const emergencyTextEl = document.querySelector('#text');
console.log(emergencyTextEl,emergencyTextEl.classList);
emergencyTextEl.addEventListener('click', (e) => {
	e.preventDefault();
	emergencyTextEl.classList.togle('emergency__open');
})