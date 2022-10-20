import React, { useEffect, useState } from "react";
import { View, Text, Alert, FlatList, TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PetComponent, Pet } from "../components/pet";
import { useAppNavigation } from "../navigation";
import { useIsFocused } from "@react-navigation/native";

export function PetsList() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
    const nav = useAppNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const isFocused = useIsFocused();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [deletedPetId, setDeletedPetId] = useState(0);

    const filterByStatus = () => {
        let result = pets;
        if (selectedStatuses.length) {
            console.log(123131)
            result = pets.filter(pet => selectedStatuses.includes(pet.status));
        }
        setFilteredPets([...result])
    }

    const selectStatus = (status: ("available" | "pending" | "sold")) => {
        if (selectedStatuses.includes(status)) {
            const index = selectedStatuses.indexOf(status);
            selectedStatuses.splice(index, 1);
        } else {
            selectedStatuses.push(status);
        }
        setSelectedStatuses([...selectedStatuses]);
    }

    const fetchPets = () => {
        fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=sold', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                response.json().then(pets => {
                    setPets(pets as unknown as Pet[])
                    setFilteredPets(pets as unknown as Pet[])
                })
            })
    }

    const deletePet = (id: number) => {
        fetch(`https://petstore.swagger.io/v2/pet/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                fetchPets();
                Alert.alert("Succesfully deleted your pet!");
            })
            .catch(e => {
                console.log(e);
                Alert.alert("Error while trying to delete your pet!");
            })
    }

    const showDeleteModal = (id: number) => {
        setShowConfirmationModal(true);
        setDeletedPetId(id);
    }

    useEffect(() => {
        fetchPets();
    }, [isFocused])

    return <View>
        <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', marginLeft: 5 }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => {
                        setModalVisible(!modalVisible);
                        filterByStatus();
                    }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                width: 124, maxHeight: 112, marginTop: 85, flex: 1, justifyContent: "center",
                                marginLeft: 10, backgroundColor: "white", borderRadius: 4, alignItems: "center", shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5
                            }}>

                                <TouchableOpacity
                                    style={{ width: 90, padding: 5 }}
                                    onPress={() => {
                                        selectStatus("available");
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>Available</Text>
                                        {
                                            selectedStatuses.includes("available") &&
                                            <Icon style={{ position: "relative", left: 15 }} name="check" size={12} color={"blue"}></Icon>
                                        }
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: "100%", borderBottomWidth: 2, borderBottomColor: "lightgrey", marginBottom: 5, marginTop: 5 }}></View>
                                <TouchableOpacity
                                    style={{ width: 90, padding: 5 }}
                                    onPress={() => {
                                        selectStatus("pending");
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text >Pending</Text>
                                        {
                                            selectedStatuses.includes("pending") &&
                                            <Icon style={{ position: "relative", left: 15 }} name="check" size={12} color={"blue"}></Icon>
                                        }
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: "100%", borderBottomWidth: 2, borderBottomColor: "lightgrey", marginBottom: 5, marginTop: 5 }}></View>
                                <TouchableOpacity
                                    style={{ width: 90, padding: 5 }}
                                    onPress={() => {
                                        selectStatus("sold");
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text >Sold</Text>
                                        {
                                            selectedStatuses.includes("sold") &&
                                            <Icon style={{ position: "relative", left: 15 }} name="check" size={12} color={"blue"}></Icon>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="filter" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 15 }}
                    onPress={() => {
                        setSelectedStatuses([]);
                        selectedStatuses.length = 0;
                        filterByStatus();
                    }}>
                    <MaterialCommunityIcons name="filter-remove-outline" size={22} color="red" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginTop: 10 }}
                onPress={() => nav.navigate("AddPet")}>
                <Icon name="plus-circle" size={30} color="blue" />
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column" }}>
            <View style={{
                justifyContent: 'space-between', flexDirection: 'row', marginLeft: 5, marginRight: 5, height: 25,
                borderColor: "black", borderBottomWidth: 1
            }}>
                <Text style={{ fontWeight: "600", width: "10%", textAlign: 'center' }}>Index</Text>
                <Text style={{ fontWeight: "600", width: "35%", textAlign: 'center' }}>Name</Text>
                <Text style={{ fontWeight: "600", width: "35%", textAlign: 'center' }}>Status</Text>
                <Text style={{ fontWeight: "600", width: "20%", textAlign: 'center' }}>Actions</Text>
            </View>
            <View style={{ height: "90%" }}>
                <FlatList
                    data={filteredPets}
                    renderItem={({ item: pet, index }) => <PetComponent key={index} index={index} pet={pet} deletePet={(id) => showDeleteModal(id)} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showConfirmationModal}
                onRequestClose={() => {
                    setShowConfirmationModal(!showConfirmationModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete this pet?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    deletePet(deletedPetId);
                                    setShowConfirmationModal(!showConfirmationModal);

                                }}
                            >
                                <Text style={styles.textStyle}>Yes</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setShowConfirmationModal(!showConfirmationModal)}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    </View >
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 4,
        padding: 12,
        width: 100,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
