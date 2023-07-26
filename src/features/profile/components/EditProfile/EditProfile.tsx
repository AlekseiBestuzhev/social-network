import cls from '@/features/profile/components/EditProfile/EditProfile.module.scss';
import {PageTemplate} from "@/components/PageTemplate/PageTemplate.tsx";
import {Button} from '@/components/Button/Button.tsx';
import {Input} from '@/components/Input/Input.tsx';
import {RiCheckFill} from 'react-icons/ri';

export const EditProfile = () => {

   const applyChanges = () => {
      alert('Sending changes...')
   }

   return (
      <PageTemplate pageTitle="Profile Settings">
         <div className={cls.header}>
            <div className={cls.photoBlock}>
               area for photo changing
            </div>
            <div className={cls.rightColumn}>
               <Input ID='fullName' title='Full Name' value={''} onChange={() => {}}/>
            </div>
         </div>
         <div className={cls.footer}>
            <Button variant='main' size='large' onClick={applyChanges}>Apply <RiCheckFill size={'1.125rem'}/></Button>
         </div>
      </PageTemplate>
   );
}