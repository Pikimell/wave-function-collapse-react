import { useDispatch, useSelector } from 'react-redux';
import style from './Rules.module.css';
import { useState } from 'react';
import { selectFrames } from '../../../redux/frames/selector';
import FrameBlock from '../../custom/FrameBlock/FrameBlock';
import SelectFrame from '../../custom/SelectFrame/SelectFrame';
import { addRule } from '../../../redux/frames/slice';

const Rules = ({ frame, type = 'left' }) => {
  const dispatch = useDispatch();
  const frames = useSelector(selectFrames);
  const ruleList = frame.rules[type];

  const handleSave = currentFrameId => {
    if (currentFrameId) {
      const data = {
        oldFrame: frame,
        frameId: frame.id,
        ruleType: type,
        ruleValue: currentFrameId,
      };
      dispatch(addRule(data));
    }
  };

  return (
    <div className={style['rule-container']}>
      <p className={style.title}>{type.toUpperCase()}</p>
      <div className={style.line}></div>
      <ul className={style.list}>
        <li className={style['frame-container']}>
          <SelectFrame blackList={ruleList} onSave={handleSave} />
        </li>
        {ruleList.toReversed().map(frameId => {
          const frame = frames[frameId];
          return (
            <li key={frameId} className={style['frame-container']}>
              <FrameBlock frame={frame} onClick={() => {}} showActive={false} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Rules;