import CONSTANTS from "../constants";

export class LazyMoneyPf2eHelpers {
  /**
   * The valid currency denominations with localized labels, abbreviations, and conversions.
   * The conversion number defines how many of that currency are equal to one GP.
   * @enum {CurrencyConfiguration}
   */
  static currencies = {
    pp: {
      label: "PF2E.CurrencyPP",
      abbreviation: "pp",
      conversion: 1000,
    },
    gp: {
      label: "PF2E.CurrencyGP",
      abbreviation: "gp",
      conversion: 100,
    },
    sp: {
      label: "PF2E.CurrencySP",
      abbreviation: "sp",
      conversion: 10,
    },
    cp: {
      label: "PF2E.CurrencyCP",
      abbreviation: "cp",
      conversion: 1,
    },
  };

  static convertionMap() {
    let cpMap = LazyMoneyPf2eHelpers.currencies;
    return cpMap;
  }
}
