import CoverMenuItems from "./CoverMenuItems.component";
import CoverButton from "./CoverButton.component";
import withToggleMenu from "HOC/withToggleMenu.HOC";

const CoverMenu = withToggleMenu(CoverMenuItems, CoverButton);

export default CoverMenu;