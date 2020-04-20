import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
  animation,
} from "@angular/animations";

export const fade =
trigger('routeAnimations', [
  transition("* <=> *", [
    style({ opacity: 0 }),
    animate("600ms ease", style({ opacity: 1 })),
  ]),
]);
