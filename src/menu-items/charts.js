// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'charts',
    title: <FormattedMessage id="charts" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'charts',
            title: <FormattedMessage id="charts" />,
            type: 'item',
            url: '/dashboard/chart',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
