import {PageTemplate} from '@/components/PageTemplate/PageTemplate';
import {SectionInfo} from '@/components/SectionInfo/SectionInfo';
import pictureWebp from '@/assets/animate-images/in-dev.webp';
import picture from '@/assets/animate-images/in-dev.gif';

export const Music = () => {

   return (
      <PageTemplate pageTitle='Music'>
         <SectionInfo text='Section is under development...' picture={picture} pictureWebp={pictureWebp} size='18rem'/>
      </PageTemplate>
   );
}