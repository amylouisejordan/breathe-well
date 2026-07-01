import { Container, Title } from "../styled";

interface HelpArticleProps {
  title: string;
  children: React.ReactNode;
}

export default function HelpArticle({ title, children }: HelpArticleProps) {
  return (
    <Container contentContainerStyle={{ paddingBottom: 40 }}>
      <Title>{title}</Title>
      {children}
    </Container>
  );
}
