import React from 'react'
import reactDOM from 'react-dom'
import "./index.css";
import "./components/Popular"
import { ThemeProvider } from './context/theme'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import {
            BrowserRouter as Router,
            Routes,
            Route,
        } from 'react-router-dom'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

class App extends React.Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(( {theme} ) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }
    render(){
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />
                            <React.Suspense fallback={<Loading />}>
                                <Routes>
                                    <Route path='/' element={<Popular />}/>
                                    <Route path='/battle' element={<Battle/>}/>
                                    <Route path='/battle/results' element={<Results/>}/>
                                    <Route path='*' element={<NotFound/>}/>
                                </Routes>
                            </React.Suspense>

                        </div> 
                    </div>
                </ThemeProvider>
            </Router>
        )   
    }
}

reactDOM.render(
    <App />,

    document.getElementById('app')
)