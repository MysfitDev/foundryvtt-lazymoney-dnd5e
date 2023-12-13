import CONSTANTS from "./constants/constants";
import SETTINGS from "./constants/settings";
import { LazyMoneyHelpers } from "./lazymoney-helpers";
import { LazyMoneyDnd5eHelpers } from "./systems/dnd5eHelpers";

const API = {
  async manageCurrency(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("addCurrency | inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.manageCurrency(
      inAttributes.actor,
      inAttributes.currencyValue,
      inAttributes.currencyDenom
    );
  },

  async addCurrency(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("addCurrency | inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.addCurrency(
      inAttributes.actor,
      inAttributes.currencyValue,
      inAttributes.currencyDenom
    );
  },

  async subtractCurrency(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("subtractCurrency | inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.subtractCurrency(
      inAttributes.actor,
      inAttributes.currencyValue,
      inAttributes.currencyDenom
    );
  },

  async hasEnoughCurrency(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("hasEnoughCurrency | inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.hasEnoughCurrency(
      inAttributes.actor,
      inAttributes.currencyValue,
      inAttributes.currencyDenom
    );
  },

  /**
   * The currencies used in this system
   *
   * @returns {Array<{primary: boolean, name: string, data: Object, img: string, abbreviation: string, exchange: number, denomination: string, up: string, down: string, convertedRate: number}>}
   */
  get CURRENCIES() {
    return game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.CURRENCIES);
  },

  /**
   * The secondary currencies used in this system
   *
   * @returns {Array<{name: string, data: Object, img: string, abbreviation: string, up: string, down: string, denomination: string, up: string, down: string, convertedRate: number}>}
   */
  get SECONDARY_CURRENCIES() {
    return game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.SECONDARY_CURRENCIES);
  },

  /**
   * The attribute used to track the quantity of items in this system
   *
   * @returns {string}
   */
  get ITEM_QUANTITY_ATTRIBUTE() {
    return game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.ITEM_QUANTITY_ATTRIBUTE);
  },

  get ACTOR_CURRENCY_ATTRIBUTE() {
    return game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.ACTOR_CURRENCY_ATTRIBUTE);
  },

  get ITEM_CURRENCY_DENOMINATION_BASE_ATTRIBUTE() {
    return game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.ITEM_CURRENCY_DENOMINATION_BASE_ATTRIBUTE);
  },

  /* ============================================= */
  /* TO REMOVE ONLY FOR DND5E */
  /* ============================================= */

  async convertToGold(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToGold| inAttributes must be of type object");
    }

    return await LazyMoneyDnd5eHelpers.convertToGold(inAttributes.currencyValue, inAttributes.currencyDenom);
  },

  async convertToSilver(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToSilver | inAttributes must be of type object");
    }

    return await LazyMoneyDnd5eHelpers.convertToSilver(inAttributes.currencyValue, inAttributes.currencyDenom);
  },

  async convertToCopper(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToCopper | inAttributes must be of type object");
    }

    return await LazyMoneyDnd5eHelpers.convertToCopper(inAttributes.currencyValue, inAttributes.currencyDenom);
  },

  async convertToElectrum(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToElectrum | inAttributes must be of type object");
    }

    return await LazyMoneyDnd5eHelpers.convertToElectrum(inAttributes.currencyValue, inAttributes.currencyDenom);
  },

  async convertToPlatinum(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToPlatinum | inAttributes must be of type object");
    }

    return await LazyMoneyDnd5eHelpers.convertToPlatinum(inAttributes.currencyValue, inAttributes.currencyDenom);
  },
};

export default API;
