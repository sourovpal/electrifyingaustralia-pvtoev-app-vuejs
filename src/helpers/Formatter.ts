class Formatter {

	public static toIntlFormat(number: number): string | number {
		if (number < 1000) return number

        let num: number = Math.floor(number);
        const digitsAfterDecimal: string = this.getDigitsAfterDecimal(number).toFixed(2);

		const str: string[] = num.toString().split('')
		const reversedStr: string[] = [...str].reverse()

		let formattedStr: string = ''
		for (let i: number = 0; i < reversedStr.length; i += 3)
			formattedStr += reversedStr.slice(i, i + 3).join('') + ','

		const formattedToIntlFormattingSystem: string = formattedStr
			.slice(0, -1)
			.split('')
			.reverse()
			.join('')

		if (!digitsAfterDecimal) return formattedToIntlFormattingSystem
		return formattedToIntlFormattingSystem + '.' + digitsAfterDecimal.substring(2, digitsAfterDecimal.length);
	}

	public static getDigitsAfterDecimal(num: number): number {
        return num - Math.floor(num);
	}
}

export default Formatter;
