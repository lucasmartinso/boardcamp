import DateExtension from '@joi/date';
import joi from 'joi';
const Joi = joi.extend(DateExtension);

const customersSchema = joi.object({
    name: joi.string().required(), 
    phone: joi.string().pattern(/[0-9]{10,11}/).required(),
    cpf: joi.string().pattern(/[0-9]{11}/).required(), 
    birthday: Joi.date().required(), 
});

export default customersSchema;