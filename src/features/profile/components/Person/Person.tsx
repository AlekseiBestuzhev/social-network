import {AvatarControl} from "@/features/profile/components/AvatarControl/AvatarControl.tsx";
import {StatusControl} from "@/features/profile/components/StatusControl/StatusControl.tsx";
import anotherUserBcgWebp from '@/assets/images/profile-cover/another-user.webp';
import {ExtraInfo} from "@/features/profile/components/ExtraInfo/ExtraInfo.tsx";
import profileBcgWebp from '@/assets/images/profile-cover/profile-bcg.webp';
import anotherUserBcg from '@/assets/images/profile-cover/another-user.jpg';
import cls from '@/features/profile/components/Person/Person.module.scss';
import profileBcg from '@/assets/images/profile-cover/profile-bcg.jpeg';
import {UserProfileType} from '@/features/profile/profile-reducer.ts';
import {PropsWithChildren, FC} from 'react';

type PersonPropsType = PropsWithChildren & {
    profile: UserProfileType,
    status: string,
    isMe: boolean,
};

export const Person: FC<PersonPropsType> = ({isMe, status, profile, children}) => {
    const {fullName, photos: {large: photo}} = profile;

    return (
        <section>
            <picture>
                <source srcSet={isMe ? profileBcgWebp : anotherUserBcgWebp} type="image/webp"/>
                <img className={cls.header} src={isMe ? profileBcg : anotherUserBcg} alt={'Profile cover'}/>
            </picture>
            <div className={cls.person}>
                <div className={cls.info}>
                    <AvatarControl photo={photo} fullName={fullName} />
                        <h2 className={cls.name}>{fullName}</h2>
                </div>
                {children}
            </div>
            <StatusControl isMe={isMe} status={status} />
            <ExtraInfo profile={profile} />
        </section>
    )
}