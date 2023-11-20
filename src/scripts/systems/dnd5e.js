import { i18n } from "../lib/lib";

export class LazyMoneyDnd5eHelpers {
  /**
   * The valid currency denominations with localized labels, abbreviations, and conversions.
   * The conversion number defines how many of that currency are equal to one GP.
   * @enum {CurrencyConfiguration}
   */
  static currencies = {
    pp: {
      label: i18n("DND5E.CurrencyPP"),
      abbreviation: i18n("DND5E.CurrencyAbbrPP"),
      conversion: 1000,
    },
    gp: {
      label: i18n("DND5E.CurrencyGP"),
      abbreviation: i18n("DND5E.CurrencyAbbrGP"),
      conversion: 100,
    },
    ep: {
      label: i18n("DND5E.CurrencyEP"),
      abbreviation: i18n("DND5E.CurrencyAbbrEP"),
      conversion: 50,
    },
    sp: {
      label: i18n("DND5E.CurrencySP"),
      abbreviation: i18n("DND5E.CurrencyAbbrSP"),
      conversion: 10,
    },
    cp: {
      label: i18n("DND5E.CurrencyCP"),
      abbreviation: i18n("DND5E.CurrencyAbbrCP"),
      conversion: 1,
    },
  };
}
