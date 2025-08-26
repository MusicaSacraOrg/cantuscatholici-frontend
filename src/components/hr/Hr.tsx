import { useBem } from '@musica-sacra/hooks';

type HrProps = {
    className?: string;
};

export function Hr({ className = '' }: HrProps) {
    const { bem, base } = useBem('hr');

    return <div className={bem(base, { [className]: true })}></div>;
}
