import {UserProfileType} from "@/features/profile/profile-reducer.ts";
import {setNotification} from "@/features/service/service-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Button} from "@/components/Button/Button.tsx";
import {Input} from "@/components/Input/Input.tsx";
import cls from "./EditExtraInfoForm.module.scss";
import {isEqual} from "@/common/utils/isEqual.ts";
import {noticeStatus} from "@/common/const";
import {RiCheckFill} from "react-icons/ri";
import {useForm} from "react-hook-form";
import {FC, memo} from "react";

type Props = {
    onSubmit: (data: UpdateExtraInfo) => void
    profile: UserProfileType
    disabled?: boolean
}

export type UpdateExtraInfo = Omit<UserProfileType, 'photos' | 'userId'>

export const EditExtraInfoForm: FC<Props> = memo(({onSubmit, profile, disabled = false}) => {
    const dispatch = useAppDispatch();

    const {contacts} = profile;

    const {handleSubmit, register, formState: {isDirty}, reset} = useForm<UpdateExtraInfo>({
        defaultValues: {
            aboutMe: profile.aboutMe,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            lookingForAJob: profile.lookingForAJob,
            fullName: profile.fullName,
            contacts: {
                github: contacts.github,
                vk: contacts.vk,
                facebook: contacts.facebook,
                instagram: contacts.instagram,
                twitter: contacts.twitter,
                website: contacts.website,
                youtube: contacts.youtube,
                mainLink: contacts.mainLink
            }
        }
    })

    const onClick = async (data: UpdateExtraInfo) => {
        if (isDirty) {
            onSubmit(data)
            reset({...data});
        } else {
            dispatch(setNotification(noticeStatus.info, 'Nothing to change'));
        }
    }

    return (
        <form className={cls.form} onSubmit={handleSubmit(onClick)}>
            <Input title='Full Name' {...register('fullName')}/>
            <Input title='About me' {...register('aboutMe')} multiline/>
            <label className={cls.checkbox}>
                <span>Looking for a job</span>
                <input type="checkbox" {...register('lookingForAJob')}/>
            </label>
            <Input title='Job Description' {...register('lookingForAJobDescription')} multiline/>
            <Input title='Github' {...register('contacts.github')}/>
            <Input title='Website' {...register('contacts.website')}/>
            <Input title='Main Link' {...register('contacts.mainLink')}/>
            <Input title='Youtube' {...register('contacts.youtube')}/>
            <Input title='Instagram' {...register('contacts.instagram')}/>
            <Input title='Facebook' {...register('contacts.facebook')}/>
            <Input title='Twitter' {...register('contacts.twitter')}/>
            <Input title='VK' {...register('contacts.vk')}/>
            <Button variant='main' size='large' className={cls.button} disabled={disabled}>
                Apply
                <RiCheckFill size={'1.125rem'}/>
            </Button>
        </form>
    );
}, isEqual);