import React, { useEffect, useState } from 'react'
import { Employees } from '../../interfaces/employee';
import { useAppDispatch } from '../../Services/redux/hooks';
import trimVariables from '../../Services/trim';
import toast from 'react-hot-toast';
import { validations } from '../../Services/validations';
import { employeeApi } from '../../Services/employeeApi';
import { employeeloginSuccess } from '../../Services/redux/slices/employeeSlice';
import Form, { FormField } from '../common/Form';
import SideHeading from '../common/SideHeading';

interface Props {
    employee: Employees | null | undefined;
}

const PersonalInfomations: React.FC<Props> = ({employee}) => {
    const [formData, setFormData] = useState<Employees>();
    const dispatch = useAppDispatch()
    
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
          console.log('here');
          
          const response = await employeeApi.updateProfile( data )
          console.log(response);
          
          if ( response?.success ) {
            toast.success('Profile Updated Successfully')
            dispatch(employeeloginSuccess({employee: response.employee, token: localStorage.getItem('Employee_token'), error: false}))
          } else {
            toast.error( response?.message )
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
            </div>
    </>
  )
}

export default PersonalInfomations