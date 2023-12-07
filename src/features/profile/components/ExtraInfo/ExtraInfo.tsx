import {UserProfileType} from "@/features/profile/profile-reducer.ts";
import {RiArrowDownSLine} from "react-icons/ri";
import {FC, useCallback, useState} from "react";
import cls from "./ExtraInfo.module.scss";
import classNames from "classnames";

type Props = {
    profile: UserProfileType
}

export const ExtraInfo: FC<Props> = (props) => {
    const {contacts, aboutMe, lookingForAJobDescription, lookingForAJob} = props.profile;

    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = useCallback(() => {
        setShowInfo(prevState => !prevState);
    }, []);

    const noInfo = 'User doesn\'t provide information'

    const classes = {
        button: classNames(cls.showExtraButton, {[cls.showInfo]: showInfo}),
        accordion: classNames(cls.accordion, {[cls.expanded]: showInfo}),
        list: classNames(cls.list, {[cls.showList]: showInfo}),
    }

    return (
        <div className={cls.extraInfo}>
            <button onClick={toggleInfo} className={classes.button}>
                Show more
                <RiArrowDownSLine size='1.5rem'/>
            </button>
            <div className={classes.accordion}>
                <div className={classes.list}>
                    <p>
                        <span className={cls.item}>About me:</span>
                        {aboutMe || noInfo}
                    </p>
                    <p>
                        <span className={cls.item}>Looking for a job:</span>
                        <input type="checkbox" checked={lookingForAJob} readOnly/>
                    </p>
                    <p>
                        <span className={cls.item}>Job description:</span>
                        {lookingForAJobDescription || noInfo}
                    </p>
                    <h4 className={cls.contacts}>Contacts:</h4>
                    <p>
                        <span className={cls.item}>Github:</span>
                        {contacts.github || noInfo}
                    </p>
                    <p>
                        <span className={cls.item}>Website:</span>
                        {contacts.website || noInfo}
                    </p>
                    <p>
                        <span className={cls.item}>Instagram:</span>
                        {contacts.instagram || noInfo}
                    </p>
                    <p>
                        <span className={cls.item}>Main Link:</span>
                        {contacts.mainLink || noInfo}
                    </p>
                    <p>
                        <span className={cls.item}>Facebook:</span>
                        {contacts.facebook || noInfo}
                    </p>
                    <p>
                        <span className={cls.item}>Twitter:</span>
                        {contacts.twitter || noInfo}
                    </p>
                    <p>
                        <span className={cls.item}>YouTube:</span>
                        {contacts.youtube || noInfo}
                    </p>
                    <p>
                        <span className={cls.item}>VK:</span>
                        {contacts.vk || noInfo}
                    </p>
                </div>
            </div>
        </div>
    )
}