import Canvas from '../../components/Canvas/Canvas';
import GenerateMenu from '../../components/GenerateMenu/GenerateMenu';
import style from './GeneratePage.module.css';
import { useState } from 'react';

const GeneratePage = ({}) => {
  return (
    <div className={style.page}>
      <GenerateMenu />
      <Canvas />
    </div>
  );
};

export default GeneratePage;
