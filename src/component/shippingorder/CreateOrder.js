import React, {useState, Fragment} from 'react'
import { 
    Grid,
    Paper, 
    makeStyles, 
    Typography, 
    TextField, 
    Button, 
    Box,
    DialogContent,
    DialogContentText,
    DialogActions,
    Dialog,
    CircularProgress,
} from '@material-ui/core'
import AddressSelection from './AddressSelection'
import { useSelector } from 'react-redux'
import DateTimePickers from './DateTimePickers'
import Save from '@material-ui/icons/Save'
import Cancel from '@material-ui/icons/Cancel'
import CheckCircleOutlineSharp from '@material-ui/icons/CheckCircleOutlineSharp'

const styles = makeStyles(theme =>({
    item: {
    },
    textroot: {
        display: 'flex',
        background: '#6b5b95',
        color: 'white',
        width: '100%',
        paddingLeft: 20,
        borderRadius: '20px 20px 20px 20px',
        fontFamily: 'Calibri'
    },
    root: {
        margin: theme.spacing(4),
        marginBottom: theme.spacing(2)
    },
    header: {
        marginTop: 20,
    },
    button: {
        margin: theme.spacing(4),
    },
    dialog: {
        minHeight: 200,  
    }
}))

function CreateOrder(props) {


    const classes = styles()
    const token = useSelector(state => state.auth.token)
    
    {/* Stores information */}
    const [senderName, setSenderName] = useState('')
    const [senderPhoneNumber, setSenderPhoneNumber] = useState('')
    const [senderAddress, setSenderAddress] = useState('')
    const [senderCommuneId, setSenderCommuneId] = useState('')

    const [receiverName, setReceiverName] = useState('')
    const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('')
    const [receiverAddress, setReceiverAddress] = useState('')
    const [receiverCommuneId, setReceiverCommuneId] = useState('')

    const [packageName, setPackageName] = useState('')
    const [weight, setWeight] = useState('')

    const [receivedDate, setReceivedDate] = useState()
    const [deliveryDate, setDeliveryDate] = useState()
    
    {/* Get information from child component */}
    const getReceivedDate = datetime => {
        setReceivedDate(datetime)
    }

    const getDeliveryDate = datetime => {
        setDeliveryDate(datetime)
    }

    const getSenderCommuneId = communeId => {
        setSenderCommuneId(communeId)
    }

    const getReceiverCommuneId= communeId => {
        setReceiverCommuneId(communeId)
    }

    const createButtonClickHandler = () => {
        const data = {
            senderName: senderName,
            senderPhoneNumber: senderPhoneNumber,
            senderAddress: senderAddress,
            senderCommuneId: senderCommuneId,
            
            receiverName: receiverName,
            receiverPhoneNumber: receiverPhoneNumber,
            receiverAddress: receiverAddress,
            receiverCommuneId: receiverCommuneId,

            weight: Number(weight),
            packageName: packageName            
        }

        createShippingOrder(data)
    }
    
    const cancelButtonClickHandler = () => {

    }
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = use(false)

    const [status, setStatus] = useState()
    const createorder


}
export default CreateOrder