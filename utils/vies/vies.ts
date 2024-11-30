import axios from 'axios';

const VIES_API_URL = 'https://ec.europa.eu/taxation_customs/vies/services/checkVatService';

interface ViesResponse {
  valid: boolean;
  name?: string;
  address?: string;
  vatNumber?: string;
  countryCode?: string;
  requestDate?: string;
}

export async function validateVAT(vatNumber: string): Promise<ViesResponse> {
  // Extract country code and number
  const countryCode = vatNumber.substring(0, 2).toUpperCase();
  const number = vatNumber.substring(2);

  try {
    const response = await axios.post(VIES_API_URL, {
      countryCode,
      vatNumber: number
    }, {
      headers: {
        'Content-Type': 'application/xml',
        'SOAPAction': ''
      }
    });

    // Parse XML response
    const xmlData = response.data;
    const valid = xmlData.includes('<valid>true</valid>');
    
    // Extract business info if valid
    let businessInfo = {
      name: '',
      address: ''
    };

    if (valid) {
      const nameMatch = xmlData.match(/<name>(.*?)<\/name>/);
      const addressMatch = xmlData.match(/<address>(.*?)<\/address>/);
      
      businessInfo = {
        name: nameMatch ? nameMatch[1] : '',
        address: addressMatch ? addressMatch[1] : ''
      };
    }

    return {
      valid,
      vatNumber,
      countryCode,
      ...businessInfo,
      requestDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('VIES validation error:', error);
    return {
      valid: false,
      vatNumber,
      countryCode
    };
  }
}