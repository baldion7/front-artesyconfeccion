import React, { useEffect, useMemo, useState } from 'react';
import { Search, Plus, Eye, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from "../ui/button.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.tsx";
import { Input } from "../ui/input.tsx";
import { Select } from "../ui/Select.tsx";
import {DeleteConfirmationModal} from "./DeleteConfirmationModal.jsx";

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentView, setCurrentView] = useState('list');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const API_URL = 'https://arteyconfecciones.com/api/product';
    const SUPPLIERS_URL = 'https://arteyconfecciones.com/api/suppliers';

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setProducts(data || []);
            console.log(data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const response = await fetch(SUPPLIERS_URL);
            const data = await response.json();
            setSuppliers(data || []);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const createProduct = async (product) => {
        try {
            setLoading(true);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (!response.ok) throw new Error('Error creating product');
            await fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (product) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${product.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (!response.ok) throw new Error('Error updating product');
            await fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error deleting product');
            await fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setLoading(false);
        }
    };

    const normalizeNumber = (input) => {
        if (typeof input === 'string') {
            // Reemplaza comas por nada y convierte el punto en separador decimal
            return parseFloat(input.replace(/,/g, ''));
        }
        return input;
    };

    const handleDelete = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };


    const handleConfirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete.Id);
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const product = {
            id: currentProduct ? currentProduct.Id : undefined,
            name: formData.get('name'),
            description: formData.get('description'),
            price: formData.get('price'),
            supplierId: parseInt(formData.get('supplierId')),
        };

        if (currentProduct) {
            updateProduct(product);
        } else {
            createProduct(product);
        }

        setCurrentView('list');
        setCurrentProduct(null);
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setCurrentView('form');
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredProducts = useMemo(() => {
        const searchTerm = search.toLowerCase().trim();
        if (!searchTerm) return products;

        return products.filter(
            (product) =>
                product.Name.toLowerCase().includes(searchTerm) ||
                product.Description?.toLowerCase().includes(searchTerm)
        );
    }, [products, search]);

    if (currentView === 'form') {
        return (
            <Card className="w-full max-w-4xl mx-auto mt-8">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                            setCurrentView('list');
                            setCurrentProduct(null);
                        }}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle>{currentProduct ? 'Editar' : 'Nuevo'} Producto</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                name="name"
                                placeholder="Nombre del producto"
                                defaultValue={currentProduct?.Name || ''}
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                name="description"
                                placeholder="Descripción"
                                defaultValue={currentProduct?.Description || ''}
                                className="w-full min-h-[100px] p-2 border rounded-md"
                            ></textarea>
                        </div>
                        <div>
                            <span className="text-sm text-muted-foreground mb-1 ">Poner precio sin comas y punto</span>
                            <Input
                                type="number"
                                name="price"
                                placeholder="Precio"
                                step="0.01"
                                defaultValue={currentProduct?.Price || ''}
                                required
                            />
                        </div>
                        <div>
                            <Select
                                name="supplierId"
                                defaultValue={currentProduct?.SupplierId || ''}
                                required
                            >
                                <option value="">Seleccionar Proveedor</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.Id} value={supplier.Id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </Select>
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
                                    setCurrentProduct(null);
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
                   <CardTitle>Gestión de Productos</CardTitle>
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
                           Nuevo Producto
                       </Button>
                   </div>
                   <div className="border rounded-lg">
                       <div className="min-w-full">
                           <div className="border-b">
                               <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50">
                                   <div className="font-medium text-sm text-gray-500">Nombre</div>
                                   <div className="font-medium text-sm text-gray-500">Descripción</div>
                                   <div className="font-medium text-sm text-gray-500">Precio</div>
                                   <div className="font-medium text-sm text-gray-500">Proveedor</div>
                                   <div className="font-medium text-sm text-gray-500 text-right">
                                       Acciones
                                   </div>
                               </div>
                           </div>
                           <div>
                               {filteredProducts?.length > 0 ? (
                                   filteredProducts.map((product) => (
                                       <div
                                           key={product.Id}
                                           className="grid grid-cols-5 gap-4 px-6 py-4 border-b last:border-b-0 hover:bg-gray-50"
                                       >
                                           <div className="font-medium">{product.Name}</div>
                                           <div className="truncate">{product.Description}</div>
                                           <div>${product.Price}</div>
                                           <div>{product.supplier?.name || 'Sin proveedor'}</div>
                                           <div className="flex justify-end gap-2">
                                               <Button
                                                   variant="outline"
                                                   size="icon"
                                                   onClick={() => handleEdit(product)}
                                               >
                                                   <Pencil className="h-4 w-4"/>
                                               </Button>
                                               <Button
                                                   variant="outline"
                                                   size="icon"
                                                   className="text-red-500 hover:text-red-600"
                                                   onClick={() => handleDelete(product)}
                                               >
                                                   <Trash2 className="h-4 w-4"/>
                                               </Button>
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
           <DeleteConfirmationModal
               isOpen={isDeleteModalOpen}
               onClose={() => setIsDeleteModalOpen(false)}
               onConfirm={handleConfirmDelete}
               itemName={`el producto "${productToDelete?.Name}"`}
           />
       </>
    );
};