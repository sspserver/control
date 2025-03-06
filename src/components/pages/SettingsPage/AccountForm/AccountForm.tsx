import type { AccountFormState } from './AccountForm.types';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import PageLoadSpinner from '@components/PageLoadSpinner';
import { ButtonLoading } from '@tailus-ui/Button';
import Card from '@tailus-ui/Card';
import Input from '@tailus-ui/Input';
import Textarea from '@tailus-ui/Textarea';
import { Title } from '@tailus-ui/typography';
import { Formik } from 'formik';
import React from 'react';
import useAccountForm from './useAccountForm';

function AccountForm() {
  const {
    accountLoading,
    accountData,
    accountLoadError,
    isUpdateAccountLoading,
    submitAccountEditFormHandler,
  } = useAccountForm();

  if (!accountData && !accountLoadError && !accountLoading) {
    return (
      <p>
        No data
      </p>
    );
  }

  if (accountLoadError) {
    return (
      <p>
        Error:
        {accountLoadError.message}
      </p>
    );
  }

  if (accountLoading) {
    return <PageLoadSpinner />;
  }

  return (
    <Formik<AccountFormState>
      enableReinitialize
      initialValues={accountData}
      onSubmit={submitAccountEditFormHandler}
    >
      {({ handleBlur, submitForm, handleChange, values, errors, isSubmitting }) => {
        return (
          <Card fancy variant="outlined" className="p-0 w-full">
            <Card variant="soft" className="mt-0">
              <Title size="base" className="mb-4">Account info</Title>

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
                  label="Logo URL"
                  name="logoURI"
                  size="sm"
                  defaultValue={values.logoURI}
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={errors.logoURI}
                />
              </div>

              <div className="pb-4">
                <Input
                  label="Policy URI"
                  name="policyURI"
                  size="sm"
                  defaultValue={values.policyURI}
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={errors.policyURI}
                />
              </div>

              <div className="pb-4">
                <Input
                  label="Terms of service URI"
                  name="termsOfServiceURI"
                  size="sm"
                  defaultValue={values.termsOfServiceURI}
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={errors.termsOfServiceURI}
                />
              </div>

              <div className="pb-4">
                <Input
                  label="Client URI"
                  name="clientURI"
                  size="sm"
                  defaultValue={values.clientURI}
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  error={errors.clientURI}
                />
              </div>
            </Card>
            <div>
              <FormElementErrorLabel error={errors.result} />
              <div className="flex justify-end py-4 px-6">
                <ButtonLoading loading={isUpdateAccountLoading} onClick={submitForm} size="sm">Save</ButtonLoading>
              </div>
            </div>
          </Card>
        );
      }}
    </Formik>
  );
}

export default AccountForm;
