
import './App.scss'
import './styles/global.scss';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './contexts/ThemeContext';
import { PageProvider } from './contexts/PageContext';
import { UserProvider } from './contexts/UserContext';
import { GlobalProvider } from './contexts/NotifContext';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Toast from './utils/Toast';
import RoutesList from './routes';

function App() {
  return (
    <GlobalProvider>
      <MantineProvider defaultColorScheme="auto">
        <UserProvider>
          <PageProvider>
            <ThemeProvider>
              <Toast message={'test'} type={'success'} duration={4000} open={true}></Toast>
              <div style={{ height: '100%', width: `100%` }} className='bg-MainColor'>
                <AppRoutes />
              </div>
            </ThemeProvider>
          </PageProvider>
        </UserProvider>
      </MantineProvider>
    </GlobalProvider>

  )

}

export default App