export default function Stats() {
    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                    <div className="text-4xl font-bold text-blue-600">98%</div>
                    <div className="text-gray-600 mt-2">Client Satisfaction</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-blue-600">$2M+</div>
                    <div className="text-gray-600 mt-2">Invoices Processed</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-blue-600">50k+</div>
                    <div className="text-gray-600 mt-2">Active Users</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-blue-600">24/7</div>
                    <div className="text-gray-600 mt-2">Customer Support</div>
                </div>
            </div>
        </div>
    );
}