import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  ClearSearchProductHeaderAction,
  getDataSearchProductHeader,
} from '../../../../toolkit/searchHeader/searchHeader';
import style from './SearchField.module.scss';

const SearchField = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const handler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      dispatch(getDataSearchProductHeader({ search: value, page: 1, count: 5 }));
    } else {
      dispatch(ClearSearchProductHeaderAction());
    }
    navigate('/search', { state: value });
    console.log('искать');
  };

  return (
    <div className={style.d1}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
          stroke="#424242"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.9999 21.0004L16.6499 16.6504"
          stroke="#424242"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="search" name="search" value={value} onChange={handler} />
        <button type="submit">Искать</button>
      </form>
    </div>
  );
};

export default SearchField;
