import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppButton } from '../../components/AppButton';
import { CharacterModel } from '../../models/characterModel';
import { store } from '../../redux/store';
import dragonAncestry from '../../../jsonDump/dragonAncestry.json'
import { AppText } from '../../components/AppText';
import colors from '../../config/colors';
import { ActionType } from '../../redux/action-type';
import { AppConfirmation } from '../../components/AppConfirmation';
import { AppTextInput } from '../../components/forms/AppTextInput';
import { RaceModel } from '../../models/raceModel';

interface SpacialRaceBonusesState {
    character: CharacterModel
    choice: any
    itemClicked: boolean[],
    itemPicked: any[]
    amountToPick: number
    confirmed: boolean
    extraLanguages: string[]
    extraLanguagesNumber: number
    race: RaceModel
}

export class SpacialRaceBonuses extends Component<{ navigation: any, route: any }, SpacialRaceBonusesState>{
    navigationSubscription: any;
    constructor(props: any) {
        super(props)
        this.state = {
            extraLanguages: [],
            confirmed: false,
            amountToPick: null,
            itemClicked: [],
            itemPicked: [],
            choice: null,
            character: store.getState().character,
            extraLanguagesNumber: null,
            race: this.props.route.params.race
        }
        this.navigationSubscription = this.props.navigation.addListener('focus', this.onFocus);
    }

    onFocus = () => {
        const character = { ...this.state.character };
        character.languages = [];
        character.skills = [];
        character.addedWeaponProf = [];
        character.tools = [];
        this.setState({ character }, () => {
            store.dispatch({ type: ActionType.SetInfoToChar, payload: this.state.character })
        })
    }

    componentDidMount() {
        const character = { ...this.state.character };
        character.languages = [];
        character.skills = [];
        character.addedWeaponProf = [];
        character.tools = [];
        if (this.state.character.race === "DragonBorn") {
            this.setState({ amountToPick: 1 })
        }
        if (this.state.character.race === "Human") {
            this.setState({ extraLanguagesNumber: 1 })
        }
        if (this.state.character.race === "Dwarf") {
            this.setState({ amountToPick: 1 })
        }
        if (this.state.character.race === "Kenku") {
            this.setState({ amountToPick: 2 })
        }
        if (this.state.character.race === "Half Elf") {
            this.setState({ extraLanguagesNumber: 1 })
        }
        if (this.state.character.race === "Changeling") {
            this.setState({ extraLanguagesNumber: 2, amountToPick: 2 })
        }
        this.setState({ character })
    }

    pickItem = (item: any, index: number) => {
        if (!this.state.itemClicked[index]) {
            if (this.state.amountToPick === this.state.itemPicked.length) {
                alert(`You can only pick ${this.state.amountToPick}`)
                return
            }
            const itemPicked = this.state.itemPicked;
            const itemClicked = this.state.itemClicked;
            itemClicked[index] = true;
            itemPicked.push(item)
            this.setState({ itemClicked, itemPicked });
        }
        else if (this.state.itemClicked[index]) {
            const oldPickedItems = this.state.itemPicked;
            const itemClicked = this.state.itemClicked;
            itemClicked[index] = false;
            if (this.state.character.race === "Changeling") {
                const itemPicked = oldPickedItems.filter(skill => skill[0] !== item[0]);
                this.setState({ itemClicked, itemPicked });
                return
            }
            const itemPicked = oldPickedItems.filter(item => item.name !== item.name);
            this.setState({ itemClicked, itemPicked });
        }
    }

    insertInfoAndContinue = () => {
        const character = { ...this.state.character };
        if (this.state.character.race === "Changeling") {
            character.languages.push("Common")
        }
        if (this.state.character.race === "Goblin") {
            character.languages.push("Common", "Goblin")
        }
        if (this.state.character.race === "Kenku") {
            character.languages.push("Common", "Auran")
        }
        if (this.state.character.race === "DragonBorn") {
            if (this.state.amountToPick > this.state.itemPicked.length) {
                alert('Must pick ancestry')
                return
            }
            character.charSpecials.dragonBornAncestry = this.state.itemPicked[0];
            character.languages.push("Common", "Draconic")
        }
        if (this.state.character.race === "Human") {
            if (this.state.extraLanguagesNumber > this.state.extraLanguages.length) {
                alert('You have another language to add')
                return
            }
            character.languages.push("Common")
        }
        if (this.state.character.race === "Dwarf") {
            if (this.state.amountToPick > this.state.itemPicked.length) {
                alert('Must pick tool proficiency')
                return
            }
            character.addedWeaponProf.push("battleaxe", "handaxe", "light hammer", "warhammer")
            character.languages.push("Common", "Dwarvish")
            character.tools.push([this.state.itemPicked[0], 0])
        }
        if (this.state.character.race === "Elf") {
            character.skills.push(["Perception", 0])
            character.languages.push("Common", "Elven")
        }
        if (this.state.character.race === "Half Orc") {
            character.skills.push(["Intimidation", 0])
            character.languages.push("Common", "Orc")
        }
        if (this.state.character.race === "Gnome") {
            character.languages.push("Common", "Gnomish")
        }
        if (this.state.character.race === "Half Elf") {
            if (this.state.extraLanguagesNumber > this.state.extraLanguages.length) {
                alert('You have another language to add')
                return
            }
            character.languages.push("Common,Elven")
        }
        if (this.state.character.race === "Halfling") {
            character.languages.push("Common", "Halfling")
        }
        if (this.state.character.race === "Tiefling") {
            character.languages.push("Common", "Infernal")
        }
        for (let item of this.state.extraLanguages) {
            character.languages.push(item)
        }
        this.setState({ character, confirmed: true }, () => {
            store.dispatch({ type: ActionType.SetInfoToChar, payload: this.state.character })
            setTimeout(() => {
                this.props.navigation.navigate("NewCharInfo", { race: this.state.race });
            }, 800);
            setTimeout(() => {
                this.setState({ confirmed: false })
            }, 1100);
        })
    }


    render() {
        const dwarfTools = ["Smith's tools", "Brewer's supplies", "Mason's tools"];
        const kenkuSkills = [["Acrobatics", 0], ["Deception", 0], ["Stealth", 0], ["Sleight of Hand", 0]]
        return (
            <ScrollView style={styles.container}>
                {this.state.confirmed ? <AppConfirmation visible={this.state.confirmed} /> :
                    <View>
                        <View style={{ padding: 15 }}>
                            <AppText textAlign={'center'} fontSize={22}>As a {this.state.character.race} you get the following features.</AppText>
                        </View>
                        <View style={styles.featureItem}>
                            <AppText fontSize={20} padding={10} color={colors.black} textAlign={'left'}>Age:</AppText>
                            <AppText fontSize={18} padding={5} color={colors.berries} textAlign={'center'}>{this.state.race.raceAbilities.age}</AppText>
                            <AppText fontSize={20} padding={10} color={colors.black} textAlign={'left'}>Alignment:</AppText>
                            <AppText fontSize={18} padding={5} color={colors.berries} textAlign={'center'}>{this.state.race.raceAbilities.alignment}</AppText>
                            <AppText fontSize={20} padding={10} color={colors.black} textAlign={'left'}>Languages:</AppText>
                            <AppText fontSize={18} padding={5} color={colors.berries} textAlign={'center'}>{this.state.race.raceAbilities.languages}</AppText>
                            <AppText fontSize={20} padding={10} color={colors.black} textAlign={'left'}>Size:</AppText>
                            <AppText fontSize={18} padding={5} color={colors.berries} textAlign={'center'}>{this.state.race.raceAbilities.size}</AppText>
                            <AppText fontSize={18} padding={10} color={colors.berries} textAlign={'center'}>Speed: {this.state.race.raceAbilities.speed}ft</AppText>
                        </View>
                        {this.state.race.raceAbilities?.uniqueAbilities &&
                            Object.values(this.state.race.raceAbilities.uniqueAbilities)
                                .map((item, index) => <View key={index} style={styles.featureItem}>
                                    <AppText fontSize={22}>{item.name}</AppText>
                                    <AppText fontSize={17}>{item.description.replace(/\. /g, '.\n\n')}</AppText>
                                </View>)}

                        {this.state.character.race === "Changeling" &&
                            <View style={{ padding: 15 }}>
                                <AppText textAlign={'center'} fontSize={18}>As a Changeling you can read speak and write Common.</AppText>
                            </View>
                        }
                        {this.state.character.race === "Kenku" &&
                            <View style={{ padding: 15 }}>
                                <AppText textAlign={'center'} fontSize={18}>As a Kenku You can read and write Common and Auran, but you can speak only by using your Mimicry trait.</AppText>
                                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}>
                                    {kenkuSkills.map((item, index) =>
                                        <TouchableOpacity key={index} style={[styles.item, { backgroundColor: this.state.itemClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}
                                            onPress={() => this.pickItem(item, index)}>
                                            <AppText textAlign={'center'} fontSize={18}>{item}</AppText>
                                        </TouchableOpacity>)}
                                </View>
                            </View>
                        }
                        {this.state.character.race === "DragonBorn" &&
                            <View>
                                <View style={{ padding: 15 }}>
                                    <AppText textAlign={'center'} fontSize={18}>As a DragonBorn you gain damage resistance to the damage type associated with your ancestry.</AppText>
                                    <AppText textAlign={'center'} fontSize={18}>You also read speak and write Draconic</AppText>
                                </View>
                                <AppText textAlign={'center'} fontSize={18}>Pick your Draconic ancestry</AppText>
                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                    {dragonAncestry.ancestry.map((ancestry, index) =>
                                        <TouchableOpacity key={index} style={[styles.largeItem, { backgroundColor: this.state.itemClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}
                                            onPress={() => this.pickItem(ancestry, index)}>
                                            <AppText textAlign={'center'} fontSize={18}>Dragon color: {ancestry.color}</AppText>
                                            <AppText textAlign={'center'} fontSize={18}>Damage type: {ancestry.damageType}</AppText>
                                            <AppText textAlign={'center'} fontSize={18}>Breath Attack: {ancestry.breath}</AppText>
                                        </TouchableOpacity>)}
                                </View>
                            </View>
                        }
                        {this.state.character.race === "Human" &&
                            <View style={{ padding: 15 }}>
                                <AppText textAlign={'center'} fontSize={18}>As a Human you can read speak and write Common and another extra language of your choice.</AppText>
                                <AppTextInput placeholder={"Language..."} onChangeText={(txt: string) => {
                                    const extraLanguages = this.state.extraLanguages;
                                    extraLanguages[0] = txt;
                                    this.setState({ extraLanguages })
                                }} />
                            </View>
                        }
                        {this.state.character.race === "Dwarf" &&
                            <View>
                                <View style={{ padding: 15 }}>
                                    <AppText textAlign={'center'} fontSize={22}>You also get to pick one tool to get proficiency with</AppText>
                                </View>
                                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}>
                                    {dwarfTools.map((item, index) =>
                                        <TouchableOpacity key={index} style={[styles.item, { backgroundColor: this.state.itemClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}
                                            onPress={() => this.pickItem(item, index)}>
                                            <AppText textAlign={'center'} fontSize={18}>{item}</AppText>
                                        </TouchableOpacity>)}
                                </View>
                            </View>
                        }
                        {this.state.character.race === "Half Elf" &&
                            <View style={{ padding: 15 }}>
                                <AppText textAlign={'center'} fontSize={18}>As a Half Elf you can read speak and write Common, Elven and another extra language of your choice.</AppText>
                                <AppTextInput placeholder={"Language..."} onChangeText={(txt: string) => {
                                    const extraLanguages = this.state.extraLanguages;
                                    extraLanguages[0] = txt;
                                    this.setState({ extraLanguages })
                                }} />
                            </View>
                        }
                        <View style={{ paddingBottom: 25 }}>
                            <AppButton fontSize={18} backgroundColor={colors.bitterSweetRed} borderRadius={100} width={100} height={100} title={"Continue"} onPress={() => { this.insertInfoAndContinue() }} />
                        </View>
                    </View>
                }
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    },
    largeItem: {
        width: 170,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        margin: 5,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 25
    },
    item: {
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        margin: 5,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 25
    },
    featureItem: {
        padding: 15,
        margin: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.berries,
        backgroundColor: colors.pinkishSilver
    }
});