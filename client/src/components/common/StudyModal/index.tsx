import { Button, notification } from 'antd';
import React from 'react';

const close = () => {
  console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

export const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Хорошо
    </Button>
  );
  notification.open({
    message: 'Внимание',
    description: 'Вы находитесь на учебном сайте. Пожалуйста, не ломайте здесь ничего)))',
    btn,
    key,
    duration: 0,
    onClose: close,
  });
};
