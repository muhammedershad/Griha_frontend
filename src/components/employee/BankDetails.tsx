import React, { useEffect, useState } from "react";
import SideHeading from "../common/SideHeading";
import Form from "../common/Form";
import { trimBankDetails } from "../../Services/trim";
import { BankDetailsInterface } from "../../interfaces/bankDetails";
import toast from "react-hot-toast";
import { employeeApi } from "../../Services/employeeApi";
import { Employees } from "../../interfaces/employee";

interface Props {
    employees: Employees | null | undefined;
}
const BankDetails: React.FC<Props> = ({ employees }) => {
    const [formData, setFormData] = useState<BankDetailsInterface>();
    const [bankData, setBankData] = useState<BankDetailsInterface>();
    const [employee, setEmployee] = useState<Employees | null>();

    useEffect(() => {
        setEmployee(employees);
        console.log(employee?._id, "emplyee id");
        if (employee?._id) {
            fetchBankDetails(employee);
        }
    }, [employees]);

    useEffect(() => {
        // console.log(formData);
        if (formData) {
            updateBankDetails(formData);
        }
    }, [formData]);

    const fetchBankDetails = async (employee: Employees) => {
        if (employee?._id) {
            const data = await employeeApi.getBankDetails(employee._id);
            setBankData(data?.bankDetails);
            console.log(bankData);
        }
    };

    const updateBankDetails = async (formData: BankDetailsInterface) => {
        setFormData(trimBankDetails(formData));
        if (!formData.bankName) return toast.error("Enter valid Bank Name");
        if (!formData.accountNumber) toast.error("Enter valid Account Number");
        if (!formData.IFSCCode) toast.error("Enter valid IFSC Code");
        if (!formData.PANNumber) toast.error("Enter valid PAN Number");
        if (!formData.UPIId) toast.error("Enter valid UPI id");
        if (
            !formData.bankName ||
            !formData.accountNumber ||
            !formData.IFSCCode ||
            !formData.PANNumber ||
            !formData.UPIId
        )
            return;
        const data: BankDetailsInterface = {
            ...formData,
            userId: employee?._id,
        };
        console.log(data);

        const response = await employeeApi.updateBankDetails(data);
        if (response) toast.success(response.message);
        else toast.error(response.message);
    };
    const formFields = [
        {
            placeholder: "Bank Name",
            type: "text",
            defaultValue: bankData?.bankName,
            isRequired: true,
            data: "bankName",
        },
        {
            placeholder: "Account Number",
            type: "number",
            defaultValue: bankData?.accountNumber,
            isRequired: true,
            data: "accountNumber",
        },
        {
            placeholder: "IFSC Code",
            type: "text",
            defaultValue: bankData?.IFSCCode,
            isRequired: true,
            data: "IFSCCode",
        },
        {
            placeholder: "PAN Number",
            type: "text",
            defaultValue: bankData?.PANNumber,
            isRequired: true,
            data: "PANNumber",
        },
        {
            placeholder: "UPI Id",
            type: "text",
            defaultValue: bankData?.UPIId,
            isRequired: true,
            data: "UPIId",
        },
    ];
    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                <SideHeading title="Bank Deails" />
                <Form obj={formFields} setData={setFormData} />
            </div>
        </>
    );
};

export default BankDetails;
