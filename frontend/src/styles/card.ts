import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    titleContainer: {
        minWidth: "100%",
        display: "flex",
        justifyContent: "center"
    },
    title: {
        width: '80%',
        paddingBottom: 20
    },
    listContainer: {
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center"
    },
    list: {
        width: '80%',
    },
    card: {
        borderRadius: 10
    },
    cardContent: {
        width: 325,
        minHeight: 580,
        display: 'flex',
        flexDirection: 'column',
    },
    cardImage: {
        height: 420,
        borderRadius: 10
    },
    cardMain: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maginTop: 10,
    },
    cardTitle: {
        flex: 1,
    },
    containerBotton: {
        justifyContent: 'center'
    },
    buttonRed: {
        width: '100%',
        height: 50,
        backgroundColor: '#FE6D8E',
        borderRadius: 15
    },
    buttonGreen: {
        width: '100%',
        height: 50,
        backgroundColor: '#0ACF83',
        borderRadius: 15
    },
    inputContainer: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        border: 0,
        outline: 'none',
        borderRadius: 15,
        paddingLeft: 15
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingTitle: {
        paddingBottom: 10
    },
    notFound: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 30
    }
});
