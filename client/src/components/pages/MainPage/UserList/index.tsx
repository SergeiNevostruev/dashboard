import React, { useEffect, useRef } from 'react';
import UserListItem from './UserListItem';
import style from './UserList.module.scss';

type UserListPropsType = {
  data: { id: number; name: string; age: string }[];
};
const UserList = ({ data }: UserListPropsType) => {
  const clickHandler = () => {
    console.log('CLICK');
  };
  useEffect(() => {
    console.log('USER_LIST - MOUNT');
    document.addEventListener('click', clickHandler);

    return () => {
      console.log('USER_LIST - UNMOUNT');
      document.removeEventListener('click', clickHandler);
    };
  }, []);

  const ref = useRef<HTMLUListElement>(null);
  console.log(ref.current);

  const scrollToTop = () => {
    ref.current?.scroll(0, 0);
  };

  return (
    <>
      <ul ref={ref} className={style.wrapper}>
        {data.map((el) => (
          <UserListItem key={el.id} name={el.name} />
        ))}
      </ul>
      <button type="button" onClick={scrollToTop}>
        SCROLL TOP
      </button>
    </>
  );
};

export default UserList;
