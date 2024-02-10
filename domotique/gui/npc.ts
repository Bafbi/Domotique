import { HousingGui } from "./base";

export default class NPCGui implements HousingGui {
    title: string;
    inventory: Inventory<any>;
    npcId: string;

    private constructor(npcId: string, inventory: Inventory<any>) {
        this.title = "Edit NPC";
        this.inventory = inventory;
        this.npcId = npcId;
    }

    static tryNew(inventory: Inventory<any>): NPCGui | null {
        const npcId = Player.rayTraceEntity(4)?.getUUID();
        if (!npcId) return null;
        return new NPCGui(npcId, inventory);
    }


}