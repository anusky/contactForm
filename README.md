Nyan!
# Welcome to contactuserform! :shipit:

intv-contactuserform is a React Component Library.
It comes from the necessity of using custom InputFields on front-side forms.
Actually there's no stable version, that's why we don't use minimum @1.0.0.
There are lot of testing and coverage to do. 


# Installation
You can install it through yarn or npm.
> yarn add intv-contactuserform
> npm install intv-contactuserform


## What you need to know
First thing you will need is a JSON structure with all inputs you want to use.
>An example of it on [src/data/structure.json](src/data/structure.json)
>
In this structure you can see all input types that are compatible with **contactuserform** actually.

# How to use it
Once you have installed as a dependency of your project, it's time to begin to use it.
### Import 
As a React component you should import **contactuserform** this way.
> import {userForm} from 'intv-contactuserform'

### Use it on your code

There are many ways to use this library in case you want to customize your submit button or your validation messages. 
You will find a simple example on [src/form.js](src/form.js)

# Versions and tasks
`Actual version 0.0.4`
- [x] ☕ Add type=radio inputs
- [x] ☕ Add custom type=checkbox-copy inputs
- [ ] 🍕Add testing and coverage.
- [ ] 🍟Add custom titles in the middle of the form.
- [ ] 🍔Default css to use in case users don't have their own.
- [ ] 🌋Make some tutorial/guides of the different ways contactuserform can be used.
```
