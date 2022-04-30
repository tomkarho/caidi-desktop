import {ReactElement} from 'react';
import {useAppSelector} from '../core/hooks';

interface PageParams {
    readonly children: ReactElement;
    readonly className: string;
}

function Page({children, className}: PageParams) {
    const darkMode = useAppSelector(state => state.settings.darkMode);

    return (
        <div className={`page ${className} ${darkMode ? 'dark' : ''}`}>
            {children}
        </div>
    );
}

export default Page;