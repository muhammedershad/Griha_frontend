import { useEffect, useState } from "react";
import MainDash from "../../components/common/MainDash";
import { Link } from "react-router-dom";
import paymentApi from "../../Services/apis/paymentApi";
import { IPayment, PaymentPopulated } from "../../interfaces/payment";

const Payments = () => {
    const [payments, setPayments] = useState<PaymentPopulated[]>([]);
    useEffect(() => {
        (async () => {
            const response = await paymentApi.allPaymentsOfAdmin();
            console.log(response)
            if (response.success) setPayments(response.payments);
        })();
    }, []);
    return (
        <MainDash>
            <div className="flex flex-row justify-between align-middle items-center">
                <h3 className="font-semibold align-middle font-sans tracking-wider m-5 text-lg">
                    Payments
                </h3>
                <input
                    type="text"
                    className="bg-gray-50 border h-10 border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by name..."
                    required
                />
                <Link to="/admin/create-payment">
                    <button className="w-fit ml-2 border-[1px] rounded-md">
                        {" "}
                        Request payment{" "}
                    </button>
                </Link>
            </div>
            <table className="min-w-full divide-y mb-8 divide-gray-800 overflow-x-auto rounded-3xl border-collapse">
                    <thead className="bg-gray-900 rounded-lg">
                        <tr>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Client
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Project
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Purpose
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Amount
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Payment Type
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {payments.map((payment: PaymentPopulated) => (
                        <tbody
                            key={payment?._id}
                            className="bg-gray-800 divide-y divide-gray-200"
                        >
                            <tr>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={payment?.paidBy?.image || "https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299539-5187871.png"}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-200">
                                                {
                                                    payment?.paidBy?.firstName + " "+
                                                    payment.paidBy?.lastName
                                                }
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {/* {employee.username} */}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    <div className="text-base text-gray-400">
                                        {payment.project.projectName}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap">
                                    <div className="text-base text-gray-400">
                                        {payment?.purpose}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <div className="text-base text-gray-400">
                                        {payment?.amount}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <div className="text-base text-gray-400">
                                        {payment.status}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="text-base text-gray-400">
                                        {payment.paymentType}
                                    </div>
                                </td>
                                <td className="px-2 py-4 whitespace-nowrap  text-sm font-medium">
                                    <a
                                        href="#"
                                        className="text-indigo-600 hover:text-indigo-900"
                                        // onClick={() =>
                                        //     handleChangeEmployeeRole(
                                        //         employee._id
                                        //     )
                                        // }
                                    >
                                        {/* {employee.isSenior
                                            ? "Make Junior"
                                            : "Make Senior"} */}
                                    </a>
                                    <a
                                        // onClick={() =>
                                        //     handleChangeEmployeeBlock(
                                        //         employee._id
                                        //     )
                                        // }
                                        href="#"
                                        className="ml-2 text-red-600 hover:text-red-900"
                                    >
                                        {/* {employee.isBlocked
                                            ? "Unblock"
                                            : "Block"} */}
                                    </a>
                                </td>
                            </tr>

                            {/* More rows... */}
                        </tbody>
                    ))}
                </table>
        </MainDash>
    );
};

export default Payments;
