The api is reachable from the variable `game.modules.get('lazymoney').api` or from the socket libary `socketLib` on the variable `game.modules.get('lazymoney').socket` if present and active.

#### addCurrency({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;void&gt;</code>

Add currency on actor

**Returns**: <code>Promise&lt;void&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value ons tring or number format. eg. "+1", "-2", 2 , -2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.addCurrency({
    item: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```


#### subtractCurrency({actor: uuid|Actor, currencyValue:string|number, currencyDenom:string}):void ⇒ <code>Promise&lt;void&gt;</code>

Subtract currency on actor

**Returns**: <code>Promise&lt;void&gt;</code> - Return nothing

| Param | Type | Description | Note |
| --- | --- | --- | --- |
| actor | <code>uuid of the actor  or actor </code> | The uuid of the actor  or the actor  object himself | If you use the module 'Item Macro' the variable value is 'actor' |
| currencyValue | <code>string|number</code> | The currency value ons tring or number format. eg. "+1", "-2", 2 , -2 | |
| currencyDenom | <code>string</code> | The currency denomination (cp, sp, ep, gp, pp) | |

**Example**:

```
game.modules.get('lazymoney').api.subtractCurrency({
    item: "Actor.7bm6EK8jnopnGRS4",
    currencyValue: 30,
    currencyDenom: "gp"
})

```
