import '../assets/feather/feather.css'
import '../assets/ti-icons/css/themify-icons.css'
import '../styles/template/style.css'

//* Toast Notification Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//* Redux Store & Provider
import { Provider } from 'react-redux';
import store from '../redux/store'

//! Remove in production
import { ReactQueryDevtools } from 'react-query/devtools'

import DefaultLayout from '../components/layout/default';

//* Progress bar configuration
import Router from 'next/router'
import NProgress from 'nprogress'
import "../styles/nprogress.css";
import "nprogress/nprogress.css";

import { QueryClientProvider, QueryClient } from 'react-query';

function MyApp({ Component, pageProps }) {

  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

  NProgress.configure({ showSpinner: false })

  const Layout = Component.Layout || DefaultLayout;
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
