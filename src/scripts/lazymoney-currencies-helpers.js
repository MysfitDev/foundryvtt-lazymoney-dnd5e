import API from "./api";

export class LazyMoneyCurrencyHelpers {
  static getCurrencyList() {
    const primaryCurrencies = API.CURRENCIES;
    const secondaryCurrencies = API.SECONDARY_CURRENCIES.map((currency) => {
      currency.secondary = true;
      return currency;
    });

    const currencies = primaryCurrencies.concat(secondaryCurrencies);

    const currencyList = currencies.map((currency) => {
      currency.name = game.i18n.localize(currency.name);
      return currency;
    });
    return currencyList;
  }

  static recalculateConvertionMap() {
    const convertionMap = {};
    const currencies = LazyMoneyCurrencyHelpers.getCurrencyList();
    for (const currency of currencies) {
      if ((currency.up || currency.down) && currency.denomination) {
        const downDenominationConvertion = currency.down;
        const upDenominationConvertion = currency.up;
        const downCurrency = currencies.find((currency) => {
          return currency.denomination === downDenominationConvertion;
        });
        const upCurrency = currencies.find((currency) => {
          return currency.denomination === upDenominationConvertion;
        });
        convertionMap[currency.denomination] = {
          value: currency.convertedRate ?? 1,
          up: currency.up ?? "",
          down: currency.down ?? "",
        };
      } else {
        // TODO
        continue;
      }
    }
    return convertionMap;
  }

  static currencyDenomCase() {
    const denominations = {};
    const currencies = LazyMoneyCurrencyHelpers.getCurrencyList();
    for (const currency of currencies) {
      if (currency.denomination) {
        denominations[currency.denomination] = currency.denomination;
      } else {
        // TODO
        continue;
      }
    }
    return denominations;
  }
}
