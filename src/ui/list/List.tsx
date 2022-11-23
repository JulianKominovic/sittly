import React from 'react';
import { motion } from 'framer-motion';

const List = ({ children, ...props }: { children: React.ReactNode[] | React.ReactNode; props?: any }) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export default List;
