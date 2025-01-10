    import React, { useEffect, useMemo, useState } from 'react';
    import { Search, Plus, Eye, Pencil, Trash2, ArrowLeft } from 'lucide-react';
    import { Button } from "../ui/Button.tsx";
    import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
    import { Input } from "../ui/input.tsx";
    import SupplierModal from "./SupplierModal.jsx";
    import {DeleteConfirmationModal} from "./DeleteConfirmationModal.jsx";

    export const SupplierList = () => {
        const [suppliers, setSuppliers] = useState([]);
        const [search, setSearch] = useState('');
        const [currentView, setCurrentView] = useState('list');
        const [currentSupplier, setCurrentSupplier] = useState(null);
        const [loading, setLoading] = useState(false);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedSupplier, setSelectedSupplier] = useState(null);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [supplierToDelete, setSupplierToDelete] = useState(null);



        const API_URL = 'https://arteyconfecciones.com/api/suppliers'; // Cambia esto por tu endpoint real.

        useEffect(() => {
            fetchSuppliers();
        }, []);

        const fetchSuppliers = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setSuppliers(data || []);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        const createSupplier = async (supplier) => {
            try {
                setLoading(true);
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(supplier),
                });
                if (!response.ok) throw new Error('Error creating supplier');
                await fetchSuppliers();
            } catch (error) {
                console.error('Error creating supplier:', error);
            } finally {
                setLoading(false);
            }
        };

        const updateSupplier = async (supplier) => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/${supplier.Id}`, {
                    method: 'POST', // Cambiado de POST a PUT
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(supplier),
                });
                if (!response.ok) throw new Error('Error updating supplier');
                await fetchSuppliers();
            } catch (error) {
                console.error('Error updating supplier:', error);
            } finally {
                setLoading(false);
            }
        };

        const deleteSupplier = async (id) => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Error deleting supplier');
                await fetchSuppliers();
            } catch (error) {
                console.error('Error deleting supplier:', error);
            } finally {
                setLoading(false);
            }
        };

        const handleDelete = (supplier) => {
            setSupplierToDelete(supplier);
            setIsDeleteModalOpen(true);
        };

        const handleConfirmDelete = () => {
            if (supplierToDelete) {
                deleteSupplier(supplierToDelete.Id);
                setIsDeleteModalOpen(false);
                setSupplierToDelete(null);
            }
        };

        const handleViewDetails = (supplier) => {
            setSelectedSupplier(supplier);
            setIsModalOpen(true);
        };

        const handleSubmit = (e) => {
            e.preventDefault(); // Previene el recargado de la página
            const formData = new FormData(e.target);
            const supplier = {
                Id: currentSupplier ? currentSupplier.Id : undefined,
                name: formData.get('name'),
                contact: formData.get('contact'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
            };

            if (currentSupplier) {
                updateSupplier(supplier);
            } else {
                createSupplier(supplier);
            }

            setCurrentView('list');
            setCurrentSupplier(null);
        };

        const handleEdit = (supplier) => {
            setCurrentSupplier(supplier);
            setCurrentView('form');
        };

        const handleSearch = (e) => {
            setSearch(e.target.value);
        };

        const filteredSuppliers = useMemo(() => {
            const searchTerm = search.toLowerCase().trim();
            if (!searchTerm) return suppliers;

            return suppliers.filter(
                (supplier) =>
                    supplier.name.toLowerCase().includes(searchTerm) ||
                    supplier.contact.toLowerCase().includes(searchTerm) ||
                    supplier.phone.toLowerCase().includes(searchTerm) ||
                    supplier.email.toLowerCase().includes(searchTerm)
            );
        }, [suppliers, search]);

        if (currentView === 'form') {
            return (
                <Card className="w-full max-w-4xl mx-auto mt-8">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                setCurrentView('list');
                                setCurrentSupplier(null);
                            }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <CardTitle>{currentSupplier ? 'Editar' : 'Nuevo'} Proveedor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Input
                                    name="name"
                                    placeholder="Nombre"
                                    defaultValue={currentSupplier?.name || ''}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    name="contact"
                                    placeholder="Contacto"
                                    defaultValue={currentSupplier?.contact || ''}
                                />
                            </div>
                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={currentSupplier?.email || ''}
                                />
                            </div>
                            <div>
                                <Input
                                    name="phone"
                                    placeholder="Teléfono"
                                    defaultValue={currentSupplier?.phone || ''}
                                />
                            </div>
                            <div>
                                <textarea
                                    name="address"
                                    placeholder="Dirección"
                                    defaultValue={currentSupplier?.address || ''}
                                    className="w-full min-h-[100px] p-2 border rounded-md"
                                ></textarea>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Guardando...' : 'Guardar'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setCurrentView('list');
                                        setCurrentSupplier(null);
                                    }}
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
            <>
                <Card className="w-full max-w-4xl mx-auto mt-8">
                    <CardHeader>
                        <CardTitle>Gestión de Proveedores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Input
                                    placeholder="Buscar proveedor..."
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
                                Nuevo Proveedor
                            </Button>
                        </div>
                        <div className="border rounded-lg">
                            <div className="min-w-full">
                                <div className="border-b">
                                    <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50">
                                        <div className="font-medium text-sm text-gray-500">Nombre</div>
                                        <div className="font-medium text-sm text-gray-500">Contacto</div>
                                        <div className="font-medium text-sm text-gray-500">Telefono</div>
                                        <div className="font-medium text-sm text-gray-500 text-right">
                                            Acciones
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {filteredSuppliers?.length > 0 ? (
                                        filteredSuppliers.map((supplier) => (
                                            <div
                                                key={supplier.Id}
                                                className="grid grid-cols-4 gap-4 px-6 py-4 border-b last:border-b-0 hover:bg-gray-50"
                                            >
                                                <div className="font-medium">{supplier.name}</div>
                                                <div>{supplier.contact}</div>
                                                <div>{supplier.phone}</div>
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleViewDetails(supplier)}
                                                    >
                                                        <Eye className="h-4 w-4"/>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => handleEdit(supplier)}
                                                    >
                                                        <Pencil className="h-4 w-4"/>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-600"
                                                        onClick={() => handleDelete(supplier)}
                                                    >
                                                        <Trash2 className="h-4 w-4"/>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-gray-500 p-6">
                                            No se encontraron proveedores.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <SupplierModal
                    supplier={selectedSupplier}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedSupplier(null);
                    }}
                />
                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    itemName={`el proveedor "${supplierToDelete?.name}"`}
                />
            </>
        );
    };
