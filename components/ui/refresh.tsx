"use client"
import { useRouter } from 'next/navigation';
import { Button } from './button';

type Props = {
   text: string
}
const RefreshButton = ({text}: Props) => {
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };
  return (
    <div>
      <Button onClick={handleRefresh}>{text}</Button>
    </div>
  );
};
export default RefreshButton;