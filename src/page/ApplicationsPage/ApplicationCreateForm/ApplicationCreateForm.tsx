import type {
  ApplicationCreateFormProps,
  ApplicationCreateFormState,
} from '@/page/ApplicationsPage/ApplicationCreateForm/ApplicationCreateForm.types';
import CategoriesSelect from '@/components/CategoriesSelect';
import Select from '@/components/Select';
import {
  applicationPlatforms,
  applicationTypes,
} from '@/page/ApplicationsPage/ApplicationCreateForm/ApplicationCreateForm.const';
import useApplicationCreateForm from '@/page/ApplicationsPage/ApplicationCreateForm/useApplicationCreateForm';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import Button, { ButtonLoading } from '@tailus-ui/Button';
import Drawer from '@tailus-ui/Drawer/Drawer';
import Input from '@tailus-ui/Input';

import Textarea from '@tailus-ui/Textarea';
import { Formik } from 'formik';
import React, { Fragment } from 'react';

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
  const formTitle = isCreateMode ? 'Create Application' : `Edit ${applicationTitle}`;
  const formSaveButtonTitle = isCreateMode ? 'Create' : 'Save';

  return (
    <Fragment>
      <Drawer.Title className="pb-5">{formTitle}</Drawer.Title>
      <Formik<ApplicationCreateFormState>
        enableReinitialize
        initialValues={{ ...applicationData }}
        onSubmit={submitApplicationCreateEditFormHandler}
      >
        {({ setFieldValue, handleBlur, submitForm, handleChange, values, errors, isSubmitting }) => {
          const editable = true; // !id || !responseApplication?.title;

          return (
            <Fragment>
              <div className="overflow-y-auto relative -mr-6 pr-6">

                <div className="pb-4">
                  <Input
                    label="Title"
                    name="title"
                    size="sm"
                    defaultValue={values.title}
                    required
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!editable || isSubmitting}
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
                    disabled={!editable || isSubmitting}
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
                    disabled={!editable || isSubmitting}
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
                    error={errors.categories}
                    values={values.categories ?? []}
                    onChange={(values) => {
                      setFieldValue('categories', values);
                    }}
                  />
                </div>
              </div>
              <div className="mt-auto h-fit bottom-0 pt-2">
                <FormElementErrorLabel error={errors.result} />
                <div className="flex gap-3 pt-2">
                  <ButtonLoading loading={isLoading} onClick={submitForm} size="sm">{formSaveButtonTitle}</ButtonLoading>
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
