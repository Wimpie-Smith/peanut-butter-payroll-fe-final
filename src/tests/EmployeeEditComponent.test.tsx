import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeeEditComponenet } from '../components/PayrollContent/EmployeeEditComponent';
import { IEmployeeData } from '../types/interfaces/employeeModels'
import { EGenderNames, EProfileColours } from '../types/enums/userProfileEnum'

const mockData: IEmployeeData = {
    firstName: 'John',
    lastName: 'Doe',
    employeeNumber: 123,
    gender: EGenderNames.male,
    salutation: 'Mr',
    profileColour: EProfileColours.defualt,
    grossSalary: 50000,
    fullNames:'John Doe'
};

const mockOnSave = jest.fn();

describe('EmployeeEditComponent', () => {
    it('should render the component', () => {
        render(<EmployeeEditComponenet data={mockData} onSave={mockOnSave} />);

        expect(screen.getByText(/Employee Information/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/First Name\(s\)/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Salutation/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Employee #/i)).toBeInTheDocument();
    });

    it('should update first name state on input change', () => {
        render(<EmployeeEditComponenet data={mockData} onSave={mockOnSave} />);

        const firstNameInput = screen.getByLabelText(/First Name\(s\)/i) as HTMLInputElement;
        fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

        expect(firstNameInput.value).toBe('Jane');
    });

    it('should update last name state on input change', () => {
        render(<EmployeeEditComponenet data={mockData} onSave={mockOnSave} />);

        const lastNameInput = screen.getByLabelText(/Last Name/i) as HTMLInputElement;
        fireEvent.change(lastNameInput, { target: { value: 'Smith' } });

        expect(lastNameInput.value).toBe('Smith');
    });

    it('should update employee number state on input change', () => {
        render(<EmployeeEditComponenet data={mockData} onSave={mockOnSave} />);

        const employeeNumberInput = screen.getByLabelText(/Employee #/i) as HTMLInputElement;
        fireEvent.change(employeeNumberInput, { target: { value: '456' } });

        expect(employeeNumberInput.value).toBe('456');
    });

    it('should call onSave function when Save button is clicked', () => {
        render(<EmployeeEditComponenet data={mockData} onSave={mockOnSave} />);

        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);

        expect(mockOnSave).toHaveBeenCalled();
    });

    it('should reset the form when Cancel button is clicked', () => {
        render(<EmployeeEditComponenet data={mockData} onSave={mockOnSave} />);

        const firstNameInput = screen.getByLabelText(/First Name\(s\)/i) as HTMLInputElement;
        fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

        const cancelButton = screen.getByText(/Cancel/i);
        fireEvent.click(cancelButton);

        expect(firstNameInput.value).toBe(mockData.firstName);
    });

    it('should validate form fields correctly', () => {
        const invalidData: IEmployeeData = {
            firstName: '',
            lastName: '',
            employeeNumber: 0,
            gender: '',
            salutation: '',
            profileColour: EProfileColours.defualt,
            grossSalary: 0,
            fullNames:'',
        };
        
        render(<EmployeeEditComponenet data={invalidData} onSave={mockOnSave} />);

        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);

        expect(screen.getByText((content, element) => content.includes('First Name(s) is required'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.includes('Last Name is required'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.includes('Employee # is required'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.includes('Gender is required'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => content.includes('Salutation is required'))).toBeInTheDocument();
    });
});
