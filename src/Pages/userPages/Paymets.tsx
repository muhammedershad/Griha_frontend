import { useEffect, useState } from "react";
import UserSideBar from "../../components/user/UserSideBar";
import paymentApi from "../../Services/apis/paymentApi";
import { useAppSelector } from "../../Services/redux/hooks";
import User from "../../interfaces/user";
import axios from "../../Services/axios";
import toast from "react-hot-toast";
import { PaymentPopulated } from "../../interfaces/payment";
import image from "../../../public/images/Make it rain-bro.png";

const Paymets = () => {
    const userData: User | null = useAppSelector((state) => state.user.user);
    const [payments, setPayments] = useState<PaymentPopulated[]>([]);
    const [allPayments, setAllPayments] = useState<PaymentPopulated[]>([]);
    useEffect(() => {
        if (userData) {
            (async () => {
                const response = await paymentApi.pendingPaymentOfUser(
                    userData._id
                );
                // console.log(response.payments);
                if (response.success) setPayments(response.payments);

                const data = await paymentApi.allPayamentOfUser(userData._id);
                if (data.success) setAllPayments(data.payments);
            })();
        }
    }, [userData]);
    const handlePay = async (paymentId: string) => {
        try {
            const response = await axios.post(
                `/payment/checkout-session/${paymentId}`
            );
            console.log(response.data);
            // if(!response?.ok) {
            //     throw new Error(response.data.messages+'try again')
            // }
            if (response.data.session.url) {
                console.log(response.data.session.url);
                window.location.href = response.data.session.url;
            }
        } catch (error) {
            toast.error("error");
        }
    };
    return (
        <UserSideBar>
            <div className="mx-auto p-10 grid max-w-screen-lg px-6 pb-20">
                <div>
                    <p className=" text-xl font-bold text-gray-300">
                        Pending Payments
                    </p>
                </div>
                {payments && payments.length > 0 ? (
                    <div className="my-5 grid grid-cols-3 gap-3">
                        {payments?.map((payment) => (
                            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                                    {payment?.purpose}
                                </h5>
                                <div className="flex items-baseline text-gray-900 dark:text-white">
                                    <span className="text-3xl font-semibold">
                                        ₹
                                    </span>
                                    <span className="text-5xl font-extrabold tracking-tight">
                                        {payment?.amount}
                                    </span>
                                    {/* <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                                /month
                            </span> */}
                                </div>
                                <ul role="list" className="space-y-5 my-7">
                                    <li className="flex items-center">
                                        <svg
                                            className="flex-shrink-0 w-4 h-4 text-emerald-500 dark:text-emerald-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                                            {`Project: ${payment?.project.projectName}`}
                                        </span>
                                    </li>
                                    <li className="flex">
                                        <svg
                                            className="flex-shrink-0 w-4 h-4 text-emerald-500 dark:text-emerald-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                                            Service charge
                                        </span>
                                    </li>
                                    <li className="flex">
                                        <svg
                                            className="flex-shrink-0 w-4 h-4 text-emerald-500 dark:text-emerald-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                                            Integration help
                                        </span>
                                    </li>
                                </ul>
                                <button
                                    type="button"
                                    onClick={() => handlePay(payment._id)}
                                    className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                >
                                    Pay Now
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className=" flex flex-col justify-center items-center m-4">
                        <img
                            src={image}
                            alt="Project Image"
                            className="max-w-full w-[30%] h-auto rounded-md"
                        />
                        <p className="mt-4 text-lg text-gray-400">
                            No pending payments on your account.
                        </p>
                    </div>
                )}
                <div>
                    <p className=" text-xl font-bold text-gray-300">
                        Payment Histroy
                    </p>
                </div>
                <table className="min-w-full mt-4 divide-y mb-8 divide-gray-800 overflow-x-auto rounded-3xl border-collapse">
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
                       
                    </tr>
                </thead>
                {allPayments.map((payment: PaymentPopulated) => (
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
                                            src={
                                                payment?.paidBy?.image ||
                                                "https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299539-5187871.png"
                                            }
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-200">
                                            {payment?.paidBy?.firstName +
                                                " " +
                                                payment.paidBy?.lastName}
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
                            
                        </tr>

                        {/* More rows... */}
                    </tbody>
                ))}
            </table>
            </div>
        </UserSideBar>
    );
};

export default Paymets;
