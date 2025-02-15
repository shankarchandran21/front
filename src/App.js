import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthPage, TaskDisplayPage } from "./pages";
import Layout from "./layout/layout";
import { useEffect } from "react";
import { setNavigateFunction } from "./service";
function App() {
    const navigate = useNavigate();
    useEffect(() => {
        setNavigateFunction(navigate);
    }, [navigate]);
    return (_jsx(_Fragment, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Layout, {}), children: _jsx(Route, { index: true, element: _jsx(TaskDisplayPage, {}) }) }), _jsx(Route, { path: "/auth", element: _jsx(AuthPage, {}) })] }) }));
}
export default App;
