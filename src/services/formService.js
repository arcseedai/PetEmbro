// Central Web3Forms Submission Service
const ACCESS_KEY = '65c190d2-c21b-4757-8b8a-5a2849742a98';

export async function sendInquiry(formOrFormData, formTitle = 'PetEmbro Commission Inquiry') {
  let fd;
  if (formOrFormData instanceof FormData) {
    fd = formOrFormData;
  } else if (formOrFormData instanceof HTMLFormElement) {
    fd = new FormData(formOrFormData);
  } else {
    fd = new FormData();
    Object.entries(formOrFormData).forEach(([k, v]) => fd.append(k, v));
  }

  // Ensure required Web3Forms fields
  if (!fd.has('access_key')) fd.append('access_key', ACCESS_KEY);
  if (!fd.has('from_name')) fd.append('from_name', 'PetEmbro Website Inquiries');
  
  const visitorName = fd.get('name') || 'Visitor';
  const petName = fd.get('pet_details') || fd.get('pet_info') || 'Pet Keepsake';
  if (!fd.has('subject')) fd.append('subject', `New ${formTitle}: ${visitorName} (${petName})`);

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: fd
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Web3Forms submission error:', err);
    return { success: false, message: err.message };
  }
}
