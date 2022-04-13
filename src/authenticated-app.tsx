import styled from "@emotion/styled";
import { useAuth } from "context/AuthContext";
import { ProjectListScreen } from "screens/ProjectList";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>Project</h3>
          <h3>User</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>Logout</button>
        </HeaderRight>
      </Header>
      <Nav />
      <main>
        <ProjectListScreen />
      </main>
      <Aside />
      <Footer />
    </Container>
  );
};

// one dimension layout use flex, two dimension use grid.

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
