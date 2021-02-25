import React, { useEffect, useState } from "react";

const DreamFinderContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [searchData, SetSearchData] = useState({});
  const [searchResult, setSearchResult] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const [allProperty, setAllProperty] = useState([]);
  const [findProperty, setFindProperty] = useState("Rent");
  const [saveProperties, setSaveProperties] = useState([]);

  const getUser = async () => {
    try {
      const getUser = JSON.parse(localStorage.getItem("dreamfinder_session"));
      if (getUser) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/`, {
          method: "GET",
          headers: { dreamfinder: getUser },
        });
        const data = await res.json();
        // console.log(data);
        if (data.data) {
          setLoggedInUser(data.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllProperty = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/property/search	`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await res.json();
      // console.log(data);
      setAllProperty(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    getAllProperty();
  }, []);

  // console.log(loggedInUser);

  return (
    <DreamFinderContext.Provider
      value={{
        searchData,
        SetSearchData,
        searchResult,
        setSearchResult,
        loggedInUser,
        setLoggedInUser,
        findProperty,
        setFindProperty,
        allProperty,
        saveProperties,
        setSaveProperties,
      }}
    >
      {children}
    </DreamFinderContext.Provider>
  );
};

export default DreamFinderContext;
