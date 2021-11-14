import * as yup from 'yup';
// const validate = (schema, handler) => {
// **********************************
// import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// const yupValidator = (schema) => async (req, res, next) => {
async function yupValidator(schema, handler) {
  // return async (req, res, next) => {
    // console.log(req)
    console.log("888888888888888")
    console.log(schema)
    // return async (req, res, next) => {
    // const body = req.body;
    try {
      // const isValid = await schema.yup.validate(body, { abortEarly: false, stripUnknown: true})
      const isValid = await schema.validate(req.body, { abortEarly: false, stripUnknown: true})
      // const isValid = await schema.validate(body, { abortEarly: false, stripUnknown: true})
      // .catch((err) => { return err });]
      if (isValid) {
      // if (req.body) {
        return next();
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Sever Error. ${err.message}`);
    }
  // }
  // await handler(req, res)
};
export default yupValidator;


















// import * as yup from 'yup';
// // const validate = (schema, handler) => {
// // **********************************
// // import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// // const yupValidator = (schema) => async (req, res, next) => {
// async function yupValidator(schema) {
//   // return async (req, res, next) => {
//     // return async (req, res, next) => {
//     const body = req.body;
//     // try {
//       // const isValid = await schema.yup.validate(body, { abortEarly: false, stripUnknown: true})
//       const isValid = await schema.validate(body, { abortEarly: false, stripUnknown: true})
//       // .catch((err) => { return err });]
//       if (isValid) {
//         return next();
//       }
//     // } catch (err) {
//       // console.error(err.message);
//       // res.status(500).send(`Sever Error. ${err.message}`);
//     // }
//   // }
// };
// export default yupValidator;

























// export const validate = (schema) => {
//   return async (req, res, next) => {
//   // async (req, res, next) => {
//     try {
//       const valid = await schema.validate(req.body, { abortEarly: false, stripUnknown: true}).catch((err) => { return err });
//       if (valid) {
//         return next();
//       } else {
//         // return res.status(400).json(error);
//         return res.status(400).json({ type: err.name, message: err.message });
//       }
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send(`Sever Error. ${err.message}`);
//     }
//     // const valid = await schema.validate(req.body, { abortEarly: false, stripUnknown: true}).catch((err) => { return err });
//     // if (valid) {
//     //   return next();
//     // } else {
//     //   // return res.status(400).json(error);
//     //   return res.status(400).json({ type: err.name, message: err.message });
//     // }
//   }
// };

// array of strings
/*
const validationSchema = Yup.object().shape({
  stringArray: Yup.array().of(Yup.string());
});
*/
/*
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { number, object } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';
export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (['POST', 'PUT'].includes(req.method)) {
      try {
        const newSchema = req.method === 'POST' ? schema : schema.concat(object({ id: number().required().positive() }));

        req.body = await newSchema
          .camelCase()
          .validate(req.body, { abortEarly: false, stripUnknown: true });
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    await handler(req, res);
  };
}

*/
// **********************************
// **********************************
/*
export const validateProp = {
  user: {
    firstName: { type: 'string', minLength: 1, maxLength: 20},
    lastName: { type: 'string', minLength: 1, maxLength: 24},
    username: { type: 'string', minLength: 1, maxLength: 30},
    email: { type: 'string'}
  },
  post: {

  },
  profile: {}
}


export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    bio: { type: 'string', minLength: 0, maxLength: 160 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
};
*/

/*

const schema = {
  "properties": {
    "createdAt": {
      "type": "object",
      "format": "custom-date-time"
    },
    "lastName": {
      "type": "string"
    },
    "firstName": {
      "type": "string"
    },
    "required": [ 'createdAt', 'lastName', 'firstName' ],
    "additionalProperties": false,
  }
};

// My example testobject
const testObj = {
  createdAt: new Date(),
  lastName: "Doe",
  firstName: "John"
}


// The validation
ajv = new Ajv();

ajv.addFormat('custom-date-time', function(dateTimeString) {
  if (typeof dateTimeString === 'object') {
    dateTimeString = dateTimeString.toISOString();
  }

  return !isNaN(Date.parse(dateTimeString));  // return true/false 
});

const validate = ajv.compile(schema);
const valid = validate(testObj);

if (valid)
  alert('valid');
else
  alert('Invalid: ' + ajv.errorsText(validate.errors));
*/