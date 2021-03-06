import React, { Component } from 'react';
import { Dimensions, Modal, View } from 'react-native';
import { AppTextHeadline } from '../components/AppTextHeadline';
import { AnimatedLogo } from '../animations/AnimatedLogo';
import { AnimateContactUpwards } from '../animations/AnimateContactUpwards';
import * as Yup from 'yup';
import { AppFormField } from '../components/forms/AppFormField';
import { SubmitButton } from '../components/forms/SubmitButton';
import { AppForm } from '../components/forms/AppForm';
import authApi from '../api/authApi';
import { Unsubscribe } from 'redux';
import { store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import errorHandler from '../../utility/errorHander';
import reduxToken from '../auth/reduxToken';
import AuthContext from '../auth/context';
import { AppButton } from '../components/AppButton';
import colors from '../config/colors';
import { AppText } from '../components/AppText';
import { AppTextInput } from '../components/forms/AppTextInput';
import { AppActivityIndicator } from '../components/AppActivityIndicator';

interface LoginState {
    loading: boolean,
    error: boolean,
    forgotPasswordModel: boolean,
    resetPassEmail: string
}

const ValidationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().label("Password")
})

export class Login extends Component<{ props: any, navigation: any }, LoginState>{
    static contextType = AuthContext;
    private UnsubscribeStore: Unsubscribe;
    constructor(props: any) {
        super(props)
        this.state = {
            resetPassEmail: '',
            forgotPasswordModel: false,
            loading: false,
            error: false
        }
        this.UnsubscribeStore = store.subscribe(() => {
            store.getState().user
        })

    }


    login = async (values: any) => {
        const newValues = {
            username: values.username.toLowerCase(),
            password: values.password
        }
        this.setState({ loading: true })
        await authApi.login(newValues).then(result => {
            const userInfo: any = result.data.token;
            reduxToken.setToken(userInfo).then(validToken => {
                const { user, setUser } = this.context
                setUser(validToken);
                store.dispatch({ type: ActionType.SetUserInfoLoginRegister, payload: validToken })
                this.setState({ loading: false })
            })
        }).catch(err => {
            this.setState({ loading: false })
            errorHandler(err.request)
        })

    }
    componentWillUnmount() {
        this.UnsubscribeStore()
    }

    sendEmail = async () => {
        if (this.state.resetPassEmail.length === 0) {
            alert('Please Fill Your registered Email');
            return;
        }
        this.setState({ loading: true })
        await authApi.sendResetEmail(this.state.resetPassEmail).then(confirmation => {
            this.setState({ loading: false, forgotPasswordModel: false })
            if (confirmation.data.message === 'Email Has been sent In order to reset password.') {
                alert('Email Has been sent In order to reset password.');
                this.props.navigation.navigate("ResetPassword")
            }
        }).catch(err => {
            this.setState({ loading: false })
            errorHandler(err.request)
        });

    }
    render() {
        return (
            <View style={{ marginTop: 35 }}>
                {this.state.loading ? <AppActivityIndicator visible={this.state.loading} /> :
                    <AnimateContactUpwards>
                        <AnimatedLogo />
                        <AppTextHeadline>Login</AppTextHeadline>
                        <AppForm
                            initialValues={{ username: '', password: '' }}
                            onSubmit={(values: any) => this.login(values)}
                            validationSchema={ValidationSchema}>
                            <View style={{ marginBottom: 40, justifyContent: "center", alignItems: "center" }}>
                                <AppFormField
                                    width={Dimensions.get('screen').width / 1.2}
                                    fieldName={"username"}
                                    iconName={"text-short"}
                                    placeholder={"username..."} />
                                <AppFormField
                                    width={Dimensions.get('screen').width / 1.2}
                                    secureTextEntry
                                    fieldName={"password"}
                                    iconName={"lock-outline"}
                                    placeholder={"password..."} />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                <AppButton onPress={() => { this.setState({ forgotPasswordModel: true }) }} width={100} height={100} borderRadius={100} fontSize={18} marginBottom={1}
                                    color={colors.black} backgroundColor={colors.bitterSweetRed} title={"Forgot   Password?"} />
                                <SubmitButton title={"Login"} marginBottom={1} />
                            </View>
                        </AppForm>
                        <Modal visible={this.state.forgotPasswordModel}>
                            <View style={{ paddingTop: 150 }}>
                                <View style={{ padding: 20 }}>
                                    <AppText textAlign={'center'} fontSize={18}>Please Enter your email below in order to reset your password</AppText>
                                </View>
                                <AppTextInput placeholder={'Email...'} onChangeText={(text: string) => { this.setState({ resetPassEmail: text }) }} />
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                    <View>
                                        <AppButton onPress={() => { this.sendEmail() }} width={100} height={100} borderRadius={100} fontSize={20}
                                            color={colors.black} backgroundColor={colors.bitterSweetRed} title={"Send Email"} />
                                    </View>
                                    <View>
                                        <AppButton onPress={() => { this.setState({ forgotPasswordModel: false }) }} width={100} height={100} borderRadius={100} fontSize={20}
                                            color={colors.black} backgroundColor={colors.bitterSweetRed} title={"Cancel"} />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </AnimateContactUpwards>}
            </View>
        )
    }
}

