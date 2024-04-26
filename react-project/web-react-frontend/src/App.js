import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import RoutNotFoundPage from "./page/RoutNotFoundPage";
import MainLayout from "./component/layout/MainLayout";
import MainLayoutLogin from "./component/layout/MainLayoutLogin";
import CategoryPage from "./page/CategoryPage";
import OrderStatusPage from "./page/OrderStatusPage";
import PaymentMethodPage from "./page/PaymentMethodPage";
import RolePage from "./page/RolePage";
import EmployeePage from "./page/EmployeePage";
import CustomerPage from "./page/CustomerPage";
import ProductPage from "./page/ProductPage";
import POSPage from "./page/POSPage";
import InvoicePage from "./page/InvoicePage";

function App() {
  return (
    <BrowserRouter>
        <Routes>

          <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage />}/>
            <Route path="/customer" element={<CustomerPage />}/>
            <Route path="/employee" element={<EmployeePage/>}/>
            <Route path="/product" element={<ProductPage />}/>
            <Route path="/pos" element={<POSPage />}/>
            <Route path="/invoice" element={<InvoicePage />}/>
            <Route path="/category" element={<CategoryPage />}/>
            <Route path="/order-status" element={<OrderStatusPage />}/>
            <Route path="/payment-method" element={<PaymentMethodPage />}/>
            <Route path="/role" element={<RolePage />}/>
            <Route path="*" element={<RoutNotFoundPage/>} />
          </Route>

          <Route element={<MainLayoutLogin/>}>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="*" element={<LoginPage/>} />
          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
