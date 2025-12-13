import RegisterForm from '@components/pages/RegisterPage/RegisterForm';
import { Text, Title } from '@tailus-ui/typography';
import Image from 'next/image';
import { Fragment } from 'react';

import BgImage from '../signin/bg.svg';

function Register() {
  return (
    <Fragment>
      <Image src={BgImage} alt="Cover" className="fixed inset-y-0 right-0 hidden h-screen w-1/2 object-cover lg:block m-0 nozoom" />
      <main className="inset-0 z-10 m-auto h-fit px-6 py-12 lg:absolute lg:grid lg:w-screen lg:max-w-full lg:grid-cols-2 lg:gap-32 lg:px-0">
        <div>
          <div className="mx-auto max-w-md lg:ml-auto lg:mr-0 lg:pr-12">
            <div>
              <div>
                <Title size="xl" className="mb-1 mt-12">
                  Create your
                  {' '}
                  <span className="font-bold underline">SSP-Server</span>
                  {' '}
                  account
                </Title>
                <Text className="my-0" size="sm">
                  Get started by creating your account
                </Text>
              </div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default Register;
