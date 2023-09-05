import { LazyMoneyHelpers } from "./lazymoney-helpers";

const API = {
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
      throw error("addCurrency | inAttributes must be of type object");
    }

    return await LazyMoneyHelpers.subtractCurrency(
      inAttributes.actor,
      inAttributes.currencyValue,
      inAttributes.currencyDenom
    );
  },
};

export default API;
