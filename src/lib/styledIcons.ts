import { Feather, Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

/**
 * @expo/vector-icons isn't a gluestack component, so it doesn't accept className
 * out of the box. NativeWind's styled() (the same helper gluestack uses to wrap
 * Heading/Icon internally) intercepts className and resolves it into the `style`
 * prop, which Feather/Ionicons already respect for tinting — so semantic color
 * tokens (text-foreground, text-muted-foreground, ...) work the same as any
 * other gluestack-styled element.
 */
export const StyledFeather = styled(Feather, { className: 'style' });
export const StyledIonicons = styled(Ionicons, { className: 'style' });
