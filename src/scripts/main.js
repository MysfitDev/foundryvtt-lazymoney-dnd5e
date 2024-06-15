import API from "./api.js";
import CONSTANTS from "./constants/constants.js";
import { LazyMoneyHelpers } from "./lazymoney-helpers.js";
// import { applyLazyExp, applyLazyHp } from "./lazyExpAndHp.js";
import { applyLazyMoney } from "./lazymoney.js";
import Logger from "./lib/Logger.js";

export const initHooks = () => {};

export const setupHooks = () => {
    // Set up API
    game.modules.get(CONSTANTS.MODULE_ID).api = API;
};

export const readyHooks = async () => {
    Logger.log("Initializing lazymoney");
    // TODO 2024-03-30 we use the preUpdateActor instead

    if (game.system.id === "dnd5e") {
        Object.keys(CONFIG.Actor.sheetClasses.character).forEach((key) => {
            let sheet = key.split(".")[1];
            try {
                Hooks.on("render" + sheet, (app, html, actorData) => {
                    const itemSelector = `input[name^='${API.ACTOR_CURRENCY_ATTRIBUTE}']`;
                    applyLazyMoney(app, html, actorData, itemSelector);
                });
            } catch (error) {
                Logger.warn("lazymoney can't hook to " + key);
            }
        });

        Object.keys(CONFIG.Actor.sheetClasses.npc).forEach((key) => {
            let sheet = key.split(".")[1];
            try {
                Hooks.on("render" + sheet, (app, html, actorData) => {
                    const itemSelector = `input[name^='${API.ACTOR_CURRENCY_ATTRIBUTE}']`;
                    applyLazyMoney(app, html, actorData, itemSelector);
                });
            } catch (error) {
                Logger.warn("lazymoney can't hook to " + key);
            }
        });

        // Tidy 5e Sheet compatibility
        // Hooks.on("tidy5e-sheet.renderActorSheet", (app, element, actorData) => {
        //     const itemSelector = `input[data-tidy-field^='${API.ACTOR_CURRENCY_ATTRIBUTE}']`;
        //     // Undo any existing color overrides
        //     const html = $(element);
        //     applyLazyMoney(app, html, actorData.actor, itemSelector);
        // });
    }

    if (game.system.id === "a5e") {
        Object.keys(CONFIG.Actor.sheetClasses.character).forEach((key) => {
            let sheet = key.split(".")[1];
            try {
                Hooks.on("render" + sheet, (app, html, actorData) => {
                    const itemSelector = `input[name^='${API.ACTOR_CURRENCY_ATTRIBUTE}']`;
                    applyLazyMoney(app, html, actorData, itemSelector);
                });
            } catch (error) {
                Logger.warn("lazymoney can't hook to " + key);
            }
        });

        Object.keys(CONFIG.Actor.sheetClasses.npc).forEach((key) => {
            let sheet = key.split(".")[1];
            try {
                Hooks.on("render" + sheet, (app, html, actorData) => {
                    const itemSelector = `input[name^='${API.ACTOR_CURRENCY_ATTRIBUTE}']`;
                    applyLazyMoney(app, html, actorData, itemSelector);
                });
            } catch (error) {
                Logger.warn("lazymoney can't hook to " + key);
            }
        });
    }
};

// ==========================================

// Hooks.on("preUpdateActor", (actor, update, ...rest) => {
//     if (!game.settings.get(CONSTANTS.MODULE_ID, "enable")) {
//         return;
//     }
//     if (game.system.id === "dnd5e") {
//         const currency = foundry.utils.getProperty(update, API.ACTOR_CURRENCY_ATTRIBUTE) || undefined;
//         if (currency) {
//             const currencyActor = foundry.utils.getProperty(actor, API.ACTOR_CURRENCY_ATTRIBUTE) || {};
//             Object.entries(currency).forEach(([key, value]) => {
//                 const currencyData = foundry.utils.getProperty(currency, key);
//                 const currencyActorData = foundry.utils.getProperty(currencyActor, key);
//                 let currencyDataS = String(currencyData);
//                 if(currencyData < currencyActorData) {
//                     currencyDataS = "-"+(currencyActorData-currencyData);
//                 }
//                 else if(currencyData > currencyActorData) {
//                     currencyDataS = "+"+(currencyData-currencyActorData);
//                 }
//                 else if(currencyData === currencyActorData) {
//                     currencyDataS = "="+(currencyData);
//                 }
//                 LazyMoneyHelpers.manageCurrencySync(actor, currencyDataS, key);
//             });
//             foundry.utils.setProperty(update, API.ACTOR_CURRENCY_ATTRIBUTE, undefined);
//         }
//     } else if (game.system.id === "a5e") {
//         const currency = foundry.utils.getProperty(update, API.ACTOR_CURRENCY_ATTRIBUTE) || undefined;
//         if (currency) {
//             Object.entries(currency).forEach(([key, value]) => {
//                 const currencyData = foundry.utils.getProperty(currency, key);
//                 LazyMoneyHelpers.manageCurrencySync(actor, value, key);
//             });
//             foundry.utils.setProperty(update, API.ACTOR_CURRENCY_ATTRIBUTE, undefined);
//         }
//     }
//     else {
//         Logger.warn(`The system '${game.system.id }' is not supported open a issue on the project`, false);
//     }
//     // TODO ADD OTHER SYSTEM
// });
