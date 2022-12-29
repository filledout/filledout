import StarterLayout from './components/starter-layout.vue';
import DarkTheme from './styles/dark-theme.css';

export { DarkTheme };

export default {
  ...DarkTheme,
  // override the Layout with a wrapper component that injects the slots
  Layout: StarterLayout
};
