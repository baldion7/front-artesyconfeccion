import React, { useState } from 'react';
import { CutOrderList } from './CutOrderList';
import { CutOrderDetail } from './CutOrderDetail';
import { ProductAssignment } from './ProductAssignment.jsx';

export const CutOrderManagementIndex = () => {
    const [view, setView] = useState('list');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
        setView('detail');
    };

    const handleBack = () => {
        setView('list');
        setSelectedOrder(null);
    };

    const handleAssignProducts = (order) => {
        setSelectedOrder(order);
        setView('assign');
    };

    return (
        <div className="max-w-7xl mx-auto">
            {view === 'list' && (
                <CutOrderList onOrderSelect={handleOrderSelect} />
            )}
            {view === 'detail' && (
                <CutOrderDetail
                    order={selectedOrder}
                    onBack={handleBack}
                    onAssignProducts={handleAssignProducts}
                />
            )}
            {view === 'assign' && (
                <ProductAssignment
                    order={selectedOrder}
                    onBack={() => setView('detail')}
                />
            )}
        </div>
    );
};