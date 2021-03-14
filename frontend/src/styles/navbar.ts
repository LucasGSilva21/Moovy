import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    listContainer: {
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
    list: {
        display: 'flex',
        flexDirection: 'row',
        listStyle: 'none',
        flex: 1
    },
    item: {
        textDecoration: 'none',
        color: '#000',
        paddingRight: 30,
        "&:hover": {
            color: '#F2911B',
        }
    }
});

/*
import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    
`;

export const Logo = styled.h2`
    
    padding-left: 50px;
    width: 15%;
`;

export const List = styled.ul`
    display: flex;
`;

export const Item = styled.li`
    align-items: center;
    padding-right: 50px;
    list-style: none;
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
`;
*/
