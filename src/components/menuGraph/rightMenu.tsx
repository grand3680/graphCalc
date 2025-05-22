import { type FC, useContext, useEffect, useRef, useState } from 'react';
import styles from './styles/graphMenu.module.scss';
import MyContext from '../MyContext';
import homeIcon from '../../icons/home.png';
import scalePlusIcon from '../../icons/scalePlus.png';
import scaleMinusIcon from '../../icons/scaleMinus.png';
import settingsIcon from '../../icons/settings.png';

const RightMenu: FC = () => {
  const { graph: GraphInst } = useContext(MyContext);
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  const handleClickOutside = (event: React.MouseEvent<Document>) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setActiveMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    };
  }, []);

  const onClickHome = () => {
    if (!GraphInst) return;
    GraphInst.resetPos();
  };

  const onClickScale = (dY: number) => {
    if (!GraphInst) return;
    GraphInst.scaleClick(dY);
  };

  const onClickGrid = (type: string) => {
    if (!GraphInst) return;
    GraphInst.drawGraph.typeGridSet = type;
    GraphInst.start();
  };

  return (
    <>
      <div className={styles.RightElement}>
        <button onClick={() => setActiveMenu(!activeMenu)} className={styles.HomePage}>
          <img src={settingsIcon} alt="settings" />
        </button>
        <div
          ref={popupRef}
          className={`${styles.dragMenu} ${activeMenu ? styles.activeMenu : styles.disableMenu}`}
        >
          <h2>Settings</h2>
          <div>
            <h3>grid</h3>
            <span className={styles.chooseGrid}>
              <p>polar grid</p>
              <input name="grid" onClick={() => onClickGrid('polar')} type="radio" />
            </span>
            <span className={styles.chooseGrid}>
              <p>Normal grid</p>
              <input checked name="grid" onClick={() => onClickGrid('grid')} type="radio" />
            </span>
          </div>
        </div>

        <div className={styles.scaleBlock}>
          <button className={styles.scalePage} onClick={() => onClickScale(-50)}>
            <img src={scalePlusIcon} alt="scalePlus" />
          </button>
          <button className={styles.scalePage} onClick={() => onClickScale(50)}>
            <img src={scaleMinusIcon} alt="sclaeMinus" />
          </button>
        </div>

        <button onClick={onClickHome} className={styles.HomePage}>
          <img src={homeIcon} alt="home" />
        </button>
      </div>
    </>
  );
};

export default RightMenu;
