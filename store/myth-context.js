//Context for Ble Manager
import {createContext} from "react";
import useBlex from "../Hooks/useBlex";
import React from 'react'
import {useState} from "react";
import {useEffect} from "react";


export const MythContext = React.createContext({
                                                   manuelTemplate: {},
                                                   setTemplate: () => { },
                                                   setAquarium: () => { },
                                                   aquarium: {},
                                               });
const MythContextProvider = ({children}) => {
    const [manuelTemlate, setManuelTemplate] = useState();
    const [selectedAquarium, setSelectedAquarium] = useState();
    const setTemplate = (template) => {
        setManuelTemplate(template);
    }
    const setAq = (aq) => {
        setSelectedAquarium(aq);
    }
    return (
        <MythContext.Provider value={{manuelTemplate: manuelTemlate, setTemplate: setTemplate, setAquarium: setAq, aquarium: selectedAquarium}}>
            {children}
        </MythContext.Provider>
    )
}
export default MythContextProvider
