import {useState} from "react";
import { Heading, Text, VStack, useToast } from "native-base";

import Logo from "../assets/logo.svg";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";


export function New() {

  const [title, setTitle] = useState('');
  //estado botao carregando
  const [isLoading, setIsloading] = useState(false);

  //toast 
  const toast = useToast();

  async function handlePoolCreate(){
    //trim remove espacos
    if(!title.trim()){
      //return  para encerrar a funcao aqui
      return toast.show({
        title: 'Informe um nome para o seu bolão',
        placement: 'top',
        bgColor: 'red.500'
      });
    }

    try{
      setIsloading(true);

      //fazendo requisicao para enviar um bolão
      await api.post('/pools', {title: title})

      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      });

      setTitle('');


    }catch(error){
      console.log(error);

      //toast erro
      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsloading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa {"\n"} e compartilhe entre amigos!
        </Heading>

        <Input 
          mb={2} 
          onChangeText={setTitle} 
          placeholder="Qual o nome do seu bolão?" 
          value={title}
          />

        <Button 
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolCreate}
          isLoading={isLoading}

        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas
        </Text>
      </VStack>
    </VStack>
  );
}
