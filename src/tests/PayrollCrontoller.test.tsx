import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PayrollController } from '../components/PayrollContent/PayrollController';
import { getEmployeeProfile } from '../services/apiService';
import { IEmployeeData } from '../types/interfaces/employeeModels';
import { createBlankUserData } from '../utils/createStructure';

jest.mock('../services/apiService');
const mockGetEmployeeProfile = getEmployeeProfile as jest.Mock;

const mockEmployees: IEmployeeData[] = [
    {
        employeeNumber: 1001,
        firstName: 'Mianike',
        lastName: 'Sussie',
        salutation: 'Ms.',
        profileColour: 'Red',
        gender:'Female',
        fullNames:'',
        grossSalary:10000000
    }
];

describe('PayrollController Component', () => {
    beforeEach(() => {
        mockGetEmployeeProfile.mockResolvedValue(mockEmployees);
    });

    test('renders correctly and fetches employee profiles', async () => {
        render(<PayrollController />);

        // Get Employee data and set it.
        await waitFor(() => expect(mockGetEmployeeProfile).toHaveBeenCalled());

        // Make sure the data is displayed in the table
        expect(screen.getByText('Mianike')).toBeInTheDocument();
        expect(screen.getByText('Sussie')).toBeInTheDocument();
        expect(screen.getByText('Duanre')).toBeInTheDocument();
        expect(screen.getByText('Smith')).toBeInTheDocument();
    });

    test('selects an employee and displays the edit component', async () => {
        render(<PayrollController />);

        await waitFor(() => expect(mockGetEmployeeProfile).toHaveBeenCalled());

        // Test click on employee record
        fireEvent.click(screen.getByText('Mianike'));

        // Test if the selected data is shown
        expect(screen.getByDisplayValue('Mianike')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Sussie')).toBeInTheDocument();
    });

    test('adds a new employee when the Add Employee button is clicked', async () => {
        render(<PayrollController />);

        await waitFor(() => expect(mockGetEmployeeProfile).toHaveBeenCalled());

        // Click the Add Employee button
        fireEvent.click(screen.getByText('Add Employee'));

        // Check if the EmployeeEditComponent gets data
        expect(screen.getByDisplayValue(createBlankUserData(0).firstName)).toBeInTheDocument();
    });
});
