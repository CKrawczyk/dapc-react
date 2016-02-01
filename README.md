Dragon Age table top RPG character sheet using react.js

## app/lib
The `app/lib` contains files with the information contained in the Dragon Age core rule book.

### focus.js
Each stat has a object of the form:
```js
{
  name: 'stat name',
  focusList: [
    'focus 1',
    'focus 2',
    ...
  ]
}
```

### languages.js
An array of languages of the form:
```js
[
  'language 1',
  'language 2',
  ...
]
```

### powers.js
An object contains information about each of the class powers:
```js
{
  mage: [
    {
      label: 'mage power 1'
      level: '1'
      info: 'description'
    },
    ...
  ],
  rogue: [
    {
      label: 'rogue power 1'
      level: '1'
      info: 'description'
    },
    ...
  ],
  warrior: [
    {
      label: 'warrior power 1'
      level: '1'
      info: 'description'
    },
    ...
  ]
}
```

### specializations.js

### talents.js

### weaponGroups.js

### spells_*


TODO:
- enter spell info
