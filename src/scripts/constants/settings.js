import { SYSTEMS } from "../systems.js";
import CONSTANTS from "./constants.js";

const SETTINGS = {
  // Client settings
  DEBUG: "debug",

  // Module Settings
  ENABLE: "enable",
  ADD_CONVERT: "addConvert",
  IGNORE_ELECTRUM: "ignoreElectrum",
  CHAT_LOG: "chatLog",
  //   PRICE_PRESETS: "pricePresets",

  // Style settings
  //   CSS_VARIABLES: "cssVariables",

  // System Settings
  CURRENCIES: "currencies",
  SECONDARY_CURRENCIES: "secondaryCurrencies",
  CURRENCY_DECIMAL_DIGITS: "currencyDecimalDigits",
  ITEM_QUANTITY_ATTRIBUTE: "itemQuantityAttribute",
  ITEM_PRICE_ATTRIBUTE: "itemPriceAttribute",
  ACTOR_CURRENCY_ATTRIBUTE: "actorCurrencyAttribute",

  // Hidden settings
  SYSTEM_FOUND: "systemFound",
  SYSTEM_NOT_FOUND_WARNING_SHOWN: "systemNotFoundWarningShown",
  SYSTEM_VERSION: "systemVersion",

  //   HIDE_TOKEN_BORDER_OPTIONS: {
  //     EVERYONE: "everyone",
  //     PLAYERS: "players",
  //     SHOW: "show"
  //   },

  //   DEFAULT_CSS_VARIABLES: {
  //     "inactive": "rgba(31,143,255,1)",
  //     "minor-inactive": "rgba(201,200,185,1)",
  //     "shadow-primary": "rgba(255,0,0,1)",
  //     "even-color": "rgba(240,240,223,1)",
  //     "odd-color": "rgba(0,0,0,0)",
  //     "border-dark-primary": "rgba(25,24,19,1)",
  //     "border-light-primary": "rgba(181,179,164,1)",
  //     "text-light-highlight": "rgba(240,240,224,1)",
  //     "text-important": "rgba(255,100,0,1)"
  //   },

  GET_DEFAULT() {
    return foundry.utils.deepClone(SETTINGS.DEFAULTS());
  },

  GET_SYSTEM_DEFAULTS() {
    return Object.fromEntries(
      Object.entries(SETTINGS.GET_DEFAULT()).filter((entry) => {
        return entry[1].system;
      })
    );
  },

  DEFAULTS: () => ({
    [SETTINGS.CURRENCIES]: {
      name: `${CONSTANTS.MODULE_ID}.settings.currencies.title`,
      label: `${CONSTANTS.MODULE_ID}.settings.currencies.label`,
      hint: `${CONSTANTS.MODULE_ID}.settings.currencies.hint`,
      icon: "fa fa-money-bill-alt",
      application: "currencies",
      scope: "world",
      config: false,
      system: true,
      default: SYSTEMS.DATA.CURRENCIES,
      type: Array,
    },

    [SETTINGS.SECONDARY_CURRENCIES]: {
      name: `${CONSTANTS.MODULE_ID}.settings.secondaryCurrencies.title`,
      label: `${CONSTANTS.MODULE_ID}.settings.secondaryCurrencies.label`,
      hint: `${CONSTANTS.MODULE_ID}.settings.secondaryCurrencies.hint`,
      icon: "fa fa-money-bill-alt",
      application: "secondary-currencies",
      scope: "world",
      config: false,
      system: true,
      default: SYSTEMS.DATA.SECONDARY_CURRENCIES,
      type: Array,
    },

    [SETTINGS.CURRENCY_DECIMAL_DIGITS]: {
      name: `${CONSTANTS.MODULE_ID}.settings.currencyDecimalDigits.title`,
      hint: `${CONSTANTS.MODULE_ID}.settings.currencyDecimalDigits.hint`,
      scope: "world",
      config: false,
      system: true,
      default: SYSTEMS.DATA.CURRENCY_DECIMAL_DIGITS,
      step: 0.00001,
      min: 0,
      max: 1,
      type: Number,
    },

    // [SETTINGS.CSS_VARIABLES]: {
    //   name: `${CONSTANTS.MODULE_ID}.settings.cssVariables.title`,
    //   label: `${CONSTANTS.MODULE_ID}.settings.cssVariables.label`,
    //   hint: `${CONSTANTS.MODULE_ID}.settings.cssVariables.hint`,
    //   icon: "fa-solid fa-wand-magic-sparkles",
    //   application: "styles",
    //   applicationOptions: {
    //     readOnly: true,
    //     variables: true
    //   },
    //   scope: "world",
    //   config: false,
    //   default: SYSTEMS.DATA.CSS_VARIABLES,
    //   mergedDefaults: SETTINGS.DEFAULT_CSS_VARIABLES,
    //   onchange: (data) => {
    //     applySystemSpecificStyles(data);
    //   },
    //   type: Object
    // },

    [SETTINGS.ITEM_PRICE_ATTRIBUTE]: {
      name: `${CONSTANTS.MODULE_ID}.settings.price.title`,
      hint: `${CONSTANTS.MODULE_ID}.settings.price.hint`,
      scope: "world",
      config: false,
      system: true,
      default: SYSTEMS.DATA.ITEM_PRICE_ATTRIBUTE,
      type: String,
    },

    [SETTINGS.ITEM_QUANTITY_ATTRIBUTE]: {
      name: `${CONSTANTS.MODULE_ID}.settings.quantity.title`,
      hint: `${CONSTANTS.MODULE_ID}.settings.quantity.hint`,
      scope: "world",
      config: false,
      system: true,
      default: SYSTEMS.DATA.ITEM_QUANTITY_ATTRIBUTE,
      type: String,
    },

    [SETTINGS.ACTOR_CURRENCY_ATTRIBUTE]: {
      name: `${CONSTANTS.MODULE_ID}.settings.currency.title`,
      hint: `${CONSTANTS.MODULE_ID}.settings.currency.hint`,
      scope: "world",
      config: false,
      system: true,
      default: SYSTEMS.DATA.ACTOR_CURRENCY_ATTRIBUTE,
      type: String,
    },

    [SETTINGS.SYSTEM_VERSION]: {
      scope: "world",
      config: false,
      default: "0.0.0",
      type: String,
    },

    [SETTINGS.SYSTEM_FOUND]: {
      scope: "world",
      config: false,
      default: false,
      type: Boolean,
    },

    [SETTINGS.SYSTEM_NOT_FOUND_WARNING_SHOWN]: {
      scope: "world",
      config: false,
      default: false,
      type: Boolean,
    },

    // [SETTINGS.PRICE_PRESETS]: {
    //   name: `${CONSTANTS.MODULE_ID}.settings.pricePresets.title`,
    //   label: `${CONSTANTS.MODULE_ID}.settings.pricePresets.label`,
    //   hint: `${CONSTANTS.MODULE_ID}.settings.pricePresets.hint`,
    //   scope: "world",
    //   icon: "fa fa-tags",
    //   application: "price-presets",
    //   config: false,
    //   default: [],
    //   type: Array
    // },

    [SETTINGS.ENABLE]: {
      name: `${CONSTANTS.MODULE_ID}.settings.enable.title`,
      hint: `${CONSTANTS.MODULE_ID}.settings.enable.hint`,
      scope: "world",
      config: true,
      default: true,
      type: Boolean,
    },

    [SETTINGS.ADD_CONVERT]: {
      name: `${CONSTANTS.MODULE_ID}.settings.addConvert.title`,
      hint: `${CONSTANTS.MODULE_ID}.settings.addConvert.hint`,
      scope: "world",
      config: true,
      default: false,
      type: Boolean,
    },

    [SETTINGS.IGNORE_ELECTRUM]: {
      name: `${CONSTANTS.MODULE_ID}.settings.ignoreElectrum.title`,
      hint: `${CONSTANTS.MODULE_ID}.settings.ignoreElectrum.hint`,
      scope: "world",
      config: true,
      default: false,
      type: Boolean,
    },

    [SETTINGS.CHAT_LOG]: {
      name: `${CONSTANTS.MODULE_ID}.settings.chatLog.title`,
      hint: `${CONSTANTS.MODULE_ID}.settings.chatLog.hint`,
      scope: "world",
      config: true,
      default: false,
      type: Boolean,
    },

    [SETTINGS.DEBUG]: {
      name: `${CONSTANTS.MODULE_ID}.settings.debug.title`,
      hint: `${CONSTANTS.MODULE_ID}.settings.debug.hint`,
      scope: "client",
      config: false,
      default: false,
      type: Boolean,
    },
  }),
};

export default SETTINGS;
