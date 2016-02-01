Dragon Age table top RPG character sheet using react.js

## app/lib
The `app/lib` contains files with the information contained in the Dragon Age core rule book.  As I can't provide this information here,
the format for each of these files is as follows.

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
An array containing information for each class specialization:
```js
[
  {
    label: 'specialization name',
    classes: ['class for this specialization'],
    requirement: 'requirement for specialization',
    novice: 'novice level of specialization',
    journeyman: 'journeyman level of specialization',
    master: 'master level of specialization'
  },
  ...
]
```

### talents.js
An array containing information for each talent:
```js
[
  {
    label: 'talent name',
    classes: ['array of class for this talent'],
    requirement: 'requirement for talent',
    novice: 'novice level of talent',
    journeyman: 'journeyman level of talent',
    master: 'master level of talent'
  },
  ...
]
```

### weaponGroups.js
An array of the various weapon groups:
```js
[
  {
    label: 'weapon group name',
    id: 'check box label for group'
    size: 'number of cols wide check box is'
    skip: 'number of cols to skip before check box'
  },
  ...
]
```

### spells_*.js
One file for each spell school (e.g. `spells_creation.js`). Each file contains an object with all spells from the school:
```js
{
  basic: [
    [ // spell book row 1
      {
        label: 'spell name',
        icon: 'path to icon png',
        next: ['arrow direction to draw'],
        info: {
          requirement: 'spell requirement',
          type: 'spell type',
          cost: 'MP cost',
          time: 'cast time',
          tn: 'target number',
          test: 'test type to make',
          description: 'full spell description'
        }
      },
      ...
    ],
    [ // spell book row 2
      ...
    ],
    ...
  ],
  focus: { // spells requiring school focus
    novice: [ // array of novice level spells
      ...
    ],
    journeyman: [ // array of journeyman level spells
      ...
    ],
    master: [ // array of master level spells
      ...
    ]
  },
  special: {
    specialization_name: { // spells requiring specialization
      novice: [ // array of novice level spells
        ...
      ],
      journeyman: [ // array of journeyman level spells
        ...
      ],
      master: [ // array of master level spells
        ...
      ]
    },
    ...
  },
}
```


TODO:
- enter spell info
