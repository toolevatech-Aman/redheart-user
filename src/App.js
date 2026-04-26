
import './App.css';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AxiosInterceptorProvider from './interceptors/axiosInterceptorProvider';
import Router from './router';
import ScrollToTop from "./ScrollToTop";
import CookieBanner from './cookiesBanner';
import WhatsAppWeget from './whatsappWidget';
import ToastContainer from './comman/toaster-message/toasterMessage';

// function AppContent() {

//   return (
//    <ScrollToTop>
   
//         <Router />
      
//     </ScrollToTop>
//   );
// }
function App() {
  return (
		<HelmetProvider>
			<BrowserRouter>
				<AxiosInterceptorProvider>
					<WhatsAppWeget />
					<CookieBanner />
					<ToastContainer />

					<ScrollToTop>
						<Router />
					</ScrollToTop>
				</AxiosInterceptorProvider>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
