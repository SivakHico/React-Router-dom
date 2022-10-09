import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root'
import Pokemons from './routes/Pokemons'
import Error from './routes/Error'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
