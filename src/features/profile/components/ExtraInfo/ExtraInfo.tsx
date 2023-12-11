import { FC, useCallback, useState } from 'react';

import classNames from 'classnames';
import { RiArrowDownSLine } from 'react-icons/ri';

import cls from './ExtraInfo.module.scss';

import { icons } from '@/common/const';
import { UserProfileType } from '@/features/profile/profile-reducer.ts';

type Props = {
  profile: UserProfileType;
};

export const ExtraInfo: FC<Props> = props => {
  const { contacts, aboutMe, lookingForAJobDescription, lookingForAJob } = props.profile;

  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = useCallback(() => {
    setShowInfo(prevState => !prevState);
  }, []);

  const noInfo = "User doesn't provide information";

  const classes = {
    button: classNames(cls.showExtraButton, { [cls.showInfo]: showInfo }),
    accordion: classNames(cls.accordion, { [cls.expanded]: showInfo }),
    list: classNames(cls.list, { [cls.showList]: showInfo }),
  };

  return (
    <div className={cls.extraInfo}>
      <button onClick={toggleInfo} className={classes.button}>
        Show more
        <RiArrowDownSLine size="1.5rem" />
      </button>
      <div className={classes.accordion}>
        <div className={classes.list}>
          <p>
            <span className={cls.item}>About me:</span>
            {aboutMe || noInfo}
          </p>
          <p>
            <span className={cls.item}>Looking for a job:</span>
            <input type="checkbox" checked={lookingForAJob} readOnly />
          </p>
          <p>
            <span className={cls.item}>Job description:</span>
            {lookingForAJobDescription || noInfo}
          </p>
          <h4 className={cls.contactsTitle}>Contacts:</h4>
          <ul className={cls.contacts}>
            {contacts &&
              Object.entries(contacts).map(([key, value]) => {
                return value ? (
                  <li key={key}>
                    <a href={value} target="_blank" rel="noreferrer">
                      <img
                        src={icons[key as keyof typeof icons]}
                        className={cls.contactIcon}
                        alt={`${key} icon`}
                      />
                    </a>
                  </li>
                ) : null;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
