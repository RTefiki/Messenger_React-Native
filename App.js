import StackNavigatior from "./navigation/StackNavigatior";
import { UserContext} from "./components/UserContex";

export default function App() {
  return (
    <>
      <UserContext>
        <StackNavigatior />
      </UserContext>
    </>
  );
}
