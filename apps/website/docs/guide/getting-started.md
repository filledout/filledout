# Installation

Just like any library we need to install filledout first. 
Library is split to few packages and first of all we need to install core package

```npm
npm install @filledout/core
```

Second if you using it with a ui framework (which you probably are) pick appropriate bindings library (check bindings section of the documentation).
```npm
npm install @filledout/react
```

Third - you probably want to have some kind of validation so you need to install specific package as well (look for extensions section in docs). In our case we'll use 
```npm
npm install @filledout/yup
```

After everything has been installed - don't forget to add @filledout/core and @filledout/yup (just like any lib that has unit factories) to effector's babel plugin.