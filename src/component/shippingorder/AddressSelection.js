import React, { useState, useEffect, Fragment} from 'react'
import { 
    makeStyles, 
    InputLabel, 
    Select, 
    MenuItem, 
    FormControl, 
    Box
} from '@material-ui/core'
import { FlashOnTwoTone } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
    control: {
        minWidth: 200
    },
}))

function AddressSelection ({token, getCommuneId, parentClasses}) {
    const classes = useStyles()
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [communes, setCommunes] = useState([])

    const requestOptionsGet = {
        method:'GET',
        headers: {'Content-Type': 'application/json', 'X-Auth-Token': token},
    }

    const getProvinces = () => {       
        fetch('http://localhost:8080/api/get-provinces', requestOptionsGet)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setProvinces(response)
        })
    }

    const getRespectiveDistricts = (provinceId) => {
        const getDistrictsRequestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-Auth-Token': token},
            body: JSON.stringify(provinceId)
        }
        fetch('http://localhost:8080/api/get-respective-districts', getDistrictsRequestOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response);           
            setDistricts(response)
        })
    }

    const getRespectiveCommunes = (districtId) => {
        const getCommunesRequestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-Auth-Token': token},
            body: JSON.stringify(districtId)
        }
        fetch('http://localhost:8080/api/get-respective-communes', getCommunesRequestOptions)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setCommunes(response)
        })
    }

    const selectedProvince = provinces.find(province => province.selected) || {
        id: ''
    }
    
    const selectedDistrict = districts.find(district => district.selected) || {
        id: ''
    }
    
    const selectedCommune = communes.find(commune => commune.selected) || {
        id: ''
    }
    
    useEffect (() => {
        getProvinces();
    }, [])
    
    
    
    useEffect (() => {
        if (selectedProvince.id ===''){
    
        }else {
            getRespectiveDistricts({id:selectedProvince.id})
        }
    }, [selectedProvince])
    
    useEffect(() => {
        if (selectedDistrict.id === '') {
    
        } else {
            getRespectiveCommunes({id: selectedDistrict.id})
        }
    }, [selectedDistrict])
    
    const setters = {
        provinces: setProvinces,
        districts: setDistricts,
        communes: setCommunes
    }
    
    const collections = {
        provinces: provinces,
        districts: districts,
        communes: communes
    }
    

    const onChange = e => {
        const setCollection = setters[e.target.name]
        const collection = collections[e.target.name].map(item => ({
            ...item,
            selected: false
        }))

        if (e.target.name === 'provinces') {
            setDistricts([])
            setCommunes([])
        }

        if (e.target.name === 'districts'){
            setCommunes([])
        }

        const index = collection.findIndex(
            item => item.id === e.target.value
        )

        collection[index] = {... collection[index], selected: true}

        if (e.target.name === 'communes') {
            getCommuneId(collection[index].id)
        }

        setCollection(collection)
    }


    return (
        <Box 
            display='flex' 
            justifyContent='space-around' 
            width='100%'
            css={{height:80, paddingTop: 30}}
        >
            <Box>
            <FormControl className={classes.control}>
                <InputLabel htmlFor='Provinces'>
                    Province
                </InputLabel>
                <Select
                    value={selectedProvince.id}
                    onChange={onChange}
                    inputProps={{
                        name: 'provinces',
                        id: 'provinces',
                    }}
                >
                    {provinces.map(province => (
                        <MenuItem 
                            key={province.id}
                            value={province.id}
                        >
                            {province.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Box>
            <Box>
            <FormControl
                className={classes.control}
                disabled={selectedProvince.id === ''}
            >
                <InputLabel htmlFor="Districts">
                    District
                </InputLabel>
                <Select
                    value={selectedDistrict.id}
                    onChange={onChange}
                    inputProps={{
                        name: 'districts',
                        id: 'values'
                    }}
                >
                    {districts.filter(district => district.provinceId === selectedProvince.id)
                                .map(district => (
                                    <MenuItem 
                                        key={district.id} 
                                        value={district.id}
                                    >
                                        {district.name}
                                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Box>
            <Box>
            <FormControl
                className={classes.control}
                disabled={selectedDistrict.id === ''}
                required
            >
                <InputLabel htmlFor="Communes">
                    Commune
                </InputLabel>
                <Select
                    value={selectedCommune.id}
                    onChange={onChange}
                    inputProps={{
                        name: 'communes',
                        id: 'values'
                    }}
                >
                    {communes.filter(commune => commune.districtId === selectedDistrict.id)
                                .map(commune => (
                                    <MenuItem 
                                        key={commune.id} 
                                        value={commune.id}
                                    >
                                        {commune.name}
                                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Box>
    </Box>     
)






}

export default AddressSelection

