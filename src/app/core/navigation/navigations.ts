import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'Administration ',
        titleLabel: 'navigation.administration.title',
        subtitleLabel: 'navigation.administration.subtitle',
        type: 'group',
        children: [
            {
                id: 'master',
                titleLabel: 'navigation.administration.master.title',
                type: 'collapsable',
                icon: 'mat_outline:table_view',
                children: [
                    {
                        id: 'anomalyDetection',
                        titleLabel: 'navigation.administration.master.anomalyDetection',
                        type: 'basic',
                        icon: 'mat_outline:insert_chart_outlined',
                        link: '/masters/app-log-anomaly-detection'
                    }
                ]
            }
        ]
    }
];
