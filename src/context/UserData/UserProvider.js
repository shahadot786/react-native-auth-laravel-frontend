import React, {createContext, useState} from 'react';

export const UserContext = createContext();

function UserProvider({children}) {
  const [userData, setUserData] = useState();

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
