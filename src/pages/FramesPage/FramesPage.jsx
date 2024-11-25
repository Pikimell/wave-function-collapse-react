import FrameList from '../../components/FrameList/FrameList';
import FramePreview from '../../components/FramePreview/FramePreview';
import FrameRules from '../../components/FrameRules/FrameRules';
import style from './FramesPage.module.css';

const FramesPage = () => {
  return (
    <section className={style.page}>
      <div className={style['base-container']}>
        <FrameList />
        <FrameRules />
      </div>

      <FramePreview />
    </section>
  );
};

export default FramesPage;
