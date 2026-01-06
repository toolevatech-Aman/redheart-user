
import './App.css';
import { BrowserRouter, useNavigate } from "react-router-dom";
import AxiosInterceptorProvider from './interceptors/axiosInterceptorProvider';
import Router from './router';
import ScrollToTop from "./ScrollToTop";
import CookieBanner from './cookiesBanner';
import WhatsAppWeget from './whatsappWidget';

function AppContent() {

  return (
   <ScrollToTop>
   
        <Router />
      
    </ScrollToTop>
  );
}
function App() {
  return (

      <BrowserRouter>
        <AxiosInterceptorProvider>
          <WhatsAppWeget/>
        <CookieBanner/>
          <AppContent />
   
        </AxiosInterceptorProvider>
      </BrowserRouter>

  );
}

export default App;
