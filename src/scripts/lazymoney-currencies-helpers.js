import API from "./api";
import { getActorSync, getUuid } from "./lib/lib";

export class LazyMoneyCurrencyHelpers {
  /**
   * Returns a given item's quantity
   *
   * @param {Item/Object} item
   * @returns {number}
   */
  static getItemQuantity(item) {
    const itemData = item instanceof Item ? item.toObject() : item;
    return Number(getProperty(itemData, API.ITEM_QUANTITY_ATTRIBUTE) ?? 0);
  }
  // Lots happening here, but in essence, it gets the actor's currencies, and creates an array of them
  static getActorCurrencies(target, { forActor = false, currencyList = false, getAll = false, secondary = true } = {}) {
    const actor = getActorSync(target);
    const actorUuid = getUuid(actor.uuid);
    const actorItems = actor ? Array.from(actor.items) : [];
    currencyList = LazyMoneyCurrencyHelpers.getCurrencyList(forActor || actor);
    // Loop through each currency and match it against the actor's data
    let currencies = currencyList
      .map((currency, index) => {
        if (currency.type === "attribute" || !currency.type) {
          const path = currency?.data?.path ?? currency?.path;
          return {
            ...currency,
            quantity: 0,
            path: path,
            id: path,
            index,
          };
        }
        return false;
        // const itemData = CompendiumUtilities.getItemFromCache(currency.data.uuid) || currency.data.item || false;
        // if (!itemData) return false;
        // const item = Utilities.findSimilarItem(actorItems, itemData);
        // // If the item exists on the actor, use the item's ID, so that we can match it against the actual item on the actor
        // currency.data.item = itemData;
        // currency.data.item._id = item?.id ?? itemData._id;
        // return {
        //   ...currency,
        //   quantity: 0,
        //   id: item?.id ?? item?._id ?? null,
        //   item,
        //   index,
        // };
      })
      .filter(Boolean);

    // cachedActorCurrencies.set(actorUuid, currencies);

    currencies = currencies.map((currency) => {
      currency.quantity =
        currency.type === "attribute"
          ? getProperty(actor, currency.path)
          : LazyMoneyCurrencyHelpers.getItemQuantity(currency.item);
      return currency;
    });

    if (!getAll) {
      currencies = currencies.filter((currency) => currency.quantity > 0);
    }

    if (!secondary) {
      currencies = currencies.filter((currency) => !currency.secondary);
    }

    return currencies;
  }

  static getActorPrimaryCurrency(target) {
    const actor = getActorSync(target);
    return LazyMoneyCurrencyHelpers.getActorCurrencies(actor, { getAll: true }).find((currency) => currency.primary);
  }

  static getActorAllCurrencies(target) {
    const actor = getActorSync(target);
    return LazyMoneyCurrencyHelpers.getActorCurrencies(actor, { getAll: true });
  }

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
