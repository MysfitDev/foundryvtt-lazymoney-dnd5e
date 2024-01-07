import {
  debug,
  info,
  isEmptyObject,
  is_lazy_number,
  is_real_number,
  log,
  warn,
  getActorAsync,
  getActorSync,
} from "./lib/lib.js";

export class LazyMoneyHelpers {
  static async manageCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._manageCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static manageCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._manageCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _manageCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (isEmptyObject(currencyValue)) {
      throw error(`The currency value is empty or null`, true);
    }

    let currencyValueS = "";
    if (is_real_number(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "+" + String(currencyValue);
      }
    } else {
      if (!is_lazy_number(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("+")) {
          currencyValueS = "+" + currencyValueS;
        }
      }
    }

    let sign = LazyMoneyHelpers.signCase.default;
    for (const val of Object.values(LazyMoneyHelpers.signCase)) {
      if (currencyValueS.includes(val)) {
        sign = val;
        break;
      }
    }

    switch (sign) {
      case LazyMoneyHelpers.signCase.add: {
        LazyMoneyHelpers._addCurrencyCommon(actor, currencyValueS, currencyDenom);
        LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has added ${delta} ${denom}.`);
        break;
      }
      case LazyMoneyHelpers.signCase.subtract: {
        LazyMoneyHelpers._subtractCurrencyCommon(actor, currencyValueS, currencyDenom);
        LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has removed ${delta} ${denom}.`);
        break;
      }
      case LazyMoneyHelpers.signCase.equals: {
        LazyMoneyHelpers._updateCurrencyCommon(actor, currencyValueS, currencyDenom);
        LazyMoneyHelpers.chatLog(
          actor,
          `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
        );
        break;
      }
      default: {
        LazyMoneyHelpers._updateCurrencyCommon(actor, currencyValueS, currencyDenom);
        LazyMoneyHelpers.chatLog(
          actor,
          `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
        );
        break;
      }
    }
  }

  static async addCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._addCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static addCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._addCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _addCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (isEmptyObject(currencyValue)) {
      throw error(`The currency value is empty or null`, true);
    }
    let currencyValueS = "";
    if (is_real_number(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "+" + String(currencyValue);
      }
    } else {
      if (!is_lazy_number(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("+")) {
          currencyValueS = "+" + currencyValueS;
        }
      }
    }

    const currencies = {
      cost: parseInt(currencyValueS),
      abbreviation: currencyDenom.toUpperCase(),
    };
    const currencyS = game.itempiles.API.getStringFromCurrencies(currencies);
    game.itempiles.API.addCurrencies(actor, currencyS);
  }

  static async subtractCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._subtractCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static subtractCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._subtractCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _subtractCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (isEmptyObject(currencyValue)) {
      throw error(`The currency value is empty or null`, true);
    }
    let currencyValueS = "";
    if (is_real_number(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "-" + String(currencyValue);
      }
    } else {
      if (!is_lazy_number(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("-")) {
          currencyValueS = "-" + currencyValueS;
        }
      }
    }

    const currencies = {
      cost: parseInt(currencyValueS),
      abbreviation: currencyDenom.toUpperCase(),
    };
    const currencyS = game.itempiles.API.getStringFromCurrencies(currencies);
    game.itempiles.API.removeCurrencies(actor, currencyS);
  }

  static async hasEnoughCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._hasEnoughCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static hasEnoughCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._hasEnoughCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _hasEnoughCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (isEmptyObject(currencyValue)) {
      throw error(`The currency value is empty or null`, true);
    }
    let currencyValueS = "";
    if (is_real_number(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "-" + String(currencyValue);
      }
    } else {
      if (!is_lazy_number(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("-")) {
          currencyValueS = "-" + currencyValueS;
        }
      }
    }

    const currencies = {
      cost: parseInt(currencyValueS),
      abbreviation: currencyDenom.toUpperCase(),
    };
    const currencyS = game.itempiles.API.getStringFromCurrencies(currencies);
    const currencyData = game.itempiles.API.getPaymentData(currencyS, { target: actor });
    return currencyData.canBuy;
  }

  static async updateCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._updateCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static updateCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._updateCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _updateCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (isEmptyObject(currencyValue)) {
      throw error(`The currency value is empty or null`, true);
    }
    let currencyValueS = "";
    if (is_real_number(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "+" + String(currencyValue);
      }
    } else {
      if (!is_lazy_number(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("+")) {
          currencyValueS = "+" + currencyValueS;
        }
      }
    }

    const currencies = {
      cost: parseInt(currencyValueS),
      abbreviation: currencyDenom.toUpperCase(),
    };
    const currencyS = game.itempiles.API.getStringFromCurrencies(currencies);
    game.itempiles.API.updateCurrencies(actor, currencyS);
  }

  /* =============================================== */

  static signCase = {
    add: "+",
    subtract: "-",
    equals: "=",
    default: " ",
  };
}
