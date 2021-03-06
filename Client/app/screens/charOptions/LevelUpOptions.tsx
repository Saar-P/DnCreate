import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Switch } from 'react-native';
import userCharApi from '../../api/userCharApi';
import { AppButton } from '../../components/AppButton';
import { AppText } from '../../components/AppText';
import { IconGen } from '../../components/IconGen';
import colors from '../../config/colors';
import { CharacterModel } from '../../models/characterModel';
import { ActionType } from '../../redux/action-type';
import { store } from '../../redux/store';
import LottieView from 'lottie-react-native';
import { MagicModel } from '../../models/magicModel';
import switchModifier from '../../../utility/abillityModifierSwitch';
import AsyncStorage from '@react-native-community/async-storage';
import { filterAlreadyPicked } from './helperFunctions/filterAlreadyPicked';
import { eldritchInvocations } from "../../classFeatures/eldritchInvocations";
import { highLightPicked } from './helperFunctions/highLightPicked';
import { FeatOptions } from './FeatOptions';
import { setTotalKnownSpells } from './helperFunctions/setTotalKnownSpells';
import { extraPathChoiceNumbers } from '../../../utility/extraPathChoiceNumbers';
import { PathFeatureOrganizer } from './helperFunctions/PathFeatureOrganizer';
import { AppExtraPathChoicePicker } from '../../components/AppExtraPathChoicePicker';
import * as Path from "../../../jsonDump/paths.json"
import { AppPathAdditionalApply } from './AppPathAdditionalApply';
import { AppActivityIndicator } from '../../components/AppActivityIndicator';
import spellsJSON from '../../../jsonDump/spells.json'
import { spellLevelChanger } from './helperFunctions/SpellLevelChanger';


interface LevelUpOptionsState {
    beforeAnyChanges: CharacterModel,
    beforeLevelUp: CharacterModel
    skillsClicked: any[]
    newSkills: any[]
    newTools: any[]
    pathClicked: boolean[]
    extraPathChoiceClicked: boolean[]
    pathChosen: any
    character: CharacterModel
    abilityClicked: number[]
    totalAbilityPoints: number
    strength: number
    constitution: number
    dexterity: number
    intelligence: number
    wisdom: number
    charisma: number
    load: boolean
    spellSlots: number[]
    fightingStyle: any[]
    fightingStyleClicked: boolean[]
    pact: any
    pactClicked: boolean[]
    metaMagic: any[]
    metamagicClicked: boolean[]
    totalMetaMagicPoints: number
    invocationsClicked: boolean[]
    invocations: any[]
    totalInvocationPoints: number
    featsWindow: boolean
    abilityWindow: boolean
    weaponProfArray: any[]
    armorProfArray: any[]
    featName: string
    featDescription: string
    extraPathChoice: boolean
    extraPathChoiceValue: any[]
    additionalSkillPicks: boolean
    additionalToolPicks: boolean
    reloadingSkills: boolean
    maneuversToPick: boolean
    ElementsToPick: boolean
    maneuvers: any[]
    elements: any[]
    pathFightingStyle: boolean
    pathPickDruidCircle: boolean
    languageToPick: boolean
    langHolder: string[]
    pathInfoLoading: boolean
    specificSpellToLoad: boolean,
    specificSpell: string
    armorToLoad: any
    newSpellAvailabilityList: string[]
}

export class LevelUpOptions extends Component<{ options: any, character: CharacterModel, close: any, refresh: any }, LevelUpOptionsState>{
    constructor(props: any) {
        super(props)
        this.state = {
            armorToLoad: null,
            specificSpell: '',
            specificSpellToLoad: false,
            ElementsToPick: false,
            pathInfoLoading: false,
            langHolder: [],
            languageToPick: false,
            pathPickDruidCircle: false,
            pathFightingStyle: false,
            maneuvers: this.props.character.charSpecials.battleMasterManeuvers,
            elements: this.props.character.charSpecials.monkElementsDisciplines,
            maneuversToPick: false,
            beforeAnyChanges: new CharacterModel,
            reloadingSkills: false,
            additionalToolPicks: false,
            additionalSkillPicks: false,
            extraPathChoiceValue: [],
            extraPathChoiceClicked: [],
            extraPathChoice: false,
            featName: '',
            featDescription: '',
            weaponProfArray: [],
            armorProfArray: [],
            featsWindow: false,
            abilityWindow: false,
            beforeLevelUp: new CharacterModel,
            metamagicClicked: [],
            metaMagic: [],
            fightingStyleClicked: [],
            pactClicked: [],
            fightingStyle: [],
            pact: null,
            skillsClicked: [],
            newTools: this.props.character.tools,
            newSkills: this.props.character.skills,
            spellSlots: [],
            load: true,
            strength: this.props.character.strength,
            dexterity: this.props.character.dexterity,
            constitution: this.props.character.constitution,
            intelligence: this.props.character.intelligence,
            wisdom: this.props.character.wisdom,
            charisma: this.props.character.charisma,
            totalAbilityPoints: null,
            abilityClicked: [0, 0, 0, 0, 0, 0],
            character: this.props.character,
            pathChosen: null,
            pathClicked: [],
            totalMetaMagicPoints: null,
            invocationsClicked: [],
            invocations: this.props.character.charSpecials.eldritchInvocations,
            totalInvocationPoints: null,
            newSpellAvailabilityList: []
        }
    }

    async componentDidMount() {
        const character = { ...this.props.character }
        setTimeout(() => {
            this.setState({ load: false })
        }, 1000);
        const beforeAnyChanges = JSON.parse(JSON.stringify(this.props.character))
        const beforeLevelUpString = await AsyncStorage.getItem(`current${this.state.character._id}level${this.state.character.level - 1}`);
        character.magic = new MagicModel()
        this.setState({ beforeLevelUp: JSON.parse(beforeLevelUpString), beforeAnyChanges, character });
        if (this.props.options.spells || this.props.options.spellsKnown) {
            const character = { ...this.props.character };
            if (this.props.options.spellSlotLevel) {
                character.charSpecials.warlockSpellSlotLevel = this.props.options.spellSlotLevel;
            }
            if (this.props.options.spellSlots) {
                character.charSpecials.warlockSpellSlots = this.props.options.spellSlots;
            }
            if (this.props.options.sorceryPoints) {
                character.charSpecials.sorceryPoints = this.props.options.sorceryPoints;
            }
            if (this.props.options.spellsKnown) {
                character.spellsKnown = this.props.options.spellsKnown
            }
            if (!this.props.options.spellsKnown) {
                const spellsKnown = setTotalKnownSpells(this.props.character);
                character.spellsKnown = spellsKnown;
            }
            character.magic = new MagicModel()
            character.magic.cantrips = this.props.options.cantrips;
            if (this.props.character.characterClass !== 'Warlock') {
                character.magic.firstLevelSpells = this.props.options.spells[0];
                character.magic.secondLevelSpells = this.props.options.spells[1];
                character.magic.thirdLevelSpells = this.props.options.spells[2];
                character.magic.forthLevelSpells = this.props.options.spells[3];
                character.magic.fifthLevelSpells = this.props.options.spells[4];
                character.magic.sixthLevelSpells = this.props.options.spells[5];
                character.magic.seventhLevelSpells = this.props.options.spells[6];
                character.magic.eighthLevelSpells = this.props.options.spells[7];
                character.magic.ninthLevelSpells = this.props.options.spells[8];
            }
            const beforeAnyChanges = JSON.parse(JSON.stringify(character))
            this.setState({ character, beforeAnyChanges }, () => {
                store.dispatch({ type: ActionType.SetInfoToChar, payload: this.state.character })
                userCharApi.updateChar(this.state.character);
            })
        }
        if (this.props.options.abilityPointIncrease) {
            this.setState({ totalAbilityPoints: 2 });
        }
        if (this.props.options.metamagic) {
            this.setState({ totalMetaMagicPoints: this.props.options.metamagic.amount });
        }
        if (this.props.options.eldritchInvocations) {
            this.setState({ totalInvocationPoints: this.props.options.eldritchInvocations })
        }
        if (this.state.invocations.length > 0) {
            this.setState({ invocationsClicked: highLightPicked(this.state.invocations, eldritchInvocations(this.props.character.level, this.props.character)) })
        }
        if (Array.isArray(this.props.options)) {
            const pathClicked = [];
            for (let item of this.props.options) {
                pathClicked.push(false)
            }
        }
    }

    pickPath = (path: any, index: number) => {
        this.setState({ pathInfoLoading: true })
        setTimeout(() => {
            this.setState({ pathInfoLoading: false })
        }, 800);
        let character = { ...this.state.character };
        if (!this.state.pathClicked[index]) {
            if (this.state.pathChosen !== null) {
                alert(`Can't pick more then one path`)
                return
            }
            const pathClicked = this.state.pathClicked;
            pathClicked[index] = true
            this.setState({ pathClicked, pathChosen: path });
        }
        else if (this.state.pathClicked[index]) {
            character = JSON.parse(JSON.stringify(this.state.beforeAnyChanges));
            const pathClicked = this.state.pathClicked;
            pathClicked[index] = false;
            this.setState({ pathClicked, pathChosen: null, character }, () => {
                store.dispatch({ type: ActionType.SetInfoToChar, payload: this.state.character })
            });
        }
    }

    resetExpertiseSkills = async (skill: any) => {
        store.dispatch({ type: ActionType.ResetCharSkillsToLowerLevel })
        this.setState({ reloadingSkills: true, skillsClicked: [] })
        setTimeout(() => {
            this.setState({ reloadingSkills: false })
        }, 500);
    }

    pickSkill = (skill: any, index: number) => {
        let count = 0;
        this.state.skillsClicked.forEach(appear => appear === true && count++)
        if (!this.state.skillsClicked[index]) {
            if (count === this.props.options.expertise) {
                alert(`You can only Improve ${this.props.options.expertise} skills`);
                return;
            }
            const newTools = this.state.newTools;
            const newSkills = store.getState().character.skills;
            const skillsClicked = this.state.skillsClicked;
            newTools.filter((item, index) => {
                if (item.includes(skill[0])) {
                    if (item[1] === 2) {
                        alert('You already have expertise in this skill, you cannot double stack that same skill.');
                        return;
                    }
                    skillsClicked[index + this.state.character.skills.length] = true
                    item[1] = item[1] + 2
                    this.setState({ skillsClicked });
                    return;
                }
            })
            newSkills.filter((item, index) => {
                if (item.includes(skill[0])) {
                    if (item[1] === 2) {
                        alert('You already have expertise in this skill, you cannot double stack that same skill.');
                        return;
                    }
                    skillsClicked[index] = true
                    item[1] = item[1] + 2
                    this.setState({ skillsClicked });
                    return;
                }
            })
        }
        else if (this.state.skillsClicked[index]) {
            const skillsClicked = this.state.skillsClicked;
            const newSkills = store.getState().character.skills;
            const newTools = this.state.newTools;
            newTools.filter((item, index) => {
                if (item.includes(skill[0])) {
                    skillsClicked[index + this.state.character.skills.length] = false
                    item[1] = item[1] - 2
                    this.setState({ skillsClicked });
                    return;
                }
            })
            newSkills.filter((item, index) => {
                if (item.includes(skill[0])) {
                    skillsClicked[index] = false
                    item[1] = item[1] - 2;
                    this.setState({ skillsClicked });
                    return;
                }
            })
        }

    }

    addSkills = () => {
        let count = 0;
        this.state.skillsClicked.forEach(appear => appear === true && count++);
        if (count < 2) {
            alert('You still have points to spend on skill proficiencies.')
            return false;
        }
        return true;
    }

    addPath = () => {
        if (this.state.pathChosen === null) {
            alert(`Must Pick A path!`)
            return false
        }
        return true
    }

    addAbilityPoints = () => {
        if (this.state.totalAbilityPoints > 0) {
            alert(`You still have ${this.state.totalAbilityPoints} points to spend.`);
            return false;
        }
        return true;
    }

    listStats = () => {
        const stats: any[] = [];
        stats.push(['strength', this.state.strength])
        stats.push(['constitution', this.state.constitution])
        stats.push(['dexterity', this.state.dexterity])
        stats.push(['intelligence', this.state.intelligence])
        stats.push(['wisdom', this.state.wisdom])
        stats.push(['charisma', this.state.charisma]);
        return stats
    }

    pickAbilityPoints = (ability: any, index: number) => {
        if (this.state[ability] === 20) {
            alert(`Max 20 ability points`)
            return;
        }
        if (this.state.abilityClicked[index] <= 2) {
            if (this.state.totalAbilityPoints === 0) {
                alert(`You only have 2 ability points to spend`)
                return;
            }
            const abilityClicked = this.state.abilityClicked;
            abilityClicked[index] = abilityClicked[index] + 1
            this.setState({ [ability]: this.state[ability] + 1 } as any)
            this.setState({ abilityClicked, totalAbilityPoints: this.state.totalAbilityPoints - 1 });
        }
    }

    removeAbilityPoints = (ability: any, index: number) => {
        if (this.state.abilityClicked[index] >= 0 && this.state.abilityClicked[index] <= 2 && this.state.totalAbilityPoints < 2) {
            if (this.state[ability] === this.state.character[ability]) {
                return;
            }
            const abilityClicked = this.state.abilityClicked;
            abilityClicked[index] = abilityClicked[index] - 1
            this.setState({ [ability]: this.state[ability] - 1 } as any)
            this.setState({ abilityClicked, totalAbilityPoints: this.state.totalAbilityPoints + 1 });
        }
    }

    pickFightingStyle = (style: any, index: number) => {
        if (!this.state.fightingStyleClicked[index]) {
            if (this.state.fightingStyle.length >= 1) {
                alert('You can only pick one fighting style.')
                return;
            }
            const fightingStyleClicked = this.state.fightingStyleClicked;
            fightingStyleClicked[index] = true;
            const fightingStyle = this.state.fightingStyle;
            fightingStyle.push(style);
            this.setState({ fightingStyle, fightingStyleClicked })
        }
        else if (this.state.fightingStyleClicked[index]) {
            const fightingStyleClicked = this.state.fightingStyleClicked;
            fightingStyleClicked[index] = false;
            let fightingStyle = this.state.fightingStyle;
            fightingStyle = fightingStyle.filter((n: any) => n.name !== style.name)
            this.setState({ fightingStyle, fightingStyleClicked })
        }
    }

    pickMetaMagic = (magic: any, index: number) => {
        let metaMagic = this.state.metaMagic;
        if (!this.state.metamagicClicked[index]) {
            if (this.state.metaMagic.length >= this.state.totalMetaMagicPoints) {
                alert(`You can only pick ${this.state.totalMetaMagicPoints} Metamagic abilities.`)
                return;
            }
            const metamagicClicked = this.state.metamagicClicked;
            metamagicClicked[index] = true;
            metaMagic.push(magic)
            this.setState({ metaMagic, metamagicClicked })
        }
        else if (this.state.metamagicClicked[index]) {
            metaMagic = metaMagic.filter(val => val.name !== magic.name);
            const metamagicClicked = this.state.metamagicClicked;
            metamagicClicked[index] = false;
            this.setState({ metaMagic, metamagicClicked })
        }
    }
    addMetaMagic = () => {
        if (this.state.metaMagic.length !== this.state.totalMetaMagicPoints) {
            alert(`You still have ${this.state.totalMetaMagicPoints - this.state.metaMagic.length} Metamagic points`);
            return false;
        }
        return true;
    }


    addFightingStyle = () => {
        if (this.state.fightingStyle.length === 0) {
            alert(`You must pick a fighting style`);
            return false;
        }
        return true;
    }

    checkSpellSlotImprove = (spellSlot: string) => {
        if (!this.state.beforeLevelUp) {
            return;
        }
        const difference = this.state.character.magic[spellSlot] - this.state.beforeLevelUp.magic[spellSlot];
        return difference === 0 ? '' : ` + ${difference} new!`;
    }


    pickEldritchInvocations = (invocation: any, index: number) => {
        let invocations = this.state.invocations;
        if (!this.state.invocationsClicked[index]) {
            if (this.state.invocations.length >= this.state.totalInvocationPoints) {
                alert(`You can only pick ${this.state.totalInvocationPoints} Eldritch Invocations.`)
                return;
            }
            const invocationsClicked = this.state.invocationsClicked;
            invocationsClicked[index] = true;
            invocations.push(invocation)
            this.setState({ invocations, invocationsClicked })
        }
        else if (this.state.invocationsClicked[index]) {
            invocations = invocations.filter((val: any) => val.name !== invocation.name);
            const invocationsClicked = this.state.invocationsClicked;
            invocationsClicked[index] = false;
            this.setState({ invocations, invocationsClicked })
        }
    }

    addEldritchInvocations = () => {
        if (this.state.invocations.length !== this.state.totalInvocationPoints) {
            alert(`You still have ${this.state.totalInvocationPoints - this.state.invocations.length} Eldritch Invocations to pick`);
            return false;
        }
        return true;
    }

    pickWarlockPact = (pact: any, index: number) => {
        const character = { ...this.state.character };
        if (!this.state.pactClicked[index]) {
            if (this.state.pact !== null) {
                alert('You can only pick one pact.')
                return;
            }
            const pactClicked = this.state.pactClicked;
            pactClicked[index] = true;
            character.charSpecials.warlockPactBoon = pact
            this.setState({ pact: pact, pactClicked, character, invocationsClicked: highLightPicked(this.state.invocations, eldritchInvocations(this.props.character.level, this.props.character)) })
        }
        else if (this.state.pactClicked[index]) {
            const pactClicked = this.state.pactClicked;
            pactClicked[index] = false;
            character.charSpecials.warlockPactBoon = { name: '', description: "" };
            this.setState({ pact: null, pactClicked, character, invocationsClicked: highLightPicked(this.state.invocations, eldritchInvocations(this.props.character.level, this.props.character)) })
        }
    }

    addWarlockPact = () => {
        if (this.state.pact === null) {
            alert(`You must pick a pact`);
            return false;
        }
        return true;
    }

    resetAbilityScoresToCurrentLevel = () => {
        this.setState({
            strength: this.props.character.strength,
            dexterity: this.props.character.dexterity,
            constitution: this.props.character.constitution,
            intelligence: this.props.character.intelligence,
            wisdom: this.props.character.wisdom,
            charisma: this.props.character.charisma
        })
    }
    disableExtraPathChoice = () => {
        if (!this.state.extraPathChoice) {
            return;
        }
        this.setState({ extraPathChoice: false })
    }

    enableExtraPathChoice = () => {
        if (this.state.extraPathChoice) {
            return;
        }
        this.setState({ extraPathChoice: true })
    }

    applyExtraPathChoice = (choice: any, index: number) => {
        if (!this.state.extraPathChoiceClicked[index]) {
            const extraPathChoiceAmount = extraPathChoiceNumbers(this.state.character, this.state.character.level);
            if (this.state.extraPathChoiceValue.length === extraPathChoiceAmount) {
                alert(`You can only ${extraPathChoiceAmount} pick one choice.`)
                return;
            }
            const extraPathChoiceValue = this.state.extraPathChoiceValue;
            const extraPathChoiceClicked = this.state.extraPathChoiceClicked;
            extraPathChoiceClicked[index] = true;
            extraPathChoiceValue.push(choice);
            this.setState({ extraPathChoiceValue })

        }
        else if (this.state.extraPathChoiceClicked[index]) {
            let extraPathChoiceValue = this.state.extraPathChoiceValue;
            const extraPathChoiceClicked = this.state.extraPathChoiceClicked;
            extraPathChoiceClicked[index] = false;
            extraPathChoiceValue = extraPathChoiceValue.filter((val: any) => choice.name !== val.name);
            this.setState({ extraPathChoiceValue })
        }
    }

    addArmor = async () => {
        let armorList = await AsyncStorage.getItem(`${this.state.character._id}ArmorList`);
        if (!armorList) {
            const armorList = [this.state.armorToLoad]
            AsyncStorage.setItem(`${this.state.character._id}ArmorList`, JSON.stringify(armorList))
            return;
        }
        const newArmorList = JSON.parse(armorList)
        newArmorList.push(this.state.armorToLoad)
        AsyncStorage.setItem(`${this.state.character._id}ArmorList`, JSON.stringify(newArmorList))
    }

    armorBonuses = (armorAc: number, armorBonusesCalculationType: any) => {
        let newArmorAc: number = null;
        if (armorBonusesCalculationType === "Medium Armor") {
            newArmorAc = +armorAc + (this.state.character.modifiers.dexterity >= 2 ? 2 : this.state.character.modifiers.dexterity)
        }
        if (armorBonusesCalculationType === "Light Armor") {
            newArmorAc = +armorAc + (this.state.character.modifiers.dexterity)
        }
        if (armorBonusesCalculationType === "Heavy Armor") {
            newArmorAc = +armorAc
        }
        if (armorBonusesCalculationType === "none") {
            newArmorAc = 10 + +this.state.character.modifiers.dexterity
        }
        if (this.state.character.characterClass === "Barbarian" && armorBonusesCalculationType === "none") {
            newArmorAc = (10 + +this.state.character.modifiers.dexterity + +this.state.character.modifiers.constitution)
        }
        if (this.state.character.characterClass === "Monk" && armorBonusesCalculationType === "none") {
            newArmorAc = (10 + +this.state.character.modifiers.dexterity + +this.state.character.modifiers.wisdom)
        }
        if (this.state.character.pathFeatures.length > 0) {
            this.state.character.pathFeatures.forEach(item => {
                if (item.name === "Draconic Resilience" && armorBonusesCalculationType === "none") {
                    newArmorAc = (13 + +this.state.character.modifiers.dexterity)
                }
            })
        }
        return newArmorAc
    }

    close = async () => {
        if (await AsyncStorage.getItem(`${this.state.character._id}FirstTimeOpened`)) {
            await AsyncStorage.removeItem(`${this.state.character._id}FirstTimeOpened`)
        }
        const character = { ...this.state.character };
        if (this.props.options.pathSelector) {
            if (!this.addPath()) {
                return;
            }
            if (this.state.additionalSkillPicks) {
                alert('You have additional choices to pick from')
                return;
            }
            if (this.state.pathFightingStyle) {
                alert('You still have to pick a fighting style')
                return;
            }
            if (this.state.additionalToolPicks) {
                alert('You have additional tools to pick from')
                return;
            }
            if (this.state.pathPickDruidCircle) {
                alert('You Must pick a druid circle')
                return;
            }
            if (this.state.languageToPick) {
                alert('You must add languages.')
                return;
            }
            if (this.state.extraPathChoice) {
                if (this.state.extraPathChoiceValue.length !== extraPathChoiceNumbers(this.state.character, this.state.character.level)) {
                    alert('You have additional choices to pick from')
                    return;
                }
            }
            if (this.state.maneuversToPick) {
                alert('You have additional Maneuvers to pick from')
                return;
            }
            if (this.state.ElementsToPick) {
                alert('You have additional Elements to pick from')
                return;
            }
            character.charSpecials.battleMasterManeuvers = this.state.maneuvers;
            character.charSpecials.monkElementsDisciplines = this.state.elements;
            character.path = this.state.pathChosen;
            const pathResult = PathFeatureOrganizer(Path[this.state.character.characterClass][this.state.pathChosen.name][this.state.character.level], this.state.extraPathChoiceValue)
            for (let item of pathResult) {
                character.pathFeatures.push(item)
            }
        }
        if (this.props.options.pathFeature && !this.props.options.pathSelector) {
            if (this.state.additionalSkillPicks) {
                alert('You have additional choices to pick from')
                return;
            }
            if (this.state.additionalToolPicks) {
                alert('You have additional tools to pick from')
                return;
            }
            if (this.state.pathFightingStyle) {
                alert('You still have to pick a fighting style')
                return;
            }
            if (this.state.languageToPick) {
                alert('You must add languages.')
                return;
            }
            if (this.state.extraPathChoice) {
                if (this.state.extraPathChoiceValue.length !== extraPathChoiceNumbers(this.state.character, this.state.character.level)) {
                    alert('You have additional choices to pick from')
                    return;
                }
            }
            if (this.state.maneuversToPick) {
                alert('You have additional Maneuvers to pick from')
                return;
            }
            if (this.state.ElementsToPick) {
                alert('You have additional Elements to pick from')
                return;
            }
            character.charSpecials.battleMasterManeuvers = this.state.maneuvers;
            character.charSpecials.monkElementsDisciplines = this.state.elements;
            const pathResult = PathFeatureOrganizer(Path[this.state.character.characterClass][this.state.character.path.name][this.state.character.level], this.state.extraPathChoiceValue)
            for (let item of pathResult) {
                character.pathFeatures.push(item)
            }
        }
        if (this.props.options.extraSpells) {
            for (let item of this.props.options.extraSpells) {
                const spell = spellsJSON.find(spell => spell.name === item)
                const spellLevel = spellLevelChanger(spell.level)
                character.spells[spellLevel].push({ spell: spell, removable: false });
            }
        }
        if (this.props.options.abilityPointIncrease && !this.state.featsWindow && !this.state.abilityWindow) {
            alert('Must pick Ability score increase or new feat.');
            return;
        }
        if (this.props.options.abilityPointIncrease && this.state.abilityWindow) {
            if (!this.addAbilityPoints()) {
                return;
            }
            character.strength = this.state.strength;
            character.constitution = this.state.constitution;
            character.dexterity = this.state.dexterity;
            character.intelligence = this.state.intelligence;
            character.charisma = this.state.charisma;
            character.wisdom = this.state.wisdom;
        }
        if (this.props.options.abilityPointIncrease && this.state.featsWindow) {
            if (this.state.featName === '' || this.state.featDescription === '') {
                alert('You must provide a name and description for your feat.');
                return;
            }
            this.state.weaponProfArray.forEach(item => { character.addedWeaponProf.push(item) });
            this.state.armorProfArray.forEach(item => { character.addedArmorProf.push(item) });
            character.feats.push({ name: this.state.featName, description: this.state.featDescription })
            character.strength = this.state.strength;
            character.constitution = this.state.constitution;
            character.dexterity = this.state.dexterity;
            character.intelligence = this.state.intelligence;
            character.charisma = this.state.charisma;
            character.wisdom = this.state.wisdom;
        }
        if (this.state.specificSpellToLoad) {
            const spell = spellsJSON.find(spell => spell.name === this.state.specificSpell)
            const spellLevel = spellLevelChanger(spell.level)
            character.spells[spellLevel].push({ spell: spell, removable: false });
        }
        if (this.props.options.expertise) {
            if (!this.addSkills()) {
                return;
            }
            character.skills = store.getState().character.skills;
            character.tools = this.state.newTools
        }
        if (this.props.options.pickFightingStyle) {
            if (!this.addFightingStyle()) {
                return;
            }
            for (let item of this.state.fightingStyle) {
                character.charSpecials.fightingStyle.push(item)
            }
        }
        if (this.state.langHolder.length > 0) {
            for (let item of this.state.langHolder) {
                character.languages.push(item)
            }
        }
        if (this.props.options.metamagic) {
            if (!this.addMetaMagic()) {
                return;
            }
            for (let item of this.state.metaMagic) {
                character.charSpecials.sorcererMetamagic.push(item)
            }
        }
        if (this.props.options.rageAmount) {
            character.charSpecials.rageAmount = this.props.options.rageAmount;
            character.charSpecials.rageDamage = this.props.options.rageDamage;
        }
        if (this.props.options.eldritchInvocations) {
            if (!this.addEldritchInvocations()) {
                return;
            }
            character.charSpecials.eldritchInvocations = this.state.invocations
        }
        if (this.state.newSpellAvailabilityList.length > 0) {
            for (let item of this.state.newSpellAvailabilityList) {
                character.differentClassSpellsToPick.push(item)
            }
        }
        if (this.props.options.monkMartialArts) {
            character.charSpecials.kiPoints = this.props.options.kiPoints
            character.charSpecials.martialPoints = this.props.options.monkMartialArts
        }
        if (this.props.options.sneakAttackDie) {
            character.charSpecials.sneakAttackDie = this.props.options.sneakAttackDie
        }
        if (this.state.armorToLoad !== null) {
            this.addArmor()
        }
        if (this.props.options.pactSelector) {
            if (!this.addWarlockPact()) {
                return;
            }
            character.charSpecials.warlockPactBoon = this.state.pact;
        }
        this.setState({ character }, () => {
            const character = { ...this.state.character };
            const attributePoints = [character.strength, character.constitution, character.dexterity, character.intelligence, character.wisdom, character.charisma]
            const modifiers = Object.values(this.state.character.modifiers);
            attributePoints.forEach((item: number, index: number) => {
                modifiers[index] = switchModifier(item);
            })
            character.modifiers.strength = modifiers[0];
            character.modifiers.constitution = modifiers[1];
            character.modifiers.dexterity = modifiers[2];
            character.modifiers.intelligence = modifiers[3];
            character.modifiers.wisdom = modifiers[4];
            character.modifiers.charisma = modifiers[5];
            if (character.equippedArmor) {
                character.equippedArmor.ac = this.armorBonuses(character.equippedArmor.baseAc, character.equippedArmor.armorBonusesCalculationType)
                this.setState({ character })
            }
            userCharApi.updateChar(this.state.character).then(() => {
                this.props.refresh()
                this.props.close(false);
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.load ?
                    <View>
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                            <AppText fontSize={35} color={colors.bitterSweetRed}>Congratulations!</AppText>
                            <AppText textAlign={'center'} fontSize={30}>You have reached level {this.state.character.level}</AppText>
                        </View>
                        <LottieView style={{ zIndex: 1, width: "100%" }} autoPlay source={require('../../../assets/lottieAnimations/confeetiAnimation.json')} />
                    </View>
                    :
                    <View>
                        {this.props.options.pathSelector ?
                            <View>
                                <View style={{ justifyContent: "center", alignItems: "center", padding: 15 }}>
                                    <AppText fontSize={20} textAlign={'center'}>As a {this.props.character.characterClass} at level {this.props.character.level} you can pick a path</AppText>
                                    <AppText fontSize={18} textAlign={'center'}>It is highly recommended to search the many guides online in order to find the path that suites you best.</AppText>
                                    <AppText fontSize={18} textAlign={'center'}>As you level up the path you chose will provide you with spacial bonuses.</AppText>
                                </View>
                                <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
                                    {this.props.options.pathSelector.map((path: any, index: number) =>
                                        <TouchableOpacity key={index} onPress={() => this.pickPath(path, index)} style={[styles.item, { backgroundColor: this.state.pathClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}>
                                            <AppText color={this.state.pathClicked[index] ? colors.black : colors.bitterSweetRed} fontSize={22}>{path.name}</AppText>
                                            <AppText fontSize={18}>{path.description.replace(/\. /g, '.\n\n').replace(/\: /g, ':\n')}</AppText>
                                        </TouchableOpacity>)}
                                </View>
                            </View>
                            :
                            null}
                        {this.props.options.rageAmount ?
                            <View>
                                <AppText textAlign={'center'} fontSize={18}>Your Rage amount is now - {this.props.options.rageAmount}</AppText>
                                <AppText textAlign={'center'} fontSize={18}>Your Rage Damage bonus is now - {this.props.options.rageDamage}</AppText>
                            </View>
                            :
                            <View></View>
                        }
                        {this.props.options.abilityPointIncrease ?
                            <View>
                                <View style={{ justifyContent: "center", alignItems: "center", padding: 15 }}>
                                    <AppText fontSize={20} textAlign={'center'}>As a {this.props.character.characterClass} at level {this.props.character.level} you can choose between increasing your ability score and adopting a new feat.</AppText>
                                    <AppText fontSize={18} textAlign={'center'}>You can either spend 2 points on one ability or spread your choice and put 1 point in two different abilities</AppText>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ padding: 15 }}>
                                            <AppButton fontSize={18} backgroundColor={this.state.featsWindow ? colors.bitterSweetRed : colors.lightGray} borderRadius={100} width={100} height={100} title={"Feats"} onPress={() => {
                                                this.resetAbilityScoresToCurrentLevel()
                                                this.setState({ featsWindow: true, abilityWindow: false, totalAbilityPoints: 2, abilityClicked: [0, 0, 0, 0, 0, 0] })
                                            }} />
                                        </View>
                                        <View style={{ padding: 15 }}>
                                            <AppButton fontSize={18} backgroundColor={this.state.abilityWindow ? colors.bitterSweetRed : colors.lightGray} borderRadius={100} width={100} height={100} title={"Ability Score"} onPress={() => { this.setState({ featsWindow: false, abilityWindow: true }) }} />
                                        </View>
                                    </View>
                                </View>
                                {this.state.abilityWindow &&
                                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                        {this.listStats().map((item, index) =>
                                            <View key={index} style={{ width: Dimensions.get('screen').width / 2, paddingHorizontal: Dimensions.get('screen').width / 12 }}>
                                                <View style={{ flexDirection: 'row', position: 'absolute', alignSelf: 'center' }}>
                                                    <TouchableOpacity style={{ marginRight: 33 }} onPress={() => { this.pickAbilityPoints(item[0], index) }}>
                                                        <IconGen size={55} backgroundColor={colors.shadowBlue} name={'plus'} iconColor={colors.white} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ marginLeft: 33 }} onPress={() => { this.removeAbilityPoints(item[0], index) }}>
                                                        <IconGen size={55} backgroundColor={colors.orange} name={'minus'} iconColor={colors.white} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.innerModifier}>
                                                    <AppText fontSize={18} color={colors.totalWhite} textAlign={"center"}>{item[0]}</AppText>
                                                    <View style={{ paddingTop: 10 }}>
                                                        <AppText fontSize={25} textAlign={"center"}>{`${item[1]}`}</AppText>
                                                    </View>
                                                </View>
                                            </View>)}
                                    </View>}
                                {this.state.featsWindow &&
                                    <View>
                                        <FeatOptions character={this.state.character}
                                            featName={(e: string) => { this.setState({ featName: e }) }}
                                            featDescription={(e: string) => { this.setState({ featDescription: e }) }}
                                            weaponsProfChange={(e: any) => {
                                                let weaponProfArray = this.state.weaponProfArray;
                                                weaponProfArray = e.split(',').filter((i: any) => i);
                                                this.setState({ weaponProfArray }, () => {
                                                })
                                            }}
                                            armorProfChange={(e: any) => {
                                                let armorProfArray = this.state.armorProfArray;
                                                armorProfArray = e.split(',').filter((i: any) => i);;
                                                this.setState({ armorProfArray }, () => {
                                                })
                                            }}
                                            attributePointsChange={(abilityName: string, ability: number) => { this.setState({ [abilityName]: ability } as any) }}
                                            resetList={(listName: string) => { this.setState({ [listName]: [] } as any) }}
                                            resetAbilityScore={() => { this.resetAbilityScoresToCurrentLevel() }} />
                                    </View>}
                            </View>
                            :
                            null}
                        {this.props.options.pathFeature ?
                            this.state.pathChosen || this.state.character.path ?
                                <View>
                                    {this.state.pathInfoLoading ?
                                        <AppActivityIndicator visible={this.state.pathInfoLoading} />
                                        :
                                        <View style={{ justifyContent: "center", alignItems: "center", padding: 15 }}>
                                            <AppText fontSize={25} textAlign={'center'}>Level {this.props.character.level} with the {this.state.pathChosen?.name || this.state.character.path.name}!</AppText>
                                            {Object.values(Path[this.state.character.characterClass][this.state.pathChosen?.name || this.state.character.path.name][this.state.character.level]).map((item: any, index: number) =>
                                                <View key={item.name}>
                                                    <View style={item.description && styles.infoContainer}>
                                                        <AppText color={colors.bitterSweetRed} fontSize={25} textAlign={'center'}>
                                                            {item.name}</AppText>
                                                        <AppText color={colors.black} fontSize={18} textAlign={'center'}>
                                                            {item.description && item.description.replace(/\. /g, '.\n\n').replace(/\: /g, ':\n')}</AppText>
                                                    </View>
                                                    {(item.armorProf || item.weaponProf || item.skillList || item.fightingStyles || item.additionCantrip || item.druidCircleSpellLists ||
                                                        item.unrestrictedMagicPick || item.addMagicalAbilities || item.maneuvers || item.toolsToPick || item.learnLanguage ||
                                                        item.levelOneSpells || item.specificCantrip || item.AddSpellsFromDifferentClass || item.addElementalAttunement ||
                                                        item.elementList || item.spellsToBeAdded || item.toolsToBeAdded || item.addArmor ||
                                                        item.increaseMaxHp || item.addSpellAvailability || item.pickSpecificSpellWithChoices) &&
                                                        <AppPathAdditionalApply
                                                            loadSpellPickAvailability={(val: any) => { this.setState({ newSpellAvailabilityList: val }) }}
                                                            armorToLoad={(val: any) => { this.setState({ armorToLoad: val }) }}
                                                            loadCharacter={(val: CharacterModel) => { this.setState({ character: val }) }}
                                                            languagesToPick={(val: boolean) => { this.setState({ languageToPick: val }) }}
                                                            pickDruidCircle={(val: boolean) => { this.setState({ pathPickDruidCircle: val }) }}
                                                            fightingStylesToPick={(val: any) => { this.setState({ pathFightingStyle: val }) }}
                                                            isAdditionalToolChoice={(val: boolean) => { this.setState({ additionalToolPicks: val }) }}
                                                            pathChosen={this.state.pathChosen?.name || this.state.character.path.name}
                                                            pathChosenObj={this.state.pathChosen || this.state.character.path}
                                                            maneuversToPick={(val: boolean) => { this.setState({ maneuversToPick: val }) }}
                                                            elementsToPick={(val: any) => { this.setState({ ElementsToPick: val }) }}
                                                            loadElements={(val: any) => { this.setState({ elements: val }) }}
                                                            loadManeuvers={(val: any) => { this.setState({ maneuvers: val }) }}
                                                            loadUnrestrictedMagic={(magicNumber: number) => {
                                                                const character = { ...this.state.character };
                                                                character.unrestrictedKnownSpells = (character.unrestrictedKnownSpells ? character.unrestrictedKnownSpells : 0) + magicNumber;
                                                                this.setState({ character })
                                                            }}
                                                            loadSpecificSpell={(val: string) => {
                                                                this.setState({ specificSpellToLoad: true, specificSpell: val })
                                                            }}
                                                            loadLanguage={(languages: []) => {
                                                                const langHolder: any[] = []
                                                                languages.forEach((lang: any) => {
                                                                    let index = langHolder.indexOf(lang.slice(0, -1)) || langHolder.indexOf(lang)
                                                                    index > 0 ? langHolder[index] = lang : langHolder.push(lang)
                                                                    this.setState({ langHolder }, () => {
                                                                    })
                                                                })

                                                            }}

                                                            loadWeapons={(weapons: any) => {
                                                                const character = { ...this.state.character };
                                                                for (let item of weapons) {
                                                                    character.addedWeaponProf.push(item)
                                                                }
                                                                this.setState({ character })
                                                            }}
                                                            resetExpertiseSkills={(skill: any) => { this.resetExpertiseSkills(skill) }}
                                                            loadArmors={(armors: any) => {
                                                                const character = { ...this.state.character };
                                                                for (let item of armors) {
                                                                    character.addedArmorProf.push(item)
                                                                }
                                                                this.setState({ character })
                                                            }}
                                                            isAdditionalSkillChoice={(val: boolean) => { this.setState({ additionalSkillPicks: val }) }}
                                                            character={this.state.character}
                                                            pathItem={item}
                                                            loadSkills={(val: any[]) => { this.setState({ character: store.getState().character }) }} />
                                                    }
                                                    {item.choice &&
                                                        <AppExtraPathChoicePicker
                                                            resetExpertiseSkills={(skill: any) => { this.resetExpertiseSkills(skill) }}
                                                            character={this.state.character}
                                                            isExtraChoice={(val: boolean) => { this.setState({ extraPathChoice: val }) }}
                                                            applyExtraPathChoice={(item: any, index: number) => { this.applyExtraPathChoice(item, index) }}
                                                            item={item}
                                                            extraPathChoiceClicked={this.state.extraPathChoiceClicked}
                                                            isAdditionalSkillChoice={(val: boolean) => { this.setState({ additionalSkillPicks: val }) }}
                                                            loadSkills={(val: any[]) => {
                                                                this.setState({ character: store.getState().character })
                                                            }}
                                                        />}
                                                </View>)}
                                        </View>
                                    }
                                </View>
                                :
                                null
                            :
                            null}
                        {this.props.options.expertise ?
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                {this.state.reloadingSkills ? <AppActivityIndicator visible={this.state.reloadingSkills} /> :
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <AppText color={colors.bitterSweetRed} fontSize={20}>As a level {this.props.character.level} {this.props.character.characterClass}</AppText>
                                        <AppText textAlign={"center"}>You have the option to choose two of your skill proficiencies, your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.</AppText>
                                        {store.getState().character.skills.map((skill, index) =>
                                            <TouchableOpacity key={index} onPress={() => this.pickSkill(skill, index)} style={[styles.item, { padding: 15, backgroundColor: this.state.skillsClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}>
                                                <AppText>{skill[0]}</AppText>
                                            </TouchableOpacity>)}
                                        {this.props.character.characterClass === 'Rogue' &&
                                            this.props.character.tools.map((tool, index) =>
                                                <TouchableOpacity key={index} onPress={() => this.pickSkill(tool, index + this.state.character.skills.length)}
                                                    style={[styles.item, { padding: 15, backgroundColor: this.state.skillsClicked[index + this.state.character.skills.length] ? colors.bitterSweetRed : colors.lightGray }]}>
                                                    <AppText>{tool[0]}</AppText>
                                                </TouchableOpacity>)}
                                    </View>
                                }
                            </View>
                            :
                            null}
                        {this.props.options.cantrips ?
                            <View style={styles.magic}>
                                <AppText textAlign={'center'} color={colors.bitterSweetRed} fontSize={22}>As a level {this.props.character.level} {this.props.character.characterClass}</AppText>
                                {this.props.character.characterClass === "Warlock" ?
                                    <View>
                                        <AppText fontSize={18} textAlign={'center'}>You posses the following magical abilities</AppText>
                                        <AppText fontSize={18} textAlign={'center'}>You can now cast {this.state.character.magic.cantrips} cantrips</AppText>
                                        <AppText fontSize={18} textAlign={'center'}>You can now cast {this.props.options.spellSlots} spells at {this.props.options.spellSlotLevel} Level</AppText>
                                    </View>
                                    :
                                    <View>
                                        <AppText fontSize={20}>You gain the following spell slots:</AppText>
                                        <AppText fontSize={18}>- Cantrips: {this.state.character.magic.cantrips} {this.checkSpellSlotImprove('cantrips')}</AppText>
                                        <AppText fontSize={18}>- 1st level spells: {this.state.character.magic.firstLevelSpells} {this.checkSpellSlotImprove('firstLevelSpells')}</AppText>
                                        <AppText fontSize={18}>- 2nd level spells: {this.state.character.magic.secondLevelSpells} {this.checkSpellSlotImprove('secondLevelSpells')}</AppText>
                                        <AppText fontSize={18}>- 3rd level spells: {this.state.character.magic.thirdLevelSpells} {this.checkSpellSlotImprove('thirdLevelSpells')}</AppText>
                                        <AppText fontSize={18}>- 4th level spells: {this.state.character.magic.forthLevelSpells} {this.checkSpellSlotImprove('forthLevelSpells')}</AppText>
                                        <AppText fontSize={18}>- 5th level spells: {this.state.character.magic.fifthLevelSpells} {this.checkSpellSlotImprove('fifthLevelSpells')}</AppText>
                                        <AppText fontSize={18}>- 6th level spells: {this.state.character.magic.sixthLevelSpells} {this.checkSpellSlotImprove('sixthLevelSpells')}</AppText>
                                        <AppText fontSize={18}>- 7th level spells: {this.state.character.magic.seventhLevelSpells} {this.checkSpellSlotImprove('seventhLevelSpells')}</AppText>
                                        <AppText fontSize={18}>- 8th level spells: {this.state.character.magic.eighthLevelSpells} {this.checkSpellSlotImprove('eighthLevelSpells')}</AppText>
                                        <AppText fontSize={18}>- 9th level spells: {this.state.character.magic.ninthLevelSpells} {this.checkSpellSlotImprove('ninthLevelSpells')}</AppText>
                                    </View>
                                }
                            </View>
                            : <View>

                            </View>}
                        {this.props.options.pickFightingStyle ?
                            <View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                    <AppText color={colors.bitterSweetRed} fontSize={22}>As a level {this.props.character.level} {this.props.character.characterClass}</AppText>
                                    <AppText textAlign={'center'}>You can pick your fighting style, this choice will bring you benefits on your preferred way of combat:</AppText>
                                </View>
                                {this.props.options.pickFightingStyle.map((style: any, index: number) =>
                                    <TouchableOpacity key={index} onPress={() => { this.pickFightingStyle(style, index) }} style={[styles.longTextItem, { backgroundColor: this.state.fightingStyleClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}>
                                        <AppText fontSize={20} color={this.state.fightingStyleClicked[index] ? colors.black : colors.bitterSweetRed}>{style.name}</AppText>
                                        <AppText>{style.description}</AppText>
                                    </TouchableOpacity>)}
                            </View>
                            :
                            null}
                        {this.props.options.monkMartialArts ?
                            <View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                    <AppText color={colors.bitterSweetRed} fontSize={22}> level {this.props.character.level} {this.props.character.characterClass}</AppText>
                                    <AppText textAlign={'center'}>You now possess {this.props.options.kiPoints} Ki points.</AppText>
                                    <AppText textAlign={'center'}>Your martial arts hit die is now {this.props.options.monkMartialArts}</AppText>
                                </View>
                            </View>
                            : null}
                        {this.props.options.sneakAttackDie ?
                            <View>
                                <AppText textAlign={'center'} color={colors.bitterSweetRed} fontSize={22}> level {this.props.character.level} {this.props.character.characterClass}</AppText>
                                <AppText textAlign={'center'}>You can now roll {this.props.options.sneakAttackDie}D6 for a sneak attack.</AppText>
                            </View>
                            : null}
                        {this.props.options.metamagic ?
                            <View>
                                <AppText textAlign={'center'} color={colors.bitterSweetRed} fontSize={22}> level {this.props.character.level} {this.props.character.characterClass}</AppText>
                                <AppText textAlign={'center'}>You now gain the ability to twist your spells to suit your needs.</AppText>
                                <AppText textAlign={'center'}>You gain two of the following Metamagic options of your choice. You gain another one at 10th and 17th level.</AppText>
                                {filterAlreadyPicked(this.props.options.metamagic.value, this.state.character.charSpecials.sorcererMetamagic).map((magic: any, index: number) =>
                                    <TouchableOpacity key={index} onPress={() => { this.pickMetaMagic(magic, index) }} style={[styles.longTextItem, { backgroundColor: this.state.metamagicClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}>
                                        <AppText fontSize={20} color={this.state.metamagicClicked[index] ? colors.black : colors.bitterSweetRed}>{magic.name}</AppText>
                                        <AppText>{magic.description}</AppText>
                                    </TouchableOpacity>)}
                            </View>
                            : null}
                        {this.props.options.sorceryPoints ?
                            <AppText textAlign={'center'}>You now Possess {this.props.options.sorceryPoints} sorcery points!</AppText>
                            : null}

                        {this.props.options.eldritchInvocations ?
                            <View>
                                <AppText textAlign={'center'} color={colors.bitterSweetRed} fontSize={22}>As a level {this.props.character.level} {this.props.character.characterClass}</AppText>
                                <AppText textAlign={'center'}>You now gain the ability to use Eldritch Invocations, these are powerful abilities you will unlock throughout leveling up</AppText>
                                <AppText textAlign={'center'}>Remember that every time you level up you can choose to replace old invocations with new ones to suit your needs.</AppText>
                                <AppText textAlign={'center'} fontSize={18}>You have a total of {this.state.totalInvocationPoints} Invocations.</AppText>
                                {eldritchInvocations(this.props.character.level, this.props.character).map((invocation: any, index: number) =>
                                    <TouchableOpacity key={index} onPress={() => { this.pickEldritchInvocations(invocation, index) }} style={[styles.longTextItem, { backgroundColor: this.state.invocationsClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}>
                                        <AppText fontSize={20} color={this.state.invocationsClicked[index] ? colors.black : colors.bitterSweetRed}>{invocation.name}</AppText>
                                        <AppText>{invocation.entries}</AppText>
                                    </TouchableOpacity>)}
                            </View>
                            : null}
                        {this.props.options.pactSelector ?
                            <View style={{ padding: 15 }}>
                                <AppText textAlign={'center'} color={colors.bitterSweetRed} fontSize={22}>As a level {this.props.character.level} {this.props.character.characterClass}</AppText>
                                <AppText fontSize={17} textAlign={'center'}>You can now pick one of three pacts, these pacts will unlock powerful Eldritch Invocations at later levels</AppText>
                                <AppText fontSize={17} textAlign={'center'}>Remember, you can only choose one pact and you cannot change it.</AppText>
                                <AppText fontSize={17} textAlign={'center'}>Once you pick a pact new Eldritch Invocations will be unlocked, scroll up and see if you find something you fancy!</AppText>
                                {this.props.options.pactSelector.map((pact: any, index: number) =>
                                    <TouchableOpacity key={index} onPress={() => { this.pickWarlockPact(pact, index) }} style={[styles.longTextItem, { backgroundColor: this.state.pactClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}>
                                        <AppText fontSize={20} color={this.state.pactClicked[index] ? colors.black : colors.bitterSweetRed}>{pact.name}</AppText>
                                        <AppText>{pact.description}</AppText>
                                    </TouchableOpacity>)}
                            </View>
                            : null}
                        {this.props.options.extraSpells ?
                            <View>
                                <View style={{ justifyContent: "center", alignItems: "center", padding: 10, marginTop: 15 }}>
                                    <AppText textAlign={'center'} fontSize={22}>As a level {this.state.character.level} {this.state.character.characterClass} of the {this.state.character.path.name} {this.state.character.charSpecials.druidCircle !== "false" ? `with the ${this.state.character.charSpecials.druidCircle} attribute` : null}</AppText>
                                    <AppText color={colors.bitterSweetRed} fontSize={22}>You gain the following spells</AppText>
                                </View>
                                {this.props.options.extraSpells.map((spell: any, index: number) =>
                                    <View style={{ justifyContent: "center", alignItems: "center" }} key={`${spell.name}${index}`}>
                                        <AppText fontSize={18}>{spell}</AppText>
                                    </View>)}
                            </View>
                            : null}
                        <View style={{ paddingTop: 15, paddingBottom: 15 }}>
                            <AppButton fontSize={18} backgroundColor={colors.bitterSweetRed} borderRadius={100} width={100} height={100} title={"Ok"} onPress={() => { this.close() }} />
                        </View>
                    </View>}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    },
    magic: {
        alignItems: "center"
    },
    item: {
        width: '90%',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 15,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 25
    },
    modifier: {
        position: 'relative',
        width: Dimensions.get('screen').width / 2,
        flexWrap: "wrap",
        paddingHorizontal: 30,
        paddingVertical: 10,
        justifyContent: "space-around",
    },
    innerModifier: {
        width: 120,
        height: 120,
        backgroundColor: colors.bitterSweetRed,
        borderRadius: 120,
        justifyContent: "center"
    },
    longTextItem: {
        marginTop: 15,
        width: Dimensions.get('screen').width / 1.2,
        marginLeft: 15,
        padding: 20,
        borderRadius: 15

    }, infoContainer: {
        marginTop: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: colors.berries,
        borderRadius: 15,
        padding: 10
    }

});