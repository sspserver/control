import type {
  TrafficRoutersCreateFormProps,
  TrafficRoutersCreateFormState,
} from './TrafficRoutersCreateForm.types';
import AdFormatsSelect from '@components/AdFormatsSelect';
import AdUnitSelect from '@components/AdUnitSelect';
import ApplicationsSelect from '@components/ApplicationsSelect';
import BrowsersSelect from '@components/BrowsersSelect';
import CategoriesSelect from '@components/CategoriesSelect';
import CountriesSelect from '@components/CountriesSelect';
import DevicesSelect from '@components/DevicesSelect';
import DeviceTypeSelect from '@components/DeviceTypeSelect';
import FormElementErrorLabel from '@components/FormElementErrorLabel';
import FormSeparator from '@components/FormSeparator';
import LanguagesSelect from '@components/LanguagesSelect';
import OsSelect from '@components/OsSelect';
import {
  adBlockOptions,
  ipOptions,
  privateBrowsingOptions,
  secureOptions,
} from '@components/pages/RtbPage/RtbCreateForm/RtbCreateForm.const';
import RTBSourceSelect from '@components/RTBSourceSelect';
import ToggleButtonGroup from '@components/ToggleButtonGroup/ToggleButtonGroup';
import Button, { ButtonLoading } from '@tailus-ui/Button';
import Drawer from '@tailus-ui/Drawer/Drawer';
import Input from '@tailus-ui/Input';
import Separator from '@tailus-ui/Separator';
import Tabs from '@tailus-ui/Tabs';
import Textarea from '@tailus-ui/Textarea';
import { Formik } from 'formik';
import React, { Fragment } from 'react';
import {
  defaultFormTitle,
  trafficRoutersFormTab,
  trafficRoutersFormTabs,
} from './TrafficRoutersCreateForm.const';
import useTrafficRoutersCreateForm from './useTrafficRoutersCreateForm';

function TrafficRoutersCreateForm({ onCancel, onSubmit }: TrafficRoutersCreateFormProps) {
  const {
    isLoading,
    spanRef,
    tabState,
    setTabState,
    trafficRouterData,
    isCreateMode,
    submitTrafficRouterCreateEditFormHandler,
  } = useTrafficRoutersCreateForm(onSubmit);
  const hasTrafficRouterTitle = !!trafficRouterData?.title;
  const trafficRouterTitle = hasTrafficRouterTitle ? trafficRouterData?.title : defaultFormTitle;
  const formTitle = isCreateMode ? `Create ${trafficRouterTitle}` : `Edit ${trafficRouterTitle}`;
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
          {trafficRoutersFormTabs.map(({ name, value }) => (
            <Tabs.Trigger
              key={value}
              value={value}
              id={value}
            >
              {name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Formik<TrafficRoutersCreateFormState>
          enableReinitialize
          initialValues={trafficRouterData}
          onSubmit={submitTrafficRouterCreateEditFormHandler}
        >
          {({ setFieldValue, handleBlur, submitForm, handleChange, values, errors, isSubmitting }) => {
            return (
              <Fragment>
                <div className="overflow-y-auto h-full relative pl-0.5 !m-0 pt-2">
                  <Tabs.Content value={trafficRoutersFormTab.main}>
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
                        label="Percent"
                        name="percent"
                        type="number"
                        defaultValue={values.percent}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        error={errors.percent}
                      />
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value={trafficRoutersFormTab.targeting}>
                    <div className="pb-4">
                      <RTBSourceSelect
                        label="RTB Source"
                        values={values.RTBSourceIDs ?? []}
                        onChange={values => setFieldValue('RTBSourceIDs', values)}
                        error={errors.RTBSourceIDs}
                      />
                    </div>
                    <div className="pb-4">
                      <ApplicationsSelect
                        label="Applications"
                        values={values.applications ?? []}
                        onChange={values => setFieldValue('applications', values)}
                        error={errors.applications}
                      />
                    </div>
                    <div className="pb-4">
                      <AdUnitSelect
                        label="Ad Unit"
                        values={values.zones ?? []}
                        onChange={values => setFieldValue('zones', values)}
                        error={errors.zones}
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
                      <LanguagesSelect
                        label="Languages"
                        values={values.languages ?? []}
                        onChange={values => setFieldValue('languages', values)}
                        error={errors.languages}
                      />
                    </div>

                    <FormSeparator>Traffic types</FormSeparator>
                    <div className="flex pt-3 max-md:flex-col">
                      <div className="pb-4 flex-1">
                        <ToggleButtonGroup
                          label="Secure"
                          onValueChange={value => setFieldValue('secure', value)}
                          items={secureOptions}
                          value={values.secure}
                          error={errors.secure}
                        />
                      </div>
                      <div className="pb-4 flex-1">
                        <ToggleButtonGroup
                          label="AdBlock"
                          onValueChange={value => setFieldValue('adBlock', value)}
                          items={adBlockOptions}
                          value={values.adBlock}
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
                          value={values.privateBrowsing}
                          error={errors.privateBrowsing}
                        />
                      </div>
                      <div className="pb-4 flex-1">
                        <ToggleButtonGroup
                          label="IP"
                          onValueChange={value => setFieldValue('IP', value)}
                          items={ipOptions}
                          value={values.IP}
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

export default TrafficRoutersCreateForm;
