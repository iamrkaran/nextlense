type ProfileMenuItem = {
  label: string;
  icon?:  string
  color?: string;
  action: () => void;
};
export const menuItems:ProfileMenuItem[] = [
    {
      label: 'Report',
      action: () => console.log('Report clicked'),
      color: 'text-red-500',
    },
    {
      label: 'Unfollow',
      action: () => console.log('Unfollow clicked'),
      color: 'text-red-500',
    },
    {
      label: 'Add to favorites',
      action: () => console.log('Add to favorites clicked'),
      color: 'text-gray-700',
    },
    {
      label: 'Go to post',
      action: () => console.log('Go to post clicked'),
      color: 'text-gray-700',
    },
    {
      label: 'Share to',
      action: () => console.log('Share to clicked'),
      color: 'text-gray-700',
    },
    {
      label: 'Copy link',
      action: () => console.log('Copy link clicked'),
      color: 'text-gray-700',
    },
    {
      label: 'Embed',
      action: () => console.log('Embed clicked'),
      color: 'text-gray-700',
    },
    {
      label: 'Cancel',
      action: () => console.log('Cancel clicked'),
      color: 'text-gray-700',
    },
  ];
  