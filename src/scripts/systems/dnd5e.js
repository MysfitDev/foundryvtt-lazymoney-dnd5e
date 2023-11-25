export default {
  // The item price attribute is the path to the attribute on each item that determine how much it costs
  ITEM_PRICE_ATTRIBUTE: "system.price.value",

  // Currencies in item piles is a versatile system that can accept actor attributes (a number field on the actor's sheet) or items (actual items in their inventory)
  // In the case of attributes, the path is relative to the "actor.system"
  // In the case of items, it is recommended you export the item with `.toObject()` and strip out any module data
  CURRENCIES: [
    {
      type: "attribute",
      name: "DND5E.CurrencyPP",
      img: "icons/commodities/currency/coin-inset-snail-silver.webp",
      abbreviation: "{#}PP",
      data: {
        path: "system.currency.pp",
      },
      primary: false,
      exchangeRate: 10,
      denomination: "pp",
    },
    {
      type: "attribute",
      name: "DND5E.CurrencyGP",
      img: "icons/commodities/currency/coin-embossed-crown-gold.webp",
      abbreviation: "{#}GP",
      data: {
        path: "system.currency.gp",
      },
      primary: true,
      exchangeRate: 1,
      denomination: "gp",
    },
    {
      type: "attribute",
      name: "DND5E.CurrencyEP",
      img: "icons/commodities/currency/coin-inset-copper-axe.webp",
      abbreviation: "{#}EP",
      data: {
        path: "system.currency.ep",
      },
      primary: false,
      exchangeRate: 0.5,
      denomination: "ep",
    },
    {
      type: "attribute",
      name: "DND5E.CurrencySP",
      img: "icons/commodities/currency/coin-engraved-moon-silver.webp",
      abbreviation: "{#}SP",
      data: {
        path: "system.currency.sp",
      },
      primary: false,
      exchangeRate: 0.1,
      denomination: "sp",
    },
    {
      type: "attribute",
      name: "DND5E.CurrencyCP",
      img: "icons/commodities/currency/coin-engraved-waves-copper.webp",
      abbreviation: "{#}CP",
      data: {
        path: "system.currency.cp",
      },
      primary: false,
      exchangeRate: 0.01,
      denomination: "cp",
    },
  ],

  SYSTEM_HOOKS: () => {
    Object.keys(CONFIG.Actor.sheetClasses.character).forEach((key) => {
      let sheet = key.split(".")[1];
      try {
        Hooks.on("render" + sheet, (app, html, actorData) => {
          applyLazyMoney(app, html, actorData);
        });
      } catch (error) {
        console.warn("lazymoney can't hook to " + key);
      }
    });

    Object.keys(CONFIG.Actor.sheetClasses.npc).forEach((key) => {
      let sheet = key.split(".")[1];
      try {
        Hooks.on("render" + sheet, (app, html, actorData) => {
          applyLazyMoney(app, html, actorData);
        });
      } catch (error) {
        console.warn("lazymoney can't hook to " + key);
      }
    });
  },
};
