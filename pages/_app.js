import '../assets/feather/feather.css'
import '../assets/ti-icons/css/themify-icons.css'
import '../styles/template/style.css'

//* Toast Notification Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//* Redux Store & Provider
import { Provider } from 'react-redux';
import store from '../redux/store'


import DefaultLayout from '../components/layout/default';

//* Progress bar configuration
import Router from 'next/router'
import NProgress from 'nprogress'
import "../styles/nprogress.css";
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }) {

  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done())

  NProgress.configure({ showSpinner: false })

  const Layout = Component.Layout || DefaultLayout;
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </Provider>
    </>
  )
}

export default MyApp
