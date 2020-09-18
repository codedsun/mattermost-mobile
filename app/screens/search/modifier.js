// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableHighlight, View} from 'react-native';

import {paddingHorizontal as padding} from 'app/components/safe_area_view/iphone_x_spacing';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

export const MODIFIER_LABEL_HEIGHT = 58;

export default class Modifier extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        setModifierValue: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
        isLandscape: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        isLandscape: false,
    };

    handlePress = () => {
        const {item, setModifierValue} = this.props;

        setModifierValue(item.value);
    };

    render() {
        const {item, theme, isLandscape} = this.props;
        const style = getStyleFromTheme(theme);

        return (
            <TouchableHighlight
                key={item.modifier}
                underlayColor={changeOpacity(theme.sidebarTextHoverBg, 0.5)}
                onPress={this.handlePress}
            >
                <View style={style.modifierItemContainer}>
                    <View style={[style.modifierItemWrapper, padding(isLandscape)]}>
                        <View style={style.modifierItemLabelContainer}>
                            <View style={style.modifierLabelValueContainer}>
                                <Text
                                    style={style.modifierLabelValue}
                                >
                                    {item.value.toUpperCase()}
                                </Text>
                            </View>
                            <Text
                                style={style.modifierItemLabel}
                            >
                                {item.modifier}
                            </Text>
                        </View>
                        <Text style={style.modifierItemDescription}>
                            {item.description}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const getStyleFromTheme = makeStyleSheetFromTheme((theme) => {
    return {
        modifierItemContainer: {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            height: MODIFIER_LABEL_HEIGHT,
        },
        modifierItemWrapper: {
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 16,
        },
        modifierItemLabelContainer: {
            alignItems: 'center',
            flexDirection: 'row',
        },
        modifierLabelValueContainer: {
            alignItems: 'center',
            marginRight: 5,
            backgroundColor: 'rgba(61, 60, 64, 0.08)',
            borderRadius: 4,
            padding: 4,
        },
        modifierLabelValue: {
            fontSize: 10,

            // color: changeOpacity(theme.centerChannelColor, 0.5),
        },
        modifierItemLabel: {
            fontSize: 14,
            color: theme.centerChannelColor,
        },
        modifierItemDescription: {
            fontSize: 12,
            color: changeOpacity(theme.centerChannelColor, 0.5),
            marginTop: 5,
        },
    };
});
