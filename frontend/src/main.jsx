import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import 'sweetalert2/dist/sweetalert2.js'
import { AuthProvide } from './context/AuthContext'  // ✅ import AuthProvide

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvide> {/* ✅ wrap RouterProvider */}
        <RouterProvider router={router} />
      </AuthProvide>
    </Provider>
  </StrictMode>
)
