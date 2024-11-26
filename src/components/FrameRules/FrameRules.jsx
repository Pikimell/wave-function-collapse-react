import { useSelector } from 'react-redux';
import style from './FrameRules.module.css';
import { useState } from 'react';
import { selectCurrentFrame } from '../../redux/frames/selector';
import Rules from './Rules/Rules';

const FrameRules = () => {
  const frame = useSelector(selectCurrentFrame);

  return (
    <div className={style.container}>
      <h4 className={style.title}>RULES</h4>

      {frame && (
        <ul className={style['rules-list']}>
          <li>
            <Rules frame={frame} type="up" onSelect={null} />
          </li>
          <li>
            <Rules frame={frame} type="down" onSelect={null} />
          </li>
          <li>
            <Rules frame={frame} type="left" onSelect={null} />
          </li>
          <li>
            <Rules frame={frame} type="right" onSelect={null} />
          </li>
        </ul>
      )}
    </div>
  );
};

export default FrameRules;
