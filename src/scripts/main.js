import API from "./api.js";
import CONSTANTS from "./constants/constants.js";
// import { applyLazyExp, applyLazyHp } from "./lazyExpAndHp.js";
import { applyLazyMoney } from "./lazymoney.js";
import { warn, error, debug, i18nFormat, log } from "./lib/lib";

export const initHooks = () => {};

export const setupHooks = () => {
  const data = game.modules.get(CONSTANTS.MODULE_ID);
  data.api = API;
};

export const readyHooks = async () => {
  log("Initializing lazymoney");
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
        warn("lazymoney can't hook to " + key);
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
        warn("lazymoney can't hook to " + key);
      }
      // applyLazyMoney(key);
    });
  }
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
