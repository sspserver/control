import type {
  ApplicationCreateFormProps,
  ApplicationCreateFormState,
} from './ApplicationCreateForm.types';
import CategoriesSelect from '@components/CategoriesSelect';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import Select from '@components/Select';
import Button, { ButtonLoading } from '@tailus-ui/Button';
import Drawer from '@tailus-ui/Drawer/Drawer';
import Input from '@tailus-ui/Input';
import Separator from '@tailus-ui/Separator';

import Textarea from '@tailus-ui/Textarea';
import { Formik } from 'formik';
import React, { Fragment } from 'react';
import {
  applicationPlatforms,
  applicationTypes,
} from './ApplicationCreateForm.const';
import useApplicationCreateForm from './useApplicationCreateForm';

const defaultFormTitle = 'Application';

function ApplicationCreateForm({ onCancel, onSubmit }: ApplicationCreateFormProps) {
  const {
    isLoading,
    isCreateMode,
    applicationData,
    submitApplicationCreateEditFormHandler,
  } = useApplicationCreateForm(onSubmit);
  const hasApplicationTitle = !!applicationData?.title;
  const applicationTitle = hasApplicationTitle ? applicationData?.title : defaultFormTitle;
  const formTitle = isCreateMode ? `Create ${defaultFormTitle}` : `Edit ${applicationTitle}`;
  const formSaveButtonTitle = isCreateMode ? 'Create' : 'Save';

  return (
    <Fragment>
      <Drawer.Title size="lg" className="pb-0">
        {formTitle}
      </Drawer.Title>
      <Separator />
      <Formik<ApplicationCreateFormState>
        enableReinitialize
        initialValues={applicationData}
        onSubmit={submitApplicationCreateEditFormHandler}
      >
        {({ setFieldValue, handleBlur, submitForm, handleChange, values, errors, isSubmitting }) => {
          return (
            <Fragment>
              <div className="overflow-y-auto h-full relative pl-0.5 !m-0 pt-2">

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
                    label="URI"
                    name="URI"
                    defaultValue={values.URI}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.URI}
                  />
                </div>
                <div className="pb-4">
                  <Select
                    label="Type"
                    name="type"
                    items={applicationTypes}
                    value={values.type}
                    onChange={handleChange('type')}
                    error={errors.type}
                  />
                </div>
                <div className="pb-4">
                  <Select
                    label="Platform"
                    name="platform"
                    items={applicationPlatforms}
                    value={values.platform}
                    onChange={handleChange('platform')}
                    error={errors.platform}
                  />
                </div>
                <div className="pb-4">
                  <CategoriesSelect
                    label="Categories"
                    error={errors.categories}
                    values={values.categories ?? []}
                    onChange={(values) => {
                      setFieldValue('categories', values);
                    }}
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

export default ApplicationCreateForm;
