import {AvatarModalContent} from '@/features/profile/components/Person/AvatarModalContent/AvatarModalContent.tsx';
import {StatusModalContent} from '@/features/profile/components/Person/StatusModalContent/StatusModalContent.tsx';
import anotherUserBcgWebp from '@/assets/images/profile-cover/another-user.webp';
import profileBcgWebp from '@/assets/images/profile-cover/profile-bcg.webp';
import anotherUserBcg from '@/assets/images/profile-cover/another-user.jpg';
import cls from '@/features/profile/components/Person/Person.module.scss';
import profileBcg from '@/assets/images/profile-cover/profile-bcg.jpeg';
import {UserProfileType} from '@/features/profile/profile-reducer.ts';
import {PropsWithChildren, FC, useState, useCallback} from 'react';
import {Avatar} from '@/components/Avatar/Avatar.tsx';
import {Modal} from '@/components/Modal/Modal.tsx';
import classNames from 'classnames';

type PersonPropsType = PropsWithChildren & {
   profile: UserProfileType,
   status: string,
   isMe: boolean,
};

export const Person: FC<PersonPropsType> = ({isMe, status, profile, children}) => {

   const [photoIsOpen, setPhotoIsOpen] = useState(false);

   const [statusEditMode, setStatusEditMode] = useState(false);

   const openPhotoModal = useCallback(() => {
      setPhotoIsOpen(true);
   }, []);

   const closePhotoModal = useCallback(() => {
      setPhotoIsOpen(false);
   }, []);

   const openStatusModal = useCallback(() => {
      if (isMe) setStatusEditMode(true);
   }, []);

   const closeStatusModal = useCallback(() => {
      setStatusEditMode(false);
   }, []);

   const userName = profile.fullName;

   const photo = profile.photos.large;

   const statusStyles = classNames(cls.status, {
      [cls.pointer]: isMe
   })

   return (
      <section>
         <picture>
            <source srcSet={isMe ? profileBcgWebp : anotherUserBcgWebp} type="image/webp" />
            <img className={cls.header} src={isMe ? profileBcg : anotherUserBcg} alt={'Profile cover'}/>
         </picture>
         <div className={cls.person}>
            <div className={cls.info}>
               <Avatar size='12.5rem' photo={photo} border onClick={openPhotoModal} turnOffCursorPointer={!photo}/>
               {
                  photo && <Modal onClose={closePhotoModal} opened={photoIsOpen}>
                       <AvatarModalContent photo={photo} name={userName}/>
                   </Modal>
               }
               {
                  isMe && <Modal onClose={closeStatusModal} opened={statusEditMode}>
                       <StatusModalContent onClose={closeStatusModal}/>
                   </Modal>
               }
               <div className={cls.about}>
                  <p className={statusStyles} onClick={openStatusModal}>
                     {
                        status
                           ? status
                           : isMe
                              ? 'Enter status...'
                              : ''
                     }
                  </p>
                  <h2 className={cls.name}>{userName}</h2>
               </div>
            </div>
            {children}
         </div>
      </section>
   )
}