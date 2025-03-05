import type { NetworkOptionsFormState } from './NetworkForm.types';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import PageLoadSpinner from '@components/PageLoadSpinner';
import { ButtonLoading } from '@tailus-ui/Button';
import Card from '@tailus-ui/Card';
import Input from '@tailus-ui/Input';
import Textarea from '@tailus-ui/Textarea';
import { Title } from '@tailus-ui/typography';
import { Formik } from 'formik';
import React from 'react';
import useNetworkForm from './useNetworkForm';

function NetworkForm() {
  const {
    networkFormOptionsData,
    isLoadingNetworkFormOptions,
    networkFormOptionsError,
    submitNetworkOptionsEditFormHandler,
  } = useNetworkForm();

  if (!networkFormOptionsData && !networkFormOptionsError && !isLoadingNetworkFormOptions) {
    return (
      <p>
        No data
      </p>
    );
  }

  if (networkFormOptionsError) {
    return (
      <p>
        Error:
        {networkFormOptionsError.message}
      </p>
    );
  }

  if (isLoadingNetworkFormOptions) {
    return <PageLoadSpinner />;
  }

  return (
    <Formik<NetworkOptionsFormState>
      enableReinitialize
      initialValues={networkFormOptionsData}
      onSubmit={submitNetworkOptionsEditFormHandler}
    >
      {({ handleBlur, submitForm, handleChange, values, errors, isSubmitting }) => {
        return (
          <Card fancy variant="outlined" className="p-0 w-full">
            <Card variant="soft" className="mt-0">
              <Title size="base" className="mb-4">Network info</Title>

              <div className="pb-4">
                <Input
                  label="Direct URL"
                  name="directUrl"
                  size="sm"
                  defaultValue={values.directUrl}
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={errors.directUrl}
                />
              </div>

              <div className="pb-4">
                <Input
                  label="SSP Domain"
                  name="sspDomain"
                  size="sm"
                  defaultValue={values.sspDomain}
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={errors.sspDomain}
                />
              </div>

              <div className="pb-4">
                <Textarea
                  rows={14}
                  label="Direct code"
                  name="description"
                  value={values.directCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={errors.directCode}
                  className="font-[monospace]"
                />
              </div>

              <div className="pb-4">
                <Textarea
                  rows={14}
                  label="Template code"
                  name="templateCode"
                  value={values.templateCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={errors.templateCode}
                  className="font-[monospace]"
                />
              </div>

            </Card>
            <div>
              <div className="px-6 pt-1">
                <FormElementErrorLabel error={errors.result} />
              </div>
              <div className="flex justify-end py-4 px-6">
                <ButtonLoading
                  loading={isLoadingNetworkFormOptions}
                  onClick={submitForm}
                  size="sm"
                >
                  Save
                </ButtonLoading>
              </div>
            </div>
          </Card>
        );
      }}
    </Formik>
  );
}

export default NetworkForm;
