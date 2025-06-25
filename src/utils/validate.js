/**
 * Basic email format validation
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate feedback form fields
 */
export const validateFeedback = ({ name, email, businessInterest, expectedPrice }) => {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Name is required and must be at least 2 characters.';
  }

  if (!email || !isValidEmail(email)) {
    errors.email = 'Valid email is required.';
  }

  if (!businessInterest || businessInterest.trim().length < 5) {
    errors.businessInterest = 'Business interest must be more descriptive.';
  }

  if (!expectedPrice) {
    errors.expectedPrice = 'Expected price is required.';
  }

  return errors;
};

/**
 * Validate proposal text
 */
export const validateProposal = (text) => {
  if (!text || text.trim().length < 10) {
    return 'Proposal must be at least 10 characters long.';
  }
  return null;
};
