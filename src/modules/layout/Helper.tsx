import React from "react";
// import { motion } from 'framer-motion';
import { useHelper } from "../../store/helperStore";
import List from "../../ui/list";

const Helper = () => {
  const {
    options,
    showingHelper,
    hideHelper,
    focusLastElement,
    hideHelperAdvise,
  } = useHelper((state) => ({
    options: state.options,
    showingHelper: state.showingHelper,
    hideHelper: state.hideHelper,
    focusLastElement: state.focusLastElement,
    hideHelperAdvise: state.hideHelperAdvise,
  }));

  if (!showingHelper) return null;
  return (
    <main
      className="z-20 bottom-10 right-4 w-4/6 flex fixed rounded-xl border border-color-normal backdrop-blur-md max-h-60 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-700 p-2"
      // initial={{ translateY: 100 }}
      // animate={{ translateY: 0 }}
      // exit={{ translateY: -100 }}
      // transition={{ duration: 0.2 }}
    >
      <List.Root className="w-full h-fit">
        {options?.length > 0
          ? options.map(
              (
                {
                  callback: cb,
                  explanation,
                  keys,
                  icon,
                  subtitle,
                  title,
                  iconSize,
                },
                index
              ) => (
                <List.Item
                  key={"hpr" + index}
                  is-helper-option="true"
                  data-helper-option="true"
                  autoFocus={index === 0}
                  alwaysShowKeys
                  icon={icon}
                  subtitle={subtitle}
                  id={"hpr" + index}
                  title={title}
                  iconSize={iconSize}
                  action={{
                    callback: (all) => {
                      cb(all);
                      hideHelper();
                      hideHelperAdvise();
                      focusLastElement();
                    },
                    explanation,
                    keys,
                  }}
                />
              )
            )
          : null}
      </List.Root>
    </main>
  );
};

export default Helper;
