import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/AuthContext";
import { ProjectListScreen } from "screens/ProjectList";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>Project</h2>
          <h2>User</h2>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>Logout</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

// one dimension layout use flex, two dimension use grid.

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)``;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
