import { Flex } from 'antd';
import Instruction from '../../components/Instruction/Instruction';
import style from './HomePage.module.css';
import { useState } from 'react';

const HomePage = ({}) => {
  return (
    <Flex vertical gap="20px">
      <Instruction />
    </Flex>
  );
};

export default HomePage;
