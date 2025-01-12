import { Link } from 'expo-router'
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import { database } from '../firebaseConfig';
import { images } from './images';

const checkImageExists = async (uri) => {
    try {
        const response = await fetch(uri);
        return response.ok;
    } catch (error) {
        return false;
    }
};

function AiOutput() {
    const [disease, setDisease] = useState("safe");
    const [image, setImage] = useState(false);

    useEffect(() => {
        const diseaseRef = ref(database, 'disease');

        onValue(diseaseRef, async (snapshot) => {
            const data = snapshot.val();
            if (await checkImageExists(`../assets/images/${data.value}/0.jpg`)) {
                setImage(`../assets/images/${data.value}/0.jpg`)
            }
            // setImage(getImage(`../assets/images/${disease}/0.jpg`));
            setDisease(data.value);
        });
    });

    const handlePress = async () => {
        console.log("pressed");
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(`how to treat ${disease}`)}`;

        const supported = await Linking.canOpenURL(searchUrl);
        if (supported) {
            await Linking.openURL(searchUrl);
        } else {
            alert("Unable to open the link.");
        }
    };

    if (disease == "safe") return null;

    return (
        <View style={{
            marginTop: 30,
            gap: 10
        }}>
            <View style={{ flexDirection: 'row', alignItems: "center", gap: 5 }}>
                <Text style={{
                    textAlign: "left",
                    fontSize: 24,
                    fontWeight: 600,
                    color: disease.split(" ")[disease.split(" ").length - 1] != "healthy" ? "#c0392b" : "#15803d"
                }}>{disease.split(" ")[disease.split(" ").length - 1] != "healthy" ? "Danger": "Safe"}: </Text>
                <Text style={{ fontSize: 20 }}>{disease} {disease.split(" ")[disease.split(" ").length - 1] != "healthy"?'detected':""}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={images[disease]} style={{
                    width: 300,
                    height: 300,
                    borderRadius: 10
                }} />
                {disease.split(" ")[disease.split(" ").length - 1] != "healthy" ? <TouchableOpacity onPress={handlePress}>
                    <Text style={{ fontSize: 18, textDecorationLine: "underline", color: "#0000EE", marginTop: 5 }}>deal with it</Text>
                </TouchableOpacity>:null}
            </View>
        </View>
    )
}

export default AiOutput