## Changelog
### 1.2.3 

- Add some new API methods

### 1.2.2 

- Little fix on lib.js methods

### 1.2.0-1 [BREAKING CHANGES]

- Integrate item piles multisystem integration
- Add explicit support for a5e

### 1.1.7-8

- Bug fix: https://github.com/p4535992/foundryvtt-lazymoney-dnd5e/issues/8
- Start something for the multisystem behaviour

### 1.1.4-1.1.5-1.1.6

- Bug fixing and update the api

### 1.1.3

- fix on "is lazy number" function

### 1.1.2

- Add API for use on external modules

### 1.1.0-1

- Upgrade for fvtt11

### 1.0.11-12

- Some bug fix

### 1.0.10

- Removed lazuHp Feature

### 1.0.7-8-9

- Add support for HP and Experience

### 1.0.3-4-5-6

- Add some more checker

### 1.0.2

- Add hook for preUpdateActor

### 1.0.1

- Upgrade for fvtt 10
- Integration with [World Currency 5e module for Foundry VTT](https://github.com/cstby/foundryvtt-world-currency-5e)

### 0.9.17
- Added compatibility with NPC sheets (Credit: DawidIzydor)
### 0.9.16
- Added an option to whisper any currency changes to the GM.
### 0.9.15
- Fixed a mistake with the currency conversion.
### 0.9.14
- Fixed compatibility with new currency conversion in D&D5e 1.5+.
### 0.9.13
- Fixed some more cases where currency wasn't being removed correctly.
### 0.9.12
- Fixed some cases where currency wasn't being removed correctly.
- Added the ability to type something like 100-90 in the field in case of a double click. (Credit: Nordiii)
### 0.9.11
- Fixed a bug where the module would remove currency from higher denominations even when there was enough to pay.
### 0.9.10
- Reworked the logic for removing currency so it doesn't always start with the highest denomination.
### 0.9.9
- Added an option to ignore electrum when converting.
### 0.9.8
- Lazy Money now uses the currency conversion rates from `CONFIG.DND5E.currencyConversion`.
### 0.9.7
- Added an option to automatically convert when adding currency.
- Added a brief red flash to indicate if there isn't enough currency to remove.
