import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    nav: {
        width: '100%',
        height: 120,
        display: 'flex',
        flexDirection: 'row',
    },
    logo: {
        fontFamily: 'Inter',
        fontSize: '1.5rem',
        color: '#F2911B',
        paddingLeft: 15,
        paddingRight: 15,
        width: 200
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        listStyle: 'none',
        flex: 1,
        marginLeft: 25
    },
    item: {
        textDecoration: 'none',
        color: '#000',
        paddingRight: 30,
        "&:hover": {
            color: '#F2911B',
        }
    },
    logout: {
        width: 90,
        marginRight: 25
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        "&:hover": {
            color: '#F2911B',
            cursor: 'pointer'
        }
    }
});
