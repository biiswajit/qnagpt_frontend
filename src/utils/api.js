/**
 * Function to upload a PDF file, query, and difficulty level to the API
 * @param {File} pdfFile - The PDF file to upload
 * @param {string} query - The user's query
 * @param {string} difficulty - The difficulty level
 * @returns {Promise} - Promise resolving to the API response
 */
export const uploadPDFAndQuery = async (pdfFile, query, difficulty) => {
  const formData = new FormData();
  formData.append('pdf', pdfFile);
  formData.append('query', query);
  formData.append('difficulty', difficulty);

  try {
    const response = await fetch('http://localhost:8000/v1/upload', {
      method: 'POST',
      body: formData,
      // No need to set Content-Type header, it's automatically set with boundary for FormData
      // Don't set 'Content-Type': 'multipart/form-data' manually as it will break the boundary
    });

    if (!response.ok) {
      // Get error details from the response if available
      let errorDetail;
      try {
        const errorData = await response.json();
        errorDetail = errorData.detail || response.statusText;
      } catch {
        errorDetail = response.statusText;
      }
      throw new Error(`API Error: ${errorDetail}`);
    }

    return await response.text(); // Assuming the API returns text
  } catch (error) {
    console.error('Error uploading PDF and query:', error);
    throw error;
  }
};