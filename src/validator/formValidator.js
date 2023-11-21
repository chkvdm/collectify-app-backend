import { check, validationResult } from 'express-validator';

export const showInvalidData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Invalid data input' });
  }
  next();
};

export const validateForm = [
  check('email')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  check('password')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 8, max: 16 }),
  check('name')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1, max: 128 }),
];
