import React, { useState } from "react"

export const StoreContext = React.createContext(null);

const StoreProvider =  ({ children }) => {

  const [selectUser, setSelectUser] = useState(null);
  const [user, setUser] = useState([])
  const store = {
      users: [user, setUser],
      select: [selectUser, setSelectUser]
  }

      return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
      );

}

export default StoreProvider;