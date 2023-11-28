import {PhotoUploader} from "@/components/PhotoUploader/PhotoUploader.tsx";
import cls from './PhotoUploaderWithPreview.module.scss';
import classNames from "classnames";
import {FC} from "react";
import {Avatar} from "@/components/Avatar/Avatar.tsx";

type Props = {
    name: string
    image: string | null
    onChange: any
    className?: string
}

export const PhotoUploaderWithPreview: FC<Props> = ({name, image, onChange, className}) => {
    const classes = classNames(cls.root, className)

    return (
        <div className={classes}>
            <Avatar photo={image} size='10rem'/>
            <PhotoUploader name={name} onChange={onChange} className={cls.button} />
        </div>
    )
}