import * as actionTypes from '../constants';

/* eslint func-names:0 */
function setValueAction(actionType) {
  return function (newValue) {
    return {
      type: actionType,
      id: newValue.id,
      value: newValue.value
    };
  };
}

function setNestedAction(actionType) {
  return function (newNest) {
    return {
      type: actionType,
      idx: newNest.idx,
      id: newNest.id,
      value: newNest.value
    };
  };
}

function setBasicAction(actionType) {
  return function () {
    return {
      type: actionType
    };
  };
}

export const actions = {
  setInfo: setValueAction(actionTypes.CHANGE_INFO),
  setUtility: setValueAction(actionTypes.CHANGE_UTILITY),
  setHealthMana: setValueAction(actionTypes.CHANGE_HEALTH_MANA),
  setStat: setNestedAction(actionTypes.CHANGE_STAT),
  setWeaponGroups: setValueAction(actionTypes.CHANGE_WEAPONS_GROUP),
  setWeapon: setNestedAction(actionTypes.CHANGE_WEAPONS),
  addWeaponList: setBasicAction(actionTypes.ADD_WEAPONS_LIST),
  removeWeaponList: setBasicAction(actionTypes.REMOVE_WEAPONS_LIST),
  setMoney: setValueAction(actionTypes.CHANGE_MONEY),
  setLanguage: setValueAction(actionTypes.CHANGE_LANGUAGE),
  setEquipment: setValueAction(actionTypes.CHANGE_EQUIPMENT),
  setNote: setValueAction(actionTypes.CHANGE_NOTE),
  setClassPowers: setValueAction(actionTypes.CHANGE_CLASS_POWERS),
  setTalents: setNestedAction(actionTypes.CHANGE_TALENTS),
  setSpecial: setNestedAction(actionTypes.CHANGE_SPECIAL)
};
