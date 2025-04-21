import ApiService from '../../api/noTokenApi';
import { trackPromise } from '../../modules/PromiseTrackter';

interface EmailResponse {
  exist: boolean;
  Error: boolean;
  Status: number;
}

export const checkEmailExists = async (email: string, clientId: number) => {
  try {
    const response = await trackPromise(
      ApiService.postWithData('admin', 'email-exists', {
        clientId: clientId,
        email: email
      })
    );
    
    const data = response.data as EmailResponse;

    return {
      exists: data.exist,
      message: data.exist ? 'Email already exists' : ''
    };
  } catch (error) {
    console.error('Error checking email:', error);
    return {
      exists: false,
      message: ''  
    };
  }
}; 