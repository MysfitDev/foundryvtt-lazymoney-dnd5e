import CONSTANTS from "./constants/constants.js";
import { LazyMoneyHelpers } from "./lazymoney-helpers.js";
import { debug, info, isEmptyObject, is_lazy_number, is_real_number, log, warn } from "./lib/lib.js";

function _onChangeCurrency(ev) {
  const input = ev.target;
  const actor = ev.data.app.actor;
  const sheet = ev.data.app.options;
  let money = ev.data.app.actor.system.currency;
  money = LazyMoneyHelpers.patchCurrency(money);

  const denom = input.name.split(".")[2];
  const value = input.value;
  let sign = LazyMoneyHelpers.signCase.default;
  for (const val of Object.values(LazyMoneyHelpers.signCase)) {
    if (value.includes(val)) {
      sign = val;
      break;
    }
  }

  let newAmount = LazyMoneyHelpers.calculateNewAmount(actor, value, denom, sign);
  flash(input);

  if (Object.keys(newAmount).length > 0) {
    sheet.submitOnChange = false;
    actor
      .update({ "system.currency": newAmount })
      .then(() => {
        input.value = Number(getProperty(actor, input.name) ?? 0);
        sheet.submitOnChange = true;
      })
      .catch(console.log.bind(console));
  }
}

function flash(input) {
  input.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  setTimeout(() => {
    input.style.backgroundColor = "";
  }, 150);
}

export function applyLazyMoney(app, html, actorData) {
  if (!game.settings.get(CONSTANTS.MODULE_ID, "enable")) {
    return;
  }
  // The module already do the job so for avoid redundance...
  // if (game.modules.get("lazymoney")?.active) {
  //   return;
  // }

  for (const elem of html.find("input[name^='system.currency']")) {
    elem.type = "text";
    elem.classList.add("lazymoney");
  }
  html.find("input[name^='system.currency']").off("change");
  html.find("input[name^='system.currency']").change(
    {
      app: app,
      data: actorData,
    },
    _onChangeCurrency
  );
}
