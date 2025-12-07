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
import FormSeparator from '@components/FormSeparator';
import OsSelect from '@components/OsSelect';
import {
  adBlockOptions,
  auctionTypeOptions,
  ipOptions,
  methodOptions,
  privateBrowsingOptions,
  protocolOptions,
  requestTypeOptions,
  rtbCreateFormTab,
  rtbCreateFormTabs,
  secureOptions,
} from '@components/pages/RtbPage/RtbCreateForm/RtbCreateForm.const';
import useRtbCreateForm from '@components/pages/RtbPage/RtbCreateForm/useRtbCreateForm';
import Select from '@components/Select';
import ToggleButtonGroup from '@components/ToggleButtonGroup/ToggleButtonGroup';
import Button, { ButtonLoading } from '@tailus-ui/Button';
import Drawer from '@tailus-ui/Drawer/Drawer';
import Input from '@tailus-ui/Input';
import Separator from '@tailus-ui/Separator';
import Tabs from '@tailus-ui/Tabs';
import Textarea from '@tailus-ui/Textarea';
import { Formik } from 'formik';
import React, { Fragment } from 'react';
import { AnyIPv4IPv6, AnyOnlyExclude } from '@/generated/graphql';

const defaultFormTitle = 'RTB';

function RtbCreateForm({ onCancel, onSubmit }: RTBCreateFormProps) {
  const {
    isLoading,
    isCreateMode,
    rtbData,
    tabState,
    spanRef,
    setTabState,
    submitRtbCreateEditFormHandler,
  } = useRtbCreateForm(onSubmit);
  const hasAdUnitTitle = !!rtbData?.title;
  const adUnitTitle = hasAdUnitTitle ? rtbData?.title : defaultFormTitle;
  const formTitle = isCreateMode ? `Create ${adUnitTitle}` : `Edit ${adUnitTitle}`;
  const formSaveButtonTitle = isCreateMode ? 'Create' : 'Save';

  return (
    <Fragment>
      <Drawer.Title
        size="lg"
        className="pb-2"
      >
        {formTitle}
      </Drawer.Title>
      <Tabs.Root
        value={tabState}
        className="h-full contents"
        onValueChange={value => setTabState(value)}
      >
        <Tabs.List variant="bottomOutlined" size="xl" className="gap-2">
          <Tabs.Indicator ref={spanRef} variant="bottom" />
          {rtbCreateFormTabs.map(({ name, value }) => (
            <Tabs.Trigger
              key={value}
              value={value}
              id={value}
            >
              {name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Formik<RTBCreateFormState>
          enableReinitialize
          initialValues={rtbData}
          onSubmit={submitRtbCreateEditFormHandler}
        >
          {({ setFieldValue, handleBlur, submitForm, handleChange, values, errors, isSubmitting }) => {
            return (
              <Fragment>
                <div className="overflow-y-auto h-full relative pl-0.5 !m-0 pt-2">
                  <Tabs.Content value={rtbCreateFormTab.main}>
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
                    <FormSeparator>Protocol</FormSeparator>
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
                    <div className="flex gap-2 pb-4">
                      <div>
                        <Select
                          label="Method"
                          name="method"
                          items={methodOptions}
                          value={values.method}
                          onChange={value => setFieldValue('method', value)}
                          error={errors.method}
                        />
                      </div>
                      <div className="flex-1">
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
                      <div>
                        <Select
                          label="Request Type"
                          name="requestType"
                          items={requestTypeOptions}
                          value={values.requestType}
                          onChange={value => setFieldValue('requestType', value)}
                          error={errors.requestType}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pb-4">
                      <div className="flex-1">
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
                      <div className="flex-1">
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
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value={rtbCreateFormTab.bids}>
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
                    <div className="pb-6">
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

                    <FormSeparator>Limits</FormSeparator>

                    <div className="flex mt-3 pb-4 gap-2">
                      <div className="flex-1">
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
                      <div className="flex-1">
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
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value={rtbCreateFormTab.targeting}>
                    <div className="pb-4">
                      <AdFormatsSelect
                        label="Ad formats"
                        values={values.formatCodes ?? []}
                        onChange={values => setFieldValue('formatCodes', values)}
                        error={errors.formatCodes}
                      />
                    </div>
                    <div className="pb-4">
                      <DeviceTypeSelect
                        label="Device types"
                        values={values.deviceTypeIDs ?? []}
                        onChange={values => setFieldValue('deviceTypeIDs', values)}
                        error={errors.deviceTypeIDs}
                      />
                    </div>
                    <div className="pb-4">
                      <DevicesSelect
                        label="Devices"
                        values={values.deviceIDs ?? []}
                        onChange={values => setFieldValue('deviceIDs', values)}
                        error={errors.deviceIDs}
                      />
                    </div>
                    <div className="pb-4">
                      <OsSelect
                        label="Operating Systems"
                        values={values.OSIDs ?? []}
                        onChange={values => setFieldValue('OSIDs', values)}
                        error={errors.OSIDs}
                      />
                    </div>
                    <div className="pb-4">
                      <BrowsersSelect
                        label="Browsers"
                        values={values.browserIDs ?? []}
                        onChange={values => setFieldValue('browserIDs', values)}
                        error={errors.browserIDs}
                      />
                    </div>
                    <div className="pb-4">
                      <CategoriesSelect
                        label="Categories"
                        values={values.carrierIDs ?? []}
                        onChange={values => setFieldValue('carrierIDs', values)}
                        error={errors.carrierIDs}
                      />
                    </div>
                    <div className="pb-4">
                      <CountriesSelect
                        label="Countries"
                        values={values.countryCodes ?? []}
                        onChange={values => setFieldValue('countryCodes', values)}
                        error={errors.countryCodes}
                      />
                    </div>
                    <FormSeparator>Traffic types</FormSeparator>
                    <div className="flex pt-3 max-md:flex-col">
                      <div className="pb-4 flex-1">
                        <ToggleButtonGroup
                          label="Secure"
                          onValueChange={value => setFieldValue('secure', value)}
                          items={secureOptions}
                          value={values.secure ?? AnyOnlyExclude.Any}
                          error={errors.secure}
                        />
                      </div>
                      <div className="pb-4 flex-1">
                        <ToggleButtonGroup
                          label="AdBlock"
                          onValueChange={value => setFieldValue('adBlock', value)}
                          items={adBlockOptions}
                          value={values.adBlock ?? AnyOnlyExclude.Any}
                          error={errors.adBlock}
                        />
                      </div>
                    </div>
                    <div className="flex pt-3 max-md:flex-col">
                      <div className="pb-4 flex-1">
                        <ToggleButtonGroup
                          label="Private Browsing"
                          onValueChange={value => setFieldValue('privateBrowsing', value)}
                          items={privateBrowsingOptions}
                          value={values.privateBrowsing ?? AnyOnlyExclude.Any}
                          error={errors.privateBrowsing}
                        />
                      </div>
                      <div className="pb-4 flex-1">
                        <ToggleButtonGroup
                          label="IP"
                          onValueChange={value => setFieldValue('IP', value)}
                          items={ipOptions}
                          value={values.IP ?? AnyIPv4IPv6.Any}
                          error={errors.IP}
                        />
                      </div>
                    </div>
                  </Tabs.Content>
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
      </Tabs.Root>
    </Fragment>
  );
}

export default RtbCreateForm;
