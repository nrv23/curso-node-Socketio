const { Namespaces } = require("../clasess/Namespace");
const { Room } = require("../clasess/Room");

const wikiNs = new Namespaces(
  1,
  "Wikipedia",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png",
  "/wiki"
);
const mozNs = new Namespaces(
  2,
  "Mozilla",
  "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png",
  "/mozilla"
);
const linuxNs = new Namespaces(
  3,
  "Linux",
  "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png",
  "/linux"
);

// crear aqui los rooms asoicoados a cada namespace

wikiNs.addRoom(new Room(Date.now(), "Historia", wikiNs.id));
wikiNs.addRoom(new Room(Date.now() + 1, "Geografía", wikiNs.id));
wikiNs.addRoom(new Room(Date.now() + 2, "Ciencia", wikiNs.id));

mozNs.addRoom(new Room(Date.now() + 3, "Firefox", mozNs.id));
mozNs.addRoom(new Room(Date.now() + 4, "Thuderbird", mozNs.id));
mozNs.addRoom(new Room(Date.now() + 5, "WebDev", mozNs.id));
mozNs.addRoom(new Room(Date.now() + 6, "rust", mozNs.id));

linuxNs.addRoom(new Room(Date.now() + 6, "Debian", linuxNs.id));
linuxNs.addRoom(new Room(Date.now() + 7, "RedHat", linuxNs.id));
linuxNs.addRoom(new Room(Date.now() + 8, "ArchLinux", linuxNs.id));

const allNamespaces = [wikiNs, mozNs, linuxNs];

module.exports = {
  allNamespaces
};
