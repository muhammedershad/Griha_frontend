import { useEffect, useState } from "react";
import SideHeading from "../common/SideHeading";
import Form, { FormField } from '../common/Form'
import { Employees } from "../../interfaces/employee";
import { useAppDispatch, useAppSelector } from "../../Services/redux/hooks";
import { validations } from "../../Services/validations";
import trimVariables from "../../Services/trim";
import toast from "react-hot-toast";
import { employeeApi } from "../../Services/employeeApi";
import { employeeloginSuccess } from "../../Services/redux/slices/employeeSlice";

// interface FormData {
//     firstName: string;
//     lastName: string;
//     username: string;
//     email: string;
//     phone: string;
//     password: string;
//   }

const PersonalInformation = () => {
    const [formData, setFormData] = useState<Employees>();
    const [employee, setEmployee] = useState<Employees | null>();
    const employeeData = useAppSelector((state) => state.employee.employee);
    const dispatch = useAppDispatch()
    useEffect(() => {
      setEmployee(employeeData)
      // console.log(employee)
    })

 useEffect(() => {
    console.log(formData, 'formdata')
    if ( formData ) {
      updateEmployeeProfile(formData)
    }
  },[formData])

  const updateEmployeeProfile = async ( formData: Employees) => {
    setFormData(trimVariables( formData ))
      if ( !formData.firstName || !formData.lastName ) toast.error('Enter valide first name and last name')
      if ( !formData.username || validations.validateUsername( formData.username ).error) {
        toast.error("Enter Valid username ")
      }
      if ( !formData.email || validations.validateEmail( formData.email )) toast.error('Enter valid email')
      if ( !formData.phone || !validations.validatePhoneNumber( formData.phone )) toast.error( "Enter a valid phone number")
      if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.phone ) return
      const data: Employees = {...formData, _id: employee?._id }
      const response = await employeeApi.updateProfile( data )
      if ( response?.success ) {
        toast.success('Profile Updated Successfully')
        dispatch(employeeloginSuccess({employee: response.employee, token: localStorage.getItem('Employee_token'), error: false}))
      } else {
        // console.log(response);
        
        // toast.error( response?.message )
      }
  }

  const formFields: FormField[] = [
    {
      placeholder: 'First Name',
      type: 'text',
      defaultValue: employee?.firstName,
      isRequired: true,
      data: 'firstName'
    },
    {
      placeholder: 'Last Name',
      type: 'text',
      defaultValue: employee?.lastName,
      isRequired: true,
      data: 'lastName'
    },
    {
      placeholder: 'Username',
      type: 'text',
      defaultValue: employee?.username,
      isRequired: true,
      data: 'username'
    },
    {
      placeholder: 'Email',
      type: 'email',
      defaultValue: employee?.email,
      isRequired: true,
      data: 'email'
    },
    {
      placeholder: 'Phone Number',
      type: 'text',
      defaultValue: employee?.phone,
      isRequired: true,
      data: 'phone'
    },
  ];

    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                <SideHeading title="Personal Information" />
                <Form obj={formFields} setData={setFormData} />
                <div className="flex justify-between mt-5">
                    <span
                        // onClick={() => handleDeleteAccount(user._id)}
                        className="text-red-700 cursor-pointer"
                    >
                        Delete Account
                    </span>
                    <span className="text-red-700 cursor-pointer">Logout</span>
                </div>
            </div>
        </>
    );
};

export default PersonalInformation;
