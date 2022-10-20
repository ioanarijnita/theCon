import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useAppNavigation } from "../navigation";


export interface Pet {
    id: number,
    category: {
        id: number,
        name: string
    },
    name: string,
    photoUrls: string[],
    tags: [{
        id: number,
        name: string
    }],
    status: string
}

export function PetComponent(p: { index: number, pet: Pet, deletePet: (id: number) => void }) {
    const nav = useAppNavigation();

    return <View style={{
        justifyContent: 'space-between', flexDirection: 'row', marginLeft: 5, marginRight: 5, height: 100,
        borderColor: "lightgray", borderBottomWidth: 2, alignItems: 'center'
    }}>
        <Text style={{ width: "10%", textAlign: "center" }}>{p.index + 1}</Text>
        <Text style={{ width: "35%", textAlign: "center" }}>{p.pet.name}</Text>
        <Text style={{ width: "35%", textAlign: "center" }}>{p.pet.status}</Text>
        <View style={{ width: "20%", height: "100%", justifyContent: 'space-around', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { nav.navigate("ViewPet", { id: p.pet.id }) }}>
                <Icon name="eye" size={18} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { nav.navigate("EditPet", { id: p.pet.id }) }}>
                <Icon name="edit" size={18} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                p.deletePet(p.pet.id);
            }}>
                <Icon name="trash-2" size={18} />
            </TouchableOpacity>
        </View>

    </View>
}
