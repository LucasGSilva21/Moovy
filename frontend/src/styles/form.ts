import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    container: {
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        width: 500,
        height: 450,
        padding: 50
    },
    field: {
        marginBottom: 20,
        minWidth: "100%"
    },
    botton: {
        backgroundColor: '#F2911B',
        color: '#fff',
        height: 50,
        minWidth: "100%",
    },
    error: {
        color: 'red',
        marginBottom: 10
    },
    link: {
        marginTop: 20,
        fontSize: 14
    }
});
