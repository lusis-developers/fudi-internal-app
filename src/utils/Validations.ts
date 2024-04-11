export const businessRules = {
  nameValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'El nombre debe tener al menos 2 caracteres'
    },
  ],
  instagramValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'Instagram debe tener al menos 2 caracteres'
    },
  ],
  latValidation: [
    {
      validate: (value: string) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= -90 && num <= 90;
      },
      message: 'La latitud debe estar entre -90 y 90'
    },
  ],
  lngValidation: [
    {
      validate: (value: string) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= -180 && num <= 180;
      },
      message: 'La longitud debe estar entre -180 y 180'
    },
  ],
  radiusValidation: [
    {
      validate: (value: string) => {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0;
      },
      message: 'El radio debe ser un número positivo'
    },
  ],
  scheduleValidation: [
    {
      validate: (value: string) => {
        const schedulePattern = /^(1[0-2]|0?[1-9])(am|pm) - (1[0-2]|0?[1-9])(am|pm)$/;
        return schedulePattern.test(value);
    },
      message: 'El horario debe estar en el formato "1am - 2pm" o "2pm - 6pm".'
    },
  ],
};


export const bankRules = {
  bankNameValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'El nombre del banco debe tener al menos 2 caracteres'
    },
  ],
  accountTypeValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'El tipo de cuenta debe tener al menos 2 caracteres'
    },
  ],
  accountNumberValidation: [
    {
      validate: (value: string) => /^\d+$/.test(value),
      message: 'El número de cuenta solo debe contener números'
    },
  ],
  emailValidation: [
    {
      validate: (value: string) => /^\S+@\S+\.\S+$/.test(value),
      message: 'Por favor, introduzca un correo electrónico válido'
    },
  ],
};

export const itemRules = {
  nameValidation: [
    {
      validate: (value: string) => value.length >= 2,
      message: 'El nombre debe tener al menos 2 caracteres'
    },
  ],
  priceValidation: [
    {
      validate: (value: string) => !isNaN(Number(value)),
      message: 'El precio debe ser un número'
    },
  ],
};