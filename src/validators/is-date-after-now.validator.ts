import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsDateAfterNow(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDateAfterNow',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const currentDate = new Date();
          return value && new Date(value) > currentDate;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} debe ser una fecha posterior a la fecha actual`;
        },
      },
    });
  };
}
