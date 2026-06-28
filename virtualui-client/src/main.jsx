import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Toaster } from "sonner";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      

       <App />

    <Toaster
  position="top-right"
  richColors
  closeButton
  theme="dark"
/>
    </Provider>
   
    </BrowserRouter>
  </StrictMode>,
)
