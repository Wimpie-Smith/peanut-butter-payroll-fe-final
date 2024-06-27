import customToaster from "../utils/toaster";

export const getEmployeeProfile = async() => {
    
    try {
        const response = await fetch('http://localhost:3001/api/getEmployeeProfile');
        if (!response.ok) {
          throw new Error('Failed to fetch employee profiles');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
}

export const createOrUpdateUserProfile = async(req:any)=> {

  try {
    const response = await fetch('http://localhost:3001/api/createOrUpdateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    });
    if (!response.ok) {
      customToaster(false, 'Save failure', 'The data could not be saved');
      throw new Error('Failed to create or update profile');
      
    }
  
    customToaster(true, 'Save Success', 'The data saved successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}