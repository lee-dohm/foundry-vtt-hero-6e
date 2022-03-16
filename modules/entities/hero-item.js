var SkillCharacteristic
;(function (SkillCharacteristic) {
  SkillCharacteristic['STR'] = 'str'
  SkillCharacteristic['INT'] = 'int'
  SkillCharacteristic['CON'] = 'con'
  SkillCharacteristic['DEX'] = 'dex'
  SkillCharacteristic['EGO'] = 'ego'
  SkillCharacteristic['PRE'] = 'pre'
})(SkillCharacteristic || (SkillCharacteristic = {}))
export class HeroItem extends Item {
  get _itemData() {
    return this.data
  }
  get _itemGameData() {
    return this.data.data
  }
}
//# sourceMappingURL=hero-item.js.map
