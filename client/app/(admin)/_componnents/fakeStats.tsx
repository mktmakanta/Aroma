import React from 'react';
import { Card } from '@/app/components/ui/card';
const FakeStats = () => {
  return (
    <main className="p-4 flex-1 space-y-4">
      {/* Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Gross Revenue</h3>
          <p className="text-xl font-bold">$2,480.32</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-xl font-bold">230</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Avg. Order Value</h3>
          <p className="text-xl font-bold">$56.12</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 h-64">Orders by Time Chart</Card>
        <Card className="p-4 h-64">Transaction Activity Chart</Card>
      </div>

      {/* Table Section */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold">Top Products</h3>
        {/* Add your table or list here */}
      </Card>
    </main>
  );
};

export default FakeStats;
