import {Outlet} from 'react-router-dom'

const ComicLayout = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default ComicLayout;
