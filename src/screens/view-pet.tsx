import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { Pet } from '../components/pet';
import Carousel from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

export function ViewPet() {
    const route = useRoute();
    const [pet, setPet] = useState<Pet>();
    const id = (route.params as { id: string }).id;
    const isCarousel = React.useRef(null)

    const CarouselCardItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <View style={styles.container} key={index}>
                <Image
                    source={{ uri: item.imgUrl }}
                    style={styles.image}
                />
            </View>
        )
    }

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

    return <View style={{ flex: 1, flexDirection: "column", backgroundColor: "green", }}>
        <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 20 }}>Your pet</Text>
        <Text>Your pet id: {pet?.id}</Text>
        <Text>Your pet category id: {pet?.category.id}</Text>
        <Text>Your pet category: {pet?.category.name ? pet.category.name : "Your pet has no category selected"}</Text>
        <Text>Your pet tags: {pet?.tags[0].id}</Text>
        <Text>Your pet tags: {pet?.tags[0].name}</Text>
        <Text>Your pet photos' urls : {pet?.photoUrls[0]}</Text>
        {pet?.photoUrls[1] && <Text>Your pet photos' urls : {pet?.photoUrls[1]}</Text>}
        {pet?.photoUrls[2] && <Text>Your pet photos' urls : {pet?.photoUrls[2]}</Text>}
        <Text>Your pet status: {pet?.status}</Text>
        <View style={{ alignSelf: "center", marginTop: 40 }}>
            <Carousel
                layout="default"
                vertical={false}
                layoutCardOffset={9}
                ref={isCarousel}
                data={pet?.photoUrls.filter(photoUrl => photoUrl !== "").map(photoUrl => { return { imgUrl: photoUrl } })!}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                useScrollView={true}
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: ITEM_WIDTH,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    image: {
        width: ITEM_WIDTH,
        height: 300,
    }
})
