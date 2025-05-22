import { type FC } from 'react';
import styles from './footer.module.scss';
import gitHubIcon from '@/icons/githubLogo.png';

const FooterComponnent: FC = () => {
  return (
    <footer className={styles.footerBlock}>
      <a className={styles.GithubLink} href="https://github.com/grand3680/graphCalc">
        <img className={styles.footerGitHubIconImg} src={gitHubIcon} alt="" />
      </a>
    </footer>
  );
};

export default FooterComponnent;
