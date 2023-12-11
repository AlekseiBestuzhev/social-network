import { ChangeEvent, useCallback, useEffect } from 'react';

import { noticeStatus } from '@/common/const';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { handleServerError } from '@/common/utils/handleServerError.ts';
import { validateImage } from '@/common/utils/validateImage.ts';
import { PageTemplate } from '@/components/PageTemplate/PageTemplate.tsx';
import { PhotoUploaderWithPreview } from '@/components/PhotoUploaderWithPreview/PhotoUploaderWithPreview.tsx';
import { authUserAvatarSelector } from '@/features/auth/selectors/authUserAvatarSelector';
import { authUserIDSelector } from '@/features/auth/selectors/authUserIDSelector';
import { authUserNameSelector } from '@/features/auth/selectors/authUserNameSelector';
import {
  EditExtraInfoForm,
  UpdateExtraInfo,
} from '@/features/profile/components/EditExtraInfoForm/EditExtraInfoForm.tsx';
import { setProfileTC, updateMyPhotoTC, updateMyProfileTC } from '@/features/profile/profile-thunks.ts';
import { profileSelector } from '@/features/profile/selectors/profileSelector';
import { appStatusSelector } from '@/features/service/selectors/appStatusSelector';
import { setNotification } from '@/features/service/service-reducer.ts';
import cls from '@/pages/EditProfile/EditProfile.module.scss';

export const EditProfile = () => {
  const dispatch = useAppDispatch();

  const authUser = useAppSelector(authUserIDSelector);
  const avatar = useAppSelector(authUserAvatarSelector);
  const userName = useAppSelector(authUserNameSelector);
  const profile = useAppSelector(profileSelector);
  const appStatus = useAppSelector(appStatusSelector);
  const loading = appStatus === 'loading';

  const maxSize = 3;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];

        if (validateImage(file, maxSize, allowedTypes, dispatch)) {
          const formData = new FormData();

          formData.append('image', file);
          await dispatch(updateMyPhotoTC(formData));
        }
      }
    } catch (error) {
      const message = handleServerError(error);

      dispatch(setNotification(noticeStatus.error, message));
    }
  };

  const onSubmit = useCallback(
    (data: UpdateExtraInfo) => {
      void dispatch(updateMyProfileTC(data));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!profile && authUser) {
      void dispatch(setProfileTC(authUser));
    }
  }, []);

  return (
    <PageTemplate pageTitle="Profile Settings">
      <div className={cls.header}>
        <div className={cls.greeting}>
          <h3 className={cls.title}>Hello, {userName}</h3>
          <p className={cls.text}>Edit your profile info here</p>
        </div>
        <PhotoUploaderWithPreview name="avatar" image={avatar} onChange={onImageChange} />
      </div>
      {profile && <EditExtraInfoForm onSubmit={onSubmit} profile={profile} disabled={loading} />}
    </PageTemplate>
  );
};
