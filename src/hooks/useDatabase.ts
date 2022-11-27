import React from "react";
import { useLocation } from "react-router";
import { getDatabaseByKey, setDatabaseByKey } from "../databse";

const useDatabase = <T>() => {
  const location = useLocation();
  const databaseKey = location.pathname.slice(
    1,
    location.pathname.slice(1).indexOf("/")
  );
  const updateContent = (content: T) => {
    const prev = getDatabaseByKey(databaseKey);
    setDatabaseByKey(databaseKey, { ...prev, ...content });
  };
  const getContent = (): T => getDatabaseByKey(databaseKey);
  return { updateContent, getContent };
};

export default useDatabase;
