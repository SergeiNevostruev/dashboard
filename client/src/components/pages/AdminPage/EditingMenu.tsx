import { PointsIcon } from '../../common/Icons';
import style from './AdminPage.module.scss';

const EditingMenu = () => {
  return (
    <div
      onClick={() => console.log('кнопка редактирования')}
      role="button"
      className={`${style.button_editingmenu} ${style.header_tableabs_5}`}>
      <PointsIcon />
    </div>
  );
};

export default EditingMenu;
