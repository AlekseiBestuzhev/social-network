import {PhotoUploaderWithPreview} from "@/components/PhotoUploaderWithPreview/PhotoUploaderWithPreview.tsx";
import {authUserAvatarSelector} from "@/features/auth/selectors/authUserAvatarSelector";
import {PageTemplate} from "@/components/PageTemplate/PageTemplate.tsx";
import {handleServerError} from "@/common/utils/handleServerError.ts";
import {updateMyPhotoTC} from "@/features/profile/profile-thunks.ts";
import {setAppError} from "@/features/service/service-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {validateImage} from "@/common/utils/validateImage.ts";
import cls from "@/pages/EditProfile/EditProfile.module.scss";
import {Button} from "@/components/Button/Button.tsx";
import {Input} from "@/components/Input/Input.tsx";
import {RiCheckFill} from "react-icons/ri";
import {ChangeEvent} from "react";

export const EditProfile = () => {
    const dispatch = useAppDispatch()

    const avatar = useAppSelector(authUserAvatarSelector);

    const maxSize = 3
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']

    const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.files && e.target.files.length) {
                const file = e.target.files[0]

                if (validateImage(file, maxSize, allowedTypes, dispatch)) {
                    const formData = new FormData()

                    formData.append('image', file)
                    await dispatch(updateMyPhotoTC(formData))
                }
            }
        } catch (error) {
            const message = handleServerError(error)
            dispatch(setAppError(message))
        }
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