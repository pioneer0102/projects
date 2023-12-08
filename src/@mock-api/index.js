import './api/auth-api';
import './api/notifications-api';
import './api/orders-api';
import './api/inventory-api';
import './api/insights/channel-api';
import './api/settings/pos-api';
import './api/settings/user-api';
import history from '@history';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}
