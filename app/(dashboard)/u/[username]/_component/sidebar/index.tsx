import GetSef from "@/lib/auth-service";
import Options from "./ChatOptions";
import ToggleSidebar from "./toggleSidebar";
import Wrapper from "./wrapper";

async function Sidebar() {
  const currentUser = await GetSef();
  if (currentUser) {
    return (
      <Wrapper>
        <ToggleSidebar />
        <Options user={currentUser} />
      </Wrapper>
    );
  } else {
    // Handle the case where currentUser is null or undefined
    return <div>User not found</div>;
  }
}

export default Sidebar;
