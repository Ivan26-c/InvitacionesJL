import { useId, useState } from "react";
import { assetUrl } from "../../utils/assets";

const upperBody = "M830 510 Q820 337 947 329 Q1105 319 1115 497 L1110 643 Q1140 644 1190 668 L1475 782 Q1619 823 1619 902 Q1581 1004 1460 1062 L1425 1188 L1430 1290 L1400 1358 L1367 1340 L1334 1350 L1305 1333 L1270 1336 L1244 1280 L1240 1180 L1285 1053 L1315 897 L1280 870 L1170 1110 L1090 1410 L500 1410 L543 1190 L545 1128 L531 1070 L542 1174 L514 1197 L496 1190 L487 1220 L460 1215 L442 1180 L418 1138 L412 1064 L425 979 Q442 834 513 784 L748 692 Q818 665 859 665 L883 680 L855 599Z";
const chairFront = "M165 1210 L418 955 L424 994 L195 1250 L260 1337 L236 1350Z M1260 1285 L1245 1340 L1020 1510 L984 1800 L1010 2240 L1100 2290 L1140 2230 L1090 1790 L1332 1485 L1360 1360 L1304 1350 L1285 1310Z";

export function SeatedPortrait() {
  const id = useId().replace(/:/g, "");
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);
  const photo = assetUrl("images/jose-luis-silla-original.jpg");
  if (failed) return <img className="seated-fallback" src={photo} alt="José Luis sentado en su silla" loading="lazy" />;
  const original = <image href={photo} width="1792" height="2388" />;
  return <button type="button" className={`seated-portrait ${expanded || hovered ? "is-enlarged" : ""}`}
    aria-label={expanded ? "Reducir retrato de José Luis en su silla" : "Acercar retrato de José Luis en su silla"}
    aria-pressed={expanded} onClick={() => setExpanded(value => !value)}
    onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
    onPointerLeave={() => setHovered(false)} onBlur={() => setHovered(false)}
    onKeyDown={event => { if (event.key === "Escape") { setExpanded(false); setHovered(false); } }}>
    <svg viewBox="0 270 1792 2120" role="img" aria-label="José Luis sentado en su silla, sin fondo">
      <defs>
        <filter id={`trim-${id}`}>
          <feMorphology in="SourceAlpha" operator="erode" radius="1.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
        </filter>
        <mask id={`cutout-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1792" height="2388">
          <image href={assetUrl("images/jose-luis-silla-mascara.png")} width="1792" height="2388" preserveAspectRatio="none" filter={`url(#trim-${id})`} onError={() => setFailed(true)} />
          <path fill="black" d="M601 916 L674 875 Q657 940 668 981 Q641 943 601 916Z M572 939 L589 926 Q648 966 663 1010 L646 1042 L629 1071 L618 1071 Q570 1021 572 939Z M524 973 L556 951 Q555 1002 571 1033 Q550 1003 523 988Z" />
        </mask>
        <clipPath id={`upper-${id}`}><path d={upperBody} /></clipPath>
        <clipPath id={`chair-${id}`}><path d={chairFront} /></clipPath>
        <linearGradient id={`blend-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" /><stop offset=".78" stopColor="white" /><stop offset="1" stopColor="black" />
        </linearGradient>
        <mask id={`blendMask-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1792" height="1450">
          <rect width="1792" height="1450" fill={`url(#blend-${id})`} />
        </mask>
      </defs>
      <g mask={`url(#cutout-${id})`}>{original}</g>
      <g className="seated-person">
        <g mask={`url(#blendMask-${id})`}><g clipPath={`url(#upper-${id})`}><g mask={`url(#cutout-${id})`}>{original}</g></g></g>
      </g>
      <g clipPath={`url(#chair-${id})`}><g mask={`url(#cutout-${id})`}>{original}</g></g>
    </svg>
  </button>;
}
