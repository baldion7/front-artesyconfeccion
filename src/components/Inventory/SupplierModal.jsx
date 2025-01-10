import React from 'react';
import {Button} from "../ui/Button";
import {Card, CardHeader, CardContent, CardTitle} from "../ui/card";

const SupplierModal = ({supplier, isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Detalles del Proveedor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                            <p className="mt-1">{supplier.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Contacto</h3>
                            <p className="mt-1">{supplier.contact}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Email</h3>
                            <p className="mt-1">{supplier.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                            <p className="mt-1">{supplier.phone}</p>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
                            <p className="mt-1">{supplier.address}</p>
                        </div>
                    </div>
                    <div className={"w-full flex justify-end hover:cursor-pointer mt-4 hover:bg-amber-100x"}>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Cancelar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SupplierModal;