/** Keep descriptive desktop labels while giving mobile controls a compact name. */
export function ResponsiveButtonLabel({ desktop, mobile }: { desktop: string; mobile: string }) {
  return <><b className="button-label-desktop">{desktop}</b><b className="button-label-mobile">{mobile}</b></>;
}
