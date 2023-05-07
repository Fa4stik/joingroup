import Cutaway from "../Pages/Cutaway/Cutaway";
import Registration from "../Pages/Registration/Registration";
import Primary from "../Pages/Primary/Primary";
import UserChat from "../Pages/UserChat/UserChat";
import CompanyChat from "../Pages/CompanyChat/CompanyChat";
import Analysis from "../Pages/Analysis/Analysis";
import Settings from "../Pages/Settings/Settings";
import Test from "../Pages/Test/Test";

export const privateRouters = [
    {path: '/', component: <Cutaway/>},
    {path: '/registration', component: <Registration/>},
    {path: '/primary', component: <Primary/>},
    {path: '/userchat', component: <UserChat/>},
    {path: '/companychat', component: <CompanyChat/>},
    {path: '/analysis', component: <Analysis/>},
    {path: '/settings', component: <Settings/>},
    {path: '/test', component: <Test/>},
]

// relis public and private route