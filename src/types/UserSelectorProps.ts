import { User } from './User';

export interface UserSelectorProps {
  users: User[];
  selectedUserId: number | null;
  onSelect: (id: number) => void;
}
