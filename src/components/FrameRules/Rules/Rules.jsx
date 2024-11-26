import { useSelector } from 'react-redux';
import style from './Rules.module.css';
import { useState } from 'react';
import { selectFrames } from '../../../redux/frames/selector';
import FrameBlock from '../../custom/FrameBlock/FrameBlock';
import SelectFrame from '../../custom/SelectFrame/SelectFrame';

const Rules = ({ frame, type = 'left', onSelect }) => {
  const frames = useSelector(selectFrames);
  const ruleList = frame.rules[type];

  return (
    <div className={style['rule-container']}>
      <p className={style.title}>{type.toUpperCase()}</p>
      <div className={style.line}></div>
      <ul className={style.list}>
        {ruleList.map(frameId => {
          const frame = frames[frameId];
          return (
            <li key={frameId} className={style['frame-container']}>
              <FrameBlock frame={frame} onClick={() => {}} showActive={false} />
            </li>
          );
        })}
        <SelectFrame blackList={ruleList} />
      </ul>
    </div>
  );
};

export default Rules;
