import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card.tsx';
import { Button } from '../../ui/button.tsx';
import { Input } from '../../ui/input.tsx';

export const CutOrderList = ({ onOrderSelect }) => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://arteyconfecciones.com/api/cut-orders/state');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const filteredOrders = orders.filter(order =>
        order.Id.toString().includes(searchTerm.toLowerCase()) ||
        order.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.observation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Órdenes de Corte</CardTitle>
                <Button onClick={() => onOrderSelect(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Orden
                </Button>
            </CardHeader>
            <CardContent>
                <div className="mb-4 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Buscar órdenes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="border rounded-lg">
                    <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b">
                        <div className="font-semibold">ID</div>
                        <div className="font-semibold">Creado Por</div>
                        <div className="font-semibold col-span-2">Observaciones</div>
                        <div className="font-semibold text-right">Acciones</div>
                    </div>

                    {filteredOrders.map(order => (
                        <div key={order.Id} className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50">
                            <div>{order.Id}</div>
                            <div>{order.createdBy}</div>
                            <div className="col-span-2 truncate">{order.observation}</div>
                            <div className="text-right">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onOrderSelect(order)}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Ver Detalles
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};