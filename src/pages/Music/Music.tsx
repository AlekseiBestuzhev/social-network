import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import picture from '@/assets/images/in-dev.gif';

export const Music = () => {

	return (
		<PageTemplate pageTitle='Music'>
			<SectionInfo text='Section is under development...' picture={picture} size='18rem' />
		</PageTemplate>
	);
}