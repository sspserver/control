import SignInForm from '@/components/SignIn/SignInForm';
import { Text, Title } from '@tailus-ui/typography';
import Image from 'next/image';
import { Fragment } from 'react';

import BgImage from './bg.svg';

function SignIn() {
  return (
    <Fragment>
      {/* <img className="fixed inset-y-0 right-0 hidden h-screen w-1/2 object-cover object-left lg:block" src="https://images.unsplash.com/photo-1687720657052-c026be7f388c?q=80&w=2785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /> */}
      <Image src={BgImage} alt="Cover" className="fixed inset-y-0 right-0 hidden h-screen w-1/2 object-cover lg:block m-0 nozoom" />
      <main className="inset-0 z-10 m-auto h-fit px-6 py-12 lg:absolute lg:grid lg:w-screen lg:max-w-full lg:grid-cols-2 lg:gap-32 lg:px-0">
        <div>
          <div className="mx-auto max-w-md lg:ml-auto lg:mr-0 lg:pr-12">
            <div>
              <div>
                <Title size="xl" className="mb-1 mt-12">
                  Sign In to your personal
                  {' '}
                  <span className="font-bold underline">SSP-Server</span>
                </Title>
                <Text className="my-0" size="sm">
                  Welcome back! Sign in to continue
                </Text>
              </div>
              <SignInForm />
            </div>
            {/* <div className="mt-12"> */}
            {/*  <Caption className="my-0" size="sm" align="center"> */}
            {/*    Don't have an account ? */}
            {/*    {' '} */}
            {/*    <Link intent="neutral" size="sm" variant="underlined" href="/examples/forms/register3"> */}
            {/*      Create account */}
            {/*    </Link> */}
            {/*  </Caption> */}
            {/* </div> */}
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default SignIn;
