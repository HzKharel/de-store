export interface MailInterface {
  message: string;
  title: string;
  mailType: 'FINANCE' | 'STOCK';
  mailId?: string;
  targetId: string;
  read: boolean;
}
