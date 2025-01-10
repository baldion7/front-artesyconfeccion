import React, {useEffect, useMemo, useState} from 'react';
import {Search, Plus, Pencil, ArrowLeft} from 'lucide-react';

import {Button} from "../ui/button.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card.tsx";
import {Input} from "../ui/input.tsx";
import {Textarea} from "../ui/Textarea.tsx";
import {DeleteConfirmationModal} from "../Inventory/DeleteConfirmationModal.jsx";

const DEFAULT_SIZES = ['U','XXXS/2','XXS/4','XS/6', 'S/8', 'M/10', 'L/12', 'XL/14', 'XXL/16','XXXL/18'];

// Función para formatear números con puntos cada tres dígitos
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Función para quitar los puntos de un número formateado
const unformatNumber = (str) => {
    return parseFloat(str.replace(/\./g, ""));
};

const initialCutDetailState = {
    reference: '',
    brand: '',
    color: '',
    pricePerPiece: '',
    sizes: DEFAULT_SIZES.reduce((acc, size) => ({...acc, [size]: {id: null, quantity: 0}}), {}),
};

export const CutOrderList = () => {
    const [cutOrders, setCutOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [currentView, setCurrentView] = useState('list');
    const [currentOrder, setCurrentOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cutDetails, setCutDetails] = useState([initialCutDetailState]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCutOrderIndex, setSelectedCutDetailIndex] = useState(null);

    const API_URL = 'https://arteyconfecciones.com/api/cut-orders';
    const API_DETAILS_URL = 'https://arteyconfecciones.com/api/cut-details';
    const API_SIZES_URL = 'https://arteyconfecciones.com/api/cut-sizes';

    useEffect(() => {
        fetchCutOrders();
    }, []);

    const fetchCutOrders = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setCutOrders(data || []);
        } catch (error) {
            console.error('Error fetching cut orders:', error);
        }
    };

    const createCutOrder = async (order) => {
        try {
            setLoading(true);
            // Primera llamada API para crear la orden de corte
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    createdBy: order.createdBy,
                    observation: order.observation
                }),
            });
            if (!response.ok) throw new Error('Error creating cut order');
            const data = await response.json();
            const cutOrderId = data.newCutOrder.Id;

            // Enviar cada detalle individualmente
            for (const detail of order.cutDetails) {
                // Calcular el total de piezas sumando las cantidades de cada talla
                const totalPieces = Object.values(detail.sizes).reduce((sum, sizeData) => sum + (sizeData.quantity || 0), 0);

                // Calcular el precio total multiplicando el precio por pieza por el total de piezas
                const pricePerPiece = unformatNumber(detail.pricePerPiece.toString());
                const totalPrice = pricePerPiece * totalPieces;

                const detailResponse = await fetch(API_DETAILS_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        reference: detail.reference,
                        brand: detail.brand,
                        color: detail.color,
                        totalPieces: totalPieces,
                        pricePerPiece: pricePerPiece,
                        totalPrice: totalPrice,
                        cutOrderId: cutOrderId
                    }),
                });

                if (!detailResponse.ok) throw new Error('Error creating cut detail');

                const detailData = await detailResponse.json();
                const cutDetailId = detailData.Id;

                // Enviar cada talla individualmente
                for (const [size, sizeData] of Object.entries(detail.sizes)) {
                    if (sizeData.quantity > 0) { // Solo enviar si la cantidad es mayor a 0
                        const sizeResponse = await fetch(API_SIZES_URL, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                Size: size,
                                Quantity: sizeData.quantity,
                                cutDetailId: cutDetailId
                            }),
                        });

                        if (!sizeResponse.ok) throw new Error('Error creating cut size');
                    }
                }
            }

            await fetchCutOrders();
            resetForm();
        } catch (error) {
            console.error('Error in create cut order process:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateCutOrder = async (order) => {
        try {
            setLoading(true);
            // Update the main CutOrder
            const response = await fetch(`${API_URL}/${order.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    createdBy: order.createdBy,
                    observation: order.observation
                }),
            });
            if (!response.ok) throw new Error('Error updating cut order');

            // Update each CutDetail
            for (const detail of order.cutDetails) {
                if (detail.Id) {
                    // Update existing detail
                    const detailResponse = await fetch(`${API_DETAILS_URL}/${detail.Id}`, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            reference: detail.reference,
                            brand: detail.brand,
                            color: detail.color,
                            totalPieces: Object.values(detail.sizes).reduce((sum, size) => sum + size.quantity, 0),
                            pricePerPiece: detail.pricePerPiece,
                            totalPrice: detail.pricePerPiece * Object.values(detail.sizes).reduce((sum, size) => sum + size.quantity, 0),
                        }),
                    });
                    if (!detailResponse.ok) throw new Error('Error updating cut detail');

                    // Update CutSizes for existing detail
                    for (const [size, sizeData] of Object.entries(detail.sizes)) {
                        if (sizeData.id) {
                            // Update existing size
                            const sizeResponse = await fetch(`${API_SIZES_URL}/${sizeData.id}`, {
                                method: 'PUT',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    Quantity: sizeData.quantity,
                                }),
                            });
                            if (!sizeResponse.ok) throw new Error('Error updating cut size');
                        } else if (sizeData.quantity > 0) {
                            // Create new size if quantity > 0
                            const sizeResponse = await fetch(API_SIZES_URL, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    Size: size,
                                    Quantity: sizeData.quantity,
                                    cutDetailId: detail.Id
                                }),
                            });
                            if (!sizeResponse.ok) throw new Error('Error creating new cut size');
                        }
                    }
                } else {
                    // Create new detail
                    const detailResponse = await fetch(API_DETAILS_URL, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            reference: detail.reference,
                            brand: detail.brand,
                            color: detail.color,
                            totalPieces: Object.values(detail.sizes).reduce((sum, size) => sum + size.quantity, 0),
                            pricePerPiece: detail.pricePerPiece,
                            totalPrice: detail.pricePerPiece * Object.values(detail.sizes).reduce((sum, size) => sum + size.quantity, 0),
                            cutOrderId: order.id
                        }),
                    });

                    if (!detailResponse.ok) throw new Error('Error creating new cut detail');

                    const detailData = await detailResponse.json();
                    const cutDetailId = detailData.Id;

                    // Create sizes for new detail
                    for (const [size, sizeData] of Object.entries(detail.sizes)) {
                        if (sizeData.quantity > 0) {
                            const sizeResponse = await fetch(API_SIZES_URL, {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    Size: size,
                                    Quantity: sizeData.quantity,
                                    cutDetailId: cutDetailId
                                }),
                            });
                            if (!sizeResponse.ok) throw new Error('Error creating cut size for new detail');
                        }
                    }
                }
            }

            await fetchCutOrders();
            resetForm();
        } catch (error) {
            console.error('Error updating cut order:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCurrentOrder(null);
        setCutDetails([initialCutDetailState]);
        setCurrentView('list');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const order = {
            id: currentOrder?.Id,
            createdBy: formData.get('createdBy'),
            observation: formData.get('observation'),
            cutDetails: cutDetails.map(detail => ({
                ...detail,
                pricePerPiece: unformatNumber(detail.pricePerPiece.toString()),
                totalPieces: Object.values(detail.sizes).reduce((sum, quantity) => sum + quantity, 0),
                totalPrice: unformatNumber(detail.pricePerPiece.toString()) * Object.values(detail.sizes).reduce((sum, quantity) => sum + quantity, 0),
                cutSizes: Object.entries(detail.sizes).map(([size, quantity]) => ({Size: size, Quantity: quantity})),
            })),
        };

        if (currentOrder) {
            updateCutOrder(order);
        } else {
            createCutOrder(order);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredOrders = useMemo(() => {
        const searchTerm = search.toLowerCase().trim();
        if (!searchTerm) return cutOrders;

        return cutOrders.filter(
            (order) =>
                order.createdBy.toLowerCase().includes(searchTerm) ||
                order.observation.toLowerCase().includes(searchTerm)
        );
    }, [cutOrders, search]);

    const addCutDetail = () => {
        setCutDetails([...cutDetails, initialCutDetailState]);
    };

    const removeModal = (index) => {
        setIsDeleteModalOpen(true);
        setSelectedCutDetailIndex(index);
    };

    const removeCutDetail = async () => {
        const detailToRemove = cutDetails[selectedCutOrderIndex]
        const index = selectedCutOrderIndex;

        // Si el detalle tiene un Id, significa que existe en la base de datos
        if (detailToRemove.Id) {
            try {
                setLoading(true);

                // Primero eliminamos todas las tallas asociadas
                const sizesPromises = Object.values(detailToRemove.sizes)
                    .filter(size => size.id)
                    .map(size =>
                        fetch(`${API_SIZES_URL}/${size.id}`, {
                            method: 'DELETE',
                            headers: {'Content-Type': 'application/json'},
                        })
                    );

                await Promise.all(sizesPromises);

                // Luego eliminamos el detalle
                const response = await fetch(`${API_DETAILS_URL}/${detailToRemove.Id}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                });

                if (!response.ok) throw new Error('Error deleting cut detail');

            } catch (error) {
                console.error('Error deleting cut detail:', error);
                return; // Si hay un error, no eliminamos el detalle del estado
            } finally {
                setLoading(false);
            }
        }

        // Actualizamos el estado local removiendo el detalle
        const newCutDetails = cutDetails.filter((_, i) => i !== index);
        setCutDetails(newCutDetails);
        setIsDeleteModalOpen(false);
    };

    const updateCutDetail = (index, field, value) => {
        const newCutDetails = [...cutDetails];
        if (field === 'pricePerPiece') {
            newCutDetails[index][field] = value;
        } else {
            newCutDetails[index][field] = value;
        }
        setCutDetails(newCutDetails);
    };

    const updateSize = (detailIndex, size, quantity) => {
        const newCutDetails = [...cutDetails];
        const currentDetail = newCutDetails[detailIndex];

        // Buscar si existe un ID para esta talla
        const existingSize = currentDetail.cutSizes?.find(s => s.Size === size);

        newCutDetails[detailIndex].sizes[size] = {
            id: existingSize?.Id || null,
            quantity: parseInt(quantity) || 0
        };

        setCutDetails(newCutDetails);
    };

    if (currentView === 'form') {
        return (
            <>
                <Card className="w-full max-w-4xl mx-auto mt-8">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={resetForm}
                        >
                            <ArrowLeft className="h-4 w-4"/>
                        </Button>
                        <CardTitle>
                            {currentOrder ? 'Editar' : 'Nueva'} Orden de Corte
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    name="createdBy"
                                    placeholder="Creado por"
                                    defaultValue={currentOrder?.createdBy || ''}
                                    required
                                />
                            </div>
                            <div>
                                <Textarea
                                    name="observation"
                                    placeholder="Observación"
                                    defaultValue={currentOrder?.observation || ''}
                                    className="min-h-[100px]"
                                />
                            </div>
                            {cutDetails.map((detail, detailIndex) => (
                                <div key={detailIndex} className="cut-detail border p-4 rounded-md space-y-4">
                                    <h3 className="text-lg font-semibold">Detalle de Corte {detailIndex + 1}</h3>
                                    <Input
                                        name="reference"
                                        placeholder="Referencia"
                                        value={detail.reference}
                                        onChange={(e) => updateCutDetail(detailIndex, 'reference', e.target.value)}
                                        required
                                    />
                                    <Input
                                        name="brand"
                                        placeholder="Marca"
                                        value={detail.brand}
                                        onChange={(e) => updateCutDetail(detailIndex, 'brand', e.target.value)}
                                        required
                                    />
                                    <Input
                                        name="color"
                                        placeholder="Color"
                                        value={detail.color}
                                        onChange={(e) => updateCutDetail(detailIndex, 'color', e.target.value)}
                                        required
                                    />
                                    <Input
                                        name="pricePerPiece"
                                        type="text"
                                        placeholder="Precio por Pieza"
                                        value={detail.pricePerPiece}
                                        onChange={(e) => updateCutDetail(detailIndex, 'pricePerPiece', e.target.value)}
                                        required
                                    />

                                    <h4 className="text-md font-semibold">Tallas</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                        {DEFAULT_SIZES.map((size) => (
                                            <div key={size} className="flex flex-col">
                                                <label htmlFor={`quantity-${size}-${detailIndex}`}
                                                       className="text-sm font-medium">{size}</label>
                                                <Input
                                                    id={`quantity-${size}-${detailIndex}`}
                                                    name={`quantity-${size}-${detailIndex}`}
                                                    type="number"
                                                    placeholder="Cantidad"
                                                    min="0"
                                                    value={detail.sizes[size].quantity}
                                                    onChange={(e) => updateSize(detailIndex, size, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-4 bg-gray-100 rounded-md">
                                        <p className="font-semibold">Total de
                                            Piezas: {formatNumber(Object.values(detail.sizes).reduce((sum, size) => sum + size.quantity, 0))}</p>
                                        <p className="font-semibold">Precio Total:
                                            ${formatNumber((unformatNumber(detail.pricePerPiece) || 0) * Object.values(detail.sizes).reduce((sum, size) => sum + size.quantity, 0))}</p>
                                    </div>
                                    {detailIndex > 0 && (
                                        <Button type="button" onClick={() => removeModal(detailIndex)}>Eliminar Detalle
                                            de Corte</Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" onClick={addCutDetail}>Agregar Detalle de Corte</Button>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Guardando...' : 'Guardar'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={removeCutDetail}
                    itemName={"la orden de corte"}
                />
            </>
        );
    }

    return (
        <>
            <Card className="w-full max-w-4xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle>Gestión de Órdenes de Corte</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Input
                                placeholder="Buscar orden..."
                                value={search}
                                onChange={handleSearch}
                                className="pl-10"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"/>
                        </div>
                        <Button
                            className="flex items-center gap-2"
                            onClick={() => setCurrentView('form')}
                        >
                            <Plus className="h-4 w-4"/>
                            Nueva Orden
                        </Button>
                    </div>
                    <div className="border rounded-lg">
                        <div className="min-w-full">
                            <div className="border-b">
                                <div className="grid grid-cols-5 gap-5 px-6 py-3 bg-gray-50">
                                    <div className="font-medium text-sm text-gray-500">
                                        Creado por
                                    </div>
                                    <div className="font-medium text-sm text-gray-500 col-span-2">
                                        Observación
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        Fecha de creación
                                    </div>
                                    <div className="font-medium text-sm text-gray-500 text-right">
                                        Acciones
                                    </div>
                                </div>
                            </div>
                            <div>
                                {filteredOrders?.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <div
                                            key={order.id*2/2}
                                            className="grid grid-cols-5 gap-5 px-6 py-4 border-b last:border-b-0 hover:bg-gray-50"
                                        >
                                            <div className="font-medium">
                                                {order.createdBy}
                                            </div>
                                            <div className="col-span-2 truncate">
                                                {order.observation}
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                {new Date(order?.createdAt).toLocaleDateString('es-ES')}
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        setCurrentOrder(order);
                                                        setCutDetails(order.cutDetails.map(detail => ({
                                                            ...detail,
                                                            sizes: DEFAULT_SIZES.reduce((acc, size) => {
                                                                const sizeObj = detail.cutSizes.find(s => s.Size === size);
                                                                return {
                                                                    ...acc,
                                                                    [size]: {
                                                                        id: sizeObj?.Id || null,
                                                                        quantity: sizeObj ? sizeObj.Quantity : 0
                                                                    }
                                                                };
                                                            }, {})
                                                        })));
                                                        setCurrentView('form'); // Añadir esta línea
                                                    }}
                                                >
                                                    <Pencil className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-500 p-6">
                                        No se encontraron órdenes de corte.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </>
    );
};