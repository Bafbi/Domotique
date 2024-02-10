export class Scoreboard {
    items: ScoreboardItem[];
}

class ScoreboardItem {
  type: ScoreboardItemEnum;

  getLine(): number {
    return this.type.line;
  }

    getText(): string {
        switch (this.type.tag) {
        case "Blank Line":
            return "";
        case "Custom Line":
            return this.type.text.toString();
        case "House Name":
            return "House Name";
        case "Guest Count":
            return "Guest Count";
        case "Cookie Count":
            return "Cookie Count";
        }
    }
}

type ScoreboardItemEnum =
  | BLANK_LINE
  | CUSTOM_LINE
  | HOUSE_NAME
  | GUEST_COUNT
  | COOKIE_COUNT;

interface BLANK_LINE {
  tag: "Blank Line";
  line: 1;
}
interface CUSTOM_LINE {
  tag: "Custom Line";
  line: 1;
  text: number;
}
interface HOUSE_NAME {
  tag: "House Name";
  line: 2;
}
// Guest Count
interface GUEST_COUNT {
  tag: "Guest Count";
  line: 1;
}
// Cookie Count
interface COOKIE_COUNT {
  tag: "Cookie Count";
  line: 1;
}
