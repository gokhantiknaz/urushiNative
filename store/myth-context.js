//Context for Ble Manager
import {createContext} from "react";
import useBlex from "../Hooks/useBlex";
import React from 'react'
import {useState} from "react";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";


export const MythContext = React.createContext({
                                                   manuelTemplate: {},
                                                   setTemplate: () => { },
                                                   setAquarium: () => { },
                                                   aquarium: {},
                                                   t: useTranslation()
                                               });
const MythContextProvider = ({children}) => {
    const [manuelTemlate, setManuelTemplate] = useState();
    const [selectedAquarium, setSelectedAquarium] = useState();
    const [t] = useTranslation();
    const setTemplate = (template) => {
        setManuelTemplate(template);
    }
    const setAq = (aq) => {
        setSelectedAquarium(aq);
    }
    return (
        <MythContext.Provider value={{manuelTemplate: manuelTemlate, setTemplate: setTemplate, setAquarium: setAq, aquarium: selectedAquarium, t: t}}>
            {children}
        </MythContext.Provider>
    )
}
export default MythContextProvider
