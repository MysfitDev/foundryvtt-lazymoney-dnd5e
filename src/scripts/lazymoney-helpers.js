import CONSTANTS from "./constants/constants.js";
import { RetrieveHelpers } from "./lib/retrieve-helpers.js";
import Logger from "./lib/Logger.js";

export class LazyMoneyHelpers {
  static _isRealNumber(inNumber) {
    return !isNaN(inNumber) && typeof inNumber === "number" && isFinite(inNumber);
  }

  static _isEmptyObject(obj) {
    // because Object.keys(new Date()).length === 0;
    // we have to do some additional check
    if (obj === null || obj === undefined) {
      return true;
    }
    if (LazyMoneyHelpers._isRealNumber(obj)) {
      return false;
    }
    const result =
      obj && // null and undefined check
      Object.keys(obj).length === 0; // || Object.getPrototypeOf(obj) === Object.prototype);
    return result;
  }

  static _isLazyNumber(inNumber) {
    if (!inNumber) {
      return false;
    }
    let inNumberTmp = String(inNumber).trim();
    const isSign =
      String(inNumberTmp).startsWith(LazyMoneyHelpers.signCase.add) ||
      String(inNumberTmp).startsWith(LazyMoneyHelpers.signCase.subtract) ||
      String(inNumberTmp).startsWith(LazyMoneyHelpers.signCase.equals) ||
      String(inNumberTmp).startsWith(LazyMoneyHelpers.signCase.default);
    if (isSign) {
      const withoutFirst = String(inNumberTmp).slice(1);
      try {
        return LazyMoneyHelpers._isRealNumber(parseInt(withoutFirst.trim()));
      } catch (e) {
        error(e);
        return false;
      }
    } else {
      return true;
    }
  }

  static _retrieveLazyNumber(inNumber) {
    if (!inNumber) {
      return undefined;
    }
    let inNumberTmp = String(inNumber).trim();
    const isSign =
      String(inNumberTmp).startsWith(LazyMoneyHelpers.signCase.add) ||
      String(inNumberTmp).startsWith(LazyMoneyHelpers.signCase.subtract) ||
      String(inNumberTmp).startsWith(LazyMoneyHelpers.signCase.equals) ||
      String(inNumberTmp).startsWith(LazyMoneyHelpers.signCase.default);
    if (isSign) {
      const withoutFirst = String(inNumberTmp).slice(1);
      try {
        return parseInt(withoutFirst.trim());
      } catch (e) {
        error(e);
        return inNumberTmp;
      }
    } else {
      return inNumberTmp;
    }
  }

  // ================================================================================

  static async manageCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await RetrieveHelpers.getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._manageCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static manageCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = RetrieveHelpers.getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._manageCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _manageCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (LazyMoneyHelpers._isEmptyObject(currencyValue)) {
      throw Logger.error(`The currency value is empty or null`, true);
    }

    let currencyValueS = "";
    if (LazyMoneyHelpers._isRealNumber(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "+" + String(currencyValue);
      }
    } else {
      if (!LazyMoneyHelpers._isLazyNumber(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("+")) {
          currencyValueS = "+" + currencyValueS;
        }
      } else {
        currencyValueS = currencyValue;
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
        LazyMoneyHelpers.chatLog(
          actor,
          `${game.user?.name} on ${actor.name} has added ${currencyValueS} ${currencyDenom}.`
        );
        break;
      }
      case LazyMoneyHelpers.signCase.subtract: {
        LazyMoneyHelpers._subtractCurrencyCommon(actor, currencyValueS, currencyDenom);
        LazyMoneyHelpers.chatLog(
          actor,
          `${game.user?.name} on ${actor.name} has removed ${currencyValueS} ${currencyDenom}.`
        );
        break;
      }
      case LazyMoneyHelpers.signCase.equals: {
        LazyMoneyHelpers._updateCurrencyCommon(actor, currencyValueS, currencyDenom);
        LazyMoneyHelpers.chatLog(
          actor,
          `${game.user?.name} on ${actor.name} has replaced ${currencyValueS} ${currencyDenom}.`
        );

        break;
      }
      default: {
        // const lazyNum = LazyMoneyHelpers._retrieveLazyNumber(currencyValueS);
        // if(!LazyMoneyHelpers._isRealNumber(lazyNum)) {
        //     Logger.debug("lazyNum is not a valid number:", currencyValueS);
        //     return;
        // }
        // const currencies = {
        //   cost: Math.abs(lazyNum),
        //   abbreviation: currencyDenom.toUpperCase(),
        // };
        // Logger.debug("Currencies:", currencies);
        //const currencyS = cost+abbreviation; // TODO waiting for item piles to fix this game.itempiles.API.getStringFromCurrencies([currencies]);
        //Logger.debug("Currencies string for Item Piles:" + currencyS);
        // LazyMoneyHelpers._updateCurrencyCommon(actor, currencyValueS, currencyDenom);
        // LazyMoneyHelpers.chatLog(
        //   actor,
        //   `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
        // );
        // DO NOTHING
        break;
      }
    }
  }

  static async addCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await RetrieveHelpers.getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._addCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static addCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = RetrieveHelpers.getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._addCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _addCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (LazyMoneyHelpers._isEmptyObject(currencyValue)) {
      throw Logger.error(`The currency value is empty or null`, true);
    }
    let currencyValueS = "";
    if (LazyMoneyHelpers._isRealNumber(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "+" + String(currencyValue);
      }
    } else {
      if (!LazyMoneyHelpers._isLazyNumber(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("+")) {
          currencyValueS = "+" + currencyValueS;
        }
      } else {
        currencyValueS = currencyValue;
      }
    }

    const lazyNum = LazyMoneyHelpers._retrieveLazyNumber(currencyValueS);
    if (!LazyMoneyHelpers._isRealNumber(lazyNum)) {
      Logger.debug("lazyNum is not a valid number:", currencyValueS);
      return;
    }
    const currencies = {
      cost: Math.abs(lazyNum),
      abbreviation: currencyDenom.toUpperCase(),
    };
    Logger.debug("Currencies:", currencies);
    const currencyS = currencies.cost + currencies.abbreviation; // TODO waiting for item piles to fix this game.itempiles.API.getStringFromCurrencies([currencies]);
    Logger.debug("Currencies string for Item Piles:" + currencyS);
    game.itempiles.API.addCurrencies(actor, currencyS);
  }

  static async subtractCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await RetrieveHelpers.getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._subtractCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static subtractCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = RetrieveHelpers.getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._subtractCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _subtractCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (LazyMoneyHelpers._isEmptyObject(currencyValue)) {
      throw Logger.error(`The currency value is empty or null`, true);
    }
    let currencyValueS = "";
    if (LazyMoneyHelpers._isRealNumber(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "-" + String(currencyValue);
      }
    } else {
      if (!LazyMoneyHelpers._isLazyNumber(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("-")) {
          currencyValueS = "-" + currencyValueS;
        }
      } else {
        currencyValueS = currencyValue;
      }
    }

    const lazyNum = LazyMoneyHelpers._retrieveLazyNumber(currencyValueS);
    if (!LazyMoneyHelpers._isRealNumber(lazyNum)) {
      Logger.debug("lazyNum is not a valid number:", currencyValueS);
      return;
    }
    const currencies = {
      cost: Math.abs(lazyNum),
      abbreviation: currencyDenom.toUpperCase(),
    };
    Logger.debug("Currencies:", currencies);
    const currencyS = currencies.cost + currencies.abbreviation; // TODO waiting for item piles to fix this game.itempiles.API.getStringFromCurrencies([currencies]);
    Logger.debug("Currencies string for Item Piles:" + currencyS);
    game.itempiles.API.removeCurrencies(actor, currencyS);
  }

  static async hasEnoughCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await RetrieveHelpers.getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._hasEnoughCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static hasEnoughCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = RetrieveHelpers.getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._hasEnoughCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _hasEnoughCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (LazyMoneyHelpers._isEmptyObject(currencyValue)) {
      throw Logger.error(`The currency value is empty or null`, true);
    }
    let currencyValueS = "";
    if (LazyMoneyHelpers._isRealNumber(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "-" + String(currencyValue);
      }
    } else {
      if (!LazyMoneyHelpers._isLazyNumber(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("-")) {
          currencyValueS = "-" + currencyValueS;
        }
      } else {
        currencyValueS = currencyValue;
      }
    }

    const lazyNum = LazyMoneyHelpers._retrieveLazyNumber(currencyValueS);
    if (!LazyMoneyHelpers._isRealNumber(lazyNum)) {
      Logger.debug("lazyNum is not a valid number:", currencyValueS);
      return;
    }
    const currencies = {
      cost: Math.abs(lazyNum),
      abbreviation: currencyDenom.toUpperCase(),
    };
    Logger.debug("Currencies:", currencies);
    const currencyS = currencies.cost + currencies.abbreviation; // TODO waiting for item piles to fix this game.itempiles.API.getStringFromCurrencies([currencies]);
    Logger.debug("Currencies string for Item Piles:" + currencyS);
    const currencyData = game.itempiles.API.getPaymentData(currencyS, { target: actor });
    return currencyData.canBuy;
  }

  static async updateCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await RetrieveHelpers.getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._updateCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static updateCurrencySync(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = RetrieveHelpers.getActorSync(actorOrActorUuid) ?? undefined;
    if (!actor) {
      throw Logger.error(`No actor is been passed`, true);
    }
    return LazyMoneyHelpers._updateCurrencyCommon(actor, currencyValue, currencyDenom);
  }

  static _updateCurrencyCommon(actor, currencyValue, currencyDenom) {
    if (LazyMoneyHelpers._isEmptyObject(currencyValue)) {
      throw Logger.error(`The currency value is empty or null`, true);
    }
    let currencyValueS = "";
    if (LazyMoneyHelpers._isRealNumber(currencyValue)) {
      if (currencyValue < 0) {
        currencyValueS = "-" + String(currencyValue * -1);
      } else {
        currencyValueS = "+" + String(currencyValue);
      }
    } else {
      if (!LazyMoneyHelpers._isLazyNumber(currencyValue)) {
        currencyValueS = String(currencyValue);
        if (!currencyValueS.startsWith("+")) {
          currencyValueS = "+" + currencyValueS;
        }
      } else {
        currencyValueS = currencyValue;
      }
    }

    const lazyNum = LazyMoneyHelpers._retrieveLazyNumber(currencyValueS);
    if (!LazyMoneyHelpers._isRealNumber(lazyNum)) {
      Logger.debug("lazyNum is not a valid number:", currencyValueS);
      return;
    }
    const currencies = {
      cost: Math.abs(lazyNum),
      abbreviation: currencyDenom.toUpperCase(),
    };
    Logger.debug("Currencies:", currencies);
    const currencyS = currencies.cost + currencies.abbreviation; // TODO waiting for item piles to fix this game.itempiles.API.getStringFromCurrencies([currencies]);
    Logger.debug("Currencies string for Item Piles:" + currencyS);
    game.itempiles.API.updateCurrencies(actor, currencyS);
  }

  /* =============================================== */

  static signCase = {
    add: "+",
    subtract: "-",
    equals: "=",
    default: " ",
  };

  static chatLog(actor, messageContent) {
    Logger.debug(`chatlog | ${messageContent}`);
    if (game.settings.get(CONSTANTS.MODULE_ID, "chatLog")) {
      const msgData = {
        content: messageContent,
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        whisper: ChatMessage.getWhisperRecipients("GM"),
      };
      return ChatMessage.create(msgData);
    } else {
      return undefined;
    }
  }
}
