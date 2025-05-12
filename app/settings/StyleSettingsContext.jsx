import React, { createContext, useState } from 'react';

// Create a context to manage and provide style settings throughout the app
export const StyleSettingsContext = createContext();

/**
 * StyleSettingsProvider component that provides style settings to the app.
 * - Manages style settings using React's useState
 * - Shares style settings with children components through context
 */
export const StyleSettingsProvider = ({ children }) => {
  const [styleSettings, setStyleSettings] = useState({
    article_h1: {
      fontFamily: 'Manrope-Bold',
      fontSize: 25,
    },
    article_text: {
      fontFamily: 'Manrope-Regular',
      fontSize: 15,
    },
  });

  return (
    <StyleSettingsContext.Provider value={{ styleSettings, setStyleSettings }}>
      {children}
    </StyleSettingsContext.Provider>
  );
};
