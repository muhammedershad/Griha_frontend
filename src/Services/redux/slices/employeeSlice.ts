import { createSlice } from "@reduxjs/toolkit";
import { Employees } from "../../../interfaces/employee";
import { RootState } from "../store";

export interface EmployeeSlice {
    employee: Employees | null;
    token: string | null;
    error: boolean;
}

const initialState: EmployeeSlice = {
    employee: null,
    token: null,
    error: false,
};

export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        employeeloginSuccess: (state, action) => {
            state.employee = action.payload.employee;
            state.error = false;
            state.token = action.payload.token;
        },
        employeeloginFailed: (state) => {
            state.error = true;
        },
        employeelogout: (state) => {
            state.employee = null;
            state.error = false;
            state.token = null;
        },
    },
});

export const selectCount = (state: RootState) => state.employee.employee;
// Action creators are generated for each case reducer function
export const { employeeloginSuccess, employeeloginFailed, employeelogout } =
    employeeSlice.actions;

export default employeeSlice.reducer;
