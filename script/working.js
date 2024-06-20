const DAY = 24;
const HOUR = 60;
const MINUTE = 60;
const SECOND = 1000;

const vtdWorksLinkEl = document.querySelector('#vtd-works');
const blinkerOutlineEl = document.querySelector('#blinker-outline');
const blinkerCircleEl = document.querySelector('#blinker-circle');
const vtdContactsBlockEl = document.querySelector('#vtd-contacts');

function setTimeToZone(timeObject) {
	let time = new Date();
	time.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
	if (timeObject) time.setHours(...timeObject);
	return time;
}

function setBlinker(color) {
	blinkerOutlineEl.className.baseVal = 'blinker__outline--' + color;
	blinkerCircleEl.className.baseVal =
		'blinker__circle blinker__circle--' + color;
}

let now = setTimeToZone();
let workingBegin = 0;
if (now.getDay == 0 || now.getDay == 6) {
	//TODO выходные
}
else if (now.getDay() == 5) {
	workingBegin = setTimeToZone([10, 0, 0]).getTime(); // 10:00
} else {
	workingBegin = setTimeToZone([8, 30, 0]).getTime(); // 8:30
}
now = now.getTime();
const workingEnd = setTimeToZone([15, 30, 0]).getTime(); // 15:30
const breakBegin = setTimeToZone([12, 0, 0]).getTime(); // 12:00
const breakEnd = setTimeToZone([12, 30, 0]).getTime(); // 12:30

if (
	(now > workingBegin && now < breakBegin) ||
	(now > breakEnd && now < workingEnd)
) {
	vtdWorksLinkEl.textContent = 'ВТД работает, звоните:';
	setBlinker('blue');
} else if (now > breakBegin && now < breakEnd) {
	const rest = breakBegin - now;
	vtdWorksLinkEl.textContent = `Перерыв еще ${rest.getHours()} : ${rest.getMinutes()}, пишите: `;
	setBlinker('red');
} else {
	let rest = 0;
	if (now > workingEnd) {
		rest = workingBegin + DAY * HOUR * MINUTE * SECOND - now;
	} else if (now < workingBegin) {
		rest = workingBegin - now;
	}
	vtdWorksLinkEl.textContent = `До открытия ${Math.floor(
		rest / (HOUR * MINUTE * SECOND)
	)} : ${Math.floor((rest / (MINUTE * SECOND)) % HOUR)} `;
	setBlinker('red');
}
