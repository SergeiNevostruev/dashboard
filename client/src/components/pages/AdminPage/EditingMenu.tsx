import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetUserDataInfo, GetUserToken } from '../../../toolkit/auth/selectors';
import { DelIcon, EditIcon, EyeIcon, PointsIcon } from '../../common/Icons';
import style from './AdminPage.module.scss';

const EditingMenu = ({ id, Clicker }: { id: string; Clicker: any }) => {
  const token = useSelector(GetUserToken);
  const user = useSelector(GetUserDataInfo);
  const scope = user.scope;
  const admin = scope === 'admin' ? true : false; // получаем флаг админ

  const onClick = Clicker(id, token);
  return (
    <div
      onClick={() => console.log('кнопка редактирования')}
      role="button"
      className={`${style.button_editingmenu} ${style.header_tableabs_5}`}>
      <PointsIcon />
      <div className={style.menu}>
        <Link to={`/cardproduct/${id}`}>
          <EyeIcon /> Просмотр
        </Link>
        {!admin && (
          <Link to={`/admin/edit/${id}`}>
            <EditIcon /> Редактировать
          </Link>
        )}
        <div role="button" onClick={onClick}>
          <DelIcon />
          Удалить
        </div>
      </div>
    </div>
  );
};

export default EditingMenu;
