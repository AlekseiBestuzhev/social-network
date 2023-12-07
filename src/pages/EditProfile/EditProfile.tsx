import {PhotoUploaderWithPreview} from "@/components/PhotoUploaderWithPreview/PhotoUploaderWithPreview.tsx";
import {authUserAvatarSelector} from "@/features/auth/selectors/authUserAvatarSelector";
import {authUserNameSelector} from "@/features/auth/selectors/authUserNameSelector";
import {authUserIDSelector} from "@/features/auth/selectors/authUserIDSelector";
import {profileSelector} from "@/features/profile/selectors/profileSelector";
import {PageTemplate} from "@/components/PageTemplate/PageTemplate.tsx";
import {handleServerError} from "@/common/utils/handleServerError.ts";
import {setNotification} from "@/features/service/service-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {validateImage} from "@/common/utils/validateImage.ts";
import cls from "@/pages/EditProfile/EditProfile.module.scss";
import {
    setProfileTC,
    updateMyPhotoTC,
    updateMyProfileTC
} from "@/features/profile/profile-thunks.ts";
import {ChangeEvent, useEffect} from "react";
import {
    EditExtraInfoForm,
    UpdateExtraInfo
} from "@/features/profile/components/EditExtraInfoForm/EditExtraInfoForm.tsx";
import {noticeStatus} from "@/common/const";

export const EditProfile = () => {
    const dispatch = useAppDispatch()

    const authUser = useAppSelector(authUserIDSelector);
    const avatar = useAppSelector(authUserAvatarSelector);
    const userName = useAppSelector(authUserNameSelector)
    const profile = useAppSelector(profileSelector);

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
            dispatch(setNotification(noticeStatus.error, message));
        }
    }

    const onSubmit = (data: UpdateExtraInfo) => {
        void dispatch(updateMyProfileTC(data))
    }

    useEffect(() => {
        if (!profile && authUser) {
            void dispatch(setProfileTC(authUser));
        }
    }, [])

    return (
        <PageTemplate pageTitle="Profile Settings">
            <div className={cls.header}>
                <div className={cls.greeting}>
                    <h3 className={cls.title}>Hello, {userName}</h3>
                    <p className={cls.text}>Edit your profile info here</p>
                </div>
                <PhotoUploaderWithPreview name={'avatar'} image={avatar} onChange={onImageChange}/>
            </div>
            {profile && <EditExtraInfoForm onSubmit={onSubmit} profile={profile}/>}
        </PageTemplate>
    );
}