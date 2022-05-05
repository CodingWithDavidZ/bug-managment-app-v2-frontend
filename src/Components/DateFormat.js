function DateFormat({ time }) {
	const thisYear = new Date().getFullYear();
	const thisMonth = new Date().getMonth();
	const thisDay = new Date().getDate();
	const thisDayPlus12 = new Date(thisDay + 12 * 60 * 60 * 1000).getDate();
	const thisDayMinus12 = new Date(thisDay - 12 * 60 * 60 * 1000).getDate();

	let bugDateFull = time.split('T')[0];
	let bugYear = time.split('-')[0];
	let bugMonth = time.split('-')[1];
	let bugDay = bugDateFull.split('-')[2];
	const thisDayPlusMinus12Hours =
		bugDay < thisDayPlus12 && bugDay > thisDayMinus12 ? true : false;

	if (
		(bugYear == thisYear && bugMonth == thisMonth && bugDay == thisDay) ||
		thisDayPlusMinus12Hours
	) {
		return 'Today';
	} else if (bugYear == thisYear) {
		return `${bugMonth}/${bugDay}`;
	} else {
		return `${bugMonth}/${bugDay}/${bugYear}`;
	}
}

export default DateFormat;
