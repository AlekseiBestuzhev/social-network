import { PageTemplate } from '@/components/common/PageTemplate/PageTemplate';
import { SectionInfo } from '@/components/common/SectionInfo/SectionInfo';
import picture from '@/assets/images/in-dev.gif';

export const News = () => {

	return (
		<PageTemplate pageTitle='News'>
			<SectionInfo text='Section is under development...' picture={picture} size='18rem' />
		</PageTemplate>
	);
}