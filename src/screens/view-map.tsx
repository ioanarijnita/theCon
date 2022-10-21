import React, { useState } from "react";
import { View, StyleSheet, Linking, Text, TouchableOpacity, Dimensions } from "react-native";
import MapboxGL from "@rnmapbox/maps";

type AnnotationType = {
    geometry: {
        coordinates: number[],
        type: string
    },
    properties: {
        screenPointX: number,
        screenPointY: number
    },
    type: string
}

type SelectedPointType = {
    screenPointX: number,
    screenPointY: number,
    title: string,
    address: string,
    phone: string,
    website: string
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const tooRightValue = (xCoordonate: number) => {
    const changedXCoordonate = width - xCoordonate < 0.25 * width;
    if (changedXCoordonate) return xCoordonate - 0.35 * width
    else return xCoordonate;
};

const tooBottomValue = (yCoordonate: number) => {
    const changedYCoordonate = height - yCoordonate < 0.35 * height;
    if (changedYCoordonate) return yCoordonate - 0.2 * height
    else return yCoordonate;
}

export function ViewMap() {
    const coordinates = [28.04, 45.44];
    const initialScreenPoints: SelectedPointType = {
        screenPointX: -1,
        screenPointY: -1,
        address: "",
        phone: "",
        title: "",
        website: ""
    }
    const [selectedPoint, setSelectedPoint] = useState<SelectedPointType>(initialScreenPoints);

    const markers = [
        {
            key: 1,
            title: "Prietenii cu blanita",
            coordinates: [28.0447757, 45.4309202],
            address: "Strada Brăilei nr. 82, bl. BR4C, Galați 800306",
            phone: "0752111929",
            website: "https://prieteniicublanita.ro/"
        },
        {
            key: 2,
            title: "SIAVET MEDICAL GALATI",
            coordinates: [28.0102351, 45.4185139],
            address: "Strada Dr. Petru Groza nr.1N, Galați 800423",
            phone: "0745112838",
            website: "https://www.siavetmedical.ro/"
        },
        {
            key: 3,
            title: "Galati Veterinary - Dr. Comşa Marian",
            coordinates: [28.0530095, 45.4310003],
            address: "Aleea Domnească, Galați 827100",
            phone: "0743616327",
            website: "https://www.comsavet.ro/"
        }
    ];

    return <View style={styles.page}>
        <View style={styles.container}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPressIn={() => setSelectedPoint(initialScreenPoints)}
            >
                <MapboxGL.MapView style={styles.map} zoomEnabled onPress={e => console.log(e)} >
                    <MapboxGL.Camera centerCoordinate={coordinates} zoomLevel={12} />
                    {markers.map((marker) => (
                        <View style={{}} key={marker.key}>
                            <MapboxGL.PointAnnotation
                                id={marker.title}
                                onSelected={(e: AnnotationType) => {
                                    setSelectedPoint({
                                        screenPointX: e.properties.screenPointX, screenPointY: e.properties.screenPointY,
                                        address: marker.address, phone: marker.phone, title: marker.title, website: marker.website
                                    })
                                    console.log(e)
                                }}
                                coordinate={marker.coordinates}
                                style={{ backgroundColor: "red" }}
                            />
                        </View>
                    ))}
                </MapboxGL.MapView>
                {selectedPoint.screenPointX > 0 &&
                    <View style={{
                        position: 'absolute', left: tooRightValue(selectedPoint.screenPointX), top: tooBottomValue(selectedPoint.screenPointY),
                        width: 180, height: 120, backgroundColor: "#EBF5FB", borderRadius: 4, opacity: 0.8
                    }}>
                        <View style={{ marginLeft: 8 }}>
                            <Text style={{ fontSize: 13, marginTop: 4 }}>{selectedPoint.title}</Text>
                            <Text style={{ fontSize: 13, marginTop: 4 }}>{selectedPoint.address}</Text>
                            <Text style={{ fontSize: 13, marginTop: 4 }}>{selectedPoint.phone}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(selectedPoint.website)}>
                                <Text style={{ fontSize: 13, marginTop: 4, textDecorationLine: "underline" }}>{selectedPoint.website}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    container: {
        height: "100%",
        width: "100%",
    },
    map: {
        flex: 1
    }
});
