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
          applyLazyMoney(app, html, actorData);
          // applyLazyExp(app, html, actorData);
          // applyLazyHp(app, html, actorData);
        });
      } catch (error) {
        Logger.warn("lazymoney can't hook to " + key);
      }
      // applyLazyMoney(key);
    });

    Object.keys(CONFIG.Actor.sheetClasses.npc).forEach((key) => {
      let sheet = key.split(".")[1];
      try {
        Hooks.on("render" + sheet, (app, html, actorData) => {
          applyLazyMoney(app, html, actorData);
          // applyLazyExp(app, html, actorData);
          // applyLazyHp(app, html, actorData);
        });
      } catch (error) {
        Logger.warn("lazymoney can't hook to " + key);
      }
      // applyLazyMoney(key);
    });
  }
};

// ==========================================
