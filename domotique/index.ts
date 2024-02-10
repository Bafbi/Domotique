import newGui from "./gui/base";
import MenuGui from "./gui/menu";
import NPCGui from "./gui/npc";
import Housing from "./housing";

// services start with minecraft, when enabled and are meant to be persistent scripts.
const d2d = Hud.createDraw2D();
let housingNameD2dText: Text;
d2d.setOnInit(
  JavaWrapper.methodToJava(() => {
    housingNameD2dText = d2d.addText(
      "Housing: ...",
      2,
      d2d.getHeight() - 12,
      0xffffff,
      true
    );
  })
);

d2d.register();

const openContainerListener = JsMacros.on(
  "OpenScreen",
  JavaWrapper.methodToJava((event) => {
    context.releaseLock();
    Client.waitTick(1);
    // Chat.log("Screen: " + event.screenName);
    const container = Player.openInventory();
    // Chat.log("Container: " + container.getContainerTitle());
    const gui = newGui(container, event.screen);
    if (gui instanceof NPCGui) {
      Chat.log("Gui: " + gui.npcId);
    }
    if (gui instanceof MenuGui) {
      gui.drawHousingInfo(housing.name);
    }

  })
);

let housing: Housing;

function loadHousing() {
    const houseName = fetchHousingName().get("house.name");
    Chat.log("House name: " + houseName);
    housingNameD2dText.setText("Housing: " + houseName);

    housing = Housing.get(houseName);
    Chat.log("Housing loaded: " + housing.name);
}

type Placeholders = Map<string, string>;

function fetchHousingName() {
  Chat.say("/placeholders house.name");
  const placeholders: Placeholders = new Map();
  const placeholderListener = JsMacros.on(
    "RecvMessage",
    JavaWrapper.methodToJava((event) => {
      // %date.seconds/[timezone]% (42)
      if (!event.text.getString().includes("%")) return;
      // we want to match the placeholder and the value
      const match = event.text.getString().match(/%([\w.]+)% \(([\w ]+)\)/);
      if (!match) return;
      Chat.log("Placeholder detected: " + match[1]);
      placeholders.set(match[1], match[2]);
    })
  );
  Client.waitTick(40);
  Chat.log("Placeholders: " + placeholders.size);
  JsMacros.off(placeholderListener);
  return placeholders;
}

const scoreboardTitle = World.getScoreboards()
  .getCurrentScoreboard()
  .getDisplayName()
  .getString();
if (scoreboardTitle === "HOUSING") {
  Chat.log("Housing detected");
  loadHousing();
}

// this fires when the service is stopped
(event as EventService).stopListener = JavaWrapper.methodToJava(() => {
  d2d.unregister();
  JsMacros.off(openContainerListener);
});