import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, InputLabel, Select, MenuItem, FormControl, Box
} from '@material-ui/core'
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    }
}));

function CreateOrder(){
    const [provinces, setProvinces] = useState([]);
    const [provinceId, setProvinceId] = useState();
    const [provinceName, setProvinceName] = useState();
	const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    
    const requestOptionsGet = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json','X-Auth-Token' : token},
	}

	function getProvinces(){
        //console.log("getDepartmentList....");
        fetch('http://localhost:8080/api/get-provinces', requestOptionsGet)
        .then(response => response.json())
        .then(response =>{
			console.log(response);
			let arr = [];
			response.forEach(d => {
				arr.push(d);
			});
            setProvinces(arr);
        });      
    }	

    useEffect(() => getProvinces(), []);


    return (
        <div>
                

                <form>
                        <TextField
                            id="select-quantityUomId"
                            //value={selectedProvince.id}
                            select
                            label="Select"
                            //onChange={handleProvinceIdChange}
                            //onClick={getProvinces}
                            helperText="Select-quantityUomId"
                        >
                            {provinces.map(province => (
                            <MenuItem 
                                key={province.provinceId}
                                value={province.provinceId}
                            >
                                {province.provinceName}
                            </MenuItem>
                            ))}
                        </TextField>
                </form>
    
            </div>
    
    );
}


export default CreateOrder;