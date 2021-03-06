import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { extraPathChoiceNumbers } from '../../utility/extraPathChoiceNumbers';
import colors from '../config/colors';
import { CharacterModel } from '../models/characterModel';
import { store } from '../redux/store';
import { AppText } from './AppText';

interface AppManeuverPickerState {
    beforeChangeChar: CharacterModel,
    loading: boolean
    ManeuverClicked: boolean[]
    pickedManeuvers: any[]
    extraManeuverChange: boolean
}


export class AppManeuverPicker extends Component<{
    character: CharacterModel,
    item: any, loadManeuvers: any, pathChosen: any, maneuversToPick: any
}, AppManeuverPickerState>{
    constructor(props: any) {
        super(props)
        this.state = {
            beforeChangeChar: new CharacterModel(),
            extraManeuverChange: false,
            pickedManeuvers: [],
            ManeuverClicked: [],
            loading: true
        }
    }

    getFromStorage = async () => {
        const beforeChangeCharString = await AsyncStorage.getItem(`current${this.props.character._id}level${this.props.character.level - 1}`)
        this.setState({ beforeChangeChar: JSON.parse(beforeChangeCharString) })
    }

    componentDidMount() {
        this.getFromStorage().then(() => {
            this.setState({ pickedManeuvers: store.getState().character.charSpecials.battleMasterManeuvers })
            this.props.item.forEach((item: any, index: number) => this.state.beforeChangeChar.charSpecials.battleMasterManeuvers.forEach(val => {
                if (item.name === val.name) {
                    this.state.ManeuverClicked[index] = true
                }
            }))
            this.props.maneuversToPick(true)
            this.setState({ loading: false })
        })
    }
    componentWillUnmount() {
        this.props.maneuversToPick(false)
    }




    setManeuvers = (item: any, index: number) => {
        for (let unit of this.state.beforeChangeChar.charSpecials.battleMasterManeuvers) {
            if (unit.name === item.name && this.state.beforeChangeChar.level > 3 && this.state.ManeuverClicked[index]) {
                if (this.state.extraManeuverChange) {
                    alert('You can only change one Maneuver you previously picked');
                    return;
                }
                let pickedManeuvers = this.state.pickedManeuvers;
                const ManeuverClicked = this.state.ManeuverClicked;
                ManeuverClicked[index] = false;
                pickedManeuvers = pickedManeuvers.filter((val: any) => item.name !== val.name);
                this.setState({ pickedManeuvers, extraManeuverChange: true }, () => {
                    this.props.loadManeuvers(this.state.pickedManeuvers)
                })
                this.props.maneuversToPick(true)
                return;
            }
            if (unit.name === item.name && this.state.beforeChangeChar.level > 3 && !this.state.ManeuverClicked[index]) {
                if (this.state.pickedManeuvers.length === this.state.beforeChangeChar.charSpecials.battleMasterManeuvers.length + extraPathChoiceNumbers(this.props.character, this.props.character.level)) {
                    alert(`You have ${this.state.beforeChangeChar.charSpecials.battleMasterManeuvers.length + extraPathChoiceNumbers(this.props.character, this.props.character.level)} maneuvers to pick`)
                    return;
                }
                let pickedManeuvers = this.state.pickedManeuvers;
                const ManeuverClicked = this.state.ManeuverClicked;
                ManeuverClicked[index] = true;
                pickedManeuvers.push(item);
                this.setState({ pickedManeuvers, extraManeuverChange: false }, () => {
                    this.props.loadManeuvers(this.state.pickedManeuvers)
                    if (this.state.pickedManeuvers.length === this.state.beforeChangeChar.charSpecials.battleMasterManeuvers.length + extraPathChoiceNumbers(this.props.character, this.props.character.level)) {
                        this.props.maneuversToPick(false)
                    }
                })
                return;
            }
        }
        if (!this.state.ManeuverClicked[index]) {
            if (this.state.pickedManeuvers.length === this.state.beforeChangeChar.charSpecials.battleMasterManeuvers.length + extraPathChoiceNumbers(this.props.character, this.props.character.level)) {
                alert(`You have ${this.state.beforeChangeChar.charSpecials.battleMasterManeuvers.length + extraPathChoiceNumbers(this.props.character, this.props.character.level)} maneuvers to pick`)
                return;
            }
            const pickedManeuvers = this.state.pickedManeuvers;
            const ManeuverClicked = this.state.ManeuverClicked;
            ManeuverClicked[index] = true;
            pickedManeuvers.push(item);
            this.setState({ pickedManeuvers }, () => {
                this.props.loadManeuvers(this.state.pickedManeuvers)
                if (this.state.pickedManeuvers.length === this.state.beforeChangeChar.charSpecials.battleMasterManeuvers.length + extraPathChoiceNumbers(this.props.character, this.props.character.level)) {
                    this.props.maneuversToPick(false)
                }
            })
        }
        else if (this.state.ManeuverClicked[index]) {
            let pickedManeuvers = this.state.pickedManeuvers;
            const ManeuverClicked = this.state.ManeuverClicked;
            ManeuverClicked[index] = false;
            pickedManeuvers = pickedManeuvers.filter((val: any) => item.name !== val.name);
            this.setState({ pickedManeuvers }, () => {
                this.props.loadManeuvers(this.state.pickedManeuvers)
            })
            this.props.maneuversToPick(true)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.item.map((item: any, index: number) =>
                    <View key={item.name}>
                        <TouchableOpacity style={[styles.item, { backgroundColor: this.state.ManeuverClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}
                            onPress={() => { this.setManeuvers(item, index) }}>
                            <AppText color={colors.black} fontSize={18} textAlign={'center'}>{item.name}</AppText>
                            <AppText color={colors.black} fontSize={15} textAlign={'center'}>{item.description.replace(/\. /g, '.\n\n').replace(/\: /g, ':\n')}</AppText>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }, item: {
        width: '90%',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 15,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 25
    },
});