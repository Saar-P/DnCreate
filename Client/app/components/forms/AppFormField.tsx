import React, { Component, useEffect } from 'react';
import { View } from 'react-native';
import { AppTextInput } from './AppTextInput';
import { ErrorMessage } from './ErrorMessage';
import { useFormikContext } from 'formik';
import { onChange } from 'react-native-reanimated';
import { IconGen } from '../IconGen';
import colors from '../../config/colors';

/**
 * 
 * @param  iconName: string 
 * @param  fieldName: string 
 * @param  InputParams 
 *   
 */

export function AppFormField({ ...props }: any) {
    const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

    return (
        <View style={{ flexDirection: 'row', position: "relative", width: props.externalWidth ? props.externalWidth : null }}>
            <View style={{ width: props.internalWidth ? props.internalWidth : null }}>
                <AppTextInput
                    {...props}
                    onBlur={() => setFieldTouched(props.fieldName)}
                    onChangeText={handleChange(props.fieldName)} />
                <ErrorMessage visible={touched[props.fieldName]} error={errors[props.fieldName]} />
            </View>
            {touched[props.fieldName] &&
                <View style={{ position: "absolute", right: 15 }}>
                    <IconGen iconColor={!errors[props.fieldName] ? colors.paleGreen : colors.danger} size={70}
                        name={!errors[props.fieldName] ? "check" : "close"} />
                </View>
            }
        </View>
    )
}
