import { Joi } from 'express-validation'

export const pagination = {
    body: Joi.object({
        pageSize: Joi.number().required(),
        pageNumber: Joi.number().required(),
    })
};

export const getbyId = {
    params: Joi.object({
        id: Joi.string().guid().required()
    })
};

// export const registerValidation = {
//     body: Joi.object({
//       email: Joi.string().allow(null, '')
//         .email(),
//       userName: Joi.string()
//         .regex(/^[a-zA-Z0-9\-\@\#]*$/)
//         .required(),
//       dob : Joi.date().less('now').required(),
//       mobile: Joi.string().allow(null, ''),
//        fullName: Joi.string().required(),
//        password: Joi.string().required(),
//        loginMode: Joi.string().required(),
//        languagId : Joi.string(),
//       gender : Joi.string().required(),
//       addressBy: Joi.string().required(),
//       googleId : Joi.string().allow(null, ''),
//       platform : Joi.string().allow(null, ''),
//         ipAddress:  Joi.string().allow(null, ''),
//         deviceId:  Joi.string().allow(null, ''),
//         deviceInfo : Joi.string().allow(null, ''),
//         locationLAT : Joi.string().allow(null, ''),
//         locationLONG : Joi.string().allow(null, ''),
//         fcmToken : Joi.string().allow(null, ''),
//         appleId : Joi.string().allow(null, '')
//     }),
//   }
