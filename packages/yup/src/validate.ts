import { FormModel } from '@filledout/core';
import { sample } from 'effector';
import { YupValidateParams } from './types';

const applyYupValidationFlow = ({
  submit,
  submitted,
  $errors
}: FormModel<any, YupValidateParams>) => {};

export { applyYupValidationFlow };
