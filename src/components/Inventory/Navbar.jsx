import React from 'react';
import {
    Home,
    Package,
    Users,
    Scissors,
    Menu,
    X, LogOut
} from 'lucide-react';
import {Button} from "../ui/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addUser} from "../../redux/slice/userSlice.js";

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate()
    const menuItems = [
        {icon: <Home className="h-4 w-4"/>, title: 'Inicio', path: '/calidad/corte'},
        {icon: <Package className="h-4 w-4"/>, title: 'Productos', path: '/productos'},
        {icon: <Users className="h-4 w-4"/>, title: 'Proveedores', path: '/provedores'},

        {icon: <Scissors className="h-4 w-4"/>, title: 'Ordenes de Corte', path: '/orden/corde'},
        {icon: <Scissors className="h-4 w-4"/>, title: 'Calidad de Corte', path: '/calidad/corte'},
    ];
//{icon: <BarChart2 className="h-4 w-4"/>, title: 'Estadísticas', path: '/estadisticas'},
    const dispatch = useDispatch()
    const Logout=()=>{
        dispatch(addUser({name:" ",role:" "}))
    }
    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-xl font-semibold">Mi Sistema</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {menuItems.map((item) => (
                            <Button
                                key={item.path}
                                variant="ghost"
                                className="flex items-center gap-2"
                                onClick={() => navigate(item.path)}
                            >
                                {item.icon}
                                {item.title}
                            </Button>
                        ))}
                        <Button
                            variant="ghost"
                            className="flex items-center gap-2"
                            onClick={Logout}
                        >
                            <LogOut className="h-4 w-4"/>
                            Salir
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <X className="h-6 w-6"/>
                            ) : (
                                <Menu className="h-6 w-6"/>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {menuItems.map((item) => (
                            <Button
                                key={item.path}
                                variant="ghost"
                                className="w-full flex items-center gap-2 justify-start"
                                onClick={() => {
                                    console.log(`Navigate to ${item.path}`);
                                    setIsOpen(false);
                                }}
                            >
                                {item.icon}
                                {item.title}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};