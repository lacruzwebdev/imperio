"use client"
import { useRouter } from 'next/navigation';
import { Button } from './button';

interface Props extends React.HTMLAttributes<HTMLElement> {
   text: string
}

const RefreshButton = ({text, ...rest}: Props) => {
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };
  return (
    <div {...rest}>
      <Button onClick={handleRefresh} {...rest}>{text}</Button>
    </div>
  );
};
export default RefreshButton;