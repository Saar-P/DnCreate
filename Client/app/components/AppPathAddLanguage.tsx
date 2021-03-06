import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { AppTextInput } from './forms/AppTextInput';

interface AppPathAddLanguageState {
    languageToAdd: string[]
}

export class AppPathAddLanguage extends Component<{ loadLanguage: any, amountOfLanguages: [], languagesToPick: any }, AppPathAddLanguageState> {
    constructor(props: any) {
        super(props)
        this.state = {
            languageToAdd: this.props.amountOfLanguages
        }
    }
    componentDidMount() {
        this.props.languagesToPick(true)
    }
    componentWillUnmount() {
        this.props.languagesToPick(false)
    }

    setLang = (text: string, index: number) => {
        const languageToAdd = this.state.languageToAdd;
        languageToAdd[index] = text;
        this.setState({ languageToAdd }, () => {
            this.props.loadLanguage(this.state.languageToAdd)
            for (let item of languageToAdd) {
                if (item === '') {
                    this.props.languagesToPick(true)
                    return;
                }
            }
            this.props.languagesToPick(false)
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <AppText fontSize={20} textAlign={"center"}>Input your languages, you can use official languages or the languages that fir the world of your adventure.</AppText>
                {this.props.amountOfLanguages.map((item: string, index: number) =>
                    <View key={index} >
                        <AppTextInput width={250} placeholder={`language ${index + 1} ...`} iconName={"podium-gold"} onChangeText={(text: string) => { this.setLang(text, index) }} />
                    </View>)}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});