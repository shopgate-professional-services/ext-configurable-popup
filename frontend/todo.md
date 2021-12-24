1. reset mechanism:
  at the moment, there are no reset mechanism build for the popup, this means that the popups
  will appear as long as their `enabled` property is set to true. one approach to fix this is to have
  a global object which holds the maximum value of all popups with the same type. So when
  we reach this maximum value, we can reset their counter. At this point, we also need to
  define a `occurrenceCount` property and an `id` for each popup, to indicate which one should stop appearing
  at which point. For this matter, the global state of the extension must be persisted, which I wasn't
  able to make work. (Though rene helped me with this matter, but the solution didn't work 100%).
  If the issue got fixed, we can use the following places to check for the occurrence count:
   1. `frontend/subscriptions/index.js:91`
   2. `frontend/subscriptions/index.js:149`
  Then we also have to increase the counter for each popup in `frontend/actions/showModal.js:66`

2. persistent state:
  as previously mentioned, there's an issue with persisting the state. although the extension add itself
  to the persistentStates in extension-config.js, it still doesn't work

3. I have used the `dangerouslySetInnerHTML` of React library in `frontend/actions/showModal.js:71`
  to render the content of a popup in basic dialog. It didn't feel perfect though as I had to also
  import the `React` library in `frontend/actions/showModal.js:1` and from my understanding, this
  might not be the best solution to do this.
