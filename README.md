# Shopgate Connect - Configurable popup

This extension provides the functionality to show customizable popups with optional HTML content.
If the user clicks the confirm button, then a link will be opened in the inAppBrowser.

## Configuration

### Config explanation

- id: some unique id
- title: the title of the popup
- content: the text/html content of the popup
- enabled: if false, this popup will be ignored
- button:
  - confirmLabel: the label for the confirm button
  - dismissLabel: the label for the dismiss button (optional)
- action:
  - link: a link which will be opened in the inAppBrowser, if the user clicks the confirm button
- trigger:
  - type: defines when the popup will be opened. Possible values are: appStarts, timeInterval, ordersPlaced
  - value: the meaning of value depends on the type
- maxOccurrenceCount: a number which defines how often the popup is allowed to occurre
- maxRejectionCount: a number which defines how often the popup could be rejected by the user before it gets disabled

### Trigger types

- type appStarts with value 4
  - the popup will be shown on every fourth app start
- type timeInterval with value 4
  - the popup will be shown every fourth day
- type ordersPlaced with value 4
  - the popup will be shown after every fourth successful checkout

### Example config

```
{
  "id": "uniquePopupId",
  "title": "Popup title",
  "content": "<p>HTML Content</p>",
  "enabled": true,
  "button": {
    "confirmLabel": "Click!",
    "dismissLabel": "Cancel"
  },
  "action": {
    "link": "https://shopgate.com"
  },
  "trigger": {
    "type": "appStarts",
    "value": 1
  },
  "maxOccurrenceCount": 1,
  "maxRejectionCount": 2
}

```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

Shopgate Connect - Configurable popup is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.
