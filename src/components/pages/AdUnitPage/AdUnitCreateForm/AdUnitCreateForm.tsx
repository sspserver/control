import type { AdUnitCreateFormProps, AdUnitCreateFormState } from './AdUnitCreateForm.types';

import { LabelCopyCodeButton } from '@components/Button';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import useAdUnitCreateForm from '@components/pages/AdUnitPage/AdUnitCreateForm/useAdUnitCreateForm';
import Button, { ButtonLoading } from '@tailus-ui/Button';
import Drawer from '@tailus-ui/Drawer/Drawer';
import Input from '@tailus-ui/Input';
import Separator from '@tailus-ui/Separator';
import Textarea from '@tailus-ui/Textarea';
import { Formik } from 'formik';
import React, { Fragment } from 'react';

const defaultFormTitle = 'AdUnit';

function AdUnitCreateForm({ onCancel, onSubmit }: AdUnitCreateFormProps) {
  const {
    isLoading,
    isCreateMode,
    adUnitData,
    submitAdUnitCreateEditFormHandler,
  } = useAdUnitCreateForm(onSubmit);
  const hasAdUnitTitle = !!adUnitData?.title;
  const adUnitTitle = hasAdUnitTitle ? adUnitData?.title : defaultFormTitle;
  const formTitle = isCreateMode ? `Create ${adUnitTitle}` : `Edit ${adUnitTitle}`;
  const formSaveButtonTitle = isCreateMode ? 'Create' : 'Save';

  return (
    <Fragment>
      <Drawer.Title size="lg" className="pb-0">
        {formTitle}
      </Drawer.Title>
      <Separator />
      <Formik<AdUnitCreateFormState>
        enableReinitialize
        initialValues={adUnitData}
        onSubmit={submitAdUnitCreateEditFormHandler}
      >
        {({ handleBlur, submitForm, handleChange, values, errors, isSubmitting }) => {
          return (
            <Fragment>
              <div className="overflow-y-auto h-full relative pl-0.5 !m-0 pt-2">

                {values.codename && (
                  <div className="pb-4">
                    <LabelCopyCodeButton
                      label="Codename"
                      variant="outlined"
                      code={values.codename ?? ''}
                      size="sm"
                      className="text-left mt-2"
                    >
                      {values.codename}
                    </LabelCopyCodeButton>
                  </div>
                )}

                <div className="pb-4">
                  <Input
                    label="Title"
                    name="title"
                    size="sm"
                    defaultValue={values.title}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.title}
                  />
                </div>
                <div className="pb-4">
                  <Textarea
                    label="Description"
                    name="description"
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.description}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    size="sm"
                    label="Min ECPM"
                    name="minECPM"
                    type="number"
                    defaultValue={values.minECPM}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.minECPM}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    size="sm"
                    label="Fixed Purchase Price (CPM)"
                    name="fixedPurchasePrice"
                    type="number"
                    defaultValue={values.fixedPurchasePrice}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.fixedPurchasePrice}
                  />
                </div>
              </div>
              <div className="h-fit !mt-0 bottom-0">
                <Separator />
                <FormElementErrorLabel error={errors.result} />
                <div className="flex gap-3 pt-2 justify-end">
                  <ButtonLoading
                    loading={isLoading}
                    onClick={submitForm}
                    size="sm"
                  >
                    {formSaveButtonTitle}
                  </ButtonLoading>
                  <Button.Root variant="outlined" size="sm" intent="gray" onClick={onCancel}>
                    <Button.Label>Cancel</Button.Label>
                  </Button.Root>
                </div>
              </div>
            </Fragment>
          );
        }}
      </Formik>
    </Fragment>
  );
}

export default AdUnitCreateForm;
