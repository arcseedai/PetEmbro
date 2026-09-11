// ImgBB Upload Service for Pet Photos & 3D Keepsake Previews
const IMGBB_API_KEY = '70d5dc370500d803f00ce21e6843d231';

/**
 * Uploads a single file or blob to ImgBB and returns the public link
 * @param {File|Blob} fileOrBlob 
 * @param {string} filename 
 * @returns {Promise<{success: boolean, url?: string, displayUrl?: string, thumbUrl?: string, error?: string}>}
 */
export async function uploadImageToImgBB(fileOrBlob, filename = 'pet_photo.jpg') {
  try {
    const fd = new FormData();
    fd.append('image', fileOrBlob, filename);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: fd
    });

    const data = await res.json();
    if (data.success && data.data) {
      return {
        success: true,
        url: data.data.url,
        displayUrl: data.data.display_url || data.data.url,
        thumbUrl: data.data.thumb?.url || data.data.url_viewer,
        title: data.data.title || filename
      };
    } else {
      console.warn('ImgBB upload returned unsuccessful:', data);
      return {
        success: false,
        error: data.error?.message || 'Upload failed'
      };
    }
  } catch (err) {
    console.error('ImgBB network upload error:', err);
    return {
      success: false,
      error: err.message
    };
  }
}
