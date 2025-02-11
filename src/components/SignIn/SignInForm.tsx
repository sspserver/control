'use client';

import useSignInForm from '@/components/SignIn/useSignInForm';
import { ButtonLoading } from '@tailus-ui/Button';
import Input from '@tailus-ui/Input/Input';
import { Link } from '@tailus-ui/typography';
import { Fragment } from 'react';

function SignInForm() {
  const { isLoading, userCredentials, signInFormErrors, submitSigInFormHandler, changeUserCredentialInputHandler } = useSignInForm();

  return (
    <Fragment>
      {/* <div className="mt-8 grid grid-cols-2 gap-3"> */}
      {/*   <Button.Root */}
      {/*    variant="outlined" */}
      {/*    intent="gray" */}
      {/*    size="sm" */}
      {/*    className="w-full" */}
      {/*   > */}
      {/*    <Button.Icon type="leading" size="xs"> */}
      {/*      <Image */}
      {/*        aria-hidden */}
      {/*        src="/icons/google.svg" */}
      {/*        alt="Google icon" */}
      {/*        width={16} */}
      {/*        height={16} */}
      {/*      /> */}
      {/*    </Button.Icon> */}
      {/*    <Button.Label>Google</Button.Label> */}
      {/*   </Button.Root> */}
      {/*   <Button.Root */}
      {/*    variant="outlined" */}
      {/*    intent="gray" */}
      {/*    size="sm" */}
      {/*    className="w-full" */}
      {/*   > */}
      {/*    <Button.Icon type="leading" size="xs"> */}
      {/*      <Image */}
      {/*        aria-hidden */}
      {/*        src="/icons/microsoft.svg" */}
      {/*        alt="Google icon" */}
      {/*        width={16} */}
      {/*        height={16} */}
      {/*      /> */}
      {/*    </Button.Icon> */}
      {/*    <Button.Label>Microsoft</Button.Label> */}
      {/*   </Button.Root> */}
      {/* </div> */}
      <form
        onSubmit={submitSigInFormHandler}
        className="mx-auto mt-8 space-y-6"
      >
        <div className="space-y-6">
          {/* <div className="relative grid items-center gap-3 [grid-template-columns:1fr_auto_1fr]"> */}
          {/*  <Separator className="h-px border-b" /> */}
          {/*  <Caption as="span" className="block" size="sm"> */}
          {/*    Or continue with */}
          {/*  </Caption> */}
          {/*  <Separator className="h-px border-b" /> */}
          {/* </div> */}
          <div className="space-y-4">
            <div className="space-y-2.5">
              <Input
                fancy
                label="Your email"
                id="username"
                name="username"
                type="text"
                value={userCredentials.username}
                onChange={changeUserCredentialInputHandler}
                required
                size="md"
              />
            </div>
            <div className="space-y-2.5">
              <Input
                label={(
                  <div className="flex items-center justify-between">
                    <span>
                      Password
                    </span>
                    <Link href="#" size="sm">
                      Forgot your Password ?
                    </Link>
                  </div>
                )}
                id="password"
                name="password"
                type="password"
                value={userCredentials.password}
                onChange={changeUserCredentialInputHandler}
                required
                size="md"
              />
            </div>
          </div>
          {signInFormErrors?.login && (<div className="text-red-500 text-sm">{signInFormErrors?.login}</div>)}
        </div>
        <ButtonLoading loading={isLoading} className="w-full">Sign In</ButtonLoading>
      </form>
    </Fragment>
  );
}

export default SignInForm;
