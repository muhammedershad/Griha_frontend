import { useEffect, useState } from "react";
import SideHeading from "../common/SideHeading";
import { ChangePasswordInterface } from "../../interfaces/changePassword";
import Form from "../common/Form";
import { trimPasswords } from "../../Services/trim";
import toast from "react-hot-toast";
import { employeeApi } from "../../Services/employeeApi";
import { Employees } from "../../interfaces/employee";
import User from "../../interfaces/user";

interface Props {
    employee: Employees | User | null | undefined;
}

const ChangePassword: React.FC<Props> = ({ employee }) => {
    const [formData, setFormData] = useState<ChangePasswordInterface>();

    useEffect(() => {
        // console.log(formData)
        if (formData) {
            changePassword(formData);
        }
    }, [formData]);

    const changePassword = async (formData: ChangePasswordInterface) => {
        setFormData(trimPasswords(formData));
        // console.log(formData);

        if (!formData.currentPassword) {
            toast.error("Enter valid current password");
        }
        if (!formData.newPassword || formData.newPassword.length < 6) {
            return toast.error("Password must be at least 6 letters");
        }
        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords must match.");
        }
        if (!formData.currentPassword) return;
        // console.log('here');

        const data: ChangePasswordInterface = {
            ...formData,
            id: employee?._id,
        };
        const response = await employeeApi.changePassword(data);
        // console.log(response);

        if (response.success) toast.success(response?.message);
        else toast.error(response.message);
    };
    const formFields = [
        {
            placeholder: "Current Password",
            type: "password",
            defaultValue: "",
            isRequired: true,
            data: "currentPassword",
        },
        {
            placeholder: "New Password",
            type: "password",
            defaultValue: "",
            isRequired: true,
            data: "newPassword",
        },
        {
            placeholder: "Confirm Password",
            type: "text",
            defaultValue: "",
            isRequired: true,
            data: "confirmPassword",
        },
    ];
    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                <SideHeading title="Change Password" />
                <Form obj={formFields} setData={setFormData} />
            </div>
        </>
    );
};

export default ChangePassword;
