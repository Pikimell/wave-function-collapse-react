import TileList from '../../components/TileList/TileList';
import TilePreview from '../../components/TilePreview/TilePreview';
import TileRules from '../../components/TileRules/TileRules';
import style from './TilesPage.module.css';

const TilesPage = () => {
  return (
    <section className={style.page}>
      <div className={style['base-container']}>
        <TileList />
        <TileRules />
      </div>

      <TilePreview />
    </section>
  );
};

export default TilesPage;
