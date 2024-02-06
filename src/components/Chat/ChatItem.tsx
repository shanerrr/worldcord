type ChatItemProps = {
  content: string;
};

export default function ChatItem({ content }: ChatItemProps) {
  return <div>{content}</div>;
}
