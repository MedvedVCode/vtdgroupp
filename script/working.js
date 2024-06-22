const SECOND = 1000;
const MINUTE = 60 * SECOND;

const MOSCOW_TIME_ZONE = -180; //в минутах от UTC

const vtdWorksLinkEl = document.querySelector('#vtd-works');
const blinkerOutlineEl = document.querySelector('#blinker-outline');
const blinkerCircleEl = document.querySelector('#blinker-circle');
const vtdTelEl = document.querySelectorAll('.vtd-tel');
const vtdMailEl = document.querySelectorAll('.vtd-mail');

function getMoscowNowTime(currentNow) {
	localTimeZone = currentNow.getTimezoneOffset();
	localOffsetTime = localTimeZone - MOSCOW_TIME_ZONE;
	return new Date(currentNow.getTime() + localOffsetTime * MINUTE);
}

function getWorkingTimeFromNowDay(day, timeObject) {
	let time = new Date();
	time.setDate(day);
	time.setHours(...timeObject);
	return time.getTime();
}

function setBlinker(color) {
	blinkerOutlineEl.className.baseVal = 'blinker__outline--' + color;
	blinkerCircleEl.className.baseVal =
		'blinker__circle blinker__circle--' + color;
}

function setText(text) {
	switch (text) {
		case 'weekend':
			vtdWorksLinkEl.textContent = `ВТД: выходные, пишите:`;
			break;
		case 'open':
			vtdWorksLinkEl.textContent = 'ВТД: работает, звоните:';
			break;
		case 'break':
			vtdWorksLinkEl.textContent = `ВТД:Перерыв, пишите: `;
			break;
		case 'close':
			vtdWorksLinkEl.textContent = `ВТД: закрыто до утра, пишите: `;
			break;
	}
}

function setContacts(contact) {
	if (contact == 'email') {
		vtdTelEl.forEach((el) => el.classList.add('no-visible'));
		vtdMailEl.forEach((el) => el.classList.remove('no-visible'));
	} else if (contact == 'tel') {
		vtdTelEl.forEach((el) => el.classList.remove('no-visible'));
		vtdMailEl.forEach((el) => el.classList.add('no-visible'));
	}
}
	const moscowNowTime = getMoscowNowTime(new Date());

	if (moscowNowTime.getDay() == 0 || moscowNowTime.getDay() == 6) {
		setText('weekend');
		setBlinker('red');
		setContacts('email');
	} else {
		let workingBegin = 0;

		if (moscowNowTime.getDay() == 5) {
			workingBegin = getWorkingTimeFromNowDay(
				moscowNowTime.getDate(),
				[10, 0, 0]
			); // 10:00
		} else {
			workingBegin = getWorkingTimeFromNowDay(
				moscowNowTime.getDate(),
				[8, 30, 0]
			); // 8:30
		}

		const workingEnd = getWorkingTimeFromNowDay(
			moscowNowTime.getDate(),
			[15, 30, 0]
		); // 15:30
		const breakBegin = getWorkingTimeFromNowDay(
			moscowNowTime.getDate(),
			[12, 0, 0]
		); // 12:00
		const breakEnd = getWorkingTimeFromNowDay(
			moscowNowTime.getDate(),
			[12, 30, 0]
		); // 12:30
		console.log(moscowNowTime, workingBegin, workingEnd, breakBegin, breakEnd);
		const now = moscowNowTime.getTime();
		if (
			(now > workingBegin && now < breakBegin) ||
			(now > breakEnd && now < workingEnd)
		) {
			setText('open');
			setBlinker('blue');
			setContacts('tel');
		} else if (now > breakBegin && now < breakEnd) {
			setText('break');
			setBlinker('red');
		} else {
			setText('close');
			setBlinker('red');
		}
	}

// addEventListener('unload', () => {
// 	clearInterval(idInterval)
// })
// addEventListener('beforeunload', () => {
// 	clearInterval(idInterval)
// })