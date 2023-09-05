import { LazyMoneyHelpers } from "./lazymoney-helpers";

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

  async convertToGold(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToGold| inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.convertToGold(inAttributes.currencyValue, inAttributes.currencyDenom);
  },

  async convertToSilver(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToSilver | inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.convertToSilver(inAttributes.currencyValue, inAttributes.currencyDenom);
  },

  async convertToCopper(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToCopper | inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.convertToCopper(inAttributes.currencyValue, inAttributes.currencyDenom);
  },

  async convertToElectrum(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToElectrum | inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.convertToElectrum(inAttributes.currencyValue, inAttributes.currencyDenom);
  },

  async convertToPlatinum(inAttributes) {
    // if (!Array.isArray(inAttributes)) {
    //   throw error("retrieveAndApplyBonuses| inAttributes must be of type array");
    // }
    // const [uuidOrItem] = inAttributes;
    if (typeof inAttributes !== "object") {
      throw error("convertToPlatinum | inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.convertToPlatinum(inAttributes.currencyValue, inAttributes.currencyDenom);
  },
};

export default API;
