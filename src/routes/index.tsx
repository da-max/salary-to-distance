import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

const routes = createBrowserRouter([
    {
        element: <Home />,
        path: '/salary-to-distance',
    },
])

export default routes
