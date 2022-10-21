import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View, Text, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAppNavigation } from '../navigation';
import { Pet } from './pet';

export function CustomizablePetComponent(p: { type: "Add" | "Edit", pet?: Pet }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const nav = useAppNavigation();
    const { control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: {
            name: '',
            categoryName: '',
            photo1: '',
            photo2: '',
            photo3: '',
            tags: '',
            status: ''
        }
    });

    useEffect(() => {
        setValue("status", "Available");
        if (p.pet) {
            setValue("name", p.pet.name);
            setValue("categoryName", p.pet.category.name);
            setValue("photo1", p.pet.photoUrls.pop()!);
            setValue("status", p.pet.status);
            setValue("tags", p.pet.tags.pop()?.name!);
        }
    }, [p.pet])

    const onSubmit = (data: any) => {
        const object = {
            id: p.type === "Add" ? Math.random() * 10000 : p.pet?.id,
            category: {
                id: 0,
                name: data.categoryName
            },
            name: data.name,
            photoUrls: [data.photo1, data.photo2, data.photo3],
            tags: [{
                id: 0,
                name: data.tags
            }],
            status: status?.toLocaleLowerCase()
        }

        fetch('https://petstore.swagger.io/v2/pet', {
            method: p.type === "Add" ? 'POST' : "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then(response => {
                console.log(response);
                nav.navigate("PetsList");
                Alert.alert(`Succesfully ${p.type === "Add" ? "added" : "edited"} your pet!`);
            })
            .catch(e => {
                console.log(e);
                Alert.alert(`Error while trying to ${p.type.toLocaleLowerCase()} your pet!`);

            });

    }

    return <View style={{ margin: 16 }}>
        <Controller
            control={control}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: "70%", height: 28, borderRadius: 4, borderColor: (errors.name ? "red" : "lightgray"), borderWidth: 1 }}
                    placeholder="Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={!value && (p.pet?.name ?? "") ? (p.pet?.name ?? "") : value}
                />
            )}
            name="name"
        />
        {errors.name && errors.name.type === "required" && <Text style={{ color: "red" }}>Name is required.</Text>}
        <View style={{ marginBottom: 20 }}></View>
        <Controller
            control={control}
            rules={{
                required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: "70%", height: 28, borderRadius: 4, borderColor: "lightgray", borderWidth: 1 }}
                    placeholder="Category"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={!value && (p.pet?.category && p.pet.category.name ? p.pet?.category.name : "") ? p.pet?.category.name : value}
                />
            )}
            name="categoryName"
        />
        <View style={{ marginBottom: 20 }}></View>
        <Controller
            control={control}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: "70%", height: 28, borderRadius: 4, borderColor: (errors.photo1 ? "red" : "lightgray"), borderWidth: 1 }}
                    placeholder="Photos"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={!value && (p.pet?.photoUrls ? (p.pet?.photoUrls.length ?? 0) : 0) ? p.pet?.photoUrls[0] : value}
                />
            )}
            name="photo1"
        />
        {errors.photo1 && <Text style={{ color: "red" }}>Photos' urls are required.</Text>}
        <View style={{ marginBottom: 20 }}></View>
        <Controller
            control={control}
            rules={{
                required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: "70%", height: 28, borderRadius: 4, borderColor: "lightgray", borderWidth: 1 }}
                    placeholder="Photos"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={!value && (p.pet?.photoUrls ? (p.pet?.photoUrls.length ?? 0) : 0) ? p.pet?.photoUrls[1] : value}
                />
            )}
            name="photo2"
        />
        <View style={{ marginBottom: 20 }}></View>
        <Controller
            control={control}
            rules={{
                required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: "70%", height: 28, borderRadius: 4, borderColor: "lightgray", borderWidth: 1 }}
                    placeholder="Photos"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={!value && (p.pet?.photoUrls ? (p.pet?.photoUrls.length ?? 0) : 0) ? p.pet?.photoUrls[1] : value}
                />
            )}
            name="photo3"
        />
        <View style={{ marginBottom: 20 }}></View>
        <Controller
            control={control}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{ width: "70%", height: 28, borderRadius: 4, borderColor: (errors.tags ? "red" : "lightgray"), borderWidth: 1 }}
                    placeholder="Tags"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={!value && (p.pet?.tags ? (p.pet?.tags.length ?? 0) : 0) ? p.pet?.tags[0].name : value}
                />
            )}
            name="tags"
        />
        {errors.tags && <Text style={{ color: "red" }}>Tags are required.</Text>}
        <View style={{ marginBottom: 20 }}></View>
        <Controller
            control={control}
            rules={{
                required: true,
            }}
            defaultValue="Available"
            render={({ field: { onChange, value } }) => (
                <DropDownPicker
                    style={{ width: "70%", height: 28, borderRadius: 4, borderColor: "lightgray", borderWidth: 1 }}
                    placeholder="Status"
                    multiple={false}
                    open={open}
                    setOpen={() => { setOpen(!open) }}
                    items={[{ label: "Available", value: "Available" }, { label: "Pending", value: "Pending" }, { label: "Sold", value: "Sold" }]}
                    setValue={(v) => {
                        onChange(v);
                        setStatus(v);
                    }}
                    value={!status && p.pet?.status ? p.pet?.status.charAt(0).toUpperCase()! + p.pet?.status.slice(1, p.pet.status.length!) :
                        !status ? "Available" : status}
                />
            )}

            name="status"
        />
        <View style={{ marginBottom: 20 }}></View>
        <TouchableOpacity style={{
            width: 200, height: 40, borderRadius: 8, marginTop: 24, backgroundColor: "#0096FF",
            alignItems: "center", justifyContent: "center"
        }}>
            <Text style={{ color: "white" }}>{p.type === "Add" ? "Add" : "Save"} pet</Text>
        </TouchableOpacity>

    </View>
}
