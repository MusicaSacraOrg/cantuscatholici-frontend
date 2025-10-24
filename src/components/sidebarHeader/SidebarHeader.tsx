import { useBem } from '@musica-sacra/hooks';

type SidebarHeaderProps = {
    title: string;
    subtitle?: string;
};

export function SidebarHeader({ title, subtitle }: SidebarHeaderProps) {
    const { bem } = useBem('sidebar-header');

    return (
        <div className={bem()}>
            <div className={bem('title')}>{title}</div>
            {subtitle && <div className={bem('subtitle')}>{subtitle}</div>}
        </div>
    );
}
