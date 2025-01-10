import React, {useState, useEffect} from 'react';
import {Plus, Trash2} from 'lucide-react';
import {Input} from '../../ui/input';
import {Select} from "../../ui/Select.tsx";
import {Button} from "../../ui/Button.tsx";

const CardAssignment = ({detail, products, onAssignmentChange}) => {
    const [assignments, setAssignments] = useState({});

    // Inicializa los valores del estado assignments basados en las tallas del detalle
    useEffect(() => {
        const initialAssignments = {};
        detail.cutSizes.forEach(size => {
            initialAssignments[size.Id] = [{
                id: crypto.randomUUID(),
                detailId: detail.Id,
                sizeId: size.Id,
                productId: '',
                quantity: '',
                unitmeasure: '',
                reason: ''
            }];
        });
        setAssignments(initialAssignments);
    }, [detail]);

    // Maneja los cambios de los inputs para una asignación específica
    const handleChange = (sizeId, assignmentId, field, value) => {
        const updatedAssignments = {
            ...assignments,
            [sizeId]: assignments[sizeId].map(assignment =>
                assignment.id === assignmentId
                    ? {...assignment, [field]: value}
                    : assignment
            )
        };
        setAssignments(updatedAssignments);
        onAssignmentChange(detail.Id, updatedAssignments);
    };

    // Agrega una nueva asignación para una talla específica
    const addAssignment = (sizeId) => {
        const newAssignment = {
            id: crypto.randomUUID(),
            detailId: detail.Id,
            sizeId: sizeId,
            productId: '',
            quantity: '',
            unitmeasure: '',
            reason: ''
        };

        const updatedAssignments = {
            ...assignments,
            [sizeId]: [...assignments[sizeId], newAssignment]
        };

        setAssignments(updatedAssignments);
        onAssignmentChange(detail.Id, updatedAssignments);
    };

    // Elimina una asignación específica
    const removeAssignment = (sizeId, assignmentId) => {
        if (assignments[sizeId].length === 1) return; // Mantener al menos una asignación

        const updatedAssignments = {
            ...assignments,
            [sizeId]: assignments[sizeId].filter(a => a.id !== assignmentId)
        };

        setAssignments(updatedAssignments);
        onAssignmentChange(detail.Id, updatedAssignments);
    };

    return (
        <div className="border rounded-lg p-4 mb-4">
            <h3 className="font-medium mb-4">
                {detail.reference} - {detail.brand} - {detail.color}
            </h3>

            <div className="grid grid-cols-3 gap-4">
                {detail.cutSizes.map(size => (
                    <div key={size.Id} className="border rounded p-4">
                        <div className="font-medium mb-2">
                            Talla {size.Size} - Cantidad: {size.Quantity}
                        </div>

                        {assignments[size.Id]?.map((assignment, index) => (
                            <div key={assignment.id} className="mb-4 p-3 border rounded-lg bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Producto {index + 1}</span>
                                    {assignments[size.Id].length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeAssignment(size.Id, assignment.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                <select
                                    required
                                    className="w-full mb-2 p-2 border rounded"
                                    value={assignment.productId}
                                    onChange={(e) => handleChange(size.Id, assignment.id, 'productId', e.target.value)}
                                >
                                    <option value="">Seleccionar Movimiento</option>
                                    {products.map(item => (
                                        <option key={item.Id} value={item.Id}>
                                            {item.Name}
                                        </option>
                                    ))}
                                </select>

                                <Input
                                    required
                                    type="number"
                                    placeholder="Cantidad del producto"
                                    value={assignment.quantity}
                                    onChange={(e) => handleChange(size.Id, assignment.id, 'quantity', e.target.value)}
                                    className="mb-2"
                                />

                                <Select
                                    name="unitmeasure"
                                    required
                                    value={assignment.unitmeasure}
                                    onChange={(e) => handleChange(size.Id, assignment.id, 'unitmeasure', e.target.value)}
                                    className="mb-2"
                                >
                                    <option value="">Seleccionar Unidad de Medida</option>
                                    <option value="unidad">Unidad</option>
                                    <option value="kg">Kilogramos</option>
                                    <option value="m">Metros</option>
                                    <option value="l">Litros</option>
                                </Select>

                                <textarea
                                    name="reason"
                                    placeholder="Razón de salida"
                                    required
                                    value={assignment.reason}
                                    onChange={(e) => handleChange(size.Id, assignment.id, 'reason', e.target.value)}
                                    className="w-full min-h-[100px] p-2 border rounded-md"
                                />
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => addAssignment(size.Id)}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Producto
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardAssignment;
