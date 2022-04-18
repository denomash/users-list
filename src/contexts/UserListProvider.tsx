import React, { useContext, createContext, useEffect } from "react";

import usePersistData from "../hooks/usePersistData";
import { IUser } from "../types";

interface IUserList {
  children: React.ReactNode;
  email: string;
}

const useUserList: any = () => useContext(UserListContext);
const UserListContext = createContext({} as ReturnType<typeof useUserList>);

const UserListProvider = ({ children, email }: IUserList) => {
  const [usersList, setUsersList] = usePersistData(email, []);

  useEffect(() => {
    setUsersList(usersList);
  }, [usersList, setUsersList]);

  const createUser = (user: IUser) => {
    setUsersList((prevUserList: IUser[]) => {
      return [...prevUserList, { ...user, id: Date.now() }];
    });
  };

  const editUser = (id: number, data: IUser) => {
    console.log(`Edit user with id: ${id}`);
    const prevUsers = [...usersList];

    var foundIndex = prevUsers.findIndex((x) => x.id === Number(id));

    prevUsers[foundIndex] = {
      ...data,
    };

    setUsersList(prevUsers);
  };

  const deleteUser = (id: number) => {
    console.log(`Delete user with id: ${id}`);
    const prevUsers = [...usersList];
    const newUsers = prevUsers.filter((user) => user.id !== (id as number));
    setUsersList(newUsers);
  };

  return (
    <UserListContext.Provider
      value={{ usersList, createUser, editUser, deleteUser }}
    >
      {children}
    </UserListContext.Provider>
  );
};

export { useUserList, UserListProvider };
