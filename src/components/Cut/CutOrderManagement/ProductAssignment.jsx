import React, {useState, useEffect} from 'react';
import {ArrowLeft, Save} from 'lucide-react';
import {Card, CardHeader, CardTitle, CardContent} from '../../ui/card';
import {Button} from '../../ui/button.tsx';
import CardAssignment from './CardAssignment'; // Importamos el componente reutilizable

export const ProductAssignment = ({order, onBack}) => {
    const [CutOrdenId, setCutOrdenId] = useState(order.Id)
    const [assignments, setAssignments] = useState({});
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        handleChangeProduct();
    }, []);

    const handleChangeProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://arteyconfecciones.com/api/product');
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAllAssignmentsChange = (detailId, updatedAssignments) => {
        setAssignments(prev => ({
            ...prev,
            [detailId]: updatedAssignments
        }));
    };

    const handleAssignment = async () => {
        try {
            setLoading(true);

            // Crear el registro principal de cut-size-quantities
            const response = await fetch('https://arteyconfecciones.com/api/cut-size-quantities', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    status: true,
                    cuOrderId: CutOrdenId,
                }),
            });
            const data = await response.json();
            const newCutSizeQuantityId = data.Id;

            // Procesar todas las asignaciones para cada detalle y talla
            for (const detailAssignments of Object.values(assignments)) {
                for (const sizeAssignments of Object.values(detailAssignments)) {
                    for (const assignment of sizeAssignments) {
                        try {
                            // Crear el movimiento para cada asignación
                            const movementResponse = await fetch('https://arteyconfecciones.com/api/movements', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    type: "salida",
                                    quantity: parseInt(assignment.quantity),
                                    unitmeasure: assignment.unitmeasure,
                                    reason: assignment.reason,
                                    ProductId: parseInt(assignment.productId),
                                }),
                            });
                            const movementData = await movementResponse.json();

                            // Asociar el movimiento con el cut-size-quantity
                            await fetch('https://arteyconfecciones.com/api/cut-size-quantity-movemts', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    movementId: movementData.Id,
                                    cutSizeQuantityId: newCutSizeQuantityId,
                                    cutDetailId: assignment.detailId,
                                }),
                            });
                        } catch (error) {
                            console.error('Error processing assignment:', error);
                        }
                    }
                }
            }

            onBack();
        } catch (error) {
            console.error('Error saving assignments:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4"/>
                </Button>
                <CardTitle>Asignar Productos - Orden #{order.Id}</CardTitle>
            </CardHeader>
            <CardContent>
                {order.cutDetails.map(detail => (
                    <CardAssignment
                        key={detail.Id}
                        detail={detail}
                        products={product}
                        onAssignmentChange={handleAllAssignmentsChange}
                    />
                ))}

                <div className="flex justify-end gap-4 mt-6">
                    <Button variant="outline" onClick={onBack}>
                        Cancelar
                    </Button>
                    <Button onClick={handleAssignment} disabled={loading}>
                        <Save className="w-4 h-4 mr-2"/>
                        {loading ? 'Guardando...' : 'Guardar Asignaciones'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
