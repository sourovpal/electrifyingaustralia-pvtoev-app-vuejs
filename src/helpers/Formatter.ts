export default class Formatter {
	public static toIntlFormat(num: number): string | number {
		if (num < 1000) return num

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

		return formattedToIntlFormattingSystem
	}
}
