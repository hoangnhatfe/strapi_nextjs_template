export function renderButtonStyle(type: string) {
	switch (type) {
		case "primary":
			return "px-8 py-3 text-lg font-semibold rounded text-white bg-blue-400 border border-blue-400 dark:text-gray-900";
		case "secondary":
			return "px-8 py-3 text-lg font-semibold border text-white rounded dark:border-gray-100";
		default:
			return "px-8 py-3 text-lg font-semibold rounded dark:bg-blue-400 dark:text-gray-900";
	}
}
