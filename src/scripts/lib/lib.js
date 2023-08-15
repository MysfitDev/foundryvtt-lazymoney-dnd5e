// ================================
// Logger utility
// ================================

import CONSTANTS from "../constants";

// export let debugEnabled = 0;
// 0 = none, warnings = 1, debug = 2, all = 3

export function debug(msg, args = "") {
	if (game.settings.get(CONSTANTS.MODULE_NAME, "debug")) {
		console.log(`DEBUG | ${CONSTANTS.MODULE_NAME} | ${msg}`, args);
	}
	return msg;
}

export function log(message) {
	message = `${CONSTANTS.MODULE_NAME} | ${message}`;
	console.log(message.replace("<br>", "\n"));
	return message;
}

export function notify(message) {
	message = `${CONSTANTS.MODULE_NAME} | ${message}`;
	ui.notifications?.notify(message);
	console.log(message.replace("<br>", "\n"));
	return message;
}

export function info(info, notify = false) {
	info = `${CONSTANTS.MODULE_NAME} | ${info}`;
	if (notify) ui.notifications?.info(info);
	console.log(info.replace("<br>", "\n"));
	return info;
}

export function warn(warning, notify = false) {
	warning = `${CONSTANTS.MODULE_NAME} | ${warning}`;
	if (notify) ui.notifications?.warn(warning);
	console.warn(warning.replace("<br>", "\n"));
	return warning;
}

export function error(error, notify = true) {
	error = `${CONSTANTS.MODULE_NAME} | ${error}`;
	if (notify) ui.notifications?.error(error);
	return new Error(error.replace("<br>", "\n"));
}

export function timelog(message): void {
	warn(Date.now(), message);
}

export const i18n = (key: string): string => {
	return game.i18n.localize(key)?.trim();
};

export const i18nFormat = (key: string, data = {}): string => {
	return game.i18n.format(key, data)?.trim();
};

// export const setDebugLevel = (debugText: string): void => {
//   debugEnabled = { none: 0, warn: 1, debug: 2, all: 3 }[debugText] || 0;
//   // 0 = none, warnings = 1, debug = 2, all = 3
//   if (debugEnabled >= 3) CONFIG.debug.hooks = true;
// };

export function dialogWarning(message, icon = "fas fa-exclamation-triangle") {
	return `<p class="${CONSTANTS.MODULE_NAME}-dialog">
        <i style="font-size:3rem;" class="${icon}"></i><br><br>
        <strong style="font-size:1.2rem;">${CONSTANTS.MODULE_NAME}</strong>
        <br><br>${message}
    </p>`;
}

// =========================================================================================

export function is_real_number(inNumber) {
	return !isNaN(inNumber) && typeof inNumber === "number" && isFinite(inNumber);
}

export function isEmptyObject(obj) {
	// because Object.keys(new Date()).length === 0;
	// we have to do some additional check
	if (obj === null || obj === undefined) {
		return true;
	}
	const result =
		obj && // null and undefined check
		Object.keys(obj).length === 0; // || Object.getPrototypeOf(obj) === Object.prototype);
	return result;
}

const signCase = {
	add: "+",
	subtract: "-",
	equals: "=",
	default: " "
};

export function is_lazy_number(inNumber) {
	const isSign =
		String(inNumber).startsWith(signCase.add) ||
		String(inNumber).startsWith(signCase.subtract) ||
		String(inNumber).startsWith(signCase.equals) ||
		String(inNumber).startsWith(signCase.default);
	if (isSign) {
		const withoutFirst = String(inNumber).slice(1);
		return is_real_number(withoutFirst);
	} else {
		return true;
	}
}

export function isLessThanOneIsOne(inNumber) {
	return inNumber < 1 ? 1 : inNumber;
}
