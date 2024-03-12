var __create = Object.create;
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));

// .wrangler/tmp/bundle-eIt5HS/checked-fetch.js
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
var urls;
var init_checked_fetch = __esm({
  ".wrangler/tmp/bundle-eIt5HS/checked-fetch.js"() {
    urls = /* @__PURE__ */ new Set();
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_checked_fetch();
    init_modules_watch_stub();
  }
});

// ../../../../../../usr/local/lib/node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../../../../../usr/local/lib/node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "node_modules/mime/types/standard.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// node_modules/mime/types/other.js
var require_other = __commonJS({
  "node_modules/mime/types/other.js"(exports, module) {
    init_checked_fetch();
    init_modules_watch_stub();
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// node_modules/mime/index.js
var require_mime = __commonJS({
  "node_modules/mime/index.js"(exports, module) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// node_modules/@cloudflare/kv-asset-handler/dist/types.js
var require_types = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
    var KVError = class extends Error {
      constructor(message, status = 500) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = KVError.name;
        this.status = status;
      }
    };
    exports.KVError = KVError;
    var MethodNotAllowedError = class extends KVError {
      constructor(message = `Not a valid request method`, status = 405) {
        super(message, status);
      }
    };
    exports.MethodNotAllowedError = MethodNotAllowedError;
    var NotFoundError = class extends KVError {
      constructor(message = `Not Found`, status = 404) {
        super(message, status);
      }
    };
    exports.NotFoundError = NotFoundError;
    var InternalError = class extends KVError {
      constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
        super(message, status);
      }
    };
    exports.InternalError = InternalError;
  }
});

// node_modules/@cloudflare/kv-asset-handler/dist/index.js
var require_dist = __commonJS({
  "node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
    "use strict";
    init_checked_fetch();
    init_modules_watch_stub();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
    var mime = require_mime();
    var types_1 = require_types();
    Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
      return types_1.MethodNotAllowedError;
    } });
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
      return types_1.NotFoundError;
    } });
    Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
      return types_1.InternalError;
    } });
    var defaultCacheControl = {
      browserTTL: null,
      edgeTTL: 2 * 60 * 60 * 24,
      // 2 days
      bypassCache: false
      // do not bypass Cloudflare's cache
    };
    var parseStringAsObject = (maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString;
    var getAssetFromKVDefaultOptions = {
      ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
      ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : {},
      cacheControl: defaultCacheControl,
      defaultMimeType: "text/plain",
      defaultDocument: "index.html",
      pathIsEncoded: false,
      defaultETag: "strong"
    };
    function assignOptions(options) {
      return Object.assign({}, getAssetFromKVDefaultOptions, options);
    }
    var mapRequestToAsset = (request, options) => {
      options = assignOptions(options);
      const parsedUrl = new URL(request.url);
      let pathname = parsedUrl.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.concat(options.defaultDocument);
      } else if (!mime.getType(pathname)) {
        pathname = pathname.concat("/" + options.defaultDocument);
      }
      parsedUrl.pathname = pathname;
      return new Request(parsedUrl.toString(), request);
    };
    exports.mapRequestToAsset = mapRequestToAsset;
    function serveSinglePageApp(request, options) {
      options = assignOptions(options);
      request = mapRequestToAsset(request, options);
      const parsedUrl = new URL(request.url);
      if (parsedUrl.pathname.endsWith(".html")) {
        return new Request(`${parsedUrl.origin}/${options.defaultDocument}`, request);
      } else {
        return request;
      }
    }
    exports.serveSinglePageApp = serveSinglePageApp;
    var getAssetFromKV2 = async (event, options) => {
      options = assignOptions(options);
      const request = event.request;
      const ASSET_NAMESPACE = options.ASSET_NAMESPACE;
      const ASSET_MANIFEST = parseStringAsObject(options.ASSET_MANIFEST);
      if (typeof ASSET_NAMESPACE === "undefined") {
        throw new types_1.InternalError(`there is no KV namespace bound to the script`);
      }
      const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
      let pathIsEncoded = options.pathIsEncoded;
      let requestKey;
      if (options.mapRequestToAsset) {
        requestKey = options.mapRequestToAsset(request);
      } else if (ASSET_MANIFEST[rawPathKey]) {
        requestKey = request;
      } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
        pathIsEncoded = true;
        requestKey = request;
      } else {
        const mappedRequest = mapRequestToAsset(request);
        const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
        if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
          pathIsEncoded = true;
          requestKey = mappedRequest;
        } else {
          requestKey = mapRequestToAsset(request, options);
        }
      }
      const SUPPORTED_METHODS = ["GET", "HEAD"];
      if (!SUPPORTED_METHODS.includes(requestKey.method)) {
        throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
      }
      const parsedUrl = new URL(requestKey.url);
      const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
      let pathKey = pathname.replace(/^\/+/, "");
      const cache = caches.default;
      let mimeType = mime.getType(pathKey) || options.defaultMimeType;
      if (mimeType.startsWith("text") || mimeType === "application/javascript") {
        mimeType += "; charset=utf-8";
      }
      let shouldEdgeCache = false;
      if (typeof ASSET_MANIFEST !== "undefined") {
        if (ASSET_MANIFEST[pathKey]) {
          pathKey = ASSET_MANIFEST[pathKey];
          shouldEdgeCache = true;
        }
      }
      let cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
      const evalCacheOpts = (() => {
        switch (typeof options.cacheControl) {
          case "function":
            return options.cacheControl(request);
          case "object":
            return options.cacheControl;
          default:
            return defaultCacheControl;
        }
      })();
      const formatETag = (entityId = pathKey, validatorType = options.defaultETag) => {
        if (!entityId) {
          return "";
        }
        switch (validatorType) {
          case "weak":
            if (!entityId.startsWith("W/")) {
              if (entityId.startsWith(`"`) && entityId.endsWith(`"`)) {
                return `W/${entityId}`;
              }
              return `W/"${entityId}"`;
            }
            return entityId;
          case "strong":
            if (entityId.startsWith(`W/"`)) {
              entityId = entityId.replace("W/", "");
            }
            if (!entityId.endsWith(`"`)) {
              entityId = `"${entityId}"`;
            }
            return entityId;
          default:
            return "";
        }
      };
      options.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
      if (options.cacheControl.bypassCache || options.cacheControl.edgeTTL === null || request.method == "HEAD") {
        shouldEdgeCache = false;
      }
      const shouldSetBrowserCache = typeof options.cacheControl.browserTTL === "number";
      let response = null;
      if (shouldEdgeCache) {
        response = await cache.match(cacheKey);
      }
      if (response) {
        if (response.status > 300 && response.status < 400) {
          if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
            response.body.cancel();
          } else {
          }
          response = new Response(null, response);
        } else {
          let opts = {
            headers: new Headers(response.headers),
            status: 0,
            statusText: ""
          };
          opts.headers.set("cf-cache-status", "HIT");
          if (response.status) {
            opts.status = response.status;
            opts.statusText = response.statusText;
          } else if (opts.headers.has("Content-Range")) {
            opts.status = 206;
            opts.statusText = "Partial Content";
          } else {
            opts.status = 200;
            opts.statusText = "OK";
          }
          response = new Response(response.body, opts);
        }
      } else {
        const body = await ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
        if (body === null) {
          throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
        }
        response = new Response(body);
        if (shouldEdgeCache) {
          response.headers.set("Accept-Ranges", "bytes");
          response.headers.set("Content-Length", String(body.byteLength));
          if (!response.headers.has("etag")) {
            response.headers.set("etag", formatETag(pathKey));
          }
          response.headers.set("Cache-Control", `max-age=${options.cacheControl.edgeTTL}`);
          event.waitUntil(cache.put(cacheKey, response.clone()));
          response.headers.set("CF-Cache-Status", "MISS");
        }
      }
      response.headers.set("Content-Type", mimeType);
      if (response.status === 304) {
        let etag = formatETag(response.headers.get("etag"));
        let ifNoneMatch = cacheKey.headers.get("if-none-match");
        let proxyCacheStatus = response.headers.get("CF-Cache-Status");
        if (etag) {
          if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === "MISS") {
            response.headers.set("CF-Cache-Status", "EXPIRED");
          } else {
            response.headers.set("CF-Cache-Status", "REVALIDATED");
          }
          response.headers.set("etag", formatETag(etag, "weak"));
        }
      }
      if (shouldSetBrowserCache) {
        response.headers.set("Cache-Control", `max-age=${options.cacheControl.browserTTL}`);
      } else {
        response.headers.delete("Cache-Control");
      }
      return response;
    };
    exports.getAssetFromKV = getAssetFromKV2;
  }
});

// .wrangler/tmp/bundle-eIt5HS/middleware-loader.entry.ts
init_checked_fetch();
init_modules_watch_stub();

// ../../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/common.ts
init_checked_fetch();
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-eIt5HS/middleware-insertion-facade.js
init_checked_fetch();
init_modules_watch_stub();

// src/cloudflare.worker.js
init_checked_fetch();
init_modules_watch_stub();

// src/scripts/lib/router.lib.js
init_checked_fetch();
init_modules_watch_stub();

// src/scripts/lib/worker.lib.js
init_checked_fetch();
init_modules_watch_stub();
var executeOnScheduler = async ({ callback, signal, priority }) => {
  try {
    if (!self?.scheduler?.postTask)
      return { data: await callback() };
    const data = await scheduler.postTask(callback, { priority, signal });
    return { data };
  } catch (err) {
    return { err };
  }
};
var stream = ({ callbacks, headers }) => {
  const { readable, writable } = new TransformStream();
  const done = (async () => {
    for (const callback of callbacks) {
      const abortController = new AbortController();
      const executeOnSchedulerResult = await executeOnScheduler({ callback, signal: abortController.signal, priority: "background" });
      const html2 = executeOnSchedulerResult?.err ?? executeOnSchedulerResult?.data;
      const response = new Response(html2, { headers, status: 200 });
      await response.body?.pipeTo(writable, { preventClose: true });
      abortController.abort();
    }
    writable.getWriter().close();
  })();
  return {
    done,
    response: new Response(readable, { headers })
  };
};
var fetch = async ({ url, request, ...config }) => {
  try {
    const response = await self?.fetch(url || request, config)?.catch((err) => ({ err }));
    console.log("--- response =", response);
    if (response?.err)
      return response;
    return { response };
  } catch (err) {
    return { err };
  }
};

// src/scripts/lib/urlpattern.lib.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/urlpattern-polyfill/index.js
init_checked_fetch();
init_modules_watch_stub();

// node_modules/urlpattern-polyfill/dist/urlpattern.js
init_checked_fetch();
init_modules_watch_stub();
var R = class {
  type = 3;
  name = "";
  prefix = "";
  value = "";
  suffix = "";
  modifier = 3;
  constructor(t, r, n, o, c, l) {
    this.type = t, this.name = r, this.prefix = n, this.value = o, this.suffix = c, this.modifier = l;
  }
  hasCustomName() {
    return this.name !== "" && typeof this.name != "number";
  }
};
var be = /[$_\p{ID_Start}]/u;
var Pe = /[$_\u200C\u200D\p{ID_Continue}]/u;
var M = ".*";
function Re(e, t) {
  return (t ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(e);
}
function v(e, t = false) {
  let r = [], n = 0;
  for (; n < e.length; ) {
    let o = e[n], c = function(l) {
      if (!t)
        throw new TypeError(l);
      r.push({ type: "INVALID_CHAR", index: n, value: e[n++] });
    };
    if (o === "*") {
      r.push({ type: "ASTERISK", index: n, value: e[n++] });
      continue;
    }
    if (o === "+" || o === "?") {
      r.push({ type: "OTHER_MODIFIER", index: n, value: e[n++] });
      continue;
    }
    if (o === "\\") {
      r.push({ type: "ESCAPED_CHAR", index: n++, value: e[n++] });
      continue;
    }
    if (o === "{") {
      r.push({ type: "OPEN", index: n, value: e[n++] });
      continue;
    }
    if (o === "}") {
      r.push({ type: "CLOSE", index: n, value: e[n++] });
      continue;
    }
    if (o === ":") {
      let l = "", s = n + 1;
      for (; s < e.length; ) {
        let i = e.substr(s, 1);
        if (s === n + 1 && be.test(i) || s !== n + 1 && Pe.test(i)) {
          l += e[s++];
          continue;
        }
        break;
      }
      if (!l) {
        c(`Missing parameter name at ${n}`);
        continue;
      }
      r.push({ type: "NAME", index: n, value: l }), n = s;
      continue;
    }
    if (o === "(") {
      let l = 1, s = "", i = n + 1, a = false;
      if (e[i] === "?") {
        c(`Pattern cannot start with "?" at ${i}`);
        continue;
      }
      for (; i < e.length; ) {
        if (!Re(e[i], false)) {
          c(`Invalid character '${e[i]}' at ${i}.`), a = true;
          break;
        }
        if (e[i] === "\\") {
          s += e[i++] + e[i++];
          continue;
        }
        if (e[i] === ")") {
          if (l--, l === 0) {
            i++;
            break;
          }
        } else if (e[i] === "(" && (l++, e[i + 1] !== "?")) {
          c(`Capturing groups are not allowed at ${i}`), a = true;
          break;
        }
        s += e[i++];
      }
      if (a)
        continue;
      if (l) {
        c(`Unbalanced pattern at ${n}`);
        continue;
      }
      if (!s) {
        c(`Missing pattern at ${n}`);
        continue;
      }
      r.push({ type: "REGEX", index: n, value: s }), n = i;
      continue;
    }
    r.push({ type: "CHAR", index: n, value: e[n++] });
  }
  return r.push({ type: "END", index: n, value: "" }), r;
}
function D(e, t = {}) {
  let r = v(e);
  t.delimiter ??= "/#?", t.prefixes ??= "./";
  let n = `[^${S(t.delimiter)}]+?`, o = [], c = 0, l = 0, s = "", i = /* @__PURE__ */ new Set(), a = (h) => {
    if (l < r.length && r[l].type === h)
      return r[l++].value;
  }, f = () => a("OTHER_MODIFIER") ?? a("ASTERISK"), d = (h) => {
    let u = a(h);
    if (u !== void 0)
      return u;
    let { type: p, index: A } = r[l];
    throw new TypeError(`Unexpected ${p} at ${A}, expected ${h}`);
  }, T = () => {
    let h = "", u;
    for (; u = a("CHAR") ?? a("ESCAPED_CHAR"); )
      h += u;
    return h;
  }, Se = (h) => h, L = t.encodePart || Se, I = "", U = (h) => {
    I += h;
  }, $ = () => {
    I.length && (o.push(new R(3, "", "", L(I), "", 3)), I = "");
  }, V = (h, u, p, A, Y) => {
    let g = 3;
    switch (Y) {
      case "?":
        g = 1;
        break;
      case "*":
        g = 0;
        break;
      case "+":
        g = 2;
        break;
    }
    if (!u && !p && g === 3) {
      U(h);
      return;
    }
    if ($(), !u && !p) {
      if (!h)
        return;
      o.push(new R(3, "", "", L(h), "", g));
      return;
    }
    let m;
    p ? p === "*" ? m = M : m = p : m = n;
    let O = 2;
    m === n ? (O = 1, m = "") : m === M && (O = 0, m = "");
    let P;
    if (u ? P = u : p && (P = c++), i.has(P))
      throw new TypeError(`Duplicate name '${P}'.`);
    i.add(P), o.push(new R(O, P, L(h), m, L(A), g));
  };
  for (; l < r.length; ) {
    let h = a("CHAR"), u = a("NAME"), p = a("REGEX");
    if (!u && !p && (p = a("ASTERISK")), u || p) {
      let g = h ?? "";
      t.prefixes.indexOf(g) === -1 && (U(g), g = ""), $();
      let m = f();
      V(g, u, p, "", m);
      continue;
    }
    let A = h ?? a("ESCAPED_CHAR");
    if (A) {
      U(A);
      continue;
    }
    if (a("OPEN")) {
      let g = T(), m = a("NAME"), O = a("REGEX");
      !m && !O && (O = a("ASTERISK"));
      let P = T();
      d("CLOSE");
      let xe = f();
      V(g, m, O, P, xe);
      continue;
    }
    $(), d("END");
  }
  return o;
}
function S(e) {
  return e.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
function X(e) {
  return e && e.ignoreCase ? "ui" : "u";
}
function Z(e, t, r) {
  return F(D(e, r), t, r);
}
function k(e) {
  switch (e) {
    case 0:
      return "*";
    case 1:
      return "?";
    case 2:
      return "+";
    case 3:
      return "";
  }
}
function F(e, t, r = {}) {
  r.delimiter ??= "/#?", r.prefixes ??= "./", r.sensitive ??= false, r.strict ??= false, r.end ??= true, r.start ??= true, r.endsWith = "";
  let n = r.start ? "^" : "";
  for (let s of e) {
    if (s.type === 3) {
      s.modifier === 3 ? n += S(s.value) : n += `(?:${S(s.value)})${k(s.modifier)}`;
      continue;
    }
    t && t.push(s.name);
    let i = `[^${S(r.delimiter)}]+?`, a = s.value;
    if (s.type === 1 ? a = i : s.type === 0 && (a = M), !s.prefix.length && !s.suffix.length) {
      s.modifier === 3 || s.modifier === 1 ? n += `(${a})${k(s.modifier)}` : n += `((?:${a})${k(s.modifier)})`;
      continue;
    }
    if (s.modifier === 3 || s.modifier === 1) {
      n += `(?:${S(s.prefix)}(${a})${S(s.suffix)})`, n += k(s.modifier);
      continue;
    }
    n += `(?:${S(s.prefix)}`, n += `((?:${a})(?:`, n += S(s.suffix), n += S(s.prefix), n += `(?:${a}))*)${S(s.suffix)})`, s.modifier === 0 && (n += "?");
  }
  let o = `[${S(r.endsWith)}]|$`, c = `[${S(r.delimiter)}]`;
  if (r.end)
    return r.strict || (n += `${c}?`), r.endsWith.length ? n += `(?=${o})` : n += "$", new RegExp(n, X(r));
  r.strict || (n += `(?:${c}(?=${o}))?`);
  let l = false;
  if (e.length) {
    let s = e[e.length - 1];
    s.type === 3 && s.modifier === 3 && (l = r.delimiter.indexOf(s) > -1);
  }
  return l || (n += `(?=${c}|${o})`), new RegExp(n, X(r));
}
var x = { delimiter: "", prefixes: "", sensitive: true, strict: true };
var B = { delimiter: ".", prefixes: "", sensitive: true, strict: true };
var q = { delimiter: "/", prefixes: "/", sensitive: true, strict: true };
function J(e, t) {
  return e.length ? e[0] === "/" ? true : !t || e.length < 2 ? false : (e[0] == "\\" || e[0] == "{") && e[1] == "/" : false;
}
function Q(e, t) {
  return e.startsWith(t) ? e.substring(t.length, e.length) : e;
}
function Ee(e, t) {
  return e.endsWith(t) ? e.substr(0, e.length - t.length) : e;
}
function W(e) {
  return !e || e.length < 2 ? false : e[0] === "[" || (e[0] === "\\" || e[0] === "{") && e[1] === "[";
}
var ee = ["ftp", "file", "http", "https", "ws", "wss"];
function N(e) {
  if (!e)
    return true;
  for (let t of ee)
    if (e.test(t))
      return true;
  return false;
}
function te(e, t) {
  if (e = Q(e, "#"), t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.hash = e, r.hash ? r.hash.substring(1, r.hash.length) : "";
}
function re(e, t) {
  if (e = Q(e, "?"), t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.search = e, r.search ? r.search.substring(1, r.search.length) : "";
}
function ne(e, t) {
  return t || e === "" ? e : W(e) ? j(e) : z(e);
}
function se(e, t) {
  if (t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.password = e, r.password;
}
function ie(e, t) {
  if (t || e === "")
    return e;
  let r = new URL("https://example.com");
  return r.username = e, r.username;
}
function ae(e, t, r) {
  if (r || e === "")
    return e;
  if (t && !ee.includes(t))
    return new URL(`${t}:${e}`).pathname;
  let n = e[0] == "/";
  return e = new URL(n ? e : "/-" + e, "https://example.com").pathname, n || (e = e.substring(2, e.length)), e;
}
function oe(e, t, r) {
  return _(t) === e && (e = ""), r || e === "" ? e : K(e);
}
function ce(e, t) {
  return e = Ee(e, ":"), t || e === "" ? e : y(e);
}
function _(e) {
  switch (e) {
    case "ws":
    case "http":
      return "80";
    case "wws":
    case "https":
      return "443";
    case "ftp":
      return "21";
    default:
      return "";
  }
}
function y(e) {
  if (e === "")
    return e;
  if (/^[-+.A-Za-z0-9]*$/.test(e))
    return e.toLowerCase();
  throw new TypeError(`Invalid protocol '${e}'.`);
}
function le(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.username = e, t.username;
}
function fe(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.password = e, t.password;
}
function z(e) {
  if (e === "")
    return e;
  if (/[\t\n\r #%/:<>?@[\]^\\|]/g.test(e))
    throw new TypeError(`Invalid hostname '${e}'`);
  let t = new URL("https://example.com");
  return t.hostname = e, t.hostname;
}
function j(e) {
  if (e === "")
    return e;
  if (/[^0-9a-fA-F[\]:]/g.test(e))
    throw new TypeError(`Invalid IPv6 hostname '${e}'`);
  return e.toLowerCase();
}
function K(e) {
  if (e === "" || /^[0-9]*$/.test(e) && parseInt(e) <= 65535)
    return e;
  throw new TypeError(`Invalid port '${e}'.`);
}
function he(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.pathname = e[0] !== "/" ? "/-" + e : e, e[0] !== "/" ? t.pathname.substring(2, t.pathname.length) : t.pathname;
}
function ue(e) {
  return e === "" ? e : new URL(`data:${e}`).pathname;
}
function de(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.search = e, t.search.substring(1, t.search.length);
}
function pe(e) {
  if (e === "")
    return e;
  let t = new URL("https://example.com");
  return t.hash = e, t.hash.substring(1, t.hash.length);
}
var H = class {
  #i;
  #n = [];
  #t = {};
  #e = 0;
  #s = 1;
  #l = 0;
  #o = 0;
  #d = 0;
  #p = 0;
  #g = false;
  constructor(t) {
    this.#i = t;
  }
  get result() {
    return this.#t;
  }
  parse() {
    for (this.#n = v(this.#i, true); this.#e < this.#n.length; this.#e += this.#s) {
      if (this.#s = 1, this.#n[this.#e].type === "END") {
        if (this.#o === 0) {
          this.#b(), this.#f() ? this.#r(9, 1) : this.#h() ? this.#r(8, 1) : this.#r(7, 0);
          continue;
        } else if (this.#o === 2) {
          this.#u(5);
          continue;
        }
        this.#r(10, 0);
        break;
      }
      if (this.#d > 0)
        if (this.#A())
          this.#d -= 1;
        else
          continue;
      if (this.#T()) {
        this.#d += 1;
        continue;
      }
      switch (this.#o) {
        case 0:
          this.#P() && this.#u(1);
          break;
        case 1:
          if (this.#P()) {
            this.#C();
            let t = 7, r = 1;
            this.#E() ? (t = 2, r = 3) : this.#g && (t = 2), this.#r(t, r);
          }
          break;
        case 2:
          this.#S() ? this.#u(3) : (this.#x() || this.#h() || this.#f()) && this.#u(5);
          break;
        case 3:
          this.#O() ? this.#r(4, 1) : this.#S() && this.#r(5, 1);
          break;
        case 4:
          this.#S() && this.#r(5, 1);
          break;
        case 5:
          this.#y() ? this.#p += 1 : this.#w() && (this.#p -= 1), this.#k() && !this.#p ? this.#r(6, 1) : this.#x() ? this.#r(7, 0) : this.#h() ? this.#r(8, 1) : this.#f() && this.#r(9, 1);
          break;
        case 6:
          this.#x() ? this.#r(7, 0) : this.#h() ? this.#r(8, 1) : this.#f() && this.#r(9, 1);
          break;
        case 7:
          this.#h() ? this.#r(8, 1) : this.#f() && this.#r(9, 1);
          break;
        case 8:
          this.#f() && this.#r(9, 1);
          break;
        case 9:
          break;
        case 10:
          break;
      }
    }
    this.#t.hostname !== void 0 && this.#t.port === void 0 && (this.#t.port = "");
  }
  #r(t, r) {
    switch (this.#o) {
      case 0:
        break;
      case 1:
        this.#t.protocol = this.#c();
        break;
      case 2:
        break;
      case 3:
        this.#t.username = this.#c();
        break;
      case 4:
        this.#t.password = this.#c();
        break;
      case 5:
        this.#t.hostname = this.#c();
        break;
      case 6:
        this.#t.port = this.#c();
        break;
      case 7:
        this.#t.pathname = this.#c();
        break;
      case 8:
        this.#t.search = this.#c();
        break;
      case 9:
        this.#t.hash = this.#c();
        break;
      case 10:
        break;
    }
    this.#o !== 0 && t !== 10 && ([1, 2, 3, 4].includes(this.#o) && [6, 7, 8, 9].includes(t) && (this.#t.hostname ??= ""), [1, 2, 3, 4, 5, 6].includes(this.#o) && [8, 9].includes(t) && (this.#t.pathname ??= this.#g ? "/" : ""), [1, 2, 3, 4, 5, 6, 7].includes(this.#o) && t === 9 && (this.#t.search ??= "")), this.#R(t, r);
  }
  #R(t, r) {
    this.#o = t, this.#l = this.#e + r, this.#e += r, this.#s = 0;
  }
  #b() {
    this.#e = this.#l, this.#s = 0;
  }
  #u(t) {
    this.#b(), this.#o = t;
  }
  #m(t) {
    return t < 0 && (t = this.#n.length - t), t < this.#n.length ? this.#n[t] : this.#n[this.#n.length - 1];
  }
  #a(t, r) {
    let n = this.#m(t);
    return n.value === r && (n.type === "CHAR" || n.type === "ESCAPED_CHAR" || n.type === "INVALID_CHAR");
  }
  #P() {
    return this.#a(this.#e, ":");
  }
  #E() {
    return this.#a(this.#e + 1, "/") && this.#a(this.#e + 2, "/");
  }
  #S() {
    return this.#a(this.#e, "@");
  }
  #O() {
    return this.#a(this.#e, ":");
  }
  #k() {
    return this.#a(this.#e, ":");
  }
  #x() {
    return this.#a(this.#e, "/");
  }
  #h() {
    if (this.#a(this.#e, "?"))
      return true;
    if (this.#n[this.#e].value !== "?")
      return false;
    let t = this.#m(this.#e - 1);
    return t.type !== "NAME" && t.type !== "REGEX" && t.type !== "CLOSE" && t.type !== "ASTERISK";
  }
  #f() {
    return this.#a(this.#e, "#");
  }
  #T() {
    return this.#n[this.#e].type == "OPEN";
  }
  #A() {
    return this.#n[this.#e].type == "CLOSE";
  }
  #y() {
    return this.#a(this.#e, "[");
  }
  #w() {
    return this.#a(this.#e, "]");
  }
  #c() {
    let t = this.#n[this.#e], r = this.#m(this.#l).index;
    return this.#i.substring(r, t.index);
  }
  #C() {
    let t = {};
    Object.assign(t, x), t.encodePart = y;
    let r = Z(this.#c(), void 0, t);
    this.#g = N(r);
  }
};
var G = ["protocol", "username", "password", "hostname", "port", "pathname", "search", "hash"];
var E = "*";
function ge(e, t) {
  if (typeof e != "string")
    throw new TypeError("parameter 1 is not of type 'string'.");
  let r = new URL(e, t);
  return { protocol: r.protocol.substring(0, r.protocol.length - 1), username: r.username, password: r.password, hostname: r.hostname, port: r.port, pathname: r.pathname, search: r.search !== "" ? r.search.substring(1, r.search.length) : void 0, hash: r.hash !== "" ? r.hash.substring(1, r.hash.length) : void 0 };
}
function b(e, t) {
  return t ? C(e) : e;
}
function w(e, t, r) {
  let n;
  if (typeof t.baseURL == "string")
    try {
      n = new URL(t.baseURL), t.protocol === void 0 && (e.protocol = b(n.protocol.substring(0, n.protocol.length - 1), r)), !r && t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.username === void 0 && (e.username = b(n.username, r)), !r && t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.username === void 0 && t.password === void 0 && (e.password = b(n.password, r)), t.protocol === void 0 && t.hostname === void 0 && (e.hostname = b(n.hostname, r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && (e.port = b(n.port, r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.pathname === void 0 && (e.pathname = b(n.pathname, r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.pathname === void 0 && t.search === void 0 && (e.search = b(n.search.substring(1, n.search.length), r)), t.protocol === void 0 && t.hostname === void 0 && t.port === void 0 && t.pathname === void 0 && t.search === void 0 && t.hash === void 0 && (e.hash = b(n.hash.substring(1, n.hash.length), r));
    } catch {
      throw new TypeError(`invalid baseURL '${t.baseURL}'.`);
    }
  if (typeof t.protocol == "string" && (e.protocol = ce(t.protocol, r)), typeof t.username == "string" && (e.username = ie(t.username, r)), typeof t.password == "string" && (e.password = se(t.password, r)), typeof t.hostname == "string" && (e.hostname = ne(t.hostname, r)), typeof t.port == "string" && (e.port = oe(t.port, e.protocol, r)), typeof t.pathname == "string") {
    if (e.pathname = t.pathname, n && !J(e.pathname, r)) {
      let o = n.pathname.lastIndexOf("/");
      o >= 0 && (e.pathname = b(n.pathname.substring(0, o + 1), r) + e.pathname);
    }
    e.pathname = ae(e.pathname, e.protocol, r);
  }
  return typeof t.search == "string" && (e.search = re(t.search, r)), typeof t.hash == "string" && (e.hash = te(t.hash, r)), e;
}
function C(e) {
  return e.replace(/([+*?:{}()\\])/g, "\\$1");
}
function Oe(e) {
  return e.replace(/([.+*?^${}()[\]|/\\])/g, "\\$1");
}
function ke(e, t) {
  t.delimiter ??= "/#?", t.prefixes ??= "./", t.sensitive ??= false, t.strict ??= false, t.end ??= true, t.start ??= true, t.endsWith = "";
  let r = ".*", n = `[^${Oe(t.delimiter)}]+?`, o = /[$_\u200C\u200D\p{ID_Continue}]/u, c = "";
  for (let l = 0; l < e.length; ++l) {
    let s = e[l];
    if (s.type === 3) {
      if (s.modifier === 3) {
        c += C(s.value);
        continue;
      }
      c += `{${C(s.value)}}${k(s.modifier)}`;
      continue;
    }
    let i = s.hasCustomName(), a = !!s.suffix.length || !!s.prefix.length && (s.prefix.length !== 1 || !t.prefixes.includes(s.prefix)), f = l > 0 ? e[l - 1] : null, d = l < e.length - 1 ? e[l + 1] : null;
    if (!a && i && s.type === 1 && s.modifier === 3 && d && !d.prefix.length && !d.suffix.length)
      if (d.type === 3) {
        let T = d.value.length > 0 ? d.value[0] : "";
        a = o.test(T);
      } else
        a = !d.hasCustomName();
    if (!a && !s.prefix.length && f && f.type === 3) {
      let T = f.value[f.value.length - 1];
      a = t.prefixes.includes(T);
    }
    a && (c += "{"), c += C(s.prefix), i && (c += `:${s.name}`), s.type === 2 ? c += `(${s.value})` : s.type === 1 ? i || (c += `(${n})`) : s.type === 0 && (!i && (!f || f.type === 3 || f.modifier !== 3 || a || s.prefix !== "") ? c += "*" : c += `(${r})`), s.type === 1 && i && s.suffix.length && o.test(s.suffix[0]) && (c += "\\"), c += C(s.suffix), a && (c += "}"), s.modifier !== 3 && (c += k(s.modifier));
  }
  return c;
}
var me = class {
  #i;
  #n = {};
  #t = {};
  #e = {};
  #s = {};
  #l = false;
  constructor(t = {}, r, n) {
    try {
      let o;
      if (typeof r == "string" ? o = r : n = r, typeof t == "string") {
        let i = new H(t);
        if (i.parse(), t = i.result, o === void 0 && typeof t.protocol != "string")
          throw new TypeError("A base URL must be provided for a relative constructor string.");
        t.baseURL = o;
      } else {
        if (!t || typeof t != "object")
          throw new TypeError("parameter 1 is not of type 'string' and cannot convert to dictionary.");
        if (o)
          throw new TypeError("parameter 1 is not of type 'string'.");
      }
      typeof n > "u" && (n = { ignoreCase: false });
      let c = { ignoreCase: n.ignoreCase === true }, l = { pathname: E, protocol: E, username: E, password: E, hostname: E, port: E, search: E, hash: E };
      this.#i = w(l, t, true), _(this.#i.protocol) === this.#i.port && (this.#i.port = "");
      let s;
      for (s of G) {
        if (!(s in this.#i))
          continue;
        let i = {}, a = this.#i[s];
        switch (this.#t[s] = [], s) {
          case "protocol":
            Object.assign(i, x), i.encodePart = y;
            break;
          case "username":
            Object.assign(i, x), i.encodePart = le;
            break;
          case "password":
            Object.assign(i, x), i.encodePart = fe;
            break;
          case "hostname":
            Object.assign(i, B), W(a) ? i.encodePart = j : i.encodePart = z;
            break;
          case "port":
            Object.assign(i, x), i.encodePart = K;
            break;
          case "pathname":
            N(this.#n.protocol) ? (Object.assign(i, q, c), i.encodePart = he) : (Object.assign(i, x, c), i.encodePart = ue);
            break;
          case "search":
            Object.assign(i, x, c), i.encodePart = de;
            break;
          case "hash":
            Object.assign(i, x, c), i.encodePart = pe;
            break;
        }
        try {
          this.#s[s] = D(a, i), this.#n[s] = F(this.#s[s], this.#t[s], i), this.#e[s] = ke(this.#s[s], i), this.#l = this.#l || this.#s[s].some((f) => f.type === 2);
        } catch {
          throw new TypeError(`invalid ${s} pattern '${this.#i[s]}'.`);
        }
      }
    } catch (o) {
      throw new TypeError(`Failed to construct 'URLPattern': ${o.message}`);
    }
  }
  test(t = {}, r) {
    let n = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if (typeof t != "string" && r)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (typeof t > "u")
      return false;
    try {
      typeof t == "object" ? n = w(n, t, false) : n = w(n, ge(t, r), false);
    } catch {
      return false;
    }
    let o;
    for (o of G)
      if (!this.#n[o].exec(n[o]))
        return false;
    return true;
  }
  exec(t = {}, r) {
    let n = { pathname: "", protocol: "", username: "", password: "", hostname: "", port: "", search: "", hash: "" };
    if (typeof t != "string" && r)
      throw new TypeError("parameter 1 is not of type 'string'.");
    if (typeof t > "u")
      return;
    try {
      typeof t == "object" ? n = w(n, t, false) : n = w(n, ge(t, r), false);
    } catch {
      return null;
    }
    let o = {};
    r ? o.inputs = [t, r] : o.inputs = [t];
    let c;
    for (c of G) {
      let l = this.#n[c].exec(n[c]);
      if (!l)
        return null;
      let s = {};
      for (let [i, a] of this.#t[c].entries())
        if (typeof a == "string" || typeof a == "number") {
          let f = l[i + 1];
          s[a] = f;
        }
      o[c] = { input: n[c] ?? "", groups: s };
    }
    return o;
  }
  static compareComponent(t, r, n) {
    let o = (i, a) => {
      for (let f of ["type", "modifier", "prefix", "value", "suffix"]) {
        if (i[f] < a[f])
          return -1;
        if (i[f] === a[f])
          continue;
        return 1;
      }
      return 0;
    }, c = new R(3, "", "", "", "", 3), l = new R(0, "", "", "", "", 3), s = (i, a) => {
      let f = 0;
      for (; f < Math.min(i.length, a.length); ++f) {
        let d = o(i[f], a[f]);
        if (d)
          return d;
      }
      return i.length === a.length ? 0 : o(i[f] ?? c, a[f] ?? c);
    };
    return !r.#e[t] && !n.#e[t] ? 0 : r.#e[t] && !n.#e[t] ? s(r.#s[t], [l]) : !r.#e[t] && n.#e[t] ? s([l], n.#s[t]) : s(r.#s[t], n.#s[t]);
  }
  get protocol() {
    return this.#e.protocol;
  }
  get username() {
    return this.#e.username;
  }
  get password() {
    return this.#e.password;
  }
  get hostname() {
    return this.#e.hostname;
  }
  get port() {
    return this.#e.port;
  }
  get pathname() {
    return this.#e.pathname;
  }
  get search() {
    return this.#e.search;
  }
  get hash() {
    return this.#e.hash;
  }
  get hasRegExpGroups() {
    return this.#l;
  }
};

// node_modules/urlpattern-polyfill/index.js
if (!globalThis.URLPattern) {
  globalThis.URLPattern = me;
}

// src/scripts/lib/urlpattern.lib.js
if (self?.URLPattern)
  self.URLPattern = me;
var getURLPatern = ({ pathname }) => new self.URLPattern({ pathname });

// src/scripts/lib/router.lib.js
var findPatternFromUrl = ({ router: router2, url }) => {
  const patternPathname = [...new Set(router2?.keys())].find((patternPathname2) => {
    const pattern = getURLPatern({ pathname: patternPathname2 });
    return pattern.test(url.href);
  });
  return patternPathname ? getURLPatern({ pathname: patternPathname }) : null;
};
var getRedirectResponse = ({ origin, pathname }) => {
  if (origin !== self?.origin)
    return;
  const isRedirectable = pathname !== "/" && pathname.endsWith("/");
  const response = isRedirectable ? Response.redirect(pathname.slice(0, -1), 301) : null;
  return { response };
};
var getNotFoundResponse = async ({ router: router2, request }) => {
  const pageCallback = router2?.get("/404")?.getRoute;
  const response = pageCallback ? (await pageCallback({ request }))?.response : new Response("404", { status: 404 });
  return { response };
};
var getForbiddenResponse = ({ origin, request, forbiddenURLs: forbiddenURLs2 }) => {
  if (origin !== self?.origin)
    return;
  const isForbidden = forbiddenURLs2?.find((filename) => request?.url?.endsWith(filename));
  if (!isForbidden)
    return;
  return { response: new Response(`${request?.url} is forbidden`, { status: 503 }) };
};

// src/scripts/lib/cloudflare.lib.js
init_checked_fetch();
init_modules_watch_stub();
var import_kv_asset_handler = __toESM(require_dist(), 1);
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
var getStaticResponse = async ({ request, waitUntil, env }) => {
  try {
    const ASSET_MANIFEST = JSON.parse(manifestJSON);
    const response = await (0, import_kv_asset_handler.getAssetFromKV)({
      request,
      waitUntil
    }, {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST
    });
    return { response };
  } catch (err) {
    return { err };
  }
};

// src/scripts/config.js
init_checked_fetch();
init_modules_watch_stub();

// src/scripts/routes/login.route.js
var login_route_exports = {};
__export(login_route_exports, {
  getRoute: () => getRoute
});
init_checked_fetch();
init_modules_watch_stub();

// src/scripts/lib/html.lib.js
init_checked_fetch();
init_modules_watch_stub();

// src/scripts/lib/util.lib.js
init_checked_fetch();
init_modules_watch_stub();
var Scope = {
  Cloudflare: "cloudflare-worker",
  ServiceWorker: "service-worker",
  Window: "window"
};
var isWindow = () => typeof window === "object";
var isServiceWorker = ({ env }) => !env && typeof ServiceWorkerGlobalScope !== "undefined";
var isCloudflareWorker = ({ env }) => env?.IS_CLOUDFLARE_WORKER;
var getScope = ({ env }) => {
  if (isCloudflareWorker({ env }))
    return Scope.Cloudflare;
  if (isServiceWorker({ env }))
    return Scope.ServiceWorker;
  if (isWindow())
    return Scope.Window;
};
var getEnv = ({ env }) => {
  if (isCloudflareWorker({ env }))
    return env.ENV;
  if (isServiceWorker({ env }))
    return __ENV__;
  if (isWindow())
    return document?.body?.getAttribute("data-env");
};
var isDevEnv = ({ env }) => {
  return getEnv({ env }) === "dev";
};

// src/scripts/lib/html.lib.js
var html = (s, ...args) => s?.map((ss, i) => `${ss}${args[i] !== void 0 ? args[i] : ""}`).join("");
var _a;
var LISTENER_SCRIPT = html(_a || (_a = __template([`
    <script defer>
        (() => {
            const addListener = ({ srcElement, event, callbacks }) => {
                srcElement?.addEventListener(event, (e) => {
                    executeCallbacks({ e, srcElement, callbacks })
                })
            }

            const executeCallbacks = ({ e, srcElement, callbacks }) => {
                callbacks?.forEach((callback) => {
                    if (callback) callback({ e, srcElement })
                })
            }

            const getCallbackInModule = ({ customModule, event }) => {
                if (!customModule) return null
                if (customModule[event]) return customModule[event]
                const prev = Object.keys(customModule)?.find((key) => customModule[key][event])
                if (!prev) return null
                return customModule[prev][event]
            }

            const getSrcElement = ({ srcElement, event }) => {
                const attribute = 'on-' + event
                const hasActionStarter = srcElement?.hasAttribute(attribute)
                if (hasActionStarter) return srcElement

                const query = ':is(a, button, li)[' + attribute + ']'
                const closestButton = srcElement?.closest(query)
                if (closestButton) return closestButton

                return srcElement
            }

            const fetchListener = async ({ srcElement, event, e }) => {
                const starter = srcElement?.getAttribute('on-' + event)
                if (!starter) return

                if (starter && ['submit'].includes(event)) e.preventDefault()

                const helpers = await Promise.all(
                    starter?.split(',')?.map((helperName) => {
                        const toImport = '/' + helperName?.trim() + '.js'
                        return import(toImport)?.catch((err) => { })
                    })
                )

                const callbacks = helpers?.map((helper) => getCallbackInModule({ customModule: helper, event }))

                if (['load', 'click', 'submit'].includes(event)) executeCallbacks({ e, srcElement, callbacks })
                if (['invalid', 'click', 'submit'].includes(event)) addListener({ srcElement, event, callbacks })
                srcElement?.removeAttribute('on-' + event)
            }

            // load
            const configLoad = () => {
                const event = 'load'
                const srcElements = document?.querySelectorAll('[on-' + event + ']')
                //console.log('--- srcElements load =', srcElements)

                srcElements?.forEach(async (srcElement) => {
                    fetchListener({ srcElement, event, e: null })
                })
            }

            // invalid
            const configInvalid = () => {
                const event = 'invalid'
                const srcElements = document?.querySelectorAll('[on-' + event + ']')
                //console.log('--- srcElements invalid =', srcElements)

                srcElements?.forEach(async (srcElement) => {
                    fetchListener({ srcElement, event, e: null })
                })
            }

            // event-listeners
            const configEventListeners = () => {
                ['mouseover', 'click', 'submit']?.forEach((event) => document.body['on' + event] = async (e) => {
                    /*
                    if (['mouseover', 'click'].includes(event)){
                        await addScripts()     
                
                        configLoad()
                        configInvalid()
                        configObservers()
                    }
                    */

                    const srcElement = getSrcElement({ srcElement: e.srcElement, event })
                    fetchListener({ srcElement, event, e })
                })
            }

            // observers
            const configObservers = () => {
                const srcElements = [...document.querySelectorAll('[on-observe]')]
                //console.log('--- srcElements observer =', srcElements)
                
                const uniqueStarters = [...srcElements?.reduce((acc, srcElement) => {
                    const starters = srcElement?.getAttribute('on-observe')?.split(',')
                    starters?.forEach((starter) => acc?.set(starter, 1))
                    return acc
                }, new Map())?.keys()]

                uniqueStarters?.forEach(async (starter) => {
                    const starterElements = document.querySelectorAll('[on-observe*="' + starter + '"]')

                    const helper = await import('/' + starter?.trim() + '.js')?.catch((err) => { })
                    const callback = getCallbackInModule({ customModule: helper, event: 'observe' })
                    if (!callback) return

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => callback({ entry, observer }))
                    })

                    starterElements?.forEach((starterElement) => {
                        observer.observe(starterElement)

                        const observerAttr = starterElement?.getAttribute('on-observe') ?? ''
                        const updatedObserverAttr = observerAttr?.replaceAll(starter + ', ', '')?.replaceAll(', ' + starter, '')?.replaceAll(starter, '') ?? ''

                        if (updatedObserverAttr === '') starterElement.removeAttribute('on-observe')
                        else starterElement.setAttribute('on-observe', updatedObserverAttr)
                    })
                })
            }

            const loadScript = ({ id, attrs, content }) => {
                const script = document?.createElement('script')

                Object.keys(attrs)?.forEach((attrKey) => script?.setAttribute(attrKey, attrs[attrKey]))
                script.id = id

                if (content) script?.insertAdjacentHTML('beforeend', content)

                return new Promise((resolve, reject) => {
                    if (!attrs.src) {
                        resolve()
                        document?.body?.insertAdjacentElement('beforeend', script)
                        return
                    }

                    script.onload = script.onreadystatechange = function () {
                        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                            resolve()
                            script.onload = script.onreadystatechange = null
                        }
                    }

                    script.onerror = () => {
                        console.log('--- script failed to load')
                        reject(new Error('Failed to load script with src ' + script.src))
                    }

                    document?.body?.insertAdjacentElement('beforeend', script)
                })
            }

            const addScripts = () => {
                const scriptsToLoad = [...document.querySelectorAll('script[data-script-to-load]')]
                return Promise.all(
                    scriptsToLoad?.map((scriptToLoad) => {
                        const id = scriptToLoad?.getAttribute('data-script-to-load')
                        scriptToLoad.removeAttribute('data-script-to-load')

                        const attrs = scriptToLoad?.getAttributeNames()?.reduce((acc, attrName) => {
                            const attrValue = scriptToLoad.getAttribute(attrName)
                            if (attrValue !== 'text/script-to-load') acc[attrName] = attrValue
                            return acc
                        }, {})

                        const content = scriptToLoad?.textContent

                        return loadScript({ id, attrs, content }).catch((err) => {
                            console.error(err)
                        })
                    })
                )
            }

            configEventListeners()

            /*
            window.onload = async () => {
                await addScripts()     
                
                configLoad()
                configInvalid()
                configObservers()
            }
            */

            
            window.onload = async () => {
                const customLoadEventName = 'my-custom-load'
                const customLoadEvent = new Event(customLoadEventName)

                document?.body?.addEventListener(customLoadEventName, async () => {

                    await addScripts()     
                
                    configLoad()
                    configInvalid()
                    configObservers()
                })

                document.body.dispatchEvent(customLoadEvent)
            }
            
        })()
    <\/script>
`])));
var stream2 = ({ head, body, scripts, env }) => {
  const headers = new Headers();
  headers.append("Content-Type", "text/html;charset=UTF-8");
  const callbacks = [
    () => html`
            <!DOCTYPE html>
            <html lang="es">
            <head>
        `,
    head,
    () => html`
            </head>
            <body 
                data-scope=${getScope({ env })}" 
                data-env=${getEnv({ env })}"
            >
        `,
    body,
    () => html`
            ${LISTENER_SCRIPT}
            ${isDevEnv({ env }) ? "" : SW_REGISTER_SCRIPT}
        `,
    scripts ?? (() => ""),
    () => html`
            </body>
            </html>
        `
  ];
  return stream({ callbacks, headers });
};

// src/scripts/routes/login.route.js
var getRoute = async ({ request, env }) => {
  return stream2({
    head: () => html`
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login | Take A Net</title>

            <link rel="stylesheet" href="/global.component.css">
            <link rel="stylesheet" href="/main.component.css">
            <link rel="stylesheet" href="/button.component.css">
            <link rel="stylesheet" href="/form.component.css">
            <link rel="stylesheet" href="/card.component.css">
        `,
    body: () => html`
            <main class="auth-main">
                <div class="content">
                    <div class="card-auth card-white">
                        <img src="/img/logo/take-a-net-logo.svg" width="200" height="30" alt="take a net">
                        <form
                            on-submit="login-form_submit.action"
                        >
                            <fieldset>
                                <input id="username" type="text" placeholder="Nombre de usuario" autocomplete="username" required>
                            </fieldset>
                            <fieldset>
                                <input id="password" type="password" data-input-password placeholder="Contraseña" autocomplete="current-password" required>
                                <button 
                                    class="btn" 
                                    type="button" 

                                    on-click="show-password-btn_click.action"
                                >
                                    <img src="/img/icon/eye-blue-1.svg" width="20" height="20" alt="mostrar contraseña">
                                </button>
                            </fieldset>
                            <fieldset>
                                <button 
                                    class="btn btn-primary btn-primary-blue-1" 
                                    type="submit">Acceder a mi cuenta</button>
                            </fieldset>
                            <fieldset>
                                <fieldset>
                                    <input type="checkbox" id="remember-me">
                                    <label for="remember-me">Recordarme</label>
                                </fieldset>
                                <a class="btn-blue-1" href="/recuperar-contrasena">Has olvidado tu contraseña?</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div class="thumbnail">
                    <img src="/img/thumbnail/auth-thumbnail.webp"> 
                    <h1>Bienvenido a Take A Net 2</h1>
                    <p>
                        Mediante nuestra <strong>Plataforma online</strong> podrá obtener informes de evaluación de 
                        la auditoría de su empresa de forma online con una interfaz intuitiva y de facil manejo.
                    </p>
                </div>
            </main>
        `,
    env
  });
};

// src/scripts/routes/recover-password.route.js
var recover_password_route_exports = {};
__export(recover_password_route_exports, {
  getRoute: () => getRoute2
});
init_checked_fetch();
init_modules_watch_stub();
var getRoute2 = async ({ request, env }) => {
  return stream2({
    head: () => html`
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login | Take A Net</title>

            <link rel="stylesheet" href="/global.component.css">
            <link rel="stylesheet" href="/main.component.css">
            <link rel="stylesheet" href="/button.component.css">
            <link rel="stylesheet" href="/form.component.css">
            <link rel="stylesheet" href="/card.component.css">
        `,
    body: () => html`
            <main class="auth-main">
                <div class="content">
                    <div class="card-auth card-white">
                        <img src="/img/logo/take-a-net-logo.svg" width="200" height="30" alt="take a note">
                        <form
                            on-submit="recover-password-form_submit.action"
                        >
                            <header>
                                <h3>Has olvidado tu contraseña?</h3>
                                <p>Introduce tu correo electrónico<br> y recupera tu cuenta.</p>
                            </header> 
                            <fieldset>
                                <input id="email" type="text" placeholder="E-mail" autocomplete="email" required>
                            </fieldset>
                            <fieldset>
                                <button 
                                    class="btn btn-primary btn-primary-blue-1" 
                                    type="submit">Recuperar mi cuenta</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div class="thumbnail">
                    <img src="/img/thumbnail/auth-thumbnail.webp"> 
                    <h1>Bienvenido a Take A Net 2</h1>
                    <p>
                        Mediante nuestra <strong>Plataforma online</strong> podrá obtener informes de evaluación de 
                        la auditoría de su empresa de forma online con una interfaz intuitiva y de facil manejo.
                    </p>
                </div>
            </main>
        `,
    env
  });
};

// src/scripts/routes/recover-password-sent.route.js
var recover_password_sent_route_exports = {};
__export(recover_password_sent_route_exports, {
  getRoute: () => getRoute3
});
init_checked_fetch();
init_modules_watch_stub();
var getRoute3 = async ({ request, env }) => {
  const email = new URL(request?.url)?.searchParams?.get("email");
  return stream2({
    head: () => html`
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login | Take A Net</title>

            <link rel="stylesheet" href="/global.component.css">
            <link rel="stylesheet" href="/main.component.css">
            <link rel="stylesheet" href="/button.component.css">
            <link rel="stylesheet" href="/form.component.css">
            <link rel="stylesheet" href="/card.component.css">
        `,
    body: () => html`
            <main class="auth-main">
                <div class="content">
                    <div class="card-auth card-white">
                        <img src="/img/logo/take-a-net-logo.svg" width="200" height="30" alt="take a note">
                        <form>
                            <header>
                                <p>Hemos enviado un enlace para recuperar tu<br>contraseña a <span class="btn-blue-1">${email}</span></p>
                            </header> 
                            <fieldset>
                                <a href="/login" class="btn btn-bordered btn-bordered-blue-1 form-submit">Volver al inicio de sesión</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div class="thumbnail">
                    <img src="/img/thumbnail/auth-thumbnail.webp"> 
                    <h1>Bienvenido a Take A Net 2</h1>
                    <p>
                        Mediante nuestra <strong>Plataforma online</strong> podrá obtener informes de evaluación de 
                        la auditoría de su empresa de forma online con una interfaz intuitiva y de facil manejo.
                    </p>
                </div>
            </main>
        `,
    env
  });
};

// src/scripts/routes/users.route.js
var users_route_exports = {};
__export(users_route_exports, {
  getRoute: () => getRoute4
});
init_checked_fetch();
init_modules_watch_stub();

// src/components/table/table-user.component.js
init_checked_fetch();
init_modules_watch_stub();
var _a2;
var getHTML = ({ users }) => {
  const exampleUser = {
    username: "Nombre de usuario",
    name: "Nombre de usuario",
    last_name: "Apellidos",
    email: "email@email.com",
    phone: "000 000 000",
    status: true
  };
  const exampleUsers = [exampleUser];
  return html`
        <table>
            <thead>
                <tr>
                    <th class="col-actions">
                        <button class="btn btn-primary">
                            <span>Usuario</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Usuario">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>Nombre</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Nombre">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>Apellidos</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Apellidos">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>E-mail</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por E-mail">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>Teléfono</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Teléfono">
                        </button> 
                    </th>
                    <th>
                        <button class="btn btn-primary">
                            <span>Estado</span>
                            <img src="/img/icon/sort-gray-3.svg" width="12" height="12" alt="ordenar por Estado">
                        </button> 
                    </th>                                        
                </tr>
            </thead>
            <tbody>
                ${[...exampleUsers, ...users]?.map((user) => {
    return html(_a2 || (_a2 = __template(['\n                            <tr>\n                                <td class="col-actions">\n                                    <div class="card-cell"> \n                                    <p>', '</p>\n                                    <div class="btn-popup">\n                                        <span class="btn btn-primary btn-primary-blue-1 popup-trigger" tabindex="-1">\n                                            <span>Acciones</span>\n                                            <img src="/img/icon/chevron-down-white.svg" width="16" height="16" alt="agregar usuario">\n                                            <menu class="popup">\n                                                <button \n                                                    class="btn btn-primary" \n\n                                                    on-click="open-edit-dialog-btn_click.action"\n                                                >\n                                                    <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="editar usuario">\n                                                    <span>Editar</span>\n                                                </button>\n                                                <button \n                                                    class="btn btn-primary" \n\n                                                    on-click="open-remove-dialog-btn_click.action"\n                                                >\n                                                    <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="eliminar usuario">\n                                                    <span>Eliminar</span>\n                                                </button>\n                                                <script data-user type="application/json">', "<\/script> \n                                            </menu>\n                                        </span>\n                                    </div>\n                                    </div>\n                                    \n                                </td>\n                                <td>\n                                    <p>", "</p>\n                                </td>\n                                <td>\n                                    <p>", "</p>\n                                </td>\n                                <td>\n                                    <p>", "</p>\n                                </td>\n                                <td>\n                                    <p>", '</p>\n                                </td>\n                                <td>\n                                    <p class="btn btn-status" data-', "tive>\n                                        <span>", "tivo</span>\n                                    </p>\n                                </td>\n                            </tr>\n                        "])), user?.username, JSON.stringify(user), user?.name, user?.last_name, user?.email, user?.phone, user?.status ? "ac" : "inac", user?.status ? "Ac" : "Inac");
  })?.join("")}
            </tbody>
        </table>
    `;
};

// src/components/dialog/crud-user-dialog.component.js
init_checked_fetch();
init_modules_watch_stub();
var confirmButton = {
  "add": "Crear",
  "edit": "Guardar",
  "remove": "Confirmar"
};
var getHTML2 = ({ dialogId, title, description, mode, user }) => {
  return html`
    <dialog id="${dialogId}" class="crud-dialog card-white" data-mode="${mode}">
        <header>
            ${mode === "remove" ? html`
                    <h2>Estás seguro de esto?</h2>
                    <img src="/img/icon/bell-gray-3.svg" width="20" height="20" alt="estas seguro de esto?">
                ` : html`
                    <button 
                        class="btn btn-primary" 

                        on-click="close-crud-dialog-btn_click.action"
                    >
                        <span>Atrás</span>
                    </button>
                `}
            
        </header>
        <div class="content">
            <header>
                <h3>${title}</h3>
                <p>${description}</p>
            </header>
            <form 
                class="col-2" 

                data-username="${user?.username || ""}"
                on-submit="${mode}-user-form_submit.action"
            >
                ${mode === "remove" ? "" : html`
                        <fieldset>
                            <input type="text" id="username" placeholder="Nombre de usuario" value="${user?.username || ""}" required>
                        </fieldset>
                        <fieldset>
                            <input type="text" id="last_name" placeholder="Apellidos" value="${user?.lastname || ""}" required>
                        </fieldset>
                        <fieldset>
                            <input type="text" id="password" placeholder="Contraseña" value="${user?.password || ""}" required>
                        </fieldset>
                        <fieldset>
                            <input type="text" id="email" placeholder="E-mail" value="${user?.email || ""}" required>
                        </fieldset>
                        <fieldset>
                            <input type="text" id="confirm-password" placeholder="Confirmar contraseña" value="${user?.password || ""}" required>
                        </fieldset>
                        <fieldset>
                            <input type="text" id="phone" placeholder="Teléfono" value="${user?.phone || ""}" required>
                        </fieldset>
                        <fieldset>
                            <input type="file" id="photo">
                            <label for="photo"></label>
                        </fieldset>
                        <fieldset>
                            <label>
                                <strong>Está activo?</strong>
                            </label>
                            <input type="radio" name="active" id="active-yes"${user?.active ? " checked" : ""}>
                            <label for="active-yes">Sí</label>
                            <input type="radio" name="active" id="active-no"${!user?.active ? " checked" : ""}>
                            <label for="active-no">No</label>
                        </fieldset>
                    `}
                <fieldset>
                    <button 
                        class="btn btn-bordered btn-bordered-blue-1" 
                        type="button" 

                        on-click="close-crud-dialog-btn_click.action"
                    >Cancelar</button>
                    <button class="btn btn-primary btn-primary-blue-1" type="submit">${confirmButton[mode]}</button>
                </fieldset>
            </form>
        </div>
    </dialog> 
    `;
};

// src/scripts/lib/cookie.lib.js
init_checked_fetch();
init_modules_watch_stub();
var isCookieStoreAvailable = () => typeof cookieStore !== "undefined";
var getCookie = async ({ key }) => isCookieStoreAvailable() ? (await cookieStore?.get(key))?.value : null;
var getAutorizationCookie = ({ request } = {}) => {
  if (isCookieStoreAvailable())
    return getCookie({ key: "Authorization" });
  const cookies = request?.headers?.get("Cookie")?.match(/Authorization=([^;]+)/);
  return cookies?.at(1);
};

// src/scripts/models/user.model.js
init_checked_fetch();
init_modules_watch_stub();

// src/scripts/helpers/api.helper.js
init_checked_fetch();
init_modules_watch_stub();
var fetch2 = async ({ url, ...options }) => {
  try {
    const fetchResult = await fetch({ url, ...options });
    if (fetchResult?.err)
      return fetchResult;
    const response = fetchResult?.response;
    if (!response.ok)
      throw response?.statusText || response?.status;
    const json = await response.json();
    if (json?.status !== "success")
      throw json?.messages ?? json;
    if (json?.messages?.length)
      throw json.messages;
    const data = json?.data;
    return { data };
  } catch (err) {
    return { err };
  }
};
var BASE_API = "https://apptan.sierpes48.es";

// src/scripts/models/user.model.js
var GET_ALL_API = `${BASE_API}/usuarios`;
var GET_API = `${BASE_API}/usuario`;
var CREATE_API = `${BASE_API}/usuarios/crear`;
var UPDATE_API = `${BASE_API}/usuarios/editar/username_test`;
var getAll = async ({ token }) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  const options = {
    method: "GET",
    headers
  };
  const result = await fetch2({ url: GET_ALL_API, ...options });
  if (result?.err)
    return result;
  const data = result?.data?.usuarios;
  return { data };
};

// src/scripts/routes/users.route.js
var getRoute4 = async ({ request, env }) => {
  const credential = await getAutorizationCookie({ request });
  const token = JSON.parse(credential || "{}")?.token;
  const usersResult = await getAll({ token });
  const users = usersResult?.data || [];
  console.log("--- users =", users);
  return stream2({
    head: () => html`
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Usuarios | Take A Net</title>

            <link rel="stylesheet" href="/global.component.css">
            <link rel="stylesheet" href="/main.component.css">
            <link rel="stylesheet" href="/button.component.css">
            <link rel="stylesheet" href="/dialog.component.css">
            <link rel="stylesheet" href="/form.component.css">
            <link rel="stylesheet" href="/table.component.css">
            <link rel="stylesheet" href="/card.component.css">
            <link rel="stylesheet" href="/card-user.component.css">
            <link rel="stylesheet" href="/card-table.component.css">
            <link rel="stylesheet" href="/breadcrumb.component.css">
        `,
    body: () => html`
            <main class="admin-main">
                <header>
                    <select class="btn btn-shadow-white" name="" id="">
                        <option value="" disabled="" selected="">Filtros</option>
                        <option value="">Filtro #1</option>
                        <option value="">Filtro #2</option>
                    </select>
                    <menu class="admin-actions">
                        <button class="btn">
                            <img src="/img/icon/search-gray-3.svg" width="20" height="20" alt="buscar">
                        </button>
                        <button class="btn btn-notification" data-active>
                            <img src="/img/icon/bell-gray-3.svg" width="20" height="20" alt="notificaciones">
                        </button>
                        <button class="btn btn-notification" data-active>
                            <img src="/img/icon/mail-gray-3.svg" width="20" height="20" alt="mensajes">
                        </button>
                        <button class="btn">
                            <img src="/img/icon/power-gray-3.svg" width="20" height="20" alt="cuenta">
                        </button>
                    </menu>
                </header>
                <aside>
                    <menu class="admin-home">
                        <a href="/admin/usuarios" class="btn">
                            <img src="/img/logo/take-a-net-logo.svg" width="156" height="24" alt="take a net">
                        </a>
                    </menu>
                    <div class="card-user">
                        <img src="/img/user/user.webp" width="64" height="64" alt="Nombre Apellidos">
                        <div class="content">
                            <h4>Nombre Apellidos</h4>
                            <p>Cargo</p>
                        </div>
                        <button class="btn btn-bordered btn-bordered-blue-1">Editar perfil</button>
                    </div>
                    <menu class="admin-nav">
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar clientes">
                                    <span>Clientes</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo cliente">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar proyectos">
                                    <span>Proyectos</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo proyecto">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar rutas">
                                    <span>Rutas</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nueva ruta">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar colaboradores">
                                    <span>Colaboradores</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo colaborador">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar permisos">
                                    <span>Permisos</span>
                                </button>
                            </summary>
                            <nav>
                                    <button class="btn btn-primary btn-primary-gray-4">
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo permiso">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                        <details>
                            <summary>
                                <button 
                                    class="btn btn-primary btn-primary-transp-gray-3" 

                                    on-click="admin-main-detail-button_click.action"
                                >
                                    <img src="/img/icon/mail-gray-3.svg" width="16" height="16" alt="mostrar usuarios">
                                    <span>Usuarios</span>
                                </button>
                            </summary>
                            <nav>
                                    <button 
                                        class="btn btn-primary btn-primary-gray-4"
                                        
                                        data-dialog-id="add-user"
                                        on-click="open-dialog-btn_click.action"
                                    >
                                        <img src="/img/icon/plus-gray-3.svg" width="16" height="16" alt="nuevo usuario">
                                        <span>Nuevo</span>
                                    </button>
                                    <button class="btn btn-primary btn-primary-blue-2">
                                        <span>Listado</span>
                                    </button>
                                </nav>
                        </details>
                    </menu>
                </aside>
                <div class="content">
                    <header>
                        <menu class="breadcrumb">
                            <a>Inicio</a>
                            <p>/</p>
                            <a>Usuarios</a>
                            <p>/</p>
                            <p><strong>Listado</strong></p>
                        </menu>
                        <menu>
                            <button 
                                class="btn btn-primary btn-primary-blue-1" 

                                data-dialog-id="add-user"
                                on-click="open-dialog-btn_click.action"
                            >
                                <img src="/img/icon/plus-white.svg" width="20" height="20" alt="agregar usuario">
                            </button>
                        </menu>
                    </header>
                    <div class="card-table card-white">
                        <header>
                            <menu>
                            </menu>
                            <menu>
                                <select class="btn btn-bordered btn-bordered-blue-1" name="" id="">
                                    <option value="" disabled selected>Filtros</option>
                                    <option value="">Filtro #1</option>
                                    <option value="">Filtro #2</option>
                                </select>
                            </menu>
                        </header>
                        <div class="content">
                            ${getHTML({ users })}
                        </div>
                    </div>
                </div>
            </main> 
            ${getHTML2({
      dialogId: "add-user",
      title: "Nuevo usuario",
      description: "A\xF1ade los siguientes datos al nuevo usuario.",
      mode: "add"
    })}
        `,
    env
  });
};

// src/scripts/config.js
var urlPatterns = {
  Login: "/login",
  RecoverPassword: "/recuperar-contrasena",
  RecoverPasswordSent: "/recuperar-contrasena-enviado",
  Users: "/admin/usuarios"
};
var router = /* @__PURE__ */ new Map();
router.set(urlPatterns.Login, login_route_exports);
router.set(urlPatterns.RecoverPassword, recover_password_route_exports);
router.set(urlPatterns.RecoverPasswordSent, recover_password_sent_route_exports);
router.set(urlPatterns.Users, users_route_exports);
var forbiddenURLs = [
  "cloudflare.worker.js",
  "_actions_autogenerated.js"
];

// src/cloudflare.worker.js
var handleFetch = async ({ request, env, ctx }) => {
  const url = new URL(request.url);
  const { pathname } = url;
  const pattern = findPatternFromUrl({ router, url });
  const redirectResult = getRedirectResponse({ pathname });
  if (redirectResult?.response)
    return redirectResult.response;
  const forbiddenResult = getForbiddenResponse({ request, forbiddenURLs });
  if (forbiddenResult?.response)
    return forbiddenResult.response;
  const pageCallback = router?.get(pattern?.pathname)?.getRoute;
  const pageResult = pageCallback ? await pageCallback({ request, pattern, env }) : null;
  if (pageResult?.response)
    return pageResult.response;
  const staticResult = await getStaticResponse({ request, waitUntil: ctx.waitUntil.bind(ctx), env });
  if (staticResult?.response)
    return staticResult?.response;
  const notFoundResult = await getNotFoundResponse({ router, request });
  return notFoundResult?.response;
};
var cloudflare_worker_default = {
  fetch: (request, env, ctx) => handleFetch({ request, env, ctx })
};

// ../../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_checked_fetch();
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// .wrangler/tmp/bundle-eIt5HS/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...cloudflare_worker_default,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...cloudflare_worker_default.middleware ? cloudflare_worker_default.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;

// .wrangler/tmp/bundle-eIt5HS/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env, ctx);
};
function getMaskedEnv(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv(env), ctx);
}
var middleware_loader_entry_default = facade2;
export {
  middleware_loader_entry_default as default
};
//# sourceMappingURL=cloudflare.worker.js.map
