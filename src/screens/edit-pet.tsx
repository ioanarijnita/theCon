import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CustomizablePetComponent } from '../components/customizable-pet';
import { Pet } from '../components/pet';

export function EditPet() {
    const route = useRoute();
    const [pet, setPet] = useState<Pet>();
    const id = (route.params as { id: string }).id;

    useEffect(() => {
        fetch(`https://petstore.swagger.io/v2/pet/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                response.json().then(pet => {
                    setPet(pet as unknown as Pet)
                })
            })
    }, [])

    return <View>
        <CustomizablePetComponent type="Edit" pet={pet}></CustomizablePetComponent>
    </View>
}
