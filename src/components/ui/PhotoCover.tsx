import { useId, useState } from "react";
import { foreground, portraitSize, silhouette } from "../../assets/portraitSilhouette";
import { assetUrl } from "../../utils/assets";

interface PhotoCoverProps {
  src: string;
  name: string;
  cutout: boolean;
  onError: () => void;
}

export function PhotoCover({ src, name, cutout, onError }: PhotoCoverProps) {
  const id = useId().replace(/:/g, "");
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const enlarged = expanded || hovered;
  const { width, height } = portraitSize;

  return <div className={`photo-cover ${enlarged ? "is-enlarged" : ""}`}>
    <button
      type="button"
      className="cover-photo-button"
      aria-label={expanded ? `Reducir retrato de ${name}` : `Ampliar retrato de ${name}`}
      aria-pressed={expanded}
      onPointerLeave={() => setHovered(false)}
      onClick={() => { setExpanded(value => !value); setHovered(false); }}
      onKeyDown={event => { if (event.key === "Escape") { setExpanded(false); setHovered(false); } }}
    >
      {cutout ? <svg className="cover-photo" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMin slice" role="img" aria-label={`Fotografía de ${name} junto a la mesa familiar`}>
        <defs>
          <clipPath id={`person-${id}`}><path d={silhouette} /></clipPath>
          <clipPath id={`foreground-${id}`}><path d={foreground} /></clipPath>
          <mask id={`scene-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
            <rect width={width} height={height} fill="white" />
            <path d={silhouette} fill="black" />
          </mask>
          <pattern id={`paper-${id}`} patternUnits="userSpaceOnUse" width="415" height="380" viewBox="0 359 415 380">
            <image href={assetUrl("images/referencia-papel.png")} width="415" height="739" />
          </pattern>
        </defs>
        <path className="cover-paper-backing" d={silhouette} fill={`url(#paper-${id})`} />
        <image className="cover-full-photo" href={assetUrl(src)} width={width} height={height} mask={`url(#scene-${id})`} onError={onError} />
        <g onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}>
          <path d={silhouette} fill="transparent" />
          <g className="cover-person">
          <path className="cover-paper-edge" d={silhouette} fill="#fffaf0" stroke="#fffaf0" strokeWidth="8" strokeLinejoin="round" />
          <path className="cover-paper-grain" d={silhouette} fill="none" stroke={`url(#paper-${id})`} strokeWidth="5" strokeLinejoin="round" />
          <image href={assetUrl(src)} width={width} height={height} clipPath={`url(#person-${id})`} />
          </g>
        </g>
        <image className="cover-foreground" href={assetUrl(src)} width={width} height={height} clipPath={`url(#foreground-${id})`} />
      </svg> : <img className="cover-photo cover-photo-plain" src={assetUrl(src)} alt={`Fotografía completa de ${name}`} onError={onError} onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} />}
    </button>
  </div>;
}
