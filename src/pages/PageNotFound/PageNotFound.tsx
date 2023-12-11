import picture from '@/assets/images/page-not-found.svg';
import { PageTemplate } from '@/components/PageTemplate/PageTemplate.tsx';
import { SectionInfo } from '@/components/SectionInfo/SectionInfo.tsx';

export const PageNotFound = () => {
  return (
    <PageTemplate pageTitle="Invalid page">
      <SectionInfo picture={picture} size="18rem" withNavToProfile />
    </PageTemplate>
  );
};
