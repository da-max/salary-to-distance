import 'leaflet/dist/leaflet.css'
import './App.css'
import Panel from './components/Panel'

function App() {
    return (
        <main className={'min-h-screen flex justify-between'}>
            <Panel />
            <div className={'flex-1'}></div>
        </main>
    )
}

export default App
