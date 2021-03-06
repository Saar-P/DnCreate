import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { CharacterModel } from '../models/characterModel';
import spellsJSON from '../../jsonDump/spells.json'
import { spellLevelChanger } from '../screens/charOptions/helperFunctions/SpellLevelChanger';
import { AppText } from './AppText';
import colors from '../config/colors';


interface AppPathAddSpellsListState {
    character: CharacterModel
}
export class AppPathAddSpellsList extends Component<{ loadSpells: any, path: string, character: CharacterModel, spellList: any[] }, AppPathAddSpellsListState>{
    constructor(props: any) {
        super(props)
        this.state = {
            character: this.props.character
        }
    }
    componentDidMount() {
        const character = { ...this.state.character };
        for (let item of this.props.spellList) {
            const spell = spellsJSON.find((spell: any) => spell.name === item)
            const spellLevel = spellLevelChanger(spell.level)
            character.spells[spellLevel].push({ spell: spell, removable: false });
        }
        this.setState({ character })
    }
    render() {
        return (
            <View style={styles.container}>
                <AppText textAlign={'center'} color={colors.bitterSweetRed} fontSize={20}>As a {this.props.path} {this.props.character.characterClass} You gain the following spells.</AppText>
                {this.props.spellList.map((spell, index) =>
                    <View key={index} style={{ backgroundColor: colors.pinkishSilver, borderColor: colors.berries, borderWidth: 1, borderRadius: 15, padding: 10, margin: 5 }}>
                        <AppText textAlign={'center'} fontSize={18}>{spell}</AppText>
                    </View>)}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});