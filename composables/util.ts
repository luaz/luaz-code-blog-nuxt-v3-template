export const useUtil = () => {
  function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options)
  }

  function title(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return {
    formatDate,
    title
  }
}