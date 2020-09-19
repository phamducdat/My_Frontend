import {makeStyles} from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {CardContent, CircularProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import {authPost} from "../../api";
import {failed} from "../../action";
import MenuItem from "@material-ui/core/MenuItem";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";


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


function CreateDepartment(props) {

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const history = useHistory();
    const [departmentName, setDepartmentName] = useState();
    const [productName,setProductName] = useState();
    const [uoms,setUoms] = useState([]);
    const [isRequesting, setIsRequesting] = useState(false);
    const [quantityUomId,setQuantityUomId] = useState();//uom
    const [productTypes, setProductTypes] = useState([]);
    const [type,setType] = useState();
    const [productId,setProductId] = useState();
    const classes = useStyles();


    const inputCreateDepartment = {
        departmentName:departmentName,
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-Auth-Token' : token },
        body: JSON.stringify(inputCreateDepartment)
    }

    const handleChangeDepartmentName = (e) =>{
            setDepartmentName(e.target.value);
    }
    
    function createDepartment (){
        fetch('http://localhost:8080/api/create-department', requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log('success!');
        });
        setIsRequesting(true);
        // /preventDefault();
        window.location.reload();
    }


    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Create Product
                    </Typography>

                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="id"
                            label="Department Name"
                            onChange={handleChangeDepartmentName}
                            helperText="department-name"
                            required
                            >
                        </TextField>


                    </form>

                </CardContent>


                <CardActions>
                    <Button
                        disabled={isRequesting}
                        variant="contained"
                        color="primary"
                        onClick={createDepartment}
                    >
                        {isRequesting ? <CircularProgress /> : "Create"}
                    </Button>
                </CardActions>


            </Card>
        </MuiPickersUtilsProvider>
    );


}


export default CreateDepartment;