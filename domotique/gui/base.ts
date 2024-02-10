import MenuGui from "./menu";
import NPCGui from "./npc";

export interface HousingGui {
  title: string;
  inventory: Inventory;
}

export default function newGui(
  inventory: Inventory,
  screen: IScreen
): HousingGui {
  switch (inventory.getContainerTitle()) {
    case "Edit NPC":
      return NPCGui.tryNew(inventory);
    case "Housing Menu":
      return MenuGui.new(inventory, screen);
    default:
      return null;
  }
}
