import { Pressable, Row, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

export function EmptyPoolList() {
  const {navigate} = useNavigation();
  
  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {'\n'} nenhum bolão, que tal
      </Text>
      <Pressable onPress={() => navigate("find")}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          Buscar por um  código
        </Text>
      </Pressable>

      <Text color="gray.200" fontSize="sm" mx={1}>
        ou
      </Text>

      <Pressable onPress={()=> navigate("new")} >
        <Text textDecoration="underline" color="yellow.500">
            criar um novo
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>

    </Row>
  );
}
