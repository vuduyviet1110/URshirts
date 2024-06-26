import MaxWidthWrapper from '@/components/MaxWidth';
import Steps from '@/components/Steps'
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper >
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
