import { useNavigate } from 'react-router-dom';
import style from './AdminPage.module.scss';
import { BackIcon } from '../../common/Icons';
import AbsForm from './AbsForm';

type AbsPropType = {
  id: string;
  title?: string;
};

const Abs = ({ id, title }: AbsPropType) => {
  const navigate = useNavigate();

  return (
    <section className={style.main_section}>
      <div className={style.back_button} role="button" onClick={() => navigate(-1)}>
        <BackIcon />
        <span>Вернуться назад</span>
      </div>
      <AbsForm defaultValue={undefined} />
    </section>
  );
};

export default Abs;
