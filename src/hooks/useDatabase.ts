import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getDatabaseByKey, setDatabaseByKey } from "../databse";

/**
 *
 * @param initialContent If there is no database initialized it will be used as initialContent (useful for setting up the initial database structure)
 * @returns
 */
const useDatabase = <T>(initialContent?: T) => {
  const location = useLocation();
  const databaseKey = location.pathname.slice(
    1,
    location.pathname.slice(1).indexOf("/")
  );
  const getContent = (): T => getDatabaseByKey(databaseKey);
  const [database, setDatabase] = useState<T>(() =>
    getContent() ? getContent() : initialContent || ({} as T)
  );

  const updateContent = (content: (previous: T) => T) => {
    const prev = getDatabaseByKey(databaseKey);
    setDatabaseByKey(databaseKey, content(prev));
    setDatabase(content(prev));
  };

  return { updateContent, database };
};

export default useDatabase;
