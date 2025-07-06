import React from "react";
import { useMediaQuery } from 'react-responsive';
import { useContext , createContext } from "react";
const DeviceContext = createContext();


export const DeviceProvider = ({ children }) => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

    return (
        <DeviceContext.Provider value={{ isMobile, isDesktop }}>
            {children}
        </DeviceContext.Provider>
    )
}

export const useDevice = () => useContext(DeviceContext);