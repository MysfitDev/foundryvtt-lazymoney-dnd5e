The api is reachable from the variable `game.modules.get('lazymoney').api` or from the socket libary `socketLib` on the variable `game.modules.get('lazymoney').socket` if present and active.


## manageCurrencyAsync({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;void&gt;</code>
## manageCurrency({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;void&gt;</code>

Manage currency on actor (Async Version)

**Returns**: <code>Promise&lt;void&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "=3", "+1", "-2", 2 , -2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
await game.modules.get('lazymoney').api.manageCurrencyAsync({
    actor: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## manageCurrencySync({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>void</code>

Manage currency on actor (Sync Version)

**Returns**: <code>void</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "=3", "+1", "-2", 2 , -2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.manageCurrencySync({
    actor: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## addCurrencyAsync({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;void&gt;</code>
## addCurrency({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;void&gt;</code>

Add currency on actor (Async version)

**Returns**: <code>Promise&lt;void&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "+1", 2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
await game.modules.get('lazymoney').api.addCurrencyAsync({
    actor: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## addCurrencySync({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>void</code>

Add currency on actor (Sync version)

**Returns**: <code>void</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "+1", 2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.addCurrencySync({
    actor: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## subtractCurrencyAsync({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;void&gt;</code>
## subtractCurrency({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;void&gt;</code>

Subtract currency on actor (Async Version)

**Returns**: <code>Promise&lt;void&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "-2", 2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
await game.modules.get('lazymoney').api.subtractCurrencyAsync({
    actor: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## subtractCurrencySync({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>void</code>

Subtract currency on actor (Sync version)

**Returns**: <code>void</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "-2", 2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.subtractCurrencySync({
    actor: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## hasEnoughCurrencyAsync({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;boolean&gt;</code>
## hasEnoughCurrency({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;boolean&gt;</code>

There is enough currency on actor (Async version)

**Returns**: <code>Promise&lt;boolean&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "-2", 2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
const isRichOrPoor = await game.modules.get('lazymoney').api.hasEnoughCurrencyAsync({
    actor: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## hasEnoughCurrencySync({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>boolean</code>

There is enough currency on actor (Sync version)

**Returns**: <code>boolean</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "-2", 2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
const isRichOrPoor = game.modules.get('lazymoney').api.hasEnoughCurrencySync({
    actor: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```

# OLD API (TO REMOVE ONLY FOR DND5E)

## convertToCopper({currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;number&gt;</code>

Convert currency to Copper

**Returns**: <code>Promise&lt;number&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "+1", "-2", 2 , -2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.convertToCopper({
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## convertToSilver({currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;number&gt;</code>

Convert currency to Silver

**Returns**: <code>Promise&lt;number&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "+1", "-2", 2 , -2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.convertToSilver({
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## convertToGold({currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;number&gt;</code>

Convert currency to Gold

**Returns**: <code>Promise&lt;number&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "+1", "-2", 2 , -2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.convertToGold({
    currencyValue: 30,
    currencyDenom: "pp"
})

```

## convertToElectrum({currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;number&gt;</code>

Convert currency to Electrum

**Returns**: <code>Promise&lt;number&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "+1", "-2", 2 , -2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.convertToElectrum({
    currencyValue: 30,
    currencyDenom: "gp"
})

```

## convertToPlatinum({currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;number&gt;</code>

Convert currency to Platinum

**Returns**: <code>Promise&lt;number&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| currencyValue | <code>string|number</code> | The currency value string or number format. eg. "+1", "-2", 2 , -2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.convertToPlatinum({
    currencyValue: 30,
    currencyDenom: "gp"
})

```
