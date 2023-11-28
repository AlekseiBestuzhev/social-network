import {PhotoUploaderWithPreview} from "@/components/PhotoUploaderWithPreview/PhotoUploaderWithPreview.tsx";
import {profileSelector} from "@/features/profile/selectors/profileSelector";
import {PageTemplate} from "@/components/PageTemplate/PageTemplate.tsx";
import cls from "@/pages/EditProfile/EditProfile.module.scss";
import {Button} from "@/components/Button/Button.tsx";
import {Input} from "@/components/Input/Input.tsx";
import {RiCheckFill} from "react-icons/ri";
import {useAppSelector} from "@/app/hooks.ts";
import {ChangeEvent} from "react";

export const EditProfile = () => {

    const profile = useAppSelector(profileSelector);
    const avatar = profile?.photos.large || null

    const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e)
    }

   const applyChanges = () => {
      alert('Sending changes...')
   }

   return (
      <PageTemplate pageTitle="Profile Settings">
         <div className={cls.header}>
            <PhotoUploaderWithPreview name={'avatar'} image={avatar} onChange={onImageChange} />
            <div className={cls.rightColumn}>
               <Input title='Full Name' value={''} onChange={() => {}}/>
            </div>
         </div>
         <div className={cls.footer}>
            <Button variant='main' size='large' onClick={applyChanges}>Apply <RiCheckFill size={'1.125rem'}/></Button>
         </div>
      </PageTemplate>
   );
}