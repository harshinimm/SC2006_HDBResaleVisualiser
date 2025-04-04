export default function TransactionsTable() {
    return (
        <section className="py-12 px-6">
            <h3 className="text-3xl font-extrabold text-center mb-6">📜 Recent Transactions</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg border">
                    <thead className="bg-red-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Estate</th>
                        <th className="py-3 px-6 text-left">Flat Type</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-t">
                        <td className="py-3 px-6 text-left">Tampines</td>
                        <td className="py-3 px-6 text-left">4-Room</td>
                        <td className="py-3 px-6 text-green-600 font-semibold text-left">$520,000</td>
                        <td className="py-3 px-6 text-left">Jan 2025</td>
                    </tr>
                    <tr className="border-t bg-gray-100">
                        <td className="py-3 px-6 text-left">Jurong East</td>
                        <td className="py-3 px-6 text-left">3-Room</td>
                        <td className="py-3 px-6 text-green-600 font-semibold text-left">$350,000</td>
                        <td className="py-3 px-6 text-left">Jan 2025</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}
