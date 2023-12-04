import { UserProfileType} from "@/features/profile/profile-reducer.ts";
import {Button} from "@/components/Button/Button.tsx";
import {Input} from "@/components/Input/Input.tsx";
import cls from "./EditExtraInfoForm.module.scss";
import {RiCheckFill} from "react-icons/ri";
import {FC} from "react";
import {useForm} from "react-hook-form";

type Props = {
    onSubmit: () => void
}

type ExtraInfoForm = Omit<UserProfileType, 'photos' | 'userId' >

export const EditExtraInfoForm: FC<Props> = ({onSubmit}) => {
    const {handleSubmit, register} = useForm<ExtraInfoForm>({
        defaultValues: {
            aboutMe: '',
            lookingForAJobDescription: '',
            lookingForAJob: false,
            fullName: '',
            contacts: {
                facebook: '',
                website: '',
                vk: '',
                twitter: '',
                instagram: '',
                youtube: '',
                github: '',
                mainLink: ''
            }
        }
    })
    const onClick = (data: ExtraInfoForm) => {
        alert(JSON.stringify(data));
        onSubmit();
    }
    return (
        <form className={cls.form} onSubmit={handleSubmit(onClick)}>
            <Input title='Full Name' {...register('fullName')}/>
            <Input title='Job Description' {...register('lookingForAJobDescription')}/>
            <Input title='Github' {...register('contacts.github')}/>
            <Input title='Github' {...register('contacts.instagram')}/>
            <Button variant='main' size='large' className={cls.button}>
                Apply
                <RiCheckFill size={'1.125rem'}/>
            </Button>
        </form>
    );
};