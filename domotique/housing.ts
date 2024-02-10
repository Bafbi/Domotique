/* Define the housing structure

The pseudo def of the housing structure is as follows:
housing {
    name: string,
    systems: {
        regions: Region[],
        svents: Event[],
        scoreboard: Scoreboard,
        commands: Command[],
        functions: Function[],
        layouts: Layout[],
        teams: Team[],
        menus: Menu[],
    }
    npcs: NPC[],
    holograms: Hologram[],
}

This needs to be able to be serialized and deserialized from a file, so it needs to be a class.
*/

import toml from "toml";
import z from "zod";

import { Scoreboard } from "./housing/scoreboard";

export default class Housing {
  name: string;
  systems: Systems;

  static _housing: Housing;

  constructor(name: string) {
    this.name = name;
    this.systems = new Systems();
  }

  static get(name: string) {
    if (this._housing) return this._housing;
    // load from file
    if (!FS.exists(`${name}/config.toml`)) {
      FS.makeDir(name);
      FS.createFile(`${name}`, `config.toml`);
      return new Housing(name);
    }
    const file = FS.open(`${name}/config.toml`);
    const config = housingConfigSchema.parse(toml.parse(file.read()));
    Chat.log(config);
    return new Housing(name);
  }
}

class Systems {
  scoreboard: Scoreboard;
}

const housingConfigSchema = z.object({
  general: z.object({
    name: z.string(),
  }),
});

const housingBaseConfig = {
    general: {
        name: "default",
    },
    };

