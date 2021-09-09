import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { useState, useEffect, useCallback } from 'react';
import { API_DIRECTORY } from '../constants';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import AllRecipientsEditModal from './AllRecipientsEditModal';
// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
      width: '60%',
      maxWidth: 280,
      backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));

function createData(first_name, last_name, phone_number, preferred_language, comm_method, comments) {
    return { first_name, last_name, phone_number, preferred_language, comm_method, comments };
}

const rows = [
    createData('Bob', 'Hope', '15555555555', 'ENGLISH', 'SIGNAL', `He's Bob Hope`),
    createData('Dan', 'Rather', '15555555555', 'ENGLISH', 'SIGNAL', ``),
    createData('John', 'Cruthers', '15555555555', 'ENGLISH', 'SIGNAL', ``),
    createData('Alex', 'Jones', '15555555555', 'ENGLISH', 'SIGNAL', `Worried about frogs being gay`)
  ];
export default function AllRecipients(props) {
    const classes = useStyles();

    const [recipients, setRecipients] = useState([])
    const [recipientDataLoaded, setRecipientDataLoaded] = useState(false);
    const [recipientsToRender, setRecipientsToRender] = useState([]);
    const [recipientsByGroup, setRecipientsByGroup] = useState([]);
    const [renderState, setRenderState] = useState('by-none');
    const [dataNeedsSorting, setDataNeedsSorting] = useState(true);
    const [dataSorted, setDataSorted] = useState(false);

    const sortData = (sortPredicate, data) => {
        if (sortPredicate === 'by-none') {
            if (data === undefined || data === null)
                sortDataByNone(recipients);
            else 
                sortDataByNone(data);
        } 
            
        else if (sortPredicate === 'by-group') {
            if (data === undefined || data === null)
                sortDataByGroup(recipients);
            else 
                sortDataByGroup(data);
        }    
    }

    const handleEditSubmit = (data) => {
        console.log('working');
        fetchRecipientData();
    }

    let sortDataByNone = (data) => {
        let returnArray = [];
        let dataAlreadyExists = false;

        for (let i = 0; i < data.length; i++) {
            dataAlreadyExists = false;
            for (let j = 0; j < returnArray.length; j++) {
                if (returnArray[j].recipient_id === data[i].recipient_id) {
                    dataAlreadyExists = true;
                }
            }
            if (!dataAlreadyExists) {
                returnArray.push(data[i]);
                dataAlreadyExists = false;
            }
        }

        setDataNeedsSorting(false);
        setDataSorted(true);
        setRecipientsToRender(returnArray);
    }

    let sortDataByGroup = (data) => {
        let resultArr = []
        let groupAlreadyExists = false

        for (let i = 0; i < data.length; i++) {
            groupAlreadyExists = false
            for (let j = 0; j < resultArr.length; j++) {
                if (resultArr[j].group_id === data[i].group_id) {
                    groupAlreadyExists = true;
                }
            }
            if (!groupAlreadyExists) {
                resultArr.push({
                    group_name: data[i].group_name,
                    group_id: data[i].group_id
                })
                groupAlreadyExists = false
            }
        }

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < resultArr.length; j++) {
                if (resultArr[j].group_id === data[i].group_id) {
                    if (resultArr[j].recipients === undefined) {
                        resultArr[j].recipients = [];
                    } else {
                        resultArr[j].recipients.push(data[i]);
                    }
                }
            }
        }

        setDataNeedsSorting(false);
        setDataSorted(true);
        setRecipientsToRender(resultArr);
    }

    const fetchRecipientData = () => {
        fetch(`${API_DIRECTORY.URL}${API_DIRECTORY.GET_RECIPIENTS_ALL_DATA}`)
            .then(res => res.json())
            .then((data) => {
                setRecipients(data);
                setRecipientDataLoaded(true);
                sortData(renderState, data);
            })
    }

    useEffect(() => {
        fetchRecipientData();
    }, [])

    // ******************************************************* RENDER FUNCTIONS *************************************************** //
    let decideRenderOption = () => {
        let option = document.getElementById('sort').value;

        if (option === 'by-none') {
            if (dataNeedsSorting)
                sortDataByNone(recipients);

            return renderByNone();
        }
            
        else if (option === 'by-group') {
            if (dataNeedsSorting)
                sortDataByGroup(recipients);
            return renderByGroup();
        }
    }

    let renderByNone = () => {
        console.log('renderByNone');
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name&nbsp;</TableCell>
                            <TableCell align="center">Phone Number&nbsp;</TableCell>
                            <TableCell align="center">Preferred Language&nbsp;</TableCell>
                            <TableCell align="center">Comm Method&nbsp;</TableCell>
                            <TableCell align="center">Comments&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipientsToRender.map((element) => (
                            <TableRow key={element.recipient_id}>
                                <TableCell align="center">{element.first_name}</TableCell>
                                <TableCell align="center">{element.last_name}</TableCell>
                                <TableCell align="center">{element.phone_number}</TableCell>
                                <TableCell align="center">{element.language_name}</TableCell>
                                <TableCell align="center">{element.pc_name.toUpperCase()}</TableCell>
                                <TableCell align="center">{element.comments}</TableCell>
                                <AllRecipientsEditModal handleEditSubmit={handleEditSubmit} recipientData={element} handleUpdate={fetchRecipientData}/>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    const handleEditButtonClicked = (element) => {
        console.log('working', element);
    }

    const renderByGroup = () => {
        console.log('recipient data in renderByGroup ', recipientsToRender);

        return (
            <div>
                {
                    recipientsToRender.map((element) => {
                        let i = 0;

                        return (
                            <div>
                                <h3>{`${element.group_name}`}</h3>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow key={`${element.group_id} : ${i++}`}>
                                                <TableCell key={`${element.group_id}:${i++}`} align="center">First Name</TableCell>
                                                <TableCell key={`${element.group_id}:${i++}`} align="center">Last Name&nbsp;</TableCell>
                                                <TableCell key={`${element.group_id}:${i++}`} align="center">Phone Number&nbsp;</TableCell>
                                                <TableCell key={`${element.group_id}:${i++}`} align="center">Preferred Language&nbsp;</TableCell>
                                                <TableCell key={`${element.group_id}:${i++}`} align="center">Comm Method&nbsp;</TableCell>
                                                <TableCell key={`${element.group_id}:${i++}`} align="center">Comments&nbsp;</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                element.recipients.map((subElement) => {
                                                    return (
                                                        <TableRow key={`${element.group_id}:${subElement.recipient_id}:${i++}`}>
                                                            <TableCell key={`${element.group_id}:${subElement.recipient_id}:${i++}`} align="center">{subElement.first_name}</TableCell>
                                                            <TableCell key={`${element.group_id}:${subElement.recipient_id}:${i++}`} align="center">{subElement.last_name}</TableCell>
                                                            <TableCell key={`${element.group_id}:${subElement.recipient_id}:${i++}`} align="center">{subElement.phone_number}</TableCell>
                                                            <TableCell key={`${element.group_id}:${subElement.recipient_id}:${i++}`} align="center">{subElement.language_name}</TableCell>
                                                            <TableCell key={`${element.group_id}:${subElement.recipient_id}:${i++}`} align="center">{subElement.pc_name.toUpperCase()}</TableCell>
                                                            <TableCell key={`${element.group_id}:${subElement.recipient_id}:${i++}`} align="center">{subElement.comments}</TableCell>
                                                            <AllRecipientsEditModal handleEditSubmit={handleEditSubmit} recipientData={subElement} handleUpdate={fetchRecipientData}/>
                                                        </TableRow>
                                                    );
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
    // ***************************************************** END RENDER FUNCTIONS ************************************************* //

    const handleSelectorChange = () => {
        setDataNeedsSorting(true);
        setRecipientsToRender([]);
        sortData(document.getElementById('sort').value);
        setRenderState(document.getElementById('sort').value)
    }

    return (
        <div>
            <form>
                <label for="sort">Sort By :</label>
                <select name="sort" id="sort" onChange={handleSelectorChange}>
                    <option value="by-none">None</option>
                    <option value="by-group">By Group</option>
                </select>

            </form>
            {   
                recipientDataLoaded && dataSorted ?
                 decideRenderOption() :
                <div>Loading...</div>
            }
        </div>
    );
}