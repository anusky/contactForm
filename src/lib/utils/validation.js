//length maximum validation
const validateMaxLength = ({ value, length = 8 }) => value.length <= length;
//length minimum validation
const validateMinLength = ({ value, length = 8 }) => value.length >= length;
//length equals validation
const validationEqualLength = ({ value, length = 8 }) =>
  value.length === length;

//mandatory validation
const validationMandatory = ({ value, mandatory = false }) =>
  typeof value === 'boolean' ? value : mandatory ? value.length > 0 : true;

//equal comparison
const validationComparison = ({ value, value2 = value, withValue }) =>
  value === withValue;

//regex generic validation
const validationRegex = ({
  value,
  regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
}) => regex.test(value);

//regex password default validation minimum one number, one letter and length between 4 and 8
const validationPassword = ({ value, regex = /^(?=.*\d)(?=.*[a-z]).{4,8}$/ }) =>
  regex.test(value);

//regex email validation
const validationEmail = ({
  value,
  regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
}) => validationRegex({ value, regex });

//regex postalcode validation
const validationPostalcode = ({ value, regex = /^\d{5}$/ }) =>
  value.length > 0 ? validationRegex({ value, regex }) : true;

const validationTelephone = ({ value, regex = /^\d{9}$/ }) =>
  value.length > 0 ? validationRegex({ value, regex }) : true;

const methodList = {
  length: validationEqualLength,
  maxlength: validateMaxLength,
  minlength: validateMinLength,
  mandatory: validationMandatory,
  comparison: validationComparison,
  email: validationEmail,
  password: validationPassword,
  postalcode: validationPostalcode,
  telephone: validationTelephone,
  regex: validationRegex
};

const validateType = (conf, data) =>
  methodList[conf.method]({ ...data, ...conf });

export { validateType };
