// Central Web3Forms Submission Service
const ACCESS_KEY = '65c190d2-c21b-4757-8b8a-5a2849742a98';

export async function sendInquiry(formData, formTitle = 'PetEmbro Commission Inquiry') {
  const object = Object.fromEntries(formData.entries());
  const petName = object.pet_details || object.pet_info || 'Custom Keepsake';
  const payload = {
    access_key: ACCESS_KEY,
    subject: `New ${formTitle}: ${object.name || 'Visitor'} (${petName})`,
    from_name: 'PetEmbro Website',
    ...object
  };

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error('Web3Forms submission error:', err);
    return { success: false, message: err.message };
  }
}
