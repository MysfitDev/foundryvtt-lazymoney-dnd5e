import CONSTANTS from "./constants";
import { debug, info, isEmptyObject, is_lazy_number, is_real_number, log, warn } from "./lib/lib";

export interface DND5eCurrency {
	label: string;
	abbreviation: string;
	conversion?: { into: string; each: number };
}

export interface LazyMoneyCurrency {
	value: number;
	up: string;
	down: string;
}

export interface LazyMoneyCP {
	pp: number;
	gp: number;
	ep: number;
	sp: number;
	cp: number;
}
