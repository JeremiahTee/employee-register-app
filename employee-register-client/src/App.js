import './App.css';
import { EmployeeList } from './components/EmployeeList';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <EmployeeList />
    </Container>
  );
};

export default App;
