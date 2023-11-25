import { debug, info, isEmptyObject, is_lazy_number, is_real_number, log, warn, getActorAsync } from "./lib/lib.js";
import CONSTANTS from "./constants/constants.js";
import { LazyMoneyCurrencyHelpers } from "./lazymoney-currencies-helpers.js";
import SETTINGS from "./constants/settings.js";
import API from "./api.js";

export class LazyMoneyHelpers {
  async manageCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }

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

    const newAmount = LazyMoneyHelpers.calculateNewAmount(actor, currencyValueS, currencyDenom, sign);
    if (newAmount) {
      actor.update({ [API.ACTOR_CURRENCY_ATTRIBUTE]: newAmount });
    }
  }

  static async addCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }

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
    const newAmount = LazyMoneyHelpers.calculateNewAmount(
      actor,
      currencyValueS,
      currencyDenom,
      LazyMoneyHelpers.signCase.add
    );
    if (newAmount) {
      actor.update({ [API.ACTOR_CURRENCY_ATTRIBUTE]: newAmount });
    }
  }

  static async subtractCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = (await getActorAsync(actorOrActorUuid)) ?? undefined;
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }

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
    const newAmount = LazyMoneyHelpers.calculateNewAmount(
      actor,
      currencyValueS,
      currencyDenom,
      LazyMoneyHelpers.signCase.subtract
    );
    if (newAmount) {
      actor.update({ [API.ACTOR_CURRENCY_ATTRIBUTE]: newAmount });
    }
  }

  /* =============================================== */

  static signCase = {
    add: "+",
    subtract: "-",
    equals: "=",
    default: " ",
  };

  // static currencyDenomCase = {
  //   cp: "cp",
  //   sp: "sp",
  //   ep: "ep",
  //   gp: "gp",
  //   pp: "pp",
  // };

  /* ============================================ */
  /* PRIVATE FUNCTIONS */
  /* ============================================ */

  static calculateNewAmount(actor, valueS, denom, sign) {
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }

    if (isEmptyObject(valueS)) {
      throw error(`The currency value is empty or null`, true);
    }

    // let money = actor.system.currency;
    // money = LazyMoneyHelpers.patchCurrency(money);
    let money = getProperty(actor, API.ACTOR_CURRENCY_ATTRIBUTE);

    let value = String(valueS);

    let isValidCurrencyDenom = false;
    let currencyDenomCase = LazyMoneyCurrencyHelpers.currencyDenomCase();
    for (const val of Object.values(currencyDenomCase)) {
      if (denom === val) {
        isValidCurrencyDenom = true;
        break;
      }
    }
    if (!isValidCurrencyDenom) {
      throw error(`The currency denomination '${currencyDenomCase}' is not valid`, true);
    }

    const splitVal = value.split(sign);
    let delta;
    if (splitVal.length > 1) {
      delta = Number(splitVal[1]);
    } else {
      delta = Number(splitVal[0]);
      LazyMoneyHelpers.chatLog(
        actor,
        `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
      );
      // return;
    }
    let newAmount = {};
    switch (sign) {
      case LazyMoneyHelpers.signCase.add: {
        newAmount = LazyMoneyHelpers.addMoney(money, delta, denom);
        LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has added ${delta} ${denom}.`);
        break;
      }
      case LazyMoneyHelpers.signCase.subtract: {
        newAmount = LazyMoneyHelpers.removeMoney(money, delta, denom);
        LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has removed ${delta} ${denom}.`);
        if (!newAmount) {
          // flash(input);
          newAmount = money;
        }
        break;
      }
      case LazyMoneyHelpers.signCase.equals: {
        newAmount = LazyMoneyHelpers.updateMoney(money, delta, denom);
        LazyMoneyHelpers.chatLog(
          actor,
          `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
        );
        break;
      }
      default: {
        newAmount = LazyMoneyHelpers.updateMoney(money, delta, denom);
        LazyMoneyHelpers.chatLog(
          actor,
          `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
        );
        break;
      }
    }
    // if (!(denom === "ep" && game.settings.get(CONSTANTS.MODULE_ID, "ignoreElectrum"))) {
    //   switch (sign) {
    //     case LazyMoneyHelpers.signCase.add: {
    //       newAmount = LazyMoneyHelpers.addMoney(money, delta, denom);
    //       LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has added ${delta} ${denom}.`);
    //       break;
    //     }
    //     case LazyMoneyHelpers.signCase.subtract: {
    //       newAmount = LazyMoneyHelpers.removeMoney(money, delta, denom);
    //       LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has removed ${delta} ${denom}.`);
    //       if (!newAmount) {
    //         // flash(input);
    //         newAmount = money;
    //       }
    //       break;
    //     }
    //     case LazyMoneyHelpers.signCase.equals: {
    //       newAmount = LazyMoneyHelpers.updateMoney(money, delta, denom);
    //       LazyMoneyHelpers.chatLog(
    //         actor,
    //         `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
    //       );
    //       break;
    //     }
    //     default: {
    //       newAmount = LazyMoneyHelpers.updateMoney(money, delta, denom);
    //       LazyMoneyHelpers.chatLog(
    //         actor,
    //         `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
    //       );
    //       break;
    //     }
    //   }
    // } else {
    //   switch (sign) {
    //     case LazyMoneyHelpers.signCase.add: {
    //       newAmount[denom] = money[denom] + delta;
    //       LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has added ${delta} ${denom}.`);
    //       break;
    //     }
    //     case LazyMoneyHelpers.signCase.subtract: {
    //       newAmount[denom] = money[denom] - delta;
    //       LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has removed ${delta} ${denom}.`);
    //       break;
    //     }
    //     case LazyMoneyHelpers.signCase.equals: {
    //       newAmount[denom] = money[denom];
    //       LazyMoneyHelpers.chatLog(
    //         actor,
    //         `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
    //       );
    //       break;
    //     }
    //     default: {
    //       newAmount[denom] = money[denom];
    //       LazyMoneyHelpers.chatLog(
    //         actor,
    //         `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
    //       );
    //       break;
    //     }
    //   }
    // }
    return newAmount;
  }

  static chatLog(actor, money) {
    debug(`chatlog | money: ${money}`);
    if (game.settings.get(CONSTANTS.MODULE_ID, "chatLog")) {
      const msgData = {
        content: money,
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        whisper: ChatMessage.getWhisperRecipients("GM"),
      };
      return ChatMessage.create(msgData);
    } else {
      return undefined;
    }
  }

  static prepareConvertionMap() {
    let cpMap = LazyMoneyCurrencyHelpers.recalculateConvertionMap();
    // const sortableValues = Object.values(cpMap);
    // .sort(([,a],[,b]) => a.value - b.value)
    // .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    // let newCpMap = {};
    // for (const v of sortableValues) {
    //   newCpMap[v.denomination] = v;
    // }
    return cpMap;
  }

  static getDelta(delta, denom) {
    const convertionMap = LazyMoneyHelpers.prepareConvertionMap();
    let newDelta = {};
    delta *= convertionMap[denom].value;
    for (let key in convertionMap) {
      const myValue = convertionMap[key].value;
      let intDiv = Number(~~(delta / myValue));
      if (intDiv > 0) {
        newDelta[key] = intDiv;
        delta %= myValue;
      }
    }
    return newDelta;
  }
  static scaleDown(oldAmount, denom) {
    const convertionMap = LazyMoneyHelpers.prepareConvertionMap();
    const up = convertionMap[denom].up;
    let newAmount = oldAmount;
    if (newAmount[up] > 0) {
      newAmount[up] -= 1;
      newAmount[denom] += ~~(convertionMap[up].value / convertionMap[denom].value);
      return newAmount;
    } else if (newAmount[up] === 0) {
      newAmount = LazyMoneyHelpers.scaleDown(newAmount, up);
      LazyMoneyHelpers.scaleDown(newAmount, denom); // TODO i don't remember why i have done this ??
      return newAmount;
    } else {
      return false;
    }
  }
  static addMoney(oldAmount, delta, denom) {
    const convertionMap = LazyMoneyHelpers.prepareConvertionMap();
    let newAmount = {};
    if (game.settings.get(CONSTANTS.MODULE_ID, "addConvert")) {
      let cpDelta = delta * convertionMap[denom].value;
      for (let key in convertionMap) {
        const myValue = convertionMap[key].value;
        newAmount[key] = oldAmount[key] + ~~(cpDelta / myValue);
        cpDelta %= myValue;
      }
    } else {
      newAmount[denom] = oldAmount[denom] + delta;
    }
    return newAmount;
  }
  static removeMoney(oldAmount, delta, denom) {
    const convertionMap = LazyMoneyHelpers.prepareConvertionMap();
    let newAmount = oldAmount;
    let newDelta = {};
    let down;
    if (oldAmount[denom] >= delta) {
      newAmount[denom] = oldAmount[denom] - delta;
      return newAmount;
    } else {
      newDelta = LazyMoneyHelpers.getDelta(delta, denom);
      const myValue = convertionMap[denom].value;
      delta = delta * myValue;
    }
    if (LazyMoneyHelpers.totalMoney(oldAmount) >= delta) {
      for (let [key, value] of Object.entries(newDelta)) {
        if (newAmount[key] >= value) {
          newAmount[key] -= value;
        } else if (LazyMoneyHelpers.scaleDown(newAmount, key)) {
          newAmount[key] -= value;
        } else {
          newAmount = oldAmount;
          while (newAmount[key] <= value && LazyMoneyHelpers.totalMoney(newAmount) > 0 && key !== "cp") {
            down = convertionMap[key].down;
            value -= newAmount[key];
            newAmount[key] = 0;
            const myValue = convertionMap[key].value;
            const myDown = convertionMap[down].value;
            value *= ~~(myValue / myDown);
            key = down;
          }
          newAmount[key] -= value;
        }
      }
      return newAmount;
    } else {
      return false;
    }
  }
  // TODO old amount is not used ?
  static updateMoney(oldAmount, delta, denom) {
    let newAmount = {};
    newAmount[denom] = delta;
    return newAmount;
  }
  static totalMoney(money) {
    const cpValue = LazyMoneyHelpers.prepareConvertionMap();
    let total = 0;
    for (let key in cpValue) {
      const myValue = cpValue[key].value;
      total += money[key] * myValue;
    }
    return total;
  }
}
