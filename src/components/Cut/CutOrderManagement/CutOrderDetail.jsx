import React from 'react';
import { ArrowLeft, Box } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card.tsx';
import { Button } from '../../ui/button.tsx';

export const CutOrderDetail = ({ order, onBack, onAssignProducts }) => {
    if (!order) return null;

    // Agrupar las tallas dinámicamente
    const groupSizes = (cutSizes) => {
        return cutSizes.reduce((groups, size) => {
            const isNumber = !isNaN(size.Size);
            const groupKey = isNumber ? 'numeros' : 'letras';

            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }

            groups[groupKey].push(size);
            return groups;
        }, {});
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle>Orden de Corte #{order.Id}</CardTitle>
                <Button className="ml-auto" onClick={() => onAssignProducts(order)}>
                    <Box className="w-4 h-4 mr-2" />
                    Asignar Productos
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Creado Por</h3>
                        <p className="mt-1">{order.createdBy}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Fecha de Creación</h3>
                        <p className="mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="col-span-2">
                        <h3 className="text-sm font-medium text-gray-500">Observaciones</h3>
                        <p className="mt-1">{order.observation}</p>
                    </div>
                </div>

                <h3 className="font-semibold text-lg mb-4">Detalles de Corte</h3>
                {order.cutDetails.map((detail) => {
                    const sizeGroups = groupSizes(detail.cutSizes);

                    return (
                        <div key={detail.Id} className="border rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Referencia</h4>
                                    <p className="mt-1">{detail.reference}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Marca</h4>
                                    <p className="mt-1">{detail.brand}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Color</h4>
                                    <p className="mt-1">{detail.color}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Tallas en Letras */}
                                {sizeGroups.letras?.length > 0 && (
                                    <div>
                                        <h4 className="font-medium mb-2 text-gray-600">Tallas en Letras</h4>
                                        <div className="grid grid-cols-6 gap-3">
                                            {sizeGroups.letras
                                                .sort((a, b) => {
                                                    const order = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
                                                    return order.indexOf(a.Size) - order.indexOf(b.Size);
                                                })
                                                .map(size => (
                                                    <div key={size.Id}
                                                         className="text-center p-2 bg-gray-50 rounded-lg">
                                                        <div className="font-medium text-gray-700">{size.Size}</div>
                                                        <div
                                                            className="mt-1 text-lg font-semibold">{size.Quantity}</div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tallas en Números */}
                                {sizeGroups.numeros?.length > 0 && (
                                    <div>
                                        <h4 className="font-medium mb-2 text-gray-600">Tallas en Números</h4>
                                        <div className="grid grid-cols-8 gap-3">
                                            {sizeGroups.numeros
                                                .sort((a, b) => parseInt(a.Size) - parseInt(b.Size))
                                                .map(size => (
                                                    <div key={size.Id}
                                                         className="text-center p-2 bg-gray-50 rounded-lg">
                                                        <div className="font-medium text-gray-700">{size.Size}</div>
                                                        <div
                                                            className="mt-1 text-lg font-semibold">{size.Quantity}</div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-600">
                                    Total de Piezas: {detail.totalPieces}
                                </p>
                            </div>
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-600">
                                    Precio Por Pieza: {detail.pricePerPiece}
                                </p>
                            </div>
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-600">
                                    Precio Total: {detail.totalPrice}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};