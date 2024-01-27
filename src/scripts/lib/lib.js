// ================================
// Logger utility
// ================================

import CONSTANTS from "../constants/constants.js";
import { LazyMoneyHelpers } from "../lazymoney-helpers.js";

export function isRealNumber(inNumber) {
  return !isNaN(inNumber) && typeof inNumber === "number" && isFinite(inNumber);
}

export function isEmptyObject(obj) {
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  if (obj === null || obj === undefined) {
    return true;
  }
  if (isRealNumber(obj)) {
    return false;
  }
  const result =
    obj && // null and undefined check
    Object.keys(obj).length === 0; // || Object.getPrototypeOf(obj) === Object.prototype);
  return result;
}

export function isLazyNumber(inNumber) {
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
      return isRealNumber(parseInt(withoutFirst.trim()));
    } catch (e) {
      error(e);
      return false;
    }
  } else {
    return true;
  }
}

export function retrieveLazyNumber(inNumber) {
  if (!inNumber) {
    return inNumber;
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

export function isLessThanOneIsOne(inNumber) {
  return inNumber < 1 ? 1 : inNumber;
}

// ================================
// Retrieve document utility
// ================================

export function getDocument(target) {
  if (stringIsUuid(target)) {
    target = fromUuidSync(target);
  }
  return target?.document ?? target;
}

export function stringIsUuid(inId) {
  return typeof inId === "string" && (inId.match(/\./g) || []).length && !inId.endsWith(".");
}

export function getUuid(target) {
  if (stringIsUuid(target)) {
    return target;
  }
  const document = getDocument(target);
  return document?.uuid ?? false;
}

export function getActorSync(target, ignoreError = false, ignoreName = true) {
  if (!target) {
    throw error(`Actor is undefined`, true, target);
  }
  if (target instanceof Actor) {
    return target;
  }
  // This is just a patch for compatibility with others modules
  if (target.document) {
    target = target.document;
  }
  if (target.uuid) {
    target = target.uuid;
  }

  if (target instanceof Actor) {
    return target;
  }
  if (stringIsUuid(target)) {
    target = fromUuidSync(target);
  } else {
    target = game.actors.get(target);
    if (!target && !ignoreName) {
      target = game.actors.getName(target);
    }
  }
  if (!target) {
    if (ignoreError) {
      warn(`Actor is not found`, false, target);
      return;
    } else {
      throw error(`Actor is not found`, true, target);
    }
  }
  // Type checking
  if (!(target instanceof Actor)) {
    if (ignoreError) {
      warn(`Invalid Actor`, true, target);
      return;
    } else {
      throw error(`Invalid Actor`, true, target);
    }
  }
  return target;
}

export async function getActorAsync(target, ignoreError = false, ignoreName = true) {
  if (!target) {
    throw error(`Actor is undefined`, true, target);
  }
  if (target instanceof Actor) {
    return target;
  }
  // This is just a patch for compatibility with others modules
  if (target.document) {
    target = target.document;
  }
  if (target.uuid) {
    target = target.uuid;
  }

  if (target instanceof Actor) {
    return target;
  }
  if (stringIsUuid(target)) {
    target = await fromUuid(target);
  } else {
    target = game.actors.get(target);
    if (!target && !ignoreName) {
      target = game.actors.getName(target);
    }
  }
  if (!target) {
    if (ignoreError) {
      warn(`Actor is not found`, false, target);
      return;
    } else {
      throw error(`Actor is not found`, true, target);
    }
  }
  // Type checking
  if (!(target instanceof Actor)) {
    if (ignoreError) {
      warn(`Invalid Actor`, true, target);
      return;
    } else {
      throw error(`Invalid Actor`, true, target);
    }
  }
  return target;
}
