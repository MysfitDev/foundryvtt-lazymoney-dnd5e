import { isEmptyObject } from "jquery";
import { getActor, info, warn } from "./lib/lib";

export class LazyMoneyHelpers {
  static async addCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = getActor(actorOrActorUuid);
    const newAmount = LazyMoneyHelpers.calculateNewAmount(
      actor,
      currencyValue,
      currencyDenom,
      LazyMoneyHelpers.signCase.add
    );
    actor.update({ "system.currency": newAmount });
  }

  static async subtractCurrency(actorOrActorUuid, currencyValue, currencyDenom) {
    const actor = getActor(actorOrActorUuid);
    const newAmount = LazyMoneyHelpers.calculateNewAmount(
      actor,
      currencyValue,
      currencyDenom,
      LazyMoneyHelpers.signCase.subtract
    );
    actor.update({ "system.currency": newAmount });
  }

  static signCase = {
    add: "+",
    subtract: "-",
    equals: "=",
    default: " ",
  };

  static currencyDenomCase = {
    cp: "cp",
    sp: "sp",
    ep: "ep",
    gp: "gp",
    pp: "pp",
  };

  /* ============================================ */
  /* PRIVATE FUNCTIONS */
  /* ============================================ */

  static patchCurrency(currency) {
    if (hasProperty(currency, "pp")) {
      let ppValue = getProperty(currency, "pp") || 0;
      if (!is_lazy_number(ppValue)) {
        // Do nothing
      }
      // Module compatibility with https://foundryvtt.com/packages/link-item-resource-5e
      else if (String(ppValue).startsWith("0") && String(ppValue) !== "0") {
        while (String(ppValue).startsWith("0")) {
          if (String(ppValue) === "0") {
            break;
          }
          ppValue = String(ppValue).slice(1);
        }
      }
      if (!is_real_number(ppValue)) {
        ppValue = 0;
      }
      if (getProperty(currency, "pp") !== ppValue) {
        setProperty(currency, "pp", Number(ppValue ?? 0));
        info(`patchCurrency | update pp from '${getProperty(currency, "pp")}' to '${ppValue}'`);
      }
    }
    if (hasProperty(currency, "gp")) {
      let gpValue = getProperty(currency, "gp") || 0;
      if (!is_lazy_number(gpValue)) {
        // Do nothing
      }
      // Module compatibility with https://foundryvtt.com/packages/link-item-resource-5e
      else if (String(gpValue).startsWith("0") && String(gpValue) !== "0") {
        while (String(gpValue).startsWith("0")) {
          if (String(gpValue) === "0") {
            break;
          }
          gpValue = String(gpValue).slice(1);
        }
      }
      if (!is_real_number(gpValue)) {
        gpValue = 0;
      }
      if (getProperty(currency, "gp") !== gpValue) {
        setProperty(currency, "gp", Number(gpValue ?? 0));
        info(`patchCurrency | update gp from '${getProperty(currency, "gp")}' to '${gpValue}'`);
      }
    }
    if (hasProperty(currency, "ep")) {
      let epValue = getProperty(currency, "ep") || 0;
      if (!is_lazy_number(epValue)) {
        // Do nothing
      }
      // Module compatibility with https://foundryvtt.com/packages/link-item-resource-5e
      else if (String(epValue).startsWith("0") && String(epValue) !== "0") {
        while (String(epValue).startsWith("0")) {
          if (String(epValue) === "0") {
            break;
          }
          epValue = String(epValue).slice(1);
        }
      }
      if (!is_real_number(epValue)) {
        epValue = 0;
      }
      if (getProperty(currency, "ep") !== epValue) {
        setProperty(currency, "ep", Number(epValue ?? 0));
        info(`patchCurrency | update ep from '${getProperty(currency, "ep")}' to '${epValue}'`);
      }
    }
    if (hasProperty(currency, "sp")) {
      let spValue = getProperty(currency, "sp") || 0;
      if (!is_lazy_number(spValue)) {
        // Do nothing
      }
      // Module compatibility with https://foundryvtt.com/packages/link-item-resource-5e
      else if (String(spValue).startsWith("0") && String(spValue) !== "0") {
        while (String(spValue).startsWith("0")) {
          if (String(spValue) === "0") {
            break;
          }
          spValue = String(spValue).slice(1);
        }
      }
      if (!is_real_number(spValue)) {
        spValue = 0;
      }
      if (getProperty(currency, "sp") !== spValue) {
        setProperty(currency, "sp", Number(spValue ?? 0));
        info(`patchCurrency | update sp from '${getProperty(currency, "sp")}' to '${spValue}'`);
      }
    }
    if (hasProperty(currency, "cp")) {
      let cpValue = getProperty(currency, "cp") || 0;
      if (!is_lazy_number(cpValue)) {
        // Do nothing
      }
      // Module compatibility with https://foundryvtt.com/packages/link-item-resource-5e
      else if (String(cpValue).startsWith("0") && String(cpValue) !== "0") {
        while (String(cpValue).startsWith("0")) {
          if (String(cpValue) === "0") {
            break;
          }
          cpValue = String(cpValue).slice(1);
        }
      }
      if (!is_real_number(cpValue)) {
        cpValue = 0;
      }
      if (getProperty(currency, "cp") !== cpValue) {
        setProperty(currency, "cp", Number(cpValue ?? 0));
        info(`patchCurrency | update cp from '${getProperty(currency, "cp")}' to '${cpValue}'`);
      }
    }
    return currency;
  }

  static calculateNewAmount(actor, valueS, denom, sign) {
    if (!actor) {
      throw error(`No actor is been passed`, true);
    }

    if (isEmptyObject(valueS)) {
      throw error(`The currency value is empty or null`, true);
    }

    let value = String(valueS);

    let isValidCurrencyDenom = false;
    for (const val of Object.values(LazyMoneyHelpers.currencyDenomCase)) {
      if (denom === val) {
        isValidCurrencyDenom = true;
        break;
      }
    }
    if (!isValidCurrencyDenom) {
      throw error(`The currency denomination '${this.currencyDenomCase}' is not valid`, true);
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
      return;
    }
    let newAmount = {};
    if (!(denom === "ep" && game.settings.get(CONSTANTS.MODULE_ID, "ignoreElectrum"))) {
      switch (sign) {
        case signCase.add: {
          newAmount = LazyMoneyHelpers.addMoney(money, delta, denom);
          LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has added ${delta} ${denom}.`);
          break;
        }
        case signCase.subtract: {
          newAmount = LazyMoneyHelpers.removeMoney(money, delta, denom);
          LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has removed ${delta} ${denom}.`);
          if (!newAmount) {
            // flash(input);
            newAmount = money;
          }
          break;
        }
        case signCase.equals: {
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
    } else {
      switch (sign) {
        case signCase.add: {
          newAmount[denom] = money[denom] + delta;
          LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has added ${delta} ${denom}.`);
          break;
        }
        case signCase.subtract: {
          newAmount[denom] = money[denom] - delta;
          LazyMoneyHelpers.chatLog(actor, `${game.user?.name} on ${actor.name} has removed ${delta} ${denom}.`);
          break;
        }
        case signCase.equals: {
          newAmount[denom] = money[denom];
          LazyMoneyHelpers.chatLog(
            actor,
            `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
          );
          break;
        }
        default: {
          newAmount[denom] = money[denom];
          LazyMoneyHelpers.chatLog(
            actor,
            `${game.user?.name} on ${actor.name} has replaced ${money[denom]} ${denom} with ${delta} ${denom}.`
          );
          break;
        }
      }
    }
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

  static getCpValue() {
    let cpValue = {};
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
        cpValue = {};
      }
      if (ignorePP && ignoreGP && ignoreEP && ignoreSP && !ignoreCP) {
        cpValue = {
          cp: { value: cpConvert, up: "", down: "" },
        };
      }
      if (ignorePP && ignoreGP && ignoreEP && !ignoreSP && ignoreCP) {
        cpValue = {
          sp: { value: cpConvert, up: "", down: "" },
        };
      }
      if (ignorePP && ignoreGP && ignoreEP && !ignoreSP && !ignoreCP) {
        cpValue = {
          sp: { value: spConvert, up: "", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (ignorePP && ignoreGP && !ignoreEP && ignoreSP && ignoreCP) {
        cpValue = {
          ep: { value: cpConvert, up: "", down: "" },
        };
      }
      if (ignorePP && ignoreGP && !ignoreEP && ignoreSP && !ignoreCP) {
        cpValue = {
          ep: { value: epConvert, up: "", down: "sp" },
          cp: { value: cpConvert, up: "ep", down: "" },
        };
      }
      if (ignorePP && ignoreGP && !ignoreEP && !ignoreSP && ignoreCP) {
        cpValue = {
          ep: { value: epConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "" },
        };
      }
      if (ignorePP && ignoreGP && !ignoreEP && !ignoreSP && !ignoreCP) {
        cpValue = {
          ep: { value: epConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && ignoreEP && ignoreSP && ignoreCP) {
        cpValue = {
          gp: { value: gpConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && ignoreEP && ignoreSP && !ignoreCP) {
        cpValue = {
          gp: { value: gpConvert, up: "", down: "cp" },
          cp: { value: cpConvert, up: "gp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && ignoreEP && !ignoreSP && ignoreCP) {
        cpValue = {
          gp: { value: gpConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && ignoreEP && !ignoreSP && !ignoreCP) {
        cpValue = {
          gp: { value: gpConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && !ignoreEP && ignoreSP && ignoreCP) {
        cpValue = {
          gp: { value: gpConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && !ignoreEP && ignoreSP && !ignoreCP) {
        cpValue = {
          gp: { value: gpConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "ep", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && !ignoreEP && !ignoreSP && ignoreCP) {
        cpValue = {
          gp: { value: gpConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "" },
        };
      }
      if (ignorePP && !ignoreGP && !ignoreEP && !ignoreSP && !ignoreCP) {
        cpValue = {
          gp: { value: gpConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && ignoreEP && ignoreSP && ignoreCP) {
        cpValue = {
          pp: { value: cpConvert, up: "", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && ignoreEP && ignoreSP && !ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "cp" },
          cp: { value: cpConvert, up: "pp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && ignoreEP && !ignoreSP && ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "pp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && ignoreEP && !ignoreSP && !ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "sp" },
          sp: { value: spConvert, up: "pp", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && !ignoreEP && ignoreSP && ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "pp", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && !ignoreEP && ignoreSP && !ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "pp", down: "cp" },
          cp: { value: cpConvert, up: "ep", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && !ignoreEP && !ignoreSP && ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "pp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "" },
        };
      }
      if (!ignorePP && ignoreGP && !ignoreEP && !ignoreSP && !ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "ep" },
          ep: { value: epConvert, up: "pp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && ignoreEP && ignoreSP && ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && ignoreEP && ignoreSP && !ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "cp" },
          cp: { value: cpConvert, up: "gp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && ignoreEP && !ignoreSP && ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && ignoreEP && !ignoreSP && !ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "sp" },
          sp: { value: spConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && !ignoreEP && ignoreSP && ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && !ignoreEP && ignoreSP && !ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "cp" },
          cp: { value: cpConvert, up: "ep", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && !ignoreEP && !ignoreSP && ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "" },
        };
      }
      if (!ignorePP && !ignoreGP && !ignoreEP && !ignoreSP && !ignoreCP) {
        cpValue = {
          pp: { value: ppConvert, up: "", down: "gp" },
          gp: { value: gpConvert, up: "pp", down: "ep" },
          ep: { value: epConvert, up: "gp", down: "sp" },
          sp: { value: spConvert, up: "ep", down: "cp" },
          cp: { value: cpConvert, up: "sp", down: "" },
        };
      }
    } else {
      if (game.settings.get(CONSTANTS.MODULE_ID, "ignoreElectrum")) {
        cpValue = {
          pp: { value: 1000, up: "", down: "gp" },
          gp: { value: 100, up: "pp", down: "sp" },
          sp: { value: 10, up: "gp", down: "cp" },
          cp: { value: 1, up: "sp", down: "" },
        };
      } else {
        cpValue = {
          pp: { value: 1000, up: "", down: "gp" },
          gp: { value: 100, up: "pp", down: "ep" },
          ep: { value: 50, up: "gp", down: "sp" },
          sp: { value: 10, up: "ep", down: "cp" },
          cp: { value: 1, up: "sp", down: "" },
        };
      }
    }
    let total = 1;
    //@ts-ignore
    const convert = CONFIG.DND5E.currencies;
    Object.values(convert)
      .reverse()
      .forEach((v) => {
        if (v.conversion !== undefined) {
          total *= v.conversion.each;
          if (cpValue[v.conversion.into]) {
            cpValue[v.conversion.into].value = total;
          }
        }
      });
    // if (game.settings.get(CONSTANTS.MODULE_NAME, "ignoreElectrum")) {
    // 	cpValue.gp.down = "sp";
    // 	cpValue.sp.up = "gp";
    // 	delete cpValue.ep;
    // }
    return cpValue;
  }
  static getDelta(delta, denom) {
    const cpValue = LazyMoneyHelpers.getCpValue();
    let newDelta = {};
    delta *= cpValue[denom].value;
    for (let key in cpValue) {
      const myValue = cpValue[key].value;
      let intDiv = Number(~~(delta / myValue));
      if (intDiv > 0) {
        newDelta[key] = intDiv;
        delta %= myValue;
      }
    }
    return newDelta;
  }
  static scaleDown(oldAmount, denom) {
    const cpValue = LazyMoneyHelpers.getCpValue();
    const up = cpValue[denom].up;
    let newAmount = oldAmount;
    if (newAmount[up] > 0) {
      newAmount[up] -= 1;
      newAmount[denom] += ~~(cpValue[up].value / cpValue[denom].value);
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
    const cpValue = LazyMoneyHelpers.getCpValue();
    let newAmount = {};
    if (game.settings.get(CONSTANTS.MODULE_ID, "addConvert")) {
      let cpDelta = delta * cpValue[denom].value;
      for (let key in cpValue) {
        const myValue = cpValue[key].value;
        newAmount[key] = oldAmount[key] + ~~(cpDelta / myValue);
        cpDelta %= myValue;
      }
    } else {
      newAmount[denom] = oldAmount[denom] + delta;
    }
    return newAmount;
  }
  static removeMoney(oldAmount, delta, denom) {
    const cpValue = LazyMoneyHelpers.getCpValue();
    let newAmount = oldAmount;
    let newDelta = {};
    let down;
    if (oldAmount[denom] >= delta) {
      newAmount[denom] = oldAmount[denom] - delta;
      return newAmount;
    } else {
      newDelta = LazyMoneyHelpers.getDelta(delta, denom);
      const myValue = cpValue[denom].value;
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
            down = cpValue[key].down;
            value -= newAmount[key];
            newAmount[key] = 0;
            const myValue = cpValue[key].value;
            const myDown = cpValue[down].value;
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
    const cpValue = LazyMoneyHelpers.getCpValue();
    let total = 0;
    for (let key in cpValue) {
      const myValue = cpValue[key].value;
      total += money[key] * myValue;
    }
    return total;
  }
}
