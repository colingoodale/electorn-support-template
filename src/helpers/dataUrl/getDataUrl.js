// Get dataURI from file input field
export default (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    
    reader.readAsDataURL(file);
  });
}