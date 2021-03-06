import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import errorHandler from '../../utility/errorHander';
import { extraPathChoiceNumbers } from '../../utility/extraPathChoiceNumbers';
import userCharApi from '../api/userCharApi';
import colors from '../config/colors';
import { CharacterModel } from '../models/characterModel';
import { store } from '../redux/store';
import { AppActivityIndicator } from './AppActivityIndicator';
import { AppSkillItemPicker } from './AppSkillItemPicker';
import { AppText } from './AppText';

interface AppExtraPathChoicePickerState {
}

export class AppExtraPathChoicePicker extends Component<{
    character: CharacterModel,
    item: any, extraPathChoiceClicked: any, applyExtraPathChoice: any, isExtraChoice: any
    isAdditionalSkillChoice: any, loadSkills: any, resetExpertiseSkills: any
}, AppExtraPathChoicePickerState>{
    constructor(props: any) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

        this.props.isExtraChoice(true)
        this.setState({ loading: false })
    }
    componentWillUnmount() {
        this.props.isExtraChoice(false)
    }



    render() {
        return (
            <View style={styles.container}>
                {this.props.item.choice.map((item: any, index: number) =>
                    <View key={item.name}>
                        <TouchableOpacity style={[styles.item, { backgroundColor: this.props.extraPathChoiceClicked[index] ? colors.bitterSweetRed : colors.lightGray }]}
                            onPress={() => { this.props.applyExtraPathChoice(item, index) }}>
                            <AppText color={colors.black} fontSize={18} textAlign={'center'}>{item.name}</AppText>
                            <AppText color={colors.black} fontSize={15} textAlign={'center'}>{item.description}</AppText>
                        </TouchableOpacity>
                        {item.skillList && this.props.extraPathChoiceClicked[index] &&
                            <AppSkillItemPicker skillsStartAsExpertise={this.props.item.skillsStartAsExpertise} resetExpertiseSkills={(val: any) => { this.props.resetExpertiseSkills(val) }} character={this.props.character}
                                setAdditionalSkillPicks={(val: boolean) => { this.props.isAdditionalSkillChoice(val) }} sendSkillsBack={(val: any) => { this.props.loadSkills(val) }}
                                itemList={item.skillList} amount={item.skillPickNumber} />}
                    </View>)}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

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
});