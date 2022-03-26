import { makeStyles } from '@material-ui/core/styles';


export default makeStyles (() => ({
    root: {
    maxWidth: '100%'
    },

    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    detailButton: {
        "&:hover": {
            backgroundColor: '#c5a491'
        },
        backgroundColor: '#ab7a5f',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '10px',
        
    }
        
}));