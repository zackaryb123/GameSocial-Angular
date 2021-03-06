import { SimpleChange } from '@angular/core';

export const isNewChange = (prop: SimpleChange) => {
  return prop.currentValue && prop.currentValue !== prop.previousValue;
};

export const toPayload = (action: any) => action.payload;
