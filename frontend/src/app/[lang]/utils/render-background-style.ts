export function renderBackgroundStyle(type: string) {
	switch (type) {
		case "gray":
			return "bg-gray-50 dark:bg-slate-800";
		case "white":
			return "dark:bg-slate-900";
		default:
			return "dark:bg-slate-900";
	}
}
