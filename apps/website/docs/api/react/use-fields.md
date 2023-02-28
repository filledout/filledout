# `useFields()`

Accepts FormModel as an argument

Returns Fields proxy which saves references of fields so you can safely use them for memo components

Also calls cleanup for cached field proxies on unmount so it can be GCed