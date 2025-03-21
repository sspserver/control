import type {
  RTBCreateFormProps,
  RTBCreateFormState,
} from './RtbCreateForm.types';

import AdFormatsSelect from '@components/AdFormatsSelect';
import BrowsersSelect from '@components/BrowsersSelect';
import CategoriesSelect from '@components/CategoriesSelect';
import CountriesSelect from '@components/CountriesSelect';
import DevicesSelect from '@components/DevicesSelect';
import DeviceTypeSelect from '@components/DeviceTypeSelect';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import OsSelect from '@components/OsSelect';
import {
  adBlockOptions,
  auctionTypeOptions,
  ipOptions,
  methodOptions,
  privateBrowsingOptions,
  protocolOptions,
  requestTypeOptions,
  secureOptions,
} from '@components/pages/RtbPage/RtbCreateForm/RtbCreateForm.const';
import useRtbCreateForm from '@components/pages/RtbPage/RtbCreateForm/useRtbCreateForm';
import Select from '@components/Select';
import ToggleButtonGroup from '@components/ToggleButtonGroup/ToggleButtonGroup';
import Button, { ButtonLoading } from '@tailus-ui/Button';
import Drawer from '@tailus-ui/Drawer/Drawer';
import Input from '@tailus-ui/Input';
import Textarea from '@tailus-ui/Textarea';
import { Formik } from 'formik';
import React, { Fragment } from 'react';

const defaultFormTitle = 'RTB';

function RtbCreateForm({ onCancel, onSubmit }: RTBCreateFormProps) {
  const {
    isLoading,
    isCreateMode,
    rtbData,
    submitRtbCreateEditFormHandler,
  } = useRtbCreateForm(onSubmit);
  const hasAdUnitTitle = !!rtbData?.title;
  const adUnitTitle = hasAdUnitTitle ? rtbData?.title : defaultFormTitle;
  const formTitle = isCreateMode ? `Create ${adUnitTitle}` : `Edit ${adUnitTitle}`;
  const formSaveButtonTitle = isCreateMode ? 'Create' : 'Save';

  return (
    <Fragment>
      <Drawer.Title className="pb-5">{formTitle}</Drawer.Title>
      <Formik<RTBCreateFormState>
        enableReinitialize
        initialValues={rtbData}
        onSubmit={submitRtbCreateEditFormHandler}
      >
        {({ setFieldValue, handleBlur, submitForm, handleChange, values, errors, isSubmitting }) => {
          return (
            <Fragment>
              <div className="overflow-y-auto relative -mr-6 pr-6 pl-0.5 -ml-0.5">

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
                  <Select
                    label="Protocol"
                    name="protocol"
                    items={protocolOptions}
                    value={values.protocol}
                    onChange={value => setFieldValue('protocol', value)}
                    error={errors.protocol}
                  />
                </div>
                <div className="pb-4">
                  <Select
                    label="Auction Type"
                    name="auctionType"
                    items={auctionTypeOptions}
                    value={values.auctionType}
                    onChange={value => setFieldValue('auctionType', value)}
                    error={errors.auctionType}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    size="sm"
                    label="URL"
                    name="URL"
                    type="text"
                    defaultValue={values.URL}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.URL}
                  />
                </div>
                <div className="pb-4">
                  <Select
                    label="Method"
                    name="method"
                    items={methodOptions}
                    value={values.method}
                    onChange={value => setFieldValue('method', value)}
                    error={errors.method}
                  />
                </div>
                <div className="pb-4">
                  <Select
                    label="Request Type"
                    name="requestType"
                    items={requestTypeOptions}
                    value={values.requestType}
                    onChange={value => setFieldValue('requestType', value)}
                    error={errors.requestType}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    size="sm"
                    label="RPS (Requests per second)"
                    name="RPS"
                    type="number"
                    defaultValue={values.RPS}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.RPS}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    size="sm"
                    label="Request timeout (ms) / 1000ms = 1s"
                    name="timeout"
                    type="number"
                    defaultValue={values.timeout}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.timeout}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    size="sm"
                    label="Accuracy"
                    name="accuracy"
                    type="number"
                    defaultValue={values.accuracy}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.accuracy}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    size="sm"
                    label="Price Correction Reduce"
                    name="priceCorrectionReduce"
                    type="number"
                    defaultValue={values.priceCorrectionReduce}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.priceCorrectionReduce}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    size="sm"
                    label="Minimum Bid"
                    name="minBid"
                    type="number"
                    defaultValue={values.minBid}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.minBid}
                  />
                </div>
                <div className="pb-4">
                  <Input
                    size="sm"
                    label="Maximum Bid"
                    name="maxBid"
                    type="number"
                    defaultValue={values.maxBid}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    error={errors.maxBid}
                  />
                </div>
                <div className="pb-4">
                  <AdFormatsSelect
                    label="Ad formats"
                    values={values.formats ?? []}
                    onChange={values => setFieldValue('formats', values)}
                    error={errors.formats}
                  />
                </div>
                <div className="pb-4">
                  <DeviceTypeSelect
                    label="Device types"
                    values={values.deviceTypes ?? []}
                    onChange={values => setFieldValue('deviceTypes', values)}
                    error={errors.deviceTypes}
                  />
                </div>
                <div className="pb-4">
                  <DevicesSelect
                    label="Devices"
                    values={values.devices ?? []}
                    onChange={values => setFieldValue('devices', values)}
                    error={errors.devices}
                  />
                </div>
                <div className="pb-4">
                  <OsSelect
                    label="Operating Systems"
                    values={values.OS ?? []}
                    onChange={values => setFieldValue('OS', values)}
                    error={errors.OS}
                  />
                </div>
                <div className="pb-4">
                  <BrowsersSelect
                    label="Browsers"
                    values={values.browsers ?? []}
                    onChange={values => setFieldValue('browsers', values)}
                    error={errors.browsers}
                  />
                </div>
                <div className="pb-4">
                  <CategoriesSelect
                    label="Categories"
                    values={values.carriers ?? []}
                    onChange={values => setFieldValue('carriers', values)}
                    error={errors.carriers}
                  />
                </div>
                <div className="pb-4">
                  <CountriesSelect
                    label="Countries"
                    values={values.countries ?? []}
                    onChange={values => setFieldValue('countries', values)}
                    error={errors.countries}
                  />
                </div>
                <div className="pb-4">
                  <ToggleButtonGroup
                    label="Secure"
                    onValueChange={value => setFieldValue('secure', value)}
                    items={secureOptions}
                    value={values.secure}
                    error={errors.secure}
                  />
                </div>
                <div className="pb-4">
                  <ToggleButtonGroup
                    label="AdBlock"
                    onValueChange={value => setFieldValue('adBlock', value)}
                    items={adBlockOptions}
                    value={values.adBlock}
                    error={errors.adBlock}
                  />
                </div>
                <div className="pb-4">
                  <ToggleButtonGroup
                    label="Private Browsing"
                    onValueChange={value => setFieldValue('privateBrowsing', value)}
                    items={privateBrowsingOptions}
                    value={values.privateBrowsing}
                    error={errors.privateBrowsing}
                  />
                </div>
                <div className="pb-4">
                  <ToggleButtonGroup
                    label="IP"
                    onValueChange={value => setFieldValue('IP', value)}
                    items={ipOptions}
                    value={values.IP}
                    error={errors.IP}
                  />
                </div>
              </div>
              <div className="mt-auto h-fit bottom-0 pt-2">
                <FormElementErrorLabel error={errors.result} />
                <div className="flex gap-3 pt-2">
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

export default RtbCreateForm;
