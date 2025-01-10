import React, { useEffect, useMemo, useState } from 'react';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import { Button } from "../ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import { Input } from "../ui/input.tsx";
import { Select } from "../ui/Select.tsx";

export const MovementList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentView, setCurrentView] = useState('list');
    const [loading, setLoading] = useState(false);

    const API_URL = 'https://arteyconfecciones.com/api/movements';
    const PRODUCTS_URL = 'https://arteyconfecciones.com/api/product/stock';

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(PRODUCTS_URL);
            const data = await response.json();
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const createMovement = async (movement) => {
        try {
            setLoading(true);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movement),
            });
            if (!response.ok) throw new Error('Error creating movement');
            await fetchProducts();
        } catch (error) {
            console.error('Error creating movement:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const movement = {
            type: 'entrada',
            quantity: parseFloat(formData.get('quantity')),
            unitmeasure: formData.get('unitmeasure'),
            reason: formData.get('reason'),
            ProductId: parseInt(formData.get('productId')),
        };

        createMovement(movement);
        setCurrentView('list');
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const getLastMovementDate = (movements) => {
        if (!movements || movements.length === 0) return 'Sin movimientos';
        const lastEntry = movements
            .filter((movement) => movement.Type === 'entrada')
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Ordenar por fecha
            .pop(); // Tomar el último
        return lastEntry ? new Date(lastEntry.createdAt).toLocaleDateString() : 'Sin entradas';
    };


    const filteredProducts = useMemo(() => {
        const searchTerm = search.toLowerCase().trim();
        if (!searchTerm) return products;

        return products.filter(
            (product) =>
                product.Name.toLowerCase().includes(searchTerm) ||
                product.Description?.toLowerCase().includes(searchTerm) ||
                product.Price.toString().toLowerCase().includes(searchTerm) || // Convertir a string
                product.currentStock.toString().toLowerCase().includes(searchTerm) // Convertir a string
        );
    }, [products, search]);


    if (currentView === 'form') {
        return (
            <Card className="w-full max-w-4xl mx-auto mt-8">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentView('list')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle>Nueva Entrada de Producto</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Select
                                name="productId"
                                required
                            >
                                <option value="">Seleccionar Producto</option>
                                {products.map((product) => (
                                    <option key={product.Id} value={product.Id}>
                                        {product.Name} - Stock actual: {product.currentStock}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Input
                                type="number"
                                name="quantity"
                                placeholder="Cantidad"
                                step="0.01"
                                required
                            />
                        </div>
                        <div>
                            <Select
                                name="unitmeasure"
                                required
                            >
                                <option value="">Seleccionar Unidad de Medida</option>
                                <option value="unidad">Unidad</option>
                                <option value="kg">Kilogramos</option>
                                <option value="m">Metros</option>
                                <option value="l">Litros</option>
                            </Select>
                        </div>
                        <div>
                            <textarea
                                name="reason"
                                placeholder="Razón de entrada"
                                className="w-full min-h-[100px] p-2 border rounded-md"
                                required
                            ></textarea>
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Guardando...' : 'Registrar Entrada'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCurrentView('list')}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-4xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Inventario de Productos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Input
                            placeholder="Buscar producto..."
                            value={search}
                            onChange={handleSearch}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <Button
                        className="flex items-center gap-2"
                        onClick={() => setCurrentView('form')}
                    >
                        <Plus className="h-4 w-4" />
                        Nueva Entrada
                    </Button>
                </div>
                <div className="border rounded-lg">
                    <div className="min-w-full">
                        <div className="border-b">
                            <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50">
                                <div className="font-medium text-sm text-gray-500">Producto</div>
                                <div className="font-medium text-sm text-gray-500">Descripción</div>
                                <div className="font-medium text-sm text-gray-500">Precio</div>
                                <div className="font-medium text-sm text-gray-500">Stock Actual</div>
                                <div className="font-medium text-sm text-gray-500">Última Entrada</div>
                                <div className="font-medium text-sm text-gray-500">Total Movimientos</div>
                            </div>
                        </div>
                        <div>
                            {filteredProducts?.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div
                                        key={product.Id}
                                        className="grid grid-cols-6 gap-4 px-6 py-4 border-b last:border-b-0 hover:bg-gray-50"
                                    >
                                        <div className="font-medium">{product.Name}</div>
                                        <div className="truncate">{product.Description}</div>
                                        <div>${parseFloat(product.Price).toFixed(2)}</div>
                                        <div className={`font-medium ${product.currentStock <= 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {product.currentStock}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <div className="text-sm text-gray-600">
                                                {getLastMovementDate(product.movements)}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {product.movements.length}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-gray-500 p-6">
                                    No se encontraron productos.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};