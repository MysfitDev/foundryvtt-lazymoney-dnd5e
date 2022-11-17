import API from "./api";
import CONSTANTS from "./constants";
import { applyLazyMoney } from "./lazymoney";
import { warn, error, debug, i18nFormat, log } from "./lib/lib";

export const initHooks = () => {};

export const setupHooks = () => {};

export const readyHooks = async () => {
	log("Initializing lazymoney");
	//@ts-ignore
	Object.keys(CONFIG.Actor.sheetClasses.character).forEach((key) => {
		applyLazyMoney(key);
	});
	//@ts-ignore
	Object.keys(CONFIG.Actor.sheetClasses.npc).forEach((key) => {
		applyLazyMoney(key);
	});
};

// ==========================================

// async function _preUpdateActor(wrapped, update, options, user) {
//   try {
//     const hpUpdate = <number>getProperty(update, "system.attributes.hp.value");
//     // await checkAndApply(this, update, options, user);
//     await zeroHPExpiry(this,  hpUpdate, user);
//   } catch (err) {
//     warn("preUpdateActor failed ", err)
//   }
//   finally {
//     return wrapped(update, options, user);
//   }
// }
