import API from "./api.js";
import CONSTANTS from "./constants/constants.js";
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
