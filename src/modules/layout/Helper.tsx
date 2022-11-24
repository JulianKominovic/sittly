import React from "react";
// import { motion } from 'framer-motion';
import { useHelper } from "../../store/helperStore";
import List from "../../ui/list";

const Helper = () => {
  const { options, showingHelper, hideHelper, focusLastElement } = useHelper(
    (state) => ({
      options: state.options,
      showingHelper: state.showingHelper,
      hideHelper: state.hideHelper,
      focusLastElement: state.focusLastElement,
    })
  );

  if (!showingHelper) return null;
  return (
    <main
      className="z-20 bottom-10 right-4 w-4/6 flex fixed rounded-xl border border-gray-600 backdrop-blur-md max-h-60 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-700 p-2"
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
