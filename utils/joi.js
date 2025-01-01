import Joi from "joi";

export default async function validateInput(email, password) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/),
  });
  
  const { error } = schema.validate({ email, password });

  if (error) {
    
    return { isValid: false, message: error.details[0].message };
  }
  return { isValid: true, message: "Validation successful!" };
}
