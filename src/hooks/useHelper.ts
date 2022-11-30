import React, { useEffect } from "react";
import {
  HelperAction,
  useHelper as useHelperStore,
} from "../store/helperStore";

const useHelper = (helperOptions: HelperAction | null) => {
  const setHelperOptions = useHelperStore((state) => state.setOptions);
  useEffect(() => {
    setHelperOptions(helperOptions || []);
  }, [helperOptions]);
  return { setHelperOptions };
};

export default useHelper;
