import React, { createContext, useState } from 'react'

export const IsGroupContext = createContext();

const IsGroup = props=> {
    const [isGroup, setIsGroup] = useState(false)

    const changeisgroup = () => {
        setIsGroup(prevstate=>!prevstate)
    }

    return (
        <IsGroupContext.Provider value={{isGroup,changeisgroup}}>
            {props.children}
        </IsGroupContext.Provider>
    )
}

export default IsGroup
