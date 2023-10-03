import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MantineProvider, createTheme, MantineColorsTuple } from '@mantine/core';

const myColor = [
    '#ffe9e9',
    '#ffd1d1',
    '#fba0a1',
    '#f76d6d',
    '#f34141',
    '#f22625',
    '#f21616',
    '#d8070b',
    '#c10008',
    '#a90003'
  ];
  
const theme = createTheme({
    colors: {
      myColor,
    }
});

function MainSearchElement() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const find = () => {
        navigate("/search/"+search);
    }

    useEffect(() => {
    }, []);


    return (
        <MantineProvider theme={theme}>
        <form>
            <h1>
                Знайдіть свій фільм
            </h1>
            <input type="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <input type="button" onClick={find} value="Пошук"/>
        </form>
        </MantineProvider>
    )
}

export default MainSearchElement;