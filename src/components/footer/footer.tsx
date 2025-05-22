import { type FC } from 'react';
import styles from './styles/footer.module.scss';
import gitHubIcon from '../../icons/githubLogo.png';

export const FooterComponnent: FC = () => {
  return (
    <>
      <div className={styles.footerBlock}>
        <a className={styles.GithubLink} href="https://github.com/grand3680/graphCalc">
          <img className={styles.footerGitHubIconImg} src={gitHubIcon} alt="" />
        </a>
      </div>
    </>
  );
};

export default FooterComponnent;
