import cls from '@/components/SectionInfo/SectionInfo.module.scss'
import {FC, memo} from 'react';

type SectionInfoType = {
   text: string,
   picture?: string,
   pictureWebp?: string,
   size?: string
}

export const SectionInfo: FC<SectionInfoType> = memo(({text, picture, pictureWebp, size}) => {

   return (
      <div className={cls.wrapper}>
         <div className={cls.info}>
            {picture && (
               <picture>
                  <source srcSet={pictureWebp} type="image/webp"/>
                  <img style={{width: size || '12rem'}} src={picture} alt='Info'/>
               </picture>
            )}
            <p>{text}</p>
         </div>
      </div>
   );
})