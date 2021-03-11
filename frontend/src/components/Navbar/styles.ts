import styled from 'styled-components';

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
    height: 120px;
`;

export const Logo = styled.h2`
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 24px;
    color: #F2911B;
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
