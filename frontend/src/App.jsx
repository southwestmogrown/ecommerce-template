import { Container } from "react-bootstrap";

import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <>
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
    </>
  );
}

export default App;
