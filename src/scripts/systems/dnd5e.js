import CONSTANTS from "../constants";

export class LazyMoneyDnd5eHelpers {
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
    let cpMap = {};
    if (game.modules.get("world-currency-5e")?.active) {
      const ignorePP = game.settings.get("world-currency-5e", "ppAltRemove");
      const ignoreGP = game.settings.get("world-currency-5e", "gpAltRemove");
      const ignoreEP = game.settings.get("world-currency-5e", "epAltRemove");
      const ignoreSP = game.settings.get("world-currency-5e", "spAltRemove");
      const ignoreCP = game.settings.get("world-currency-5e", "cpAltRemove");
      let gpConvertb = game.settings.get("world-currency-5e", "gpConvert");
      if (!is_real_number(gpConvertb)) {
        gpConvertb = 1;
      } else {
        gpConvertb = gpConvertb;
      }
      let ppConvertb = game.settings.get("world-currency-5e", "ppConvert");
      if (!is_real_number(ppConvertb)) {
        ppConvertb = 0.1;
      } else {
        if (ppConvertb >= 1) {
          ppConvertb = gpConvertb / ppConvertb;
        } else {
          ppConvertb = gpConvertb * ppConvertb;
        }
      }
      let epConvertb = game.settings.get("world-currency-5e", "epConvert");
      if (!is_real_number(epConvertb)) {
        epConvertb = 5;
      } else {
        if (epConvertb >= 1) {
          epConvertb = gpConvertb * epConvertb;
        } else {
          epConvertb = gpConvertb / epConvertb;
        }
      }
      let spConvertb = game.settings.get("world-currency-5e", "spConvert");
      if (!is_real_number(spConvertb)) {
        spConvertb = 10;
      } else {
        if (spConvertb >= 1) {
          spConvertb = gpConvertb * spConvertb;
        } else {
          spConvertb = gpConvertb / spConvertb;
        }
      }
      let cpConvertb = game.settings.get("world-currency-5e", "cpConvert");
      if (!is_real_number(cpConvertb)) {
        cpConvertb = 100;
      } else {
        if (cpConvertb >= 1) {
          cpConvertb = gpConvertb * cpConvertb;
        } else {
          cpConvertb = gpConvertb / cpConvertb;
        }
      }
      // Reconvert gold calculation to copper calculation
      const ppConvert = (gpConvertb / ppConvertb) * cpConvertb;
      const gpConvert = gpConvertb * cpConvertb;
      const epConvert = (gpConvertb / epConvertb) * cpConvertb;
      const spConvert = (gpConvertb / spConvertb) * cpConvertb;
      const cpConvert = 1;
      if (ignorePP && ignoreGP && ignoreEP && ignoreSP && ignoreCP) {
        cpMap = {};
      }
      if (ignorePP && ignoreGP && ignoreEP && ignoreSP && !ignoreCP) {
        cpMap = {
          cp: { value: cpConvert, up: "", down: "" },
        };
      }
      if (ignorePP && ignoreGP && ignoreEP && !ignoreSP && ignoreCP) {
        cpMap = {
          sp: { value: cpConvert, up: "", down: "" },
        };
      }
      if (ignorePP && ignoreGP && ignoreEP && !ignoreSP && !ignoreCP) {
        cpMap = {
          sp: { value: spConvert, up: "", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (ignorePP && ignoreGP && !ignoreEP && ignoreSP && ignoreCP) {
        cpMap = {
          ep: { value: cpConvert, up: "", down: "" },
        };
      }
      if (ignorePP && ignoreGP && !ignoreEP && ignoreSP && !ignoreCP) {
        cpMap = {
          ep: { value: epConvert, up: "", down: "sp" },
          cp: { value: cpConvert, up: "ep", down: "" },
        };
      }
      if (ignorePP && ignoreGP && !ignoreEP && !ignoreSP && ignoreCP) {
        cpMap = {
          ep: { value: epConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "" },
        };
      }
      if (ignorePP && ignoreGP && !ignoreEP && !ignoreSP && !ignoreCP) {
        cpMap = {
          ep: { value: epConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && ignoreEP && ignoreSP && ignoreCP) {
        cpMap = {
          gp: { value: gpConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && ignoreEP && ignoreSP && !ignoreCP) {
        cpMap = {
          gp: { value: gpConvert, up: "", down: "cp" },
          cp: { value: cpConvert, up: "gp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && ignoreEP && !ignoreSP && ignoreCP) {
        cpMap = {
          gp: { value: gpConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && ignoreEP && !ignoreSP && !ignoreCP) {
        cpMap = {
          gp: { value: gpConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && !ignoreEP && ignoreSP && ignoreCP) {
        cpMap = {
          gp: { value: gpConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && !ignoreEP && ignoreSP && !ignoreCP) {
        cpMap = {
          gp: { value: gpConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "ep", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && !ignoreEP && !ignoreSP && ignoreCP) {
        cpMap = {
          gp: { value: gpConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && !ignoreEP && !ignoreSP && !ignoreCP) {
        cpMap = {
          gp: { value: gpConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && ignoreEP && ignoreSP && ignoreCP) {
        cpMap = {
          pp: { value: cpConvert, up: "", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && ignoreEP && ignoreSP && !ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "cp" },
          cp: { value: cpConvert, up: "pp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && ignoreEP && !ignoreSP && ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "pp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && ignoreEP && !ignoreSP && !ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "pp", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && !ignoreEP && ignoreSP && ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "pp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && !ignoreEP && ignoreSP && !ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "pp", down: "cp" },
          cp: { value: cpConvert, up: "ep", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && !ignoreEP && !ignoreSP && ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "pp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && !ignoreEP && !ignoreSP && !ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "pp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && ignoreEP && ignoreSP && ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && ignoreEP && ignoreSP && !ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "cp" },
          cp: { value: cpConvert, up: "gp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && ignoreEP && !ignoreSP && ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && ignoreEP && !ignoreSP && !ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && !ignoreEP && ignoreSP && ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && !ignoreEP && ignoreSP && !ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "ep", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && !ignoreEP && !ignoreSP && ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && !ignoreEP && !ignoreSP && !ignoreCP) {
        cpMap = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
    } else {
      if (game.settings.get(CONSTANTS.MODULE_ID, "ignoreElectrum")) {
        cpMap = {
          pp: { value: 1000, up: "", down: "gp" },
          gp: { value: 100, up: "pp", down: "sp" },
          sp: { value: 10, up: "gp", down: "cp" },
          cp: { value: 1, up: "sp", down: "" },
        };
      } else {
        cpMap = {
          pp: { value: 1000, up: "", down: "gp" },
          gp: { value: 100, up: "pp", down: "ep" },
          ep: { value: 50, up: "gp", down: "sp" },
          sp: { value: 10, up: "ep", down: "cp" },
          cp: { value: 1, up: "sp", down: "" },
        };
      }
    }

    // const convert = LazyMoneyDnd5eHelpers.currencies;
    // for (const [denom, v] of Object.entries(convert)) {
    //   if (cpMap[denom]) {
    //     cpMap[denom].value = v.conversion;
    //   }
    // }

    return cpMap;
  }
}
