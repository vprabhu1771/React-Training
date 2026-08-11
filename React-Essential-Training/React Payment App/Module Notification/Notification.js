import * as React from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';

export default function Notification(props) {
    
    const { notify, setNotify } = props;

    const handleClose = () => {
        
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            // className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    );
}
