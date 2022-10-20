import React from 'react';
import { View } from 'react-native';
import { CustomizablePetComponent } from '../components/customizable-pet';

export function AddPet() {
    return <View>
        <CustomizablePetComponent type="Add"></CustomizablePetComponent>
    </View>
}
