export const updatedErrorMessage = ({ label, error, rules }) => {
  let errorMessage = '';

  if (error) {
    switch (error.type) {
      case 'required':
        errorMessage = `${label} is required.`;
        break;
      case 'maxLength':
        errorMessage = `Length not more than ${rules?.maxLength}.`;
        break;
      case 'minLength':
        errorMessage = `Length not less than ${rules?.minLength}.`;
        break;
      case 'max':
        errorMessage = `Value not greater than ${rules?.max}.`;
        break;
      case 'min':
        errorMessage = `Value not less than ${rules?.min}.`;
        break;
      case 'pattern':
        errorMessage = `Does not contain ${rules?.pattern}.`;
        break;

      case 'exist':
        errorMessage = error.message;
        break;
      default:
        errorMessage = error.message || `${label} is required.`;
        break;
    }
  }

  return errorMessage;
};
