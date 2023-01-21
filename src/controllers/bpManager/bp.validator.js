import {
	Joi
} from 'express-validation';

export const createCategory = {
	body: Joi.object({
		name: Joi.string().required(),
	})
};


export const updateCategory = {
	body: Joi.object({
		name: Joi.string().required(),
	}),
	params: Joi.object({
        id: Joi.string().guid().required()
    })
};


export const createSubCategory = {
	body: Joi.object({
		name: Joi.string().required(),
		categoryId: Joi.string().guid().required()
	})
};

export const updateSubCategory = {
	body: Joi.object({
		name: Joi.string().required(),
		categoryId: Joi.string().guid().required()
	}),
	params: Joi.object({
        id: Joi.string().guid().required()
    })
};