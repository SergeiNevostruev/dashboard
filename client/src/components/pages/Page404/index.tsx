import img404 from '../../../assets/img/404.svg';
import style from './Page404.module.scss';

const Page404 = () => {
  return (
    <div className={style.page404}>
      <div>
        <h1>Упс! Кажется, на эту страницу прилег котик</h1>
        <p>Ошибка 404</p>
        <p>Мы уже разбираемся, почему так получилось, скоро все починим.</p>
      </div>
      <img src={img404} alt="404" />
    </div>
  );
};

export default Page404;
