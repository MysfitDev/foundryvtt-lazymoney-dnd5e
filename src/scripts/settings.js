import CONSTANTS from "./constants/constants.js";
import SETTINGS from "./constants/settings.js";
import Logger from "./lib/Logger.js";
import { SYSTEMS } from "./systems.js";

export const registerSettings = function () {
    game.settings.registerMenu(CONSTANTS.MODULE_ID, "resetAllSettings", {
        name: `${CONSTANTS.MODULE_ID}.settings.reset.title`,
        hint: `${CONSTANTS.MODULE_ID}.settings.reset.hint`,
        icon: "fas fa-coins",
        type: ResetSettingsDialog,
        restricted: true,
    });

    // =====================================================================

    for (let [name, data] of Object.entries(SETTINGS.GET_DEFAULT())) {
        game.settings.register(CONSTANTS.MODULE_ID, name, data);
    }

    // game.settings.register(CONSTANTS.MODULE_ID, "enable", {
    //   name: `${CONSTANTS.MODULE_ID}.settings.enable.title`,
    //   hint: `${CONSTANTS.MODULE_ID}.settings.enable.hint`,
    //   scope: "client",
    //   config: true,
    //   default: true,
    //   type: Boolean,
    // });

    // game.settings.register(CONSTANTS.MODULE_ID, "addConvert", {
    //   name: `${CONSTANTS.MODULE_ID}.settings.addConvert.title`,
    //   hint: `${CONSTANTS.MODULE_ID}.settings.addConvert.hint`,
    //   scope: "client",
    //   config: true,
    //   default: false,
    //   type: Boolean,
    // });

    // game.settings.register(CONSTANTS.MODULE_ID, "ignoreElectrum", {
    //   name: `${CONSTANTS.MODULE_ID}.settings.ignoreElectrum.title`,
    //   hint: `${CONSTANTS.MODULE_ID}.settings.ignoreElectrum.hint`,
    //   scope: "world",
    //   config: true,
    //   default: false,
    //   type: Boolean,
    // });

    // game.settings.register(CONSTANTS.MODULE_ID, "chatLog", {
    //   name: `${CONSTANTS.MODULE_ID}.settings.chatLog.title`,
    //   hint: `${CONSTANTS.MODULE_ID}.settings.chatLog.hint`,
    //   scope: "world",
    //   config: true,
    //   default: false,
    //   type: Boolean,
    // });

    // ========================================================================

    game.settings.register(CONSTANTS.MODULE_ID, "debug", {
        name: `${CONSTANTS.MODULE_ID}.settings.debug.title`,
        hint: `${CONSTANTS.MODULE_ID}.settings.debug.hint`,
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
    });
};

export async function applyDefaultSettings() {
    const settings = SETTINGS.GET_SYSTEM_DEFAULTS();
    for (const [name, data] of Object.entries(settings)) {
        await game.settings.set(CONSTANTS.MODULE_ID, name, data.default);
    }
    await game.settings.set(CONSTANTS.MODULE_ID, SETTINGS.SYSTEM_VERSION, SYSTEMS.DATA.VERSION);
    // await patchCurrencySettings();
}

// export async function patchCurrencySettings() {
//   const currencies = game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.CURRENCIES);
//   for (let currency of currencies) {
//     if (currency.type !== "item" || !currency.data.uuid || currency.data.item) {
//       continue;
//     }
//     const item = await fromUuid(currency.data.uuid);
//     if (!item) {
//       continue;
//     }
//     currency.data.item = item.toObject();
//   }
//   return await game.settings.set(SETTINGS.CURRENCIES, currencies);
// }

export function applySystemSpecificStyles(data = false) {
    // TODO ?
}

export async function checkSystem() {
    if (!SYSTEMS.HAS_SYSTEM_SUPPORT) {
        if (game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.SYSTEM_NOT_FOUND_WARNING_SHOWN)) return;

        let settingsValid = true;
        for (const [name, data] of Object.entries(SETTINGS.GET_DEFAULT())) {
            settingsValid =
                settingsValid && game.settings.get(CONSTANTS.MODULE_ID, name).length !== new data.type().length;
        }

        if (settingsValid) return;

        new Dialog({
            title: game.i18n.localize(`${CONSTANTS.MODULE_ID}.Dialog.systemfound.title`),
            content: Logger.warn(game.i18n.localize(`${CONSTANTS.MODULE_ID}.Dialog.systemfound.content`), true),
            buttons: {
                confirm: {
                    icon: '<i class="fas fa-check"></i>',
                    label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.Dialog.systemfound.confirm`),
                    callback: () => {
                        applyDefaultSettings();
                    },
                },
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: game.i18n.localize("No"),
                },
            },
            default: "cancel",
        }).render(true);

        return game.settings.set(CONSTANTS.MODULE_ID, SETTINGS.SYSTEM_NOT_FOUND_WARNING_SHOWN, true);
    }

    if (game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.SYSTEM_FOUND) || SYSTEMS.DATA.INTEGRATION) {
        const currentVersion = game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.SYSTEM_VERSION);
        const newVersion = SYSTEMS.DATA.VERSION;
        debug(`Comparing system version - Current: ${currentVersion} - New: ${newVersion}`);
        if (foundry.utils.isNewerVersion(newVersion, currentVersion)) {
            debug(`Applying system settings for ${game.system.title}`);
            await applyDefaultSettings();
        }
        return;
    }

    await game.settings.set(CONSTANTS.MODULE_ID, SETTINGS.SYSTEM_FOUND, true);

    if (game.settings.get(CONSTANTS.MODULE_ID, SETTINGS.SYSTEM_NOT_FOUND_WARNING_SHOWN)) {
        Logger.dialogWarning(game.i18n.localize(`${CONSTANTS.MODULE_ID}.Dialog.nosystemfound.content`));
    }

    return applyDefaultSettings();
}

class ResetSettingsDialog extends FormApplication {
    constructor(...args) {
        //@ts-ignore
        super(...args);
        //@ts-ignore
        return new Dialog({
            title: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.title`),
            content:
                '<p style="margin-bottom:1rem;">' +
                game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.content`) +
                "</p>",
            buttons: {
                confirm: {
                    icon: '<i class="fas fa-check"></i>',
                    label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.confirm`),
                    callback: async () => {
                        const worldSettings = game.settings.storage
                            ?.get("world")
                            ?.filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_ID}.`));
                        for (let setting of worldSettings) {
                            console.log(`Reset setting '${setting.key}'`);
                            await setting.delete();
                        }
                        //window.location.reload();
                    },
                },
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.dialogs.resetsettings.cancel`),
                },
            },
            default: "cancel",
        });
    }

    async _updateObject(event, formData) {
        // do nothing
    }
}
