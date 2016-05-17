import * as actionTypes from '../constants';
import SpellsCreation from '../lib/spells_creation';
import SpellsSpirit from '../lib/spells_spirit';
import SpellsPrimal from '../lib/spells_primal';
import SpellsEntropy from '../lib/spells_entropy';
import SpellsBlood from '../lib/spells_blood';

function falseArray(length) {
  const tmp = Array.apply(null, Array(length));
  for (const idx in tmp) {
    tmp[idx] = false;
  }
  return tmp;
}

function blankState(spellSchool) {
  const blank = {
    basic: [],
    focus: {},
    special: {}
  };
  for (const row of spellSchool.basic) {
    blank.basic.push(falseArray(row.length));
  }
  for (const level in spellSchool.focus) {
    blank.focus[level] = falseArray(spellSchool.focus[level].length);
  }
  for (const special in spellSchool.special) {
    blank.special[special] = {};
    for (const level in spellSchool.special[special]) {
      blank.special[special][level] = falseArray(spellSchool.special[special][level].length);
    }
  }
  return blank;
}

const initialState = {
  creation: blankState(SpellsCreation),
  entropy: blankState(SpellsEntropy),
  primal: blankState(SpellsPrimal),
  spirit: blankState(SpellsSpirit),
  blood: blankState(SpellsBlood)
};

function basicReducer(state, action) {
  return state.map((row, idx) => {
    if (idx === parseInt(action.id[1], 10)) {
      return row.map((col, jdx) => {
        if (jdx === parseInt(action.id[2], 10)) {
          return action.value;
        }
        return col;
      });
    }
    return row;
  });
}

function innerListReducer(state, action, kdx) {
  return state.map((s, idx) => {
    if (idx === parseInt(action.id[kdx], 10)) {
      return action.value;
    }
    return s;
  });
}

function outerListReducer(state, action, jdx) {
  return {
    ...state,
    [action.id[jdx]]: innerListReducer(state[action.id[jdx]], action, jdx + 1)
  };
}

function specialReducer(state, action) {
  return {
    ...state,
    [action.id[1]]: outerListReducer(state[action.id[1]], action, 2)
  };
}

function spellSchoolReducer(state, action) {
  switch (action.id[0]) {
    case 'basic':
      return {
        ...state,
        basic: basicReducer(state.basic, action)
      };
    case 'focus':
      return {
        ...state,
        focus: outerListReducer(state.focus, action, 1)
      };
    case 'special':
      return {
        ...state,
        special: specialReducer(state.special, action)
      };
    default:
      return state;
  }
}

export function spells(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_SPELL:
      return {
        ...state,
        [action.idx]: spellSchoolReducer(state[action.idx], action)
      };
    default:
      return state;
  }
}
