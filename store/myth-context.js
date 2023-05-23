//Context for Ble Manager
import {createContext} from "react";
import useBlex from "../Hooks/useBlex";
import React from 'react'
import {useState} from "react";
import {useEffect} from "react";


export const MythContext = React.createContext({
                                                   manuelTemplate: {},
                                                   setTemplate: () => { },
                                               });
const MythContextProvider = ({children}) => {
    const [manuelTemlate, setManuelTemplate] = useState();
    const setTemplate = (template) => {
        setManuelTemplate(template);
    }

    return (
        <MythContext.Provider value={{manuelTemplate: manuelTemlate,setTemplate:setTemplate}}>
            {children}
        </MythContext.Provider>
    )
}
export default MythContextProvider
