import { HousingGui } from "./base";

export default class MenuGui implements HousingGui {
    title: string;
    inventory: Inventory<any>;
    screen: IScreen;

    private constructor(inventory: Inventory<any>, screen: IScreen) {
        this.title = "Housing Menu";
        this.inventory = inventory;
        this.screen = screen;
    }

    static new(inventory: Inventory<any>, screen: IScreen): MenuGui | null {
        return new MenuGui(inventory, screen);
    }

    drawHousingInfo(housingName: string) {
        this.screen.addText(housingName, 2, 2, 0xffffff, true);
    }


}