import style from './TopBlock.module.scss';
import cart from '../../../../assets/img/cart.png';

const TopBlock = () => {
  return (
    <div className={style.top_block}>
      <div className={style.container}>
        <div className={style.title}>
          <h1>Доска объявлений</h1>
          <p>
            Находи тысячи разнообразных товаров и услуг от продавцов со всей страны. Безопасные
            расчеты. Удобный сервис доставки
          </p>
        </div>
        <div className={style.image}>
          <img src={cart} alt="Тележка" className={style.img2} />
        </div>
      </div>
    </div>
  );
};

export default TopBlock;
