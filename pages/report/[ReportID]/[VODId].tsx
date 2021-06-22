import { useRouter } from 'next/router';
import CreateDescription from '../../../src/scripts/CreateDescription';

export default function ContentPage() {
  const router = useRouter();
  const { ReportID, VODId } = router.query;

  return (
    <div>
      {CreateDescription(ReportID)} - {VODId}
    </div>
  );
}
