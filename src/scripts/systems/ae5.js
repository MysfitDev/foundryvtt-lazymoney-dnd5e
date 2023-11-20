import CONSTANTS from "../constants";

export class LazyMoneyA5eHelpers {
  /**
   * The valid currency denominations with localized labels, abbreviations, and conversions.
   * The conversion number defines how many of that currency are equal to one GP.
   * @enum {CurrencyConfiguration}
   */
  static currencies = {
    pp: {
      label: "DND5E.CurrencyPP",
      abbreviation: "DND5E.CurrencyAbbrPP",
      conversion: 1000,
    },
    gp: {
      label: "DND5E.CurrencyGP",
      abbreviation: "DND5E.CurrencyAbbrGP",
      conversion: 100,
    },
    ep: {
      label: "DND5E.CurrencyEP",
      abbreviation: "DND5E.CurrencyAbbrEP",
      conversion: 50,
    },
    sp: {
      label: "DND5E.CurrencySP",
      abbreviation: "DND5E.CurrencyAbbrSP",
      conversion: 10,
    },
    cp: {
      label: "DND5E.CurrencyCP",
      abbreviation: "DND5E.CurrencyAbbrCP",
      conversion: 1,
    },
  };

  static convertionMap() {
    let cpMap = LazyMoneyGenericHelpers.currencies;
    return cpMap;
  }
}
