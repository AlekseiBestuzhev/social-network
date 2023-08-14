import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import picture from '@/assets/animate-images/in-dev.gif';

export const News = () => {

	return (
		<PageTemplate pageTitle='News'>
			<SectionInfo text='Section is under development...' picture={picture} size='18rem' />
		</PageTemplate>
	);
}