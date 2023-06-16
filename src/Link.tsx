import { EVENTS } from './constants';

export function navigate(href: string) {
  window.history.pushState(null, '', href);
  window.dispatchEvent(new Event(EVENTS.PUSHSTATE));
}

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link({ href, children, ...props }: Props) {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isMainEvent = event.button === 0;
    const isModifiedEvent =
      event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    const isSelfTarget = props.target === undefined || props.target === '_self';

    if (isMainEvent && isSelfTarget && !isModifiedEvent) {
      event.preventDefault();
      navigate(href);
    }
  };

  return (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  );
}
