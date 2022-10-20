import { useNavigation } from "@react-navigation/native";

export function useAppNavigation() {
  const nav = useNavigation();

  const navigate = (screen: string, params?: object) => {
    // @ts-ignore
    nav.navigate(screen, params);
  }
  return {
    navigate
  };
}
