import { type FC, useEffect, useRef, useState } from 'react';
import styles from './styles/graphMenu.module.scss';
import homeIcon from '@/icons/home.png';
import scalePlusIcon from '@/icons/scalePlus.png';
import scaleMinusIcon from '@/icons/scaleMinus.png';
import settingsIcon from '@/icons/settings.png';
import clsx from 'clsx';
import { typeGridT } from '../graph/classes/graphDraw';
import { graph } from '../graph/classes';

const RightMenu: FC<{ GraphInst: graph }> = ({ GraphInst }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [activeGrid, setActiveGrid] = useState<typeGridT>('grid');

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setActiveMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onClickHome = () => {
    GraphInst.resetPos();
  };

  const onClickScale = (dY: number) => {
    GraphInst.scaleClick(dY);
  };

  const onClickGrid = (type: typeGridT) => {
    GraphInst.drawGraph.typeGrid = type;
    GraphInst.start();
    setActiveGrid(type);
  };

  return (
    <aside className={styles.RightElement}>
      <button onClick={() => setActiveMenu((prev) => !prev)} className={styles.HomePage}>
        <img src={settingsIcon} alt="settings" />
      </button>
      <div
        ref={popupRef}
        className={clsx(styles.dragMenu, activeMenu ? styles.activeMenu : styles.disableMenu)}
      >
        <h2>Settings</h2>
        <div>
          <h3>grid</h3>
          <span className={styles.chooseGrid}>
            <p>polar grid</p>
            <input
              checked={activeGrid == 'polar'}
              name="grid"
              onClick={() => onClickGrid('polar')}
              type="radio"
            />
          </span>
          <span className={styles.chooseGrid}>
            <p>Normal grid</p>
            <input
              checked={activeGrid == 'grid'}
              name="grid"
              onClick={() => onClickGrid('grid')}
              type="radio"
            />
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
    </aside>
  );
};

export default RightMenu;
