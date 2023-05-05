import React, { createContext, useState } from 'react';

// Create a new context
export const ModeContext = createContext();

// Define a component to provide the value of toggle state to the context
export const ModeContextProvider = ({ children }) => {
  const [light,setLight]=useState(true);

  const modeFunction = () => {
    if(light){
      setLight(false);
      document.documentElement.style.setProperty('--primary-color', '#1e1e1e');
      document.documentElement.style.setProperty('--secondary-color', '#6b75e0');
      document.documentElement.style.setProperty('--black-color', '#ffffff');
      document.documentElement.style.setProperty('--gray-color', '#a5b1c5');
      document.documentElement.style.setProperty('--white-color', '#030303');
    }else{
      setLight(true);
      document.documentElement.style.setProperty('--primary-color', '#edf2f8');
      document.documentElement.style.setProperty('--secondary-color', '#1d2687');
      document.documentElement.style.setProperty('--black-color', '#030303');
      document.documentElement.style.setProperty('--gray-color', '#6b7688');
      document.documentElement.style.setProperty('--white-color', '#ffffff');
      
    }
  };
  return (
    <ModeContext.Provider value={{ light, setLight, modeFunction }}>
      {children}
    </ModeContext.Provider>
  );
};
